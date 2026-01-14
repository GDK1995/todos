<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import type { UserInfo } from '../../store/types.ts'
import { useGroupStore } from '../../pinia/groupPinia.ts'
import { useAuthStore } from '../../pinia/authPinia.ts'
import { useUserStore } from '../../pinia/userPinia.ts'
import { useUserGroupStore } from '../../pinia/userGroupPinia.ts'
import UserList from '../user/UserList.vue'
import SkeletonBlock from '../skeleton/SkeletonBlock.vue'

const store = useGroupStore()
const storeUser = useUserStore()
const storeAuth = useAuthStore()
const storeUserGroup = useUserGroupStore()
const emits = defineEmits(['get-groups', 'close'])

const labels = ['Название']
const types = ['text']
const fields = ['name']
const userList = ref<UserInfo[]>([])
const selectedUser = ref<number[]>([])
const isLoading = ref(false)

const group = ref({
  name: ''
})

const selectUser = function (id) {
  if (selectedUser.value.includes(id)) {
    const objIndex = selectedUser.value.findIndex(ids => ids === id)
    selectedUser.value.splice(objIndex, 1)
  } else {
    selectedUser.value.push(id)
  }
}

const addCreator = function () {
  selectedUser.value.push(storeAuth.user.id)
}

const addGroup = async function () {
  try {
    const id = await store.addGroup(group.value)
    selectedUser.value.length ? addUserToGroup(id) : afterAdd()
  } catch (e) {
    console.log(e)
  }
}

const addUserToGroup = async function (id) {
  const data = {
    user_ids: selectedUser.value,
    group_id: id
  }
  try {
    await storeUserGroup.addUserToGroup(data)
    afterAdd()
  } catch (e) {
    console.log(e)
  }
}

const afterAdd = function () {
  emits('get-groups')
  emits('close')
}

const getAllUser = async function () {
  isLoading.value = true
  try {
    userList.value = await storeUser.getAllUsers()
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getAllUser()
  addCreator()
})
</script>

<template>
  <form action="" @submit.prevent="addGroup" class="forms">
    <div
      v-for="(item, index) in fields"
      :key="item + index"
      class="form_fields">
      <label>{{labels[index]}}</label>
      <input :type="types[index]" v-model="group[item]"/>
    </div>
    <div class="">
      <SkeletonBlock v-if="isLoading" />
      <UserList
        v-else
        :selected-user="selectedUser"
        @select-user="selectUser"/>
    </div>
    <button type="submit">
      Добавить
    </button>
  </form>
</template>