import api from '@/api/index.ts'

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', {
    email,
    password,
  })

  return {
    access_token: response.data.access_token,
    user: response.data.user,
  }
}

export const logout = async () => {
  try {
    await api.post('/auth/logout')
    return true
  } catch (error: any) {
    console.warn(error)
    return false
  }
}

export const refresh = async () => {
  try {
    const response = await api.post('/auth/refresh')

    return {
      access_token: response.data.access_token,
    }
  } catch (error: any) {
    console.warn(error)
    return null
  }
}

export const checkAuth = async (): Promise<boolean> => {
  try {
    await api.get('/auth/check')
    return true
  }
  catch (error: any) {
    console.warn(error)
    return false
  }
}

export const fetchProfile = async (): Promise<{
  id: '',
  name: '',
  email: '',
  Role: '',
}> => {
  const response = await api.get('/auth/profile')
  return response.data
}
