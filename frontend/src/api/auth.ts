import api from '@/api/index.ts';

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', {
    email,
    password
  });

  return {
    access_token: response.data.access_token,
  }
}
