import { defineStore } from 'pinia'
import { login, refresh } from '@/api/auth.ts'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userData: {
      id: '',
      name: '',
      email: '',
      Role: ''
    },
    accessToken: '',
    isAuthenticated: false,
  }),
  actions: {
    async login(email: string, password: string) {
      const response: {
        access_token: string
        user: {
          id: string
          name: string
          email: string,
          Role: string
        }
      } = await login(email, password)

      this.$state.accessToken = response.access_token
      this.$state.userData = response.user
      this.$state.isAuthenticated = true
    },
    async logout() {
      console.log('Logout ...')
    },
    async refresh() {
      console.log('Refresh tokens ...')
      const response = await refresh()

      this.$state.accessToken = response.access_token
      console.log(this.$state)
    },
  },
})
