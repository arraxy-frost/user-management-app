<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store.ts'

const authStore = useAuthStore()

const username = ref('')
const email = ref('')
const password = ref('')

const updateProfile = async () => {
  await authStore.updateProfile(username.value, email.value, password.value)
  await authStore.fetchProfile()
}

onMounted(async () => {
  await authStore.fetchProfile()

  username.value = authStore.userData.name
  email.value = authStore.userData.email
})
</script>
<template>
  <div class="profile-view">
    <h1>Profile</h1>

    <form @submit.prevent="updateProfile()">
      <div class="profile-view__row">
        <div class="profile-view__row_title">Id:</div>
        <div class="profile-view__row_text">{{ authStore.userData.id }}</div>
      </div>
      <div class="profile-view__row">
        <div class="profile-view__row_title">Email:</div>
        <input
          class="profile-view__row_input"
          type="email"
          v-model="email"
        />
      </div>
      <div class="profile-view__row">
        <div class="profile-view__row_title">Username:</div>
        <input
          class="profile-view__row_input"
          type="text"
          v-model="username"
        />
      </div>
      <div class="profile-view__row">
        <div class="profile-view__row_title">New password:</div>
        <input
          class="profile-view__row_input"
          type="password"
          v-model="password"
        />
      </div>
      <div class="profile-view__row">
        <div class="profile-view__row_title">Role:</div>
        <div class="profile-view__row_text">{{ authStore.userData.role }}</div>
      </div>
      <div class="profile-view__row" style="display: flex; justify-content: center;">
        <button type="submit">Update profile</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.profile-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2em;
  color: white;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
  padding: 12px 20px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: background-color 0.3s ease;
  align-self: flex-start;
}

button:hover {
  background-color: #0056b3;

}

.profile-view__row {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1024px;
  gap: 12px;
}

.profile-view__row_title {
  font-weight: bold;
  min-width: 128px;
}

.profile-view__row_text {
  flex: 1;
}
</style>
