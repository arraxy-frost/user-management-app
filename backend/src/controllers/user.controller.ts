import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import {User} from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
    const { limit = 10, page = 1 } = req.body;

    res.json(await userService.getUsers(limit, page));
}

export const getUserById = async (req: Request, res: Response) => {
    // Must be a valid uuidv4
    const userId = req.params.id;

    const result: User | null = await userService.getUserById(userId);

    if (!result) {
        res.status(404).json({
            message: 'User not found'
        })
    } else {
        res.json(result);
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ message: 'Validation error' });
    }

    const userData = {
        name,
        email,
        password
    }

    const newUser = await userService.createUser(userData);

    res.json({
        message: `User Created Successfully`,
        data: newUser
    });
}

export const updateUser = async (req: Request, res: Response) => {
    const updatedUser = await userService.updateUser(req.params.id, req.body)

    if (!updatedUser) {
        res.status(404).json({
            message: 'User not found'
        });
    } else {
        res.json(updatedUser);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;

    const result = await userService.deleteUser(userId);

    if (!result) {
        res.status(404).json({
            message: 'User not found'
        })
    } else {
        res.json({
            message: `user deleted`,
            data: result
        });
    }
}