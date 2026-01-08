<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import type { UserInfo } from '../../store/types.ts'
import { useGroupStore } from '../../pinia/groupPinia.ts'
import { useUserStore } from '../../pinia/userPinia.ts'
import { useUserGroupStore } from '../../pinia/userGroupPinia.ts'

const store = useGroupStore()
const storeUser = useUserStore()
const storeUserGroup = useUserGroupStore()
const emits = defineEmits(['get-groups', 'close'])

const labels = ['Название']
const types = ['text']
const fields = ['name']
const userList = ref<UserInfo[]>([])
const selectedUser = ref<number[]>([])

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
  try {
    userList.value = await storeUser.getAllUsers()
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  getAllUser()
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
    <div class="form_check">
      <ul>
        <li
          v-for="(user, index) in userList"
          :key="user + index"
          @click="selectUser(user.id)">
          <div class="form_check_list">
            <h4>{{user.username}}</h4>
            <p>{{user.email}}</p>
          </div>
          <input
            type="checkbox"
            :checked="selectedUser.includes(user.id)"/>
        </li>
      </ul>
    </div>
    <button type="submit">
      Добавить
    </button>
  </form>
</template>