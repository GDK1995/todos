<script setup lang="ts">
import { inject, ref } from 'vue'
import LoginForm from './../components/auth/LoginForm.vue'
import { useRouter } from "vue-router"
import { useAuthStore } from './../../pinia/authPinia.ts'

const router = useRouter()
const store = useAuthStore()

const error = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')

const logIn = async function () {
  error.value = ""

  try {
    await store.login({ email: email.value, password: password.value })
    router.push("/")
  } catch (e) {
    error.value = "Неверный email или пароль"
  }
}
</script>

<template>
  <form action="" class="auth_form" @submit.prevent="logIn">
    <h1>Авторизация</h1>
    <div class="auth_block">
      <div class="auth_item">
        <label for="email">Эл.почта:</label>
        <input id="email" type="email" v-model="email" required/>
      </div>
      <div class="auth_item">
        <label for="password">Пароль:</label>
        <input id="password" type="password" v-model="password" required/>
      </div>
    </div>
    <button type="submit">Войти</button>
  </form>
</template>