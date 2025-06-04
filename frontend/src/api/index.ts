import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store.ts'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

// api.interceptors.response.use((response) => response, (error) => {
//   if (error.response && error.response.status === 401) {
//     console.error('Ошибка 401: Неавторизован');
//     // window.location.href = '/login';
//   }
//   // return Promise.reject(error);
// });
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()

    const token = authStore.accessToken

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api;
