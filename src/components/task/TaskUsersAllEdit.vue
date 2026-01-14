<script setup lang="ts">
import { ref } from 'vue'
import type { TaskInfo } from '../../store/types.ts'
import { useGroupStore } from '../../pinia/groupPinia.ts'
import { useTaskStore } from '../../pinia/taskPinia.ts'
import SelectItem from '../selector/SelectItem.vue'

const groupStore = useGroupStore()
const taskStore = useTaskStore()

const emits = defineEmits(['get-task', 'close'])

const task = ref<TaskInfo[]>({
  id: taskStore.selectedUsersAllTask?.id,
  name: taskStore.selectedUsersAllTask?.name || '',
  description: taskStore.selectedUsersAllTask?.description || '',
  group_id: taskStore.selectedUsersAllTask?.group_id | null,
  isDone: taskStore.selectedUsersAllTask?.isDone || false,
  deadline: taskStore.selectedUsersAllTask?.deadline || ''
})

const selectGroupId = function (id) {
  task.value.group_id = id
}

const updateTask = async function () {
  try {
    task.value.deadline = new Date(task.value.deadline).toISOString()
    await taskStore.updateTask(task.value)
    emits('get-task')
    emits('close')
  } catch(e) {
    console.log(e)
  }
}
</script>

<template>
  <form action="" @submit.prevent="updateTask" class="forms">
    <div class="form_fields">
      <label>Группа:</label>
      <SelectItem
        :options="groupStore.groupByUser"
        :selectedId="task.group_id"
        @select-item="selectGroupId"/>
    </div>
    <div class="form_fields">
      <label>Название:*</label>
      <input type="text" v-model="task.name" required/>
    </div>
    <div class="form_fields_row">
      <input type="checkbox" v-model="task.isDone" id="isDone"/>
      <label for="isDone">Выполнено</label>
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
        v-model="task.description"/>
    </div>
    <button type="submit">
      Редактировать
    </button>
  </form>
</template>