<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.store.ts'

const authStore = useAuthStore()

const updateProfile = async () => {
  console.log('updateProfile')
}

onMounted(async () => {
  await authStore.fetchProfile()
})
</script>
<template>
  <div class="profile-view">
    <h1>Profile</h1>

    <form @submit.prevent="updateProfile">
      <div>id: {{ authStore.userData.id }}</div>
      Email: <input type="text" v-model="authStore.userData.email" />
      Username: <input type="text" v-model="authStore.userData.name" />
      <div>Role: {{ authStore.userData.Role }}</div>
      <button type="submit">Update profile</button>
    </form>
  </div>
</template>

<style scoped>
  .profile-view {
    width: 100%;
    height: 100%;
    padding: 2em;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  input:focus {
    border-color: #007bff;
    outline: none;
  }

  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.5s ease;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>
