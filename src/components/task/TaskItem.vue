<script setup lang='ts'>
import { computed } from 'vue'
import TaskConfig from './TaskConfig.vue'
import { useGroupStore } from '../../pinia/groupPinia.ts'

const group = computed(() => useGroupStore())
</script>

<template>
  <div class="task_block">
    <TaskConfig
      :name="group.selectedGroup?.name"/>
  </div>
</template>