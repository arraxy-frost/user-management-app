import jwt from 'jsonwebtoken'
import openPaths from "../config/openPaths";
import { extractTokenFromHeader } from "../utils/extractTokenFromHeader";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../shared/interfaces/AuthenticatedRequest";

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

    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string, (err, user) => {
        if (err) {
            return res.status(401).json({
                message: 'Token is invalid',
            });
        }

        // Checking role permissions

        req.user = user;

        return next();
    });
}