<script setup lang='ts'>
import { ref } from 'vue'
import { FIVE_COLOR_LIST } from '../../store/constants.ts'
import { useAuthStore } from '../../pinia/authPinia.ts'
import ModelComponent from '../../components/model/ModelComponent.vue'
import ProfileItem from './ProfileItem.vue'

const store = useAuthStore()

const isModal = ref(false)

const openModal = function () {
    isModal.value = true
}

const closeModal = function () {
    isModal.value = false
}
</script>

<template>
  <div class="user_block">
    <div class="user_block_item">
      <div
        class="user_ava"
        :class="FIVE_COLOR_LIST[0]">
        {{store.user.username[0]}}
      </div>
      <div>
        <h3>{{store.user.username}}</h3>
        <p>{{store.user.Email}}</p>
      </div>
    </div>
    <button @click="openModal">Редактировать данные</button>
    <ModelComponent
      v-if="isModal"
      @close="closeModal">
      <template #header>
        <p>Редактировать</p>
      </template>
      <template #default>
        <ProfileItem @close="closeModal" />
      </template>
    </ModelComponent>
  </div>
</template>