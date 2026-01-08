<script setup lang='ts'>
import { CLOSE } from '../../store/constants.ts'

const emits = defineEmits(['close'])

const close = function () {
    emits('close')
}
</script>

<template>
  <div class="modal-overlay" @click.self="close">
  <div class="modal">
    <div class="modal-header">
      <slot name="header"></slot>
      <div
        v-html="CLOSE"
        class="modal-close"
        @click="close"></div>
    </div>
    <div class="modal-body">
      <slot></slot>
    </div>
  </div>
</div>
</template>