<script setup lang='ts'>
import { FOLDER } from '../../store/constants.ts'

const props = defineProps({
    text: String
})
</script>

<template>
  <div class="empty_block">
    <div v-html="FOLDER" class="empty_icon"></div>
    <p class="empty_text">{{props.text}}</p>
  </div>
</template>