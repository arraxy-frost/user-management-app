import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { TokenPair } from '../shared/interfaces/TokenPair'

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

    setRefreshTokenCookie(res, refreshToken);

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

    setRefreshTokenCookie(res, refreshToken);

    res.json({ access_token: accessToken });
}

export const logout = async (req: Request, res: Response): Promise<any> => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: 'api/auth/logout',
    });

    return res.status(204).json({
        message: 'Logged out',
    });
}

export const refresh = async (req: Request, res: Response): Promise<any> => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ error: 'No refresh token provided' });
    }

    const tokenPair: TokenPair | null = await authService.refreshTokens(refreshToken);

    if (!tokenPair) {
        return res.status(401).json({ error: 'Token refreshing failed' });
    }

    setRefreshTokenCookie(res, tokenPair.refreshToken);

    return res.json({
        access_token: tokenPair.accessToken,
    });
}

const setRefreshTokenCookie = (res: Response, refreshToken: string): void => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        // sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/api/auth/refresh',
    });
}