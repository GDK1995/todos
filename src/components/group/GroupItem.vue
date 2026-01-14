<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { useGroupStore } from '../../pinia/groupPinia.ts'
import ModelComponent from '../../components/model/ModelComponent.vue'
import GroupAdd from './GroupAdd.vue'

const groupStore = useGroupStore()

const isModal = ref(false)

const openModal = function () {
  isModal.value = true
}

const closeModal = function () {
  isModal.value = false
}

const selectGroup = function (id) {
  groupStore.selectGroup(id)
}

const unselectGroup = function () {
  groupStore.unselectGroup()
}

const getGroupsByUser = async () => {
  try {
    await groupStore.getGroupsByUserId()
  } catch (error) {
    console.error('Failed to fetch groups:', error)
  }
}


onMounted(() => {
  getGroupsByUser()
})
</script>

<template>
  <div class="group_block">
    <div class="group_block_header">
      <h3>Группы:</h3>
      <button @click="openModal">
        Добавить
      </button>
    </div>
    <div class="group_block_item">
      <ul>
        <li @click="unselectGroup">Все задачи</li>
        <li
          v-for="(groupItem, index) in groupStore.groupByUser"
          :key="groupItem+index"
          @click="selectGroup(groupItem.id)">
          {{groupItem.name}}
        </li>
      </ul>
    </div>
  </div>
  <ModelComponent
    v-if="isModal"
    @close="closeModal">
    <template #header>
      <p>Добавить группу</p>
    </template>
    <template #default>
      <GroupAdd
        @get-groups="getGroupsByUser"
        @close="closeModal"/>
    </template>
  </ModelComponent>
</template>