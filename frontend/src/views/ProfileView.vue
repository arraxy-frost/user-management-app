<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store.ts'

const authStore = useAuthStore()

const username = ref('')
const email = ref('')

const updateProfile = async () => {
  await authStore.updateProfile({
    name: username.value,
    email: email.value,
  })
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
          style="color: white; border: none"
          disabled
          type="text"
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
        <div class="profile-view__row_title">Role:</div>
        <div class="profile-view__row_text">{{ authStore.userData.Role }}</div>
      </div>
      <button type="submit">Update profile</button>
    </form>
  </div>
</template>

<style scoped>
.profile-view {
  width: 100%;
  height: 100%;
  padding: 2em;
  color: white;
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

.profile-view__row {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1024px;
  gap: 12px;
}

.profile-view__row_title {
  font-weight: bold;
  min-width: 96px;
}

.profile-view__row_text {
  flex: 1;
}
</style>
