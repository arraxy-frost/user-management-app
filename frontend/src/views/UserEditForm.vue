<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUsersStore} from '@/stores/users.store.ts'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const email = ref('')
const name = ref('')
const role = ref('')
const roles = ['admin', 'manager', 'user']

const usersStore = useUsersStore()

const onClickUpdate = () => {
  console.log('update user', props.id, email.value, name.value, role.value)
}

onMounted(async () => {
  const fetchedUser = await usersStore.getUser(props.id)

  email.value = fetchedUser?.email
  name.value = fetchedUser?.name
  role.value = fetchedUser?.Role
})
</script>
<template>
  <div class="user-edit-form">
    <form @submit.prevent="onClickUpdate">
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
      <div class="user-edit-form__row">
        <button type="submit">Update</button>
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
  max-width: 800px;
  margin: 0 auto;
  padding: 2em;
  color: #eee;
  background: #121212;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.8);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.user-edit-form__row {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;
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
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
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
