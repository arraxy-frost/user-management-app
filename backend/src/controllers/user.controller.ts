import { Request, Response } from 'express'
import * as userService from '../services/user.service'
import { User } from '../models/User'
import { AuthenticatedRequest } from '../shared/interfaces/AuthenticatedRequest'

export const getUsers = async (req: AuthenticatedRequest, res: Response) => {
  const { limit = '10', page = '1', email, name } = req.query as {
    limit?: string,
    page?: string,
    email?: string,
    name?: string,
  }

  res.json(await userService.getUsers(
    parseInt(limit),
    parseInt(page),
    email,
    name
  ))
}

export const getUserById = async (req: Request, res: Response) => {
  // Must be a valid uuidv4
  const userId = req.params.id

  const result: User | null = await userService.getUserById(userId)

  if (!result) {
    res.status(404).json({
      message: 'User not found'
    })
  } else {
    res.json(result)
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Validation error' })
  }

  const userData = {
    name,
    email,
    password
  }

  const newUser = await userService.createUser(userData)

  res.json(newUser)
}

export const updateUser = async (req: Request, res: Response) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body)

  if (!updatedUser) {
    res.status(404).json({
      message: 'User not found'
    })
  } else {
    res.json(updatedUser)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id

  const deletedUser = await userService.deleteUser(userId)

  if (!deletedUser) {
    res.status(404).json({
      message: 'User not found'
    })
  } else {
    res.json(deletedUser)
  }
}