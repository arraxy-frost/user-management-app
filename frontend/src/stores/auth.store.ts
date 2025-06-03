import { defineStore } from 'pinia'
import { login } from '@/api/auth.ts'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        userData: null,
        accessToken: null,
    }),
    actions: {
        async login(email: string, password: string) {
            const response = await login(email, password);
            this.$state.accessToken = response.access_token;

            console.log(this.$state);
        },
        async logout() {
            console.log('Logout ...')
        },
        async refresh() {
            console.log('Refreshing token ...')
        },
        async checkAuth() {
            // if (!this.$state.accessToken) {
            //     console.log('No access token found, redirecting to login ...');
            //     return false;
            // }
            // // Here you would typically check the validity of the token
            // console.log('Access token is valid');
            // return true;
            console.log('Checking auth...')
        }
    },
})
