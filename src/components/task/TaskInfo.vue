<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserGroupStore } from '../../pinia/userGroupPinia.ts'
import { useGroupStore } from '../../pinia/groupPinia.ts'
import { TRASH } from '../../store/constants.ts'
import ModelComponent from '../../components/model/ModelComponent.vue'
import DeleteItem from '../delete/DeleteItem.vue'

const groupUserStore = useUserGroupStore()
const groupStore = useGroupStore()

const emits = defineEmits(['close', 'get-groups'])
const isModal = ref(false)
const title = ref('')

const openModal = function () {
  isModal.value = true
  title.value = 'Удалить группу'
}

const closeModal = function () {
  isModal.value = false
}

const getGroupUsers = async function () {
    try {
      await groupUserStore.getUserByGroupId()
    } catch (e) {
      console.log(e)
    }
}

const deleteGroup = async function () {
    try {
      await groupStore.deleteGroup()
      groupStore.unselectGroup()
      emits('close')
      emits('get-groups')
    } catch (e) {
      console.log(e)
    }
}

onMounted(() => {
    getGroupUsers()
})
</script>

<template>
  <div class="task_info">
    <div class="task_info_members">
      <h4>Участники:</h4>
      <ul>
        <li v-for="(user, index) in groupUserStore.groupUsers">
          <div>
            <h4>{{user.username}}</h4>
            <p>{{user.email}}</p>
          </div>
          <button>
            <div v-html="TRASH"></div>
          </button>
        </li>
      </ul>
    </div>
    <button @click="openModal" class="task_info_bttn">
      Удалить группу
    </button>
  </div>
  <ModelComponent
    v-if="isModal"
    @close="closeModal">
    <template #header>
      <p>{{title}}</p>
    </template>
    <template #default>
      <DeleteItem
        text="Вы точно хотите удалить группу"
        @close="closeModal"
        @confirmed="deleteGroup"/>
    </template>
  </ModelComponent>
</template>