<script setup lang='ts'>
import { ref } from 'vue'

const labels = ['Username', 'Пароль']
const types = ['text', 'password']
const fields = ['username', 'password']

const user = ref({
    username: '',
    password: ''
})
</script>

<template>
  <div>
    <div v-for="(item, index) in fields"
      :key="item + index">
      <label>{{labels[index]}}</label>
      <input :type="types[index]" v-model="user[item]"/>
    </div>
  </div>
</template>