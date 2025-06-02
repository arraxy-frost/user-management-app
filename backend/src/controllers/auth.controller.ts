import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    // Simple request validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const user: User = await userService.getUserByEmail(email);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const { passwordHash } = user;

    if (!await bcrypt.compare(password, passwordHash)) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const refreshToken = authService.generateRefreshToken(user);
    const accessToken = authService.generateAccessToken(user);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: 'api/auth/refresh',
    });

    res.json({ access_token: accessToken });
}

export const register = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    // Simple request validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    let user: User;

    try {
        user = await userService.createUser({
            name: "username",
            email: email,
            password: password
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json(err.errors);
    }

    const refreshToken = authService.generateRefreshToken(user);
    const accessToken = authService.generateAccessToken(user);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: 'api/auth/refresh',
    });

    res.json({ access_token: accessToken });
}
