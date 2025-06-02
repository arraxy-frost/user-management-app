import { Request } from "express";

export const extractTokenFromHeader = (req: Request): string | null => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || typeof authHeader !== 'string') return null;

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') return null;

    return parts[1];
};