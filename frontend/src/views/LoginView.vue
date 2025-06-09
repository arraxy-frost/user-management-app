<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store.ts'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isRegisterEnabled = ref<boolean>(false)
const email = ref<string>('')
const password = ref<string>('')
const error = ref<string>('')

const onClickSubmit = async () => {
 if (isRegisterEnabled.value) {
   await authStore.register(email.value, password.value)
 } else {
   await authStore.login(email.value, password.value)
 }

  if (authStore.isAuthenticated) {
    console.log('Login successful')
    await router.push('/dashboard')
  } else {
    console.log('Login failed')
    error.value = 'Login failed'

    setTimeout(() => (error.value = ''), 3000)

    email.value = ''
    password.value = ''

    return
  }
}
</script>

<template>
  <div class="login-view">
    <form class="login-form" @submit.prevent>
      <h2 v-if="isRegisterEnabled">Registration</h2>
      <h2 v-else>Login</h2>
      <input
        type="email"
        placeholder="Email"
        v-model="email"
      />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <div class="buttons">
        <button class="buttons__button-login" @click="onClickSubmit">Submit</button>
        <button class="buttons__button-register" @click="isRegisterEnabled = !isRegisterEnabled">
          <span v-if="isRegisterEnabled">login</span>
          <span v-else>register</span>
        </button>
      </div>
      <div class="errors" v-if="error">
        <p v-if="!authStore.isAuthenticated" class="error-message">
          {{ error }}
        </p>
      </div>
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
  height: 100vh;
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

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
  margin-top: 8px;
}

.buttons > button {
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.4s ease;
}

.buttons__button-login {
  background-color: #0056b3;
  padding: 8px;
  width: 100%;
  border-radius: 12px;
}

.buttons__button-login:hover {
  background-color: #007bff;
}

.buttons__button-register {
  background-color: transparent;
  border-radius: 25px;
  width: 100px;
  padding: 4px;
  font-size: 11px;
}

.buttons__button-register:hover {
  background-color: rgba(64, 64, 64, 0.75);
}

.errors {
  color: red;
}
</style>
