<script setup lang='ts'>
import { onMounted, ref, watch, computed } from 'vue'
import { useUserStore } from '../../pinia/userPinia.ts'

const userStore = useUserStore()

const props = defineProps({
  selectedUser: Array
})
const emits = defineEmits(['select-user'])

const search = ref('')

const selectUser = function (id) {
  emits('select-user', id)
}

const filteredUser = computed(() => userStore.users.filter(elem => elem.username.toLowerCase().includes(search.value.toLowerCase())))
</script>

<template>
  <div class="list_block">
    <input
      type="search"
      v-model="search"
      placeholder="Поиск..."/>
    <div class="user_list">
      <ul>
        <li
          v-for="(user, index) in filteredUser"
          :key="user + index"
          @click="selectUser(user.id)">
          <div class="user_list_item">
            <div class="user_list_title">
              <h4>{{user.username}}</h4>
              <p>{{user.email}}</p>
            </div>
          </div>
          <input type="checkbox" :checked="props.selectedUser.includes(user.id)" />
        </li>
      </ul>
    </div>
  </div>
</template>