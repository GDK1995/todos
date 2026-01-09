<script setup lang="ts">
import { ref } from 'vue'
import type { TaskInfo } from '../../store/types.ts'
import { useTaskStore } from '../../pinia/taskPinia.ts'
import { TRASH, INFO_DARK } from '../../store/constants.ts'
import TaskEdit from './TaskEdit.vue'
import DeleteItem from '../delete/DeleteItem.vue'
import ModelComponent from '../../components/model/ModelComponent.vue'

const taskStore = useTaskStore()

const emits = defineEmits(['get-task-list'])

const isModal = ref(false)
const isEditModal = ref(false)
const isDeleteModal = ref(false)

const openModal = function () {
  isModal.value = true
}

const closeModal = function () {
  isModal.value = false
  isEditModal.value = false
  isDeleteModal.value = false
}

const openEditModal = function () {
    isEditModal.value = true
}

const openDeleteModal = function () {
    isDeleteModal.value = true
}

const selectTask = function (id) {
    taskStore.selectTask(id)
}

const getInfo = function (id) {
    selectTask(id)
    openModal()
    openEditModal()
}

const toDeleteTask = function (id) {
    selectTask(id)
    openModal()
    openDeleteModal()
}

const deleteTask = async function () {
    try {
        await taskStore.deleteTask()
        emits('get-task-list')
        closeModal()
        taskStore.unselectTask()
    } catch (e) {
        console.log(e)
    }
}

const formatedDate = (date) => {
    if (!date) { return '' }
    const splited = date.split('T')[0]
    const dateArr = splited.split('-')
    return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`
}
</script>

<template>
  <div class="task_list">
    <ul>
      <li>
        <p class="second">Название</p>
        <p class="third">Срок исполнения</p>
      </li>
      <li v-for="(task, index) in taskStore.tasks"
        :key="task + index"
        @click="getInfo(task.id)">
        <p class="second truncate">{{task.name}}</p>
        <p class="third">{{formatedDate(task.deadline)}}</p>
        <div class="task_list_icons">
          <div v-html="TRASH" title="Удалить" class="icon" @click.stop="toDeleteTask(task.id)"></div>
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
      <p v-else-if="isDeleteModal">Удаление</p>
    </template>
    <template #default>
      <TaskEdit v-if="isEditModal" />
      <DeleteItem
        v-else-if="isDeleteModal"
        text="Вы точно хотите удалить задачу"
        @close="closeModal"
        @confirmed="deleteTask"/>
    </template>
  </ModelComponent>
</template>