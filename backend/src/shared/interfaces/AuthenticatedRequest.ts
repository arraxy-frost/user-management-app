import { Request } from "express";
import AccessTokenPayload from './AccessTokenPayload'

export interface AuthenticatedRequest extends Request {
    user?: AccessTokenPayload;
}