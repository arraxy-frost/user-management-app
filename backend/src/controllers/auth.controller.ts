import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
    res.json({ message: 'Auth: Login' });
}

export const register = (req: Request, res: Response) => {
    res.json({ message: 'Auth: Register' });
}