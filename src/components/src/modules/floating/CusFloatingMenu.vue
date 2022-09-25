<script lang="ts" setup>
import { inject } from 'vue'
import { FloatingMenu } from '@tiptap/vue-3'
import { editorKey } from '../../utils'
import { useFloatingData } from './floatingData'
const editor = inject(editorKey)!()
const floatingData = useFloatingData(editor.value)
</script>

<template>
  <FloatingMenu
    class="currency-menu"
    :tippy-options="{
      duration: 100,
      animation: 'translateY',
      theme: 'light',
    }"
    :editor="editor"
  >
    <div class="floating-menu">
      <MenuBar :items="floatingData" :editor="editor" />
    </div>
  </FloatingMenu>
</template>

<style lang="less" scoped>
:deep(.floating-menu) {
  display: flex;
  background-color: #fff;
  padding: 0.2rem;
  border-radius: 0.5rem;
}
</style>
