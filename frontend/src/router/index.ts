import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store.ts'
import LoginViewVue from '../views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import NotFound from '@/views/NotFound.vue'
import ForbiddenError from '@/views/ForbiddenError.vue'
import DashboardView from '@/views/DashboardView.vue'
import UsersList from '@/views/UsersList.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import UserEditForm from '@/views/UserEditForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginViewVue,
    },
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          redirect: '/dashboard',
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
        },
        {
          path: 'users/:id',
          name: 'user-edit',
          component: UserEditForm,
          props: true,
          meta: {
            requiresAuth: true,
            allowedRoles: ['admin']
          }
        },
        {
          path: 'users',
          name: 'users',
          component: UsersList,
          meta: {
            requiresAuth: true,
            allowedRoles: ['admin']
          }
        },
        {
          path: 'forbidden',
          name: 'forbidden',
          component: ForbiddenError,
        },
      ],
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

  if (!authStore.userData.id) {
    console.log('User is unknown, fetching profile')
    await authStore.fetchProfile()
  }

  if (to.path === '/' || to.path === '/login') {
    return next('/dashboard')
  }

  if (to.meta.requiresAuth) {
    const allowed = to.meta.allowedRoles as string[];

    if (!allowed.includes(authStore.userData.Role)) {
      return next({ name: 'forbidden' });
    }
  }

  return next()
})

export default router
