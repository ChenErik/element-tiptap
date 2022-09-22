<script lang="ts" setup>
import { inject } from 'vue'
import { FloatingMenu } from '@tiptap/vue-3'
import { editorKey } from '../../utils'
const editor = inject(editorKey)!()
</script>

<template>
  <FloatingMenu
    class="floating-menu"
    :tippy-options="{ duration: 100 }"
    :editor="editor"
  >
    <div>
      <button :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()">
        H1
      </button>
      <button :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()">
        H2
      </button>
      <button :class="{ 'is-active': editor.isActive('bulletList') }" @click="editor?.chain().focus().toggleBulletList().run()">
        Bullet List
      </button>
    </div>
  </FloatingMenu>
</template>

<style lang="less" scoped>
:deep(.floating-menu) {
  display: flex;
  background-color: #fff;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}
</style>
