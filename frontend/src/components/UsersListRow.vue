<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const onRowClick = (userId: string) => {
  console.log(userId);

  router.push({
    path: `/users/${userId}`,
  })
}
</script>

<template>
  <div class="users-list-row" @click="onRowClick($props.id)">
    <h6 class="id">{{ $props.id }}</h6>
    <div class="email">Email: {{ $props.email }}</div>
    <div class="username">Name: {{ $props.username }}</div>
    <div class="role">Role: {{ $props.role }}</div>
  </div>
</template>

<style scoped>
.users-list-row {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  background-color: #1e1e1e;
  color: #eee;

  box-sizing: border-box;
  padding: 12px 16px;
  border-radius: 8px;
  user-select: none;

  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: inset 0 0 0 1px #333;
}

.users-list-row:hover {
  background-color: #2a2a2a;
  box-shadow: 0 0 8px #007bff88;
}

.users-list-row .id {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 6px;
  color: #61dafb;
}

.users-list-row .email,
.users-list-row .username {
  font-size: 13px;
  margin-bottom: 4px;
  color: #eee;
  font-weight: 500;
}

.users-list-row .role {
  font-style: italic;
  color: #aaa;
}

</style>
