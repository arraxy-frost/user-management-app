import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store.ts'
import LoginViewVue from '../views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import NotFound from '@/views/NotFound.vue'
import DashboardView from '@/views/DashboardView.vue'
import UsersList from '@/views/UsersList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginViewVue,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/users',
      name: 'users',
      component: UsersList,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  console.log('Router: BeforeEach hook triggered')

  await authStore.checkAuth()

  if (!authStore.isAuthenticated) {
    console.log('User is not authenticated, trying to refresh tokens')
    await authStore.refreshTokens()

    if (!authStore.isAuthenticated) {
      console.log('User is not authenticated, redirecting to login')

      if (to.path !== '/login') {
        return next('/login')
      }

      return next()
    } else {
      console.log('User is authenticated after refresh')
    }
  }

  if (to.path === '/' || to.path === '/login') {
    return next('/dashboard')
  }

  return next()
})

export default router
