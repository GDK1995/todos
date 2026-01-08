<script setup lang='ts'>
import { computed, watch, ref } from 'vue'
import TaskConfig from './TaskConfig.vue'
import TaskAdd from './TaskAdd.vue'
import EmptyComponent from '../empty/EmptyComponent.vue'
import { useGroupStore } from '../../pinia/groupPinia.ts'
import { useTaskStore } from '../../pinia/taskPinia.ts'
import ModelComponent from '../../components/model/ModelComponent.vue'

const groupStore = useGroupStore()
const taskStore = useTaskStore()

const isModal = ref(false)
const isTaskAddModal = ref(false)
const title = ref('')

const openModal = function () {
  isModal.value = true
}

const closeModal = function () {
  isModal.value = false
  isTaskAddModal.value = false
}

const getTasks = async () => {
  try {
    await taskStore.getTaskByGroupId(groupStore.selectedGroup?.id)
  } catch (error) {
    console.error('Failed to fetch groups:', error)
  }
}

const action = function(type) {
  console.log(type)
  switch (type) {
    case 'task':
      isModal.value = true
      isTaskAddModal.value = true
      title.value = 'Добавить задачу'
    case 'user':
      isModal.value = true
      title.value = 'Добавить участника'
    case 'filter':
      title.value = 'Фильтр'
    case 'info':
      isModal.value = true
      title.value = 'Данные'
  }
}

watch(
  () => groupStore.selectedGroup,
  () => {
    getTasks()
  }
)
</script>

<template>
  <div class="task_block">
    <TaskConfig
      :name="groupStore.selectedGroup?.name"
      @action="action"/>
    <EmptyComponent
      text="Нет задач"/>
  </div>
  <ModelComponent
    v-if="isModal"
    @close="closeModal">
    <template #header>
      <p>{{title}}</p>
    </template>
    <template #default>
      <TaskAdd v-if="isTaskAddModal"/>
    </template>
  </ModelComponent>
</template>