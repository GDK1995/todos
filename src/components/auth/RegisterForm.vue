<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './../../pinia/authPinia.ts'

const router = useRouter()
const store = useAuthStore()

const error = ref<string>('')
const username = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')

const reg = async function () {
  error.value = ''

  try {
    await store.register({ username: username.value, email: email.value, password: password.value })
    router.push('/auth/confirm')
  } catch (e) {
    error.value = e
    console.log(error.value)
  }
}
</script>

<template>
  <form action="" class="auth_form" @submit.prevent="reg">
    <h1>Регистрация</h1>
    <div class="auth_block">
      <div class="auth_item">
        <label for="username">Username:</label>
        <input id="username" type="username" v-model="username" required/>
      </div>
      <div class="auth_item">
        <label for="email">Эл.почта:</label>
        <input id="email" type="email" v-model="email" required/>
      </div>
      <div class="auth_item">
        <label for="password">Пароль:</label>
        <input id="password" type="password" v-model="password" required/>
      </div>
    </div>
    <button type="submit">Зарегистрировать</button>
  </form>
</template>