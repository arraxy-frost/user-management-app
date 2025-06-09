import { defineStore } from 'pinia'
import { fetchProfile, checkAuth, login, refresh, logout, updateProfile, register } from '@/api/auth.ts'
import type { UserData } from '@/types/UserData.ts'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userData: {
      id: '',
      name: '',
      email: '',
      role: '',
    },
    accessToken: '',
    isAuthenticated: false,
  }),
  actions: {
    async login(email: string, password: string) {
      const response: { access_token: string } | null = await login(email, password)

      this.$state.accessToken = response?.access_token ?? ''
      this.$state.isAuthenticated = true

      await fetchProfile()
    },
    async register(email: string, password: string) {
      const response: { access_token: string } | null = await register(email, password)

      this.$state.accessToken = response?.access_token ?? ''
      this.$state.isAuthenticated = true

      await fetchProfile()
    },
    async logout() {
      await logout()
      this.$reset();
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
    async checkAuth() {
      this.$state.isAuthenticated = await checkAuth()
    },
    async updateProfile(name: string, email: string, password: string): Promise<UserData | null> {
      const updateResult = await updateProfile(name, email, password);

      if (!updateResult) {
        console.error('Failed to update profile')
      }
      else {
        await fetchProfile()
      }

      return updateResult;
    },
    async fetchProfile() {
      this.$state.userData = await fetchProfile()
    },
  },
})
