import bcrypt from 'bcrypt';
import { User } from '../models/User';

export const createUser = async (userData: any): Promise<User> => {
    const passwordHash = await bcrypt.hash(userData.password, 10);

    return User.create({
        name: userData.name,
        email: userData.email,
        passwordHash
    });
}

export const getUsers = async (limit: number, page: number) => {
    const offset = (page - 1) * limit;

    const totalCount = await User.count();
    const data = await User.findAll({
        limit,
        offset
    });

    return {
        limit,
        page,
        offset,
        totalCount,
        data
    };
}

export const getUserById = async (id: string): Promise<User | null> => {
    return User.findOne({
        where: {
            id
        }
    });
}

export const updateUser = async (id: string, update: Partial<User>): Promise<User | null> => {
    const [affectedCount, updatedUsers] = await User.update(update, {
        where: { id},
        returning: true
    });

    if (affectedCount === 0) return null;

    return updatedUsers[0].get();
};

export const deleteUser = async (id: string): Promise<User | null> => {
    const user: User | null = await getUserById(id);

    if (!user) return null;

    await user.destroy();

    return user;
}