<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store.ts'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const logout = async () => {
  console.log('logout')
  await authStore.logout()
  await router.push('/login')
}
const redirectToPage = (page: string) => {
  router.push({ path: page })
}
</script>

<template>
  <div class="layout">
    <header class="layout__header">
      <div class="layout__header__username">
        <h3>{{ authStore.userData.name }}</h3>
        <h6>{{ authStore.userData.email }}</h6>
      </div>
      <button class="layout__header__logout_button" @click="logout">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H9m4 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
        </svg>
      </button>
    </header>
    <main class="content">
      <nav class="layout__nav">
        <button
          :class="{ selected: route.path === '/profile' }"
          @click="redirectToPage('/profile')"
        >
          My profile
        </button>
        <button
          v-if="authStore.userData.role === 'admin'"
          :class="{ selected: route.path.includes('/users') }"
          @click="redirectToPage('/users')"
        >
          List of users
        </button>
      </nav>
      <router-view />
    </main>
    <footer class="layout__footer"></footer>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  color: #eee;
}

.content {
  display: flex;
  justify-content: flex-start;
  height: 100%;
  box-sizing: border-box;
}

.layout__nav {
  display: flex;
  user-select: none;
  flex-direction: column;
  padding: 1em;
  height: 100%;
  border-radius: 8px;
  gap: 8px;
}

.layout__nav > button {
  cursor: pointer;
  background-color: #2a2a2a;
  padding: 12px 16px;
  border: none;
  min-width: 144px;
  border-radius: 8px;
  color: #eee;
  text-align: center;
  font-size: 15px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.layout__nav > button:hover {
  background-color: #3a3a3a;
  box-shadow: 0 0 4px #007bff88;
}

.layout__nav > button.selected {
  background-color: #007bff33;
  color: #61dafb;
  box-shadow: inset 0 0 0 1px #007bff88;
}

.layout__header {
  user-select: none;
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 0 24px;
  box-sizing: border-box;
  background-color: #1e1e1e;
}

.layout__header__username {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

.layout__header__username > h3 {
  color: #eee;
  font-size: 16px;
  margin: 0;
}

.layout__header__username > h6 {
  color: #aaa;
  font-size: 13px;
  margin: 0;
}

.layout__header__logout_button {
  cursor: pointer;
  display: flex;
  height: 44px;
  width: 44px;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background-color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.layout__header__logout_button:hover {
  background-color: indianred;
}

.layout__footer {
  height: 24px;
}
</style>
