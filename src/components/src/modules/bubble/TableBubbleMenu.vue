<script lang="ts" setup>
import { inject, markRaw, ref } from 'vue'
import { editorKey } from '../../utils'
import MenuItem from '../components/MenuItem.vue'
const editor = inject(editorKey)!()
const tableBubbleData = ref<MenuItemProps[]>([
  {
    icon: 'merge-cells',
    title: '合并单元格',
    render: markRaw(MenuItem),
    action: () => editor.value.chain().focus().mergeCells().run(),
  },
  {
    icon: 'split-cells',
    title: '拆分单元格',
    render: markRaw(MenuItem),
    action: () => editor.value?.chain().focus().splitCell().run(),
  },
  {
    icon: 'mark-pen-fill',
    title: '表格背景色',
    render: markRaw(MenuItem),
    action: () => editor.value.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run(),
  },
])
</script>

<template>
  <div class="divider" />
  <MenuBar :items="tableBubbleData" :editor="editor" />
</template>

<style lang="less">
.tippy-box[data-animation='translateY'][data-state='hidden'] {
  opacity: 0;
  transform: translateY(-20px);
}

.table-bubble_menu {
  display: flex;
  background-color: #0d0d0d;
  padding: 0.2rem;
  border-radius: 0.5rem;
  color: #fff;

  .divider {
    width: 2px;
    height: 1.25rem;
    background-color: rgba(#000, 0.1);
    margin-left: 0.5rem;
    margin-right: 0.75rem;
  }
}
</style>
