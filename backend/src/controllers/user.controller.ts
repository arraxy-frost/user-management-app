export const getUsers = (req: any, res: any) => {
    res.json({ message: 'User: Get Users' });
}

export const getUserById = (req: any, res: any) => {
    const userId = req.params.id;
    res.json({ message: `User: Get User by ID ${userId}` });
}

export const createUser = (req: any, res: any) => {
    res.json({ message: 'User: Create User' });
}

export const updateUser = (req: any, res: any) => {
    const userId = req.params.id;
    res.json({ message: `User: Update User with ID ${userId}` });
}

export const deleteUser = (req: any, res: any) => {
    const userId = req.params.id;
    res.json({ message: `User: Delete User with ID ${userId}` });
}