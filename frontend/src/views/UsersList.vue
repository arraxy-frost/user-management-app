<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useUsersStore } from '@/stores/users.store.ts'


  const usersStore = useUsersStore()

  onMounted(() => {
    usersStore.fetchUsers()
  })
</script>

<template>
  <div class="users-list">
    <div class="users-list__row" v-for="user in usersStore.users" :key="user.id">
      <div class="users-list__row__name">
        {{ user.id }}: {{ user.name }}: {{ user.email }}: {{ user.Role }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
