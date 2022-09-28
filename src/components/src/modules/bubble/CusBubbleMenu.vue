<script lang="ts" setup>
import { inject } from 'vue'
import { BubbleMenu } from '@tiptap/vue-3'
import { editorKey } from '../../utils'
import MenuBar from '../menu/MenuBar.vue'
import TableBubbleMenu from './TableBubbleMenu.vue'
import { useBubbleData } from './bubbleData'
const editor = inject(editorKey)!()
const getBody = () => document.body// 防止tippy报警
const bubbleData = useBubbleData(editor.value)
</script>

<template>
  <BubbleMenu
    v-if="!editor?.isActive('paper')"
    class="currency-bubble"
    :tippy-options="{
      duration: 100,
      animation: 'translateY',
      appendTo: getBody,
      theme: 'light',
    }"
    :editor="editor"
    plugin-key="currency-bubble"
  >
    <div class="bubble-menu">
      <MenuBar :items="bubbleData" :editor="editor" />
      <TableBubbleMenu v-if="editor?.isActive('table')" />
    </div>
  </BubbleMenu>
</template>

<style lang="less" scoped>
.bubble-menu {
  display: flex;
  background-color: #fff;
  padding: 0.2rem;
  border-radius: 0.5rem;
  height: 1.8rem;
}
</style>
