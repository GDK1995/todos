<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import UserItem from './../components/user/UserItem.vue'
import GroupItem from './../components/group/GroupItem.vue'
import TaskItem from './../components/task/TaskItem.vue'
import Header from './../components/header/Header.vue'

const userList = ref([])
const groupList = ref([])
const selectedUser = ref<number[]>([])
const deletedGroupIds = ref<number[]>([])
const deletedUserIds = ref<number[]>([])

const axios: any = inject('axios')

const getGroupByUser = function () {
  axios.get('http://localhost:7070/group?user_id=4')
    .then((response) => {
      console.log(response.data)
    })
}

const deleteUser = function () {
  axios.delete('http://localhost:7070/user', {
      data: { delete_ids: deletedUserIds.value }
    })
    .then((response) => {
      getAllUser()
    })
}

const addSelectedUser = function (ind) {
  if (!selectedUser.value.includes(ind)) {
    selectedUser.value.push(ind)
  }
}

onMounted(() => {
})
</script>

<template>
  <Header />
  <section class="main_item">
    <UserItem />
    <div class="main_item_block">
      <GroupItem />
      <TaskItem />
    </div>
  </section>
</template>