import jwt from 'jsonwebtoken'
import openPaths from "../config/openPaths";
import { extractTokenFromHeader } from "../utils/extractTokenFromHeader";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction): any => {
    if (openPaths.includes(req.path)) {
        return next();
    }

    const accessToken = extractTokenFromHeader(req);

    if (!accessToken) {
        return res.status(401).json({
            message: 'Access token is missing',
        });
    }

    // try {
    //     const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
    //     req.user = decoded; // Attach user info to request object
    // } catch (err) {
    //     return res.status(401).json({
    //         message: 'Invalid access token',
    //     });
    // }

    return next();
}