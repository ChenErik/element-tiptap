<script setup lang="ts">
import type { JSONContent } from '@tiptap/vue-3'
import { onBeforeUnmount, provide, ref, watch } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
/* 扩展 */
import extensions from './extension/index'
/* 扩展 */
/* 顶部菜单 */
import MenuBar from './modules/menu/MenuBar.vue'
/* 选中菜单 */
import CusBubbleMenu from './modules/bubble/CusBubbleMenu.vue'
/* 新增行菜单 */
import CusFloatingMenu from './modules/floating/CusFloatingMenu.vue'
/* 向下注入editor的key */
import { editorKey } from './utils/index'
import { useMenuData } from './modules/menu/menuData'
interface Props {
  html?: string
  json?: JSONContent
  type?: 'json' | 'html'
}

const props = withDefaults(defineProps<Props>(), {
  html: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  json: () => ({
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'I’m running Tiptap with Vue.js. 🎉',
          },
        ],
      },
    ],
  }),
  type: 'html',
})
const emit = defineEmits(['update:html', 'update:json'])
const isFullScreen = ref<boolean>(false)
/* 创建编辑器 */
const menuData = ref<MenuItemProps[]>([])
const editor = useEditor({
  content: props.html,
  extensions,
  onCreate() {
    // The editor is ready.
    menuData.value = useMenuData(editor.value!).value
  },
  onUpdate: () => {
    if (props.type === 'html')
      emit('update:html', editor.value?.getHTML())

    else
      emit('update:json', editor.value?.getJSON())
  },
})
/* 获取菜单数据 */

/* 向下注入editor对象 */
provide(editorKey, () => editor)
/* 监听传进来的初始值变化 */
watch([() => props.html, () => props.json], (n, o) => {
  const [htmlNew, jsonNew] = n
  const isSame = props.type === 'html'
    ? editor.value?.getHTML() === htmlNew
    : JSON.stringify(editor.value?.getJSON()) === JSON.stringify(jsonNew)
  if (isSame)
    return
  editor.value?.commands.setContent(props.type === 'html' ? htmlNew : jsonNew, false)
})
onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<script lang="ts">
export default {
  name: 'TipEditor',
}
</script>

<template>
  <div v-if="editor" class="element-tiptap" :class="{ 'element-tiptap_fullscreen': isFullScreen }">
    <CusBubbleMenu />
    <CusFloatingMenu />
    <MenuBar class="element-tiptap_header" :items="menuData" :is-full-screen="isFullScreen" @full-screen="(value) => isFullScreen = value" />
    <EditorContent class="element-tiptap_content" :editor="editor" />
  </div>
</template>

<style>
@import 'tippy.js/dist/tippy.css';
@import 'tippy.js/animations/perspective-extreme.css';
@import './style/tibby.css';
</style>

<style lang="less">
@import './style/editor.less';

.element-tiptap {
  display: flex;
  flex-direction: column;
  color: #0d0d0d;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex-grow: 1;

  &_header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-bottom: 1px solid #ccc;
  }

  &_content {
    padding: 0.7rem 0.5rem;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .ProseMirror .is-empty:before {
    content: attr(data-placeholder);
    float: left;
    color: #ced4da;
    pointer-events: none;
    height: 0;
  }

  &_fullscreen {
    border-radius: 0 !important;
    bottom: 0 !important;
    height: 100% !important;
    left: 0 !important;
    margin: 0 !important;
    position: fixed !important;
    right: 0 !important;
    top: 0 !important;
    width: 100% !important;
    z-index: 500;
  }
}
</style>
