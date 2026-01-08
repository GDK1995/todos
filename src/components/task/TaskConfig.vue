<script setup lang='ts'>
import { ADD_USER, ADD_TASK, INFO, FILTER } from '../../store/constants.ts'

const props = defineProps({
    name: String
})

const icons = [ADD_USER, ADD_TASK, FILTER, INFO]
const titles = ['Добавить участника', 'Добавить задачу', 'Фильтр', 'Данные']
</script>

<template>
  <div class="task_header">
    <h2 v-if="props.name">{{props.name}}</h2>
    <h2 v-else>Все задачи</h2>
    <ul>
      <li v-for="(icon, index) in icons"
        :key="icon + index">
        <div v-html="icon" :title="titles[index]" class="icon"></div>
      </li>
    </ul>
  </div>
</template>