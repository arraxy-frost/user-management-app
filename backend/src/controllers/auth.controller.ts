import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { TokenPair } from '../shared/interfaces/TokenPair'
import { AuthenticatedRequest } from '../shared/interfaces/AuthenticatedRequest'
import AccessTokenPayload from '../shared/interfaces/AccessTokenPayload'

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const user: User = await userService.getUserByEmail(email);

    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const { passwordHash } = user;

    if (!await bcrypt.compare(password, passwordHash)) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const { refreshToken, accessToken } = await authService.ensureSession(user);

    setRefreshTokenCookie(res, refreshToken);

    res.json({
        access_token: accessToken
    });
}

export const register = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    let user = await userService.createUser({
        name: "username",
        email: email,
        password: password
    });

    const { refreshToken, accessToken } = await authService.ensureSession(user);

    setRefreshTokenCookie(res, refreshToken);

    res.json({ access_token: accessToken });
}

export const logout = async (req: Request, res: Response): Promise<any> => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api/auth/refresh',
    });

    return res.sendStatus(204);
}

export const refresh = async (req: Request, res: Response): Promise<any> => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ error: 'No refresh token provided' });
    }

    const tokenPair: TokenPair | null = await authService.refreshSession(refreshToken);

    if (!tokenPair) {
        return res.status(401).json({ error: 'Token refreshing failed' });
    }

    setRefreshTokenCookie(res, tokenPair.refreshToken);

    return res.json({
        access_token: tokenPair.accessToken,
    });
}

export const getCurrentUser = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const { id } = req.user as any;

    const user = await userService.getUserById(id);

    res.json(user)
}

export const checkAuth = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    res.status(204).send();
}

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const { id } = req.user as AccessTokenPayload;

    const { name, email, password } = req.body;

    const updatedUser = await userService.updateUser(id, {
        name,
        email,
        passwordHash: password ? await bcrypt.hash(password, 10) : undefined
    });

    if (!updatedUser) {
        res.status(404).json({
            message: 'User not found'
        });
    } else {
        res.json(updatedUser);
    }
}

const setRefreshTokenCookie = (res: Response, refreshToken: string): void => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/api/auth/refresh',
    });
}