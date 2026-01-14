<script setup lang='ts'>
import { ref, computed } from 'vue'
import { ARROW } from '../../store/constants.ts'

const props = defineProps({
    options: Array,
    selectedId: Number
})
const emits = defineEmits(['select-item'])

const search = ref('')
const isOpened = ref(false)

const toggleOptionList = function () {
  isOpened.value = !isOpened.value
}

const selectItem = function(obj) {
    emits('select-item', obj.id)
    toggleOptionList()
}

const selectedObj = computed(() => props.options.find(elem => elem.id === props.selectedId))
const filtered = computed(() => props.options.filter(elem => elem.name.toLowerCase().includes(search.value.toLowerCase())))
</script>

<template>
  <div class="selector">
    <div @click="toggleOptionList" class="selector_item">
      <label>
        {{selectedObj?.name}}
      </label>
      <div
        class="selector_icon"
        :class="{'open': isOpened}"
        v-html="ARROW"></div>
    </div>
    <div v-show="isOpened" class="selector_list">
      <input
        type="search"
        v-model="search"
        class="selector_search"
        placeholder="Поиск..."/>
      <ul class="selector_option">
        <li
          v-for="(option, index) in filtered"
          :key="option + index"
          @click="selectItem(option)">
          {{option.name}}
        </li>
      </ul>
    </div>
  </div>
</template>