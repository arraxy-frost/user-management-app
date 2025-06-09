<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUsersStore } from '@/stores/users.store.ts'
import { useAuthStore} from '@/stores/auth.store.ts'
import { updateUser, deleteUser } from '@/api/users.ts'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const email = ref('')
const name = ref('')
const role = ref('')
const roles = ['admin', 'manager']
const router = useRouter()

const requestStatus = ref('')

const usersStore = useUsersStore()
const authStore = useAuthStore()

const onClickUpdate = async () => {
  const response = await updateUser(props.id, {
    email: email.value,
    name: name.value,
    role: role.value,
  })

  requestStatus.value = response ? 'User updated successfully' : 'Failed to update user'

  setTimeout(() => {
    requestStatus.value = ''
  }, 3000)
}

const onClickDelete = async () => {
  if (authStore.userData.id === props.id) {
    requestStatus.value = 'You cannot delete your own account'
    setTimeout(() => requestStatus.value = '', 1000)
    return
  }

  const response = await deleteUser(props.id)

  requestStatus.value = response ? 'User deleted successfully' : 'Failed to delete user'

  setTimeout(async () => {
    requestStatus.value = '';
    await router.push('/users');
  }, 1000)
}

onMounted(async () => {
  const fetchedUser = await usersStore.getUser(props.id)

  email.value = fetchedUser?.email
  name.value = fetchedUser?.name
  role.value = fetchedUser?.role
})
</script>
<template>
  <div class="user-edit-form">
    <h1>Edit user</h1>
    <form @submit.prevent>
      <div class="user-edit-form__row">
        <div class="user-edit-form__row_title">ID:</div>
        {{ $props.id }}
      </div>
      <div class="user-edit-form__row">
        <div class="user-edit-form__row_title">Email:</div>
        <input type="text" placeholder="email" v-model="email" />
      </div>
      <div class="user-edit-form__row">
        <div class="user-edit-form__row_title">Name:</div>
        <input type="text" placeholder="name" v-model="name" />
      </div>
      <div class="user-edit-form__row">
        <div class="user-edit-form__row_title">Role:</div>
        <select id="fruit-select" v-model="role">
          <option v-for="role in roles" :key="role" :value="role">
            {{ role }}
          </option>
        </select>
      </div>
      <div class="user-edit-form__row" style="display: flex; justify-content: center">
        <button class="user-edit-form__buttons-update" type="submit" @click="onClickUpdate">
          Update
        </button>
        <button
          class="user-edit-form__buttons-delete"
          :class="{ unavailable: authStore.userData.id === $props.id }"
          type="submit" @click="onClickDelete"
        >
          Delete
        </button>
      </div>
      <div class="user-edit-form__row__status" style="text-align: center">
        {{ requestStatus }}
      </div>
    </form>
  </div>
</template>
<style scoped>
.user-edit-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 2em;
  gap: 2em;
  color: #eee;
  border-radius: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #121212;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1024px;
}

.user-edit-form__row {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;
}

.user-edit-form__buttons-update {
  background-color: #4a90e2;
}

.user-edit-form__buttons-delete {
  background-color: #e74c3c;
}

.user-edit-form__buttons-delete.unavailable,
.user-edit-form__buttons-delete.unavailable:hover {
  background-color: #555;
  cursor: not-allowed;
}

.user-edit-form__buttons-delete:hover {
  background-color: #c0392b;
}

.user-edit-form__row_title {
  font-weight: bold;
  font-size: 1.25em;
  min-width: 100px;
  color: #eee;
}

input,
select {
  flex: 1;
  padding: 10px 14px;
  font-size: 16px;
  border: 2px solid #444;
  border-radius: 6px;
  background-color: #222;
  color: #eee;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  font-family: inherit;
  cursor: text;
}

input::placeholder {
  color: #777;
}

input:focus,
select:focus {
  border-color: #4a90e2;
  outline: none;
  box-shadow: 0 0 8px rgba(74, 144, 226, 0.7);
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg fill='%23bbb' height='12' viewBox='0 0 24 24' width='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 12px;
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
  background-color: #357abd;
}
</style>
