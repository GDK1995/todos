<script setup lang="ts">
import { ref } from 'vue'
import type { TaskAddInfo } from '../../store/types.ts'

const task = ref<TaskAddInfo[]>({
  name: '',
  description: '',
  group_id: null,
  isDone: false,
  deadline: null
})
</script>

<template>
  <div>
    <div
      class="form_fields">
      <label>Название:</label>
      <input type="text" v-model="task.name"/>
    </div>
  </div>
</template>