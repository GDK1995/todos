<script setup lang='ts'>
import { watch, ref } from 'vue'
import TaskConfig from './TaskConfig.vue'
import TaskAdd from './TaskAdd.vue'
import TaskList from './TaskList.vue'
import TaskInfo from './TaskInfo.vue'
import EmptyComponent from '../empty/EmptyComponent.vue'
import UserAddList from '../user/UserAddList.vue'
import { useGroupStore } from '../../pinia/groupPinia.ts'
import { useTaskStore } from '../../pinia/taskPinia.ts'
import ModelComponent from '../../components/model/ModelComponent.vue'

const groupStore = useGroupStore()
const taskStore = useTaskStore()

const isModal = ref(false)
const isTaskAddModal = ref(false)
const isUserAddModal = ref(false)
const isTaskInfoModal = ref(false)
const title = ref('')

const openModal = function () {
  isModal.value = true
}

const closeModal = function () {
  isModal.value = false
  isTaskAddModal.value = false
  isUserAddModal.value = false
  isTaskInfoModal.value = false
}

const getTasks = async () => {
  try {
    await taskStore.getTaskByGroupId(groupStore.selectedGroup?.id)
  } catch (error) {
    console.error('Failed to fetch groups:', error)
  }
}

const getAllGroups = async () => {
  try {
    await groupStore.getGroups()
  } catch (error) {
    console.error('Failed to fetch groups:', error)
  }
}

const action = function(type) {
  switch (type) {
    case 'task':
      isModal.value = true
      isTaskAddModal.value = true
      title.value = 'Добавить задачу'
      break
    case 'user':
      isModal.value = true
      isUserAddModal.value = true
      title.value = 'Добавить участника'
      break
    case 'filter':
      title.value = 'Фильтр'
      break
    case 'info':
      isModal.value = true
      isTaskInfoModal.value = true
      title.value = 'Данные группы'
      break
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
    <TaskList
      v-if="taskStore.tasks?.length"
      @get-task-list="getTasks"/>
    <EmptyComponent
      v-else
      text="Нет задач"/>
  </div>
  <ModelComponent
    v-if="isModal"
    @close="closeModal">
    <template #header>
      <p>{{title}}</p>
    </template>
    <template #default>
      <TaskAdd
        v-if="isTaskAddModal"
        @get-task="getTasks"
        @close="closeModal"/>
      <UserAddList
        v-else-if="isUserAddModal"
        @close="closeModal"/>
      <TaskInfo
        v-else-if="isTaskInfoModal"
        @get-groups="getAllGroups"
        @close="closeModal"/>
    </template>
  </ModelComponent>
</template>