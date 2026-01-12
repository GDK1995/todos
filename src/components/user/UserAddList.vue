<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import UserList from './UserList.vue'
import { useUserStore } from '../../pinia/userPinia.ts'
import { useGroupStore } from '../../pinia/groupPinia'
import { useUserGroupStore } from '../../pinia/userGroupPinia.ts'

const userStore = useUserStore()
const groupStore = useGroupStore()
const userGroupStore = useUserGroupStore()

const emits = defineEmits(['close'])

const selectedUserIds = ref([])

const addToSelectedUser = function(id) {
  if (selectedUserIds.value.includes(id)) {
    const objIndex = selectedUserIds.value.findIndex(ids => ids === id)
    selectedUserIds.value.splice(objIndex, 1)
  } else {
    selectedUserIds.value.push(id)
  }
}

const getAddedUserIds = async function () {
  try {
    await userGroupStore.getUserIdsByGroupId()
  } catch (e) {
    console.log(e)
  }
}

const getAllUser = async function () {
  try {
    await userStore.getAllUsers()
  } catch (e) {
    console.log(e)
  }
}

const addUsersToGroup = async function() {
  try {
    await userGroupStore.addUserToGroup({ user_ids: selectedUserIds.value, group_id: groupStore.selectedGroupId })
    emits('close')
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  getAllUser()
  getAddedUserIds()
})

watch(
  () => userGroupStore.groupUsersIds,
  (ids) => {
    selectedUserIds.value = [...ids]
  },
  { immediate: true }
)
</script>

<template>
  <div class="user_lists">
    <UserList
      :selected-user="selectedUserIds"
      @select-user="addToSelectedUser"/>
    <button @click="addUsersToGroup">
      Добавить
    </button>
  </div>
</template>