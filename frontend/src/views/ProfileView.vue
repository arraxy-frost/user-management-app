<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore} from '@/stores/auth.store.ts'
import { useRouter } from 'vue-router'

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  if (!authStore.isAuthenticated) {
    console.error('User is not authenticated, redirecting to login');
    router.push('/login');
  }
})
</script>
<template>
    <div class="profile-view">
        <h1>Profile View</h1>

        <div class="profile-content">
          <div class="email">Email: {{ authStore.userData.email }}</div>
          <div class="username">Username: {{ authStore.userData.name }}</div>
          <div class="role">Role: {{ authStore.userData.Role }}</div>
        </div>
    </div>
</template>
