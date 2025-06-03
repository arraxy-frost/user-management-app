<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store.ts'

const authStore = useAuthStore();

const email = ref<string>('');
const password = ref<string>('');

onMounted(() => {
  console.log('Login view mounted')
})
</script>

<template>
  <div class="login-view">
    <form class="login-form" @submit.prevent="authStore.login(email, password)">
      <h2>Login form</h2>
      <input type="email" v-model="email" />
      <input type="password" v-model="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
  .login-view {
    text-align: center;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
    gap: 8px;
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
