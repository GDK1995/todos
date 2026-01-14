<script setup lang="ts">
import UserItem from './../components/user/UserItem.vue'
import GroupItem from './../components/group/GroupItem.vue'
import TaskItem from './../components/task/TaskItem.vue'
import Header from './../components/header/Header.vue'
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