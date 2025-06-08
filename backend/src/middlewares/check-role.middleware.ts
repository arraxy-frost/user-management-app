import { AuthenticatedRequest } from '../shared/interfaces/AuthenticatedRequest'
import { NextFunction, Response } from 'express'
import { Roles } from '../shared/enums/Roles'

export default (roles: Roles[]): any => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
        if (req.user && roles.includes(req.user?.role)) {
            return next();
        } else {
            return res.status(403).json({
                message: `Access denied`,
            });
        }
    }
}