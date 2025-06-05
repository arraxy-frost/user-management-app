<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store.ts'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
}
const redirectToPage = (page: string) => {
  router.push({ path: page })
}
</script>

<template>
  <div class="layout">
    <header class="layout__header">
      <div class="layout__header__username">Username</div>
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
          Profile
        </button>
        <button
          :class="{ selected: route.path === '/users' }"
          @click="redirectToPage('/users')"
        >
          UserList
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
}

.content {
  display: flex;
  justify-content: flex-start;
  height: 100%;
  gap: 32px;
}

.layout__nav {
  display: flex;
  flex-direction: column;
  width: 160px;
  height: 100%;
}

.layout__nav > button {
  cursor: pointer;
  background-color: transparent;
  padding: 8px;
  border: none;
  color: white;
  transition: background-color 0.4s ease;
}

.layout__nav > button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.layout__nav > button.selected {
  background-color: darkslategrey;
}

.layout__header {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 0 20px;
}

.layout__header__logout_button {
  cursor: pointer;
  display: flex;
  height: 48px;
  width: 48px;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  transition: background-color 0.4s ease;
}

.layout__header__logout_button:hover {
  background-color: darkred;
}
</style>
