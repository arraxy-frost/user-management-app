import api from '@/api/index.ts'
import type { UserData } from '@/types/UserData.ts'

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    })
    return {
      access_token: response.data.access_token as string
    }
  } catch (error: any) {
    console.warn(error)
    return null
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

export const updateProfile = async (
  name: string,
  email: string,
  password: string,
): Promise<UserData | null> => {
  try {
    console.log(name, email, password)
    const response = await api.patch('/auth/profile', {
      name,
      email,
      password,
    })
    return response.data
  }
  catch (error: any) {
    console.error(error.message)
    return null
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
