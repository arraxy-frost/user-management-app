<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store.ts'
import { useRouter } from 'vue-router'

const authStore = useAuthStore();
const router = useRouter();

const email = ref<string>('');
const password = ref<string>('');

const login = async () => {
  await authStore.login(email.value, password.value);

  if (authStore.isAuthenticated) {
    console.log('Login successful');
    await router.push('/profile');
  }
  else {
    console.error('Login failed');
    return;
  }
};
</script>

<template>
  <div class="login-view">
    <form class="login-form" @submit.prevent="login">
      <h2>Login form</h2>
      <input type="email" v-model="email" />
      <input type="password" v-model="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
  .login-view {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: 8px;
    padding: 1em;
    box-sizing: border-box;
  }

  .login-form > input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .login-form > button {
    padding: 8px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.4s ease;
  }

  .login-form > button:hover {
    background-color: #0056b3;
  }
</style>
