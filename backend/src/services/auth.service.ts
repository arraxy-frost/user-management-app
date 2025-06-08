import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from "../models/User";
import { TokenPair } from '../shared/interfaces/TokenPair'
import { tokenWhiteList } from '../config/cache'
import { Session } from '../models/Session'

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
    const accessToken = jwt.sign(
        {
            id: user.id,
            role: user.Role,
        },
        JWT_ACCESS_SECRET,
        accessTokenOptions
    );

    tokenWhiteList.set(user.id, accessToken);

    return accessToken;
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

export const refreshSession = async (token: string): Promise<TokenPair | null> => {
    try {
        const payload = jwt.verify(token, JWT_REFRESH_SECRET, refreshTokenOptions) as { id: string};

        const userInstance = await User.findByPk(payload.id);
        const user = userInstance ? userInstance.toJSON() : null;

        if (!user) {
            throw new Error('User not found');
        }

        const { accessToken, refreshToken } = await ensureSession(user);

        return {
            accessToken,
            refreshToken
        };
    }
    catch (err) {
        console.error('Error refreshing tokens:', err.message);
        return null;
    }
}

export const ensureSession  = async (user: User): Promise<TokenPair> => {
    const refreshToken = generateRefreshToken(user);

    const session = await Session.findOne({
        where: {
            userId: user.id
        }
    });

    if (!session) {
        await Session.create({
            refreshToken,
            userId: user.id
        });
    } else {
        await session.update({ refreshToken });
    }

    const accessToken = generateAccessToken(user);

    return {
        accessToken,
        refreshToken
    }
}