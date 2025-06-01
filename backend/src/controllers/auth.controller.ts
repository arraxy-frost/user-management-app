import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
    // const { email, password } = req.body;
    //
    // // Simple request validation
    // if (!email || !password) {
    //     res.status(400).json({ error: 'Email and password are required' });
    // }

    res.json({ message: 'Auth: Login' });
}

export const register = (req: Request, res: Response) => {
    res.json({ message: 'Auth: Register' });
}