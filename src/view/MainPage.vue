<script setup lang="ts">
import { inject, ref } from 'vue'
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

const deleteUser = function () {
  axios.delete('http://localhost:7070/user', {
      data: { delete_ids: deletedUserIds.value }
    })
    .then((response) => {
      getAllUser()
    })
}
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