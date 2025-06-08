import jwt from 'jsonwebtoken'
import openPaths from "../config/openPaths";
import AccessTokenPayload from '../shared/interfaces/AccessTokenPayload';
import { extractTokenFromHeader } from "../utils/extractTokenFromHeader";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../shared/interfaces/AuthenticatedRequest";
import { tokenWhiteList } from '../config/cache';

export default (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
    if (openPaths.includes(req.path)) {
        return next();
    }

    const accessToken = extractTokenFromHeader(req);

    if (!accessToken) {
        return res.status(401).json({
            message: 'Access token is missing',
        });
    }

    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string, (err, user: string | AccessTokenPayload) => {
        if (err) {
            return res.status(401).json({
                message: 'Token is invalid',
            });
        }

        if (typeof user === 'string') {
            return res.status(401).json({ message: 'Token is not a valid object payload' });
        }

        const cachedToken = tokenWhiteList.get(user.id)

        if (!cachedToken || cachedToken !== accessToken) {
            return res.status(401).json({
                message: 'Token is not valid or has expired',
            });
        }

        req.user = user;

        return next();
    });
}