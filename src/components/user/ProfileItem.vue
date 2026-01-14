<script setup lang='ts'>
import { ref } from 'vue'
import { useAuthStore } from '../../pinia/authPinia.ts'
import { useUserStore } from '../../pinia/userPinia.ts'

const authStore = useAuthStore()
const userStore = useUserStore()

const emits = defineEmits(['close'])

const labels = ['Username', 'Пароль']
const types = ['text', 'password']
const fields = ['username', 'password']

const user = ref({
  username: authStore.user?.username || '',
  password: ''
})

const updateUser = async function () {
  try {
    await authStore.update(user.value.username, user.value.password)
    emits('close')
  } catch(e) {
    console.log(e)
  }
}
</script>

<template>
  <form action="" @submit.prevent="updateUser" class="forms">
    <div v-for="(item, index) in fields"
      :key="item + index"
      class="form_fields">
      <label>{{labels[index]}}</label>
      <input :type="types[index]" v-model="user[item]"/>
    </div>
    <button type="submit">
      Редактировать
    </button>
  </form>
</template>