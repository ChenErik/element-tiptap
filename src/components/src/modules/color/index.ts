import type { Editor } from '@tiptap/vue-3'
import { markRaw } from 'vue'
import ColorSelect from '../color/ColorSelect.vue'

export function useColorData(editor: Editor) {
  return [
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
  ]
}
