<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUsersStore } from '@/stores/users.store.ts'
import UsersListRow from '@/components/UsersListRow.vue'

const usersStore = useUsersStore()
const pageNum = ref<number>(1)
const pageSize = ref<number>(10)

const onClickPrev = () => {
  if (pageNum.value > 1) {
    pageNum.value--
    updatePage()
  }
}

const onClickNext = () => {
  const totalPages = Math.ceil(usersStore.totalUsers / pageSize.value)
  if (pageNum.value < totalPages) {
    pageNum.value++
    updatePage()
  }
}

const updatePage = () => {
  usersStore.fetchUsers(pageNum.value, pageSize.value)
}

const getRowCount = () => {
  const currentRowLimit = usersStore.pageSize * usersStore.currentPage;
  return currentRowLimit > usersStore.totalUsers ? usersStore.totalUsers : currentRowLimit;
}

onMounted(() => {
  updatePage()
})
</script>

<template>
  <div class="users-list">
    <h1>Users List</h1>
    <div class="users-list__content">
      <UsersListRow
        v-for="user in usersStore.users"
        :key="user.id"
        :id="user.id"
        :email="user.email"
        :username="user.name"
        :role="user.Role"
      />
    </div>
    <div class="users-list__controls">
      <button @click="onClickPrev">Prev</button>
      <div>{{ getRowCount() }} / {{ usersStore.totalUsers }}</div>
      <button @click="onClickNext">Next</button>
    </div>
  </div>
</template>

<style scoped>
.users-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 32px 16px;
  gap: 16px;
  box-sizing: border-box;
  background-color: #121212;
}

.users-list__content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}

h1 {
  color: white;
}

.users-list__controls {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px;
  gap: 16px;
  box-sizing: border-box;
}
</style>
