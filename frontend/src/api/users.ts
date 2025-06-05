import api from '@/api/index.ts'
import type { UpdateUserRequest } from '@/types/UpdateUserRequest.ts'

export const getUsers = async (page: number, limit: number) => {
  const response = await api.get('/users', {
    params: {
      page,
      limit,
    },
  })

  return response.data
}

export const updateUser = async (userId: string, userData: UpdateUserRequest) => {
  try {
    const response = await api.patch(`/users/${userId}`, userData)
    return response.data
  } catch (error: any) {
    console.error('Error updating user:', error)
    throw new Error(error.response?.data?.message || 'Failed to update user')
  }
}
