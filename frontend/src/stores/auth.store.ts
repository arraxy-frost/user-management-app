import { defineStore } from 'pinia'
import { checkAuth, login, refresh } from '@/api/auth.ts'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userData: {
      id: '',
      name: '',
      email: '',
      Role: '',
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
          email: string
          Role: string
        }
      } = await login(email, password)

      this.$state.accessToken = response.access_token
      this.$state.userData = response.user
      this.$state.isAuthenticated = true
    },
    async checkAuth() {
      this.$state.isAuthenticated = await checkAuth()
    },
    async logout() {
      console.log('Logout ...')
    },
    async refreshTokens() {
      const response = await refresh()

      if (!response) {
        console.warn('Failed to refresh tokens')
        this.$state.isAuthenticated = false
        return
      }

      this.$state.accessToken = response.access_token
      this.$state.isAuthenticated = true
    },
  },
})
