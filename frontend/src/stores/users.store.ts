import { defineStore } from 'pinia'
import { getUserById, getUsers } from '@/api/users.ts'

interface User {
  id: string;
  name: string;
  email: string;
  Role: string
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    totalUsers: 0,
    currentPage: 1,
    pageSize: 10,
  }),
  actions: {
    async fetchUsers(page: number = 1, limit: number = 10) {
      const { data, totalCount, page: currentPage, limit: pageSize } = await getUsers(page, limit)

      this.users = data
      this.totalUsers = totalCount
      this.currentPage = currentPage
      this.pageSize = pageSize
    },
    async getUser(id: string) {
      return await getUserById(id) as User;
    }
  },
})
