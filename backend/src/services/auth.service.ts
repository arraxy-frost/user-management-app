import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from "../models/User";

dotenv.config();

const JWT_ACCESS_SECRET: string = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET!;
const JWT_ACCESS_EXPIRES: string = process.env.JWT_ACCESS_EXPIRES || "10m";
const JWT_REFRESH_EXPIRES: string = process.env.JWT_REFRESH_EXPIRES || "7d";

const accessTokenOptions: jwt.SignOptions = {
    expiresIn: JWT_ACCESS_EXPIRES as any,
    algorithm: "HS256",
};

const refreshTokenOptions: jwt.SignOptions = {
    expiresIn: JWT_REFRESH_EXPIRES as any,
    algorithm: "HS256",
};

export const generateAccessToken = (user: User): string => {
    return jwt.sign(
        {
            id: user.id,
            role: user.Role,
        },
        JWT_ACCESS_SECRET,
        accessTokenOptions
    );
};

export const generateRefreshToken = (user: User): string => {
    return jwt.sign(
        {
            id: user.id,
        },
        JWT_REFRESH_SECRET,
        refreshTokenOptions
    );
};