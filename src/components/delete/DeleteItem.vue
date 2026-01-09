<script setup lang="ts">
const props = defineProps({
    text: String
})

const emits = defineEmits(['close', 'confirmed'])

const close = function () {
    emits('close')
}

const confirm = function () {
    emits('confirmed')
}
</script>

<template>
  <div class="delete_item">
    <p class="delete_item_text">{{props.text}}?</p>
    <div class="delete_item_bttns">
      <button class="danger" @click="confirm">
        Да, удалить
      </button>
      <button @click="close">
        Нет, оставить
      </button>
    </div>
  </div>
</template>