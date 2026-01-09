<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '../../pinia/userPinia.ts'
import { useUserGroupStore } from '../../pinia/userGroupPinia.ts'

const userStore = useUserStore()
const userGroupStore = useUserGroupStore()

const selectedUsersIds = ref<number[]>([])

const selectUser = function (id) {
    if (selectedUsersIds.value.includes(id)) {
        const objIndex = selectedUsersIds.value.findIndex(ids => ids === id)
        selectedUsersIds.value.splice(objIndex, 1)
    } else {
        selectedUsersIds.value.push(id)
    }
}

const getAllUser = async function () {
    try {
        await userStore.getAllUsers()
    } catch (e) {
        console.log(e)
    }
}

const getAddedUserIds = async function () {
    try {
        await userGroupStore.getUserIdsByGroupId()
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
    selectedUsersIds.value = [...ids]
  },
  { immediate: true }
)
</script>

<template>
  <div class="user_list">
    <ul>
      <li
        v-for="(user, index) in userStore.users"
        :key="user + index"
        @click="selectUser(user.id)">
        <div class="user_list_item">
          <div class="user_list_title">
            <h4>{{user.username}}</h4>
            <p>{{user.email}}</p>
          </div>
        </div>
        <input type="checkbox" :checked="selectedUsersIds.includes(user.id)" />
      </li>
    </ul>
  </div>
</template>