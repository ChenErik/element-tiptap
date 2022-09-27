import type { Editor } from '@tiptap/vue-3'
import { markRaw, ref } from 'vue'
// import MenuItem from '../components/MenuItem.vue'
import FontSelectList from '../font/FontSelect.vue'
import FontStyle from '../font/FontStyle.vue'
import ColorSelect from '../color/ColorSelect.vue'
export function useBubbleData(editor: Editor) {
  return ref<MenuItemProps[]>([
    {
      type: 'title',
      title: '标题',
      render: markRaw(FontSelectList),
    },
    {
      type: 'title',
      title: '字体样式',
      render: markRaw(FontStyle),
    },
    {
      icon: 'font-color',
      title: '字体颜色',
      render: markRaw(ColorSelect),
      type: 'text',
    },
    {
      icon: 'mark-pen-line',
      title: '背景高亮',
      render: markRaw(ColorSelect),
      type: 'background',
      action: () => editor?.chain().focus().toggleHighlight().run(),
      isActive: () => editor?.isActive('highlight'),
    },
  ])
}
