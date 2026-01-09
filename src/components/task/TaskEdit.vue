<script setup lang="ts">
import { ref } from 'vue'
import type { TaskAddInfo } from '../../store/types.ts'
import { useGroupStore } from '../../pinia/groupPinia.ts'
import { useTaskStore } from '../../pinia/taskPinia.ts'

const groupStore = useGroupStore()
const taskStore = useTaskStore()

const emits = defineEmits(['get-task', 'close'])

const task = ref<TaskAddInfo[]>({
  name: '',
  description: '',
  group_id: groupStore.selectedGroup?.id | null,
  isDone: false,
  deadline: null
})

const taskAdd = async function () {
  try {
    task.value.deadline = new Date(task.value.deadline).toISOString()
    await taskStore.addTask(task.value)
    emits('get-task')
    emits('close')
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <form action="" @submit.prevent="taskAdd" class="forms">
    <div class="form_fields">
      <label>Название:*</label>
      <input type="text" v-model="taskStore.selectedTask.name" required/>
    </div>
    <div class="form_fields">
      <label>Дедлайн:*</label>
      <input
        type="date"
        v-model="task.deadline"
        @focus="$event.target.showPicker?.()"
        required/>
    </div>
    <div class="form_fields">
      <label>Описание:</label>
      <textarea
        cols="30"
        rows="10"
        v-model="taskStore.selectedTask.description"/>
    </div>
    <button type="submit">
      Добавить
    </button>
  </form>
</template>