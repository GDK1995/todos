<script setup lang='ts'>
import { TRASH, ADD_USER, ADD_TASK, INFO, FILTER } from '../../store/constants.ts'

const props = defineProps({
    name: String
})

const emits = defineEmits(['action'])

const icons = [ADD_USER, ADD_TASK, INFO]
const types = ['user', 'task', 'info']
const titles = ['Добавить участника', 'Добавить задачу', 'Данные']

const actions = function (type) {
  emits('action', type)
}
</script>

<template>
  <div class="task_header">
    <h2 v-if="props.name">{{props.name}}</h2>
    <h2 v-else>Все задачи</h2>
    <ul>
      <li v-for="(icon, index) in icons"
        :key="icon + index">
        <div
          v-html="icon"
          v-show="props.name"
          :title="titles[index]"
          @click="actions(types[index])"
          class="icon"></div>
      </li>
    </ul>
  </div>
</template>