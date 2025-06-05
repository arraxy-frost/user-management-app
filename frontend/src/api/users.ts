import api from '@/api/index.ts'

export const getUsers = async (page: number, limit: number) => {
  const response = await api.get('/users', {
    params: {
      page,
      limit,
    },
  })

  return response.data
}
