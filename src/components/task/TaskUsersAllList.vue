<script setup lang="ts">
import { ref } from 'vue'
import type { TaskInfo } from '../../store/types.ts'
import { useTaskStore } from '../../pinia/taskPinia.ts'
import { TRASH, INFO_DARK } from '../../store/constants.ts'
import TaskUsersAllEdit from './TaskUsersAllEdit.vue'
import ModelComponent from '../../components/model/ModelComponent.vue'

const taskStore = useTaskStore()

const emits = defineEmits(['get-task-list'])

const isModal = ref(false)
const isEditModal = ref(false)

const openModal = function () {
  isModal.value = true
}

const closeModal = function () {
  isModal.value = false
  isEditModal.value = false
}

const openEditModal = function () {
    isEditModal.value = true
}

const selectTask = function (id) {
    taskStore.selectTask(id)
}

const getInfo = function (id) {
    selectTask(id)
    openModal()
    openEditModal()
}

const getTask = function () {
  emits('get-task-list')
}

const formatedDate = (date) => {
    if (!date) { return '' }
    const dateArr = date.split('-')
    return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`
}
</script>

<template>
  <div class="task_list">
    <ul>
      <li>
        <p class="fourth">Название</p>
        <p class="third">Срок исполнения</p>
        <p class="third">Группа</p>
      </li>
      <li v-for="(task, index) in taskStore.usersAllTasks"
        :key="task + index"
        @click="getInfo(task.id)">
        <p :class="{'crossed' : task.isDone}" class="fourth truncate_fourth">{{task.name}}</p>
        <p :class="{'crossed' : task.isDone}" class="third">{{formatedDate(task.deadline)}}</p>
        <p :class="{'crossed' : task.isDone}" class="third">{{task.group_name}}</p>
        <div class="task_list_icons">
          <div v-html="INFO_DARK" title="Посмотреть" class="icon" @click.stop="getInfo(task.id)"></div>
        </div>
      </li>
    </ul>
  </div>
  <ModelComponent
    v-if="isModal"
    @close="closeModal">
    <template #header>
      <p v-if="isEditModal">Данные</p>
    </template>
    <template #default>
      <TaskUsersAllEdit
        v-if="isEditModal"
        @get-task="getTask"
        @close="closeModal"/>
    </template>
  </ModelComponent>
</template>