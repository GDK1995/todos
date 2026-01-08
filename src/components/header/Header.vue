<script setup lang='ts'>
import { useAuthStore } from '../../pinia/authPinia.ts'
import { useRouter } from "vue-router"

const store = useAuthStore()
const router = useRouter()

const logOut = async function () {
  try {
    await store.logout()
    router.push("/auth/login")
  } catch (e) {
    console.log(e)
  }

}
</script>

<template>
  <header>
    <p>TODOS</p>
    <button @click="logOut">
      Выйти
    </button>
  </header>
</template>