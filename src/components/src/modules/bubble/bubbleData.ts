import type { Editor } from '@tiptap/vue-3'
import { markRaw, ref } from 'vue'
import MenuItem from '../components/MenuItem.vue'
import FontSelectList from '../font/FontSelect.vue'

export function useBubbleData(editor: Editor) {
  return ref<MenuItemProps[]>([
    {
      type: 'title',
      title: '标题',
      render: markRaw(FontSelectList),
    },
    {
      icon: 'bold',
      title: '加粗',
      render: markRaw(MenuItem),
      action: () => editor?.chain().toggleBold().focus().run(),
      isActive: () => editor?.isActive('bold'),
    },
    {
      icon: 'italic',
      title: '斜体',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().toggleItalic().run(),
      isActive: () => editor?.isActive('italic'),
    },
    {
      icon: 'strikethrough',
      title: '删除线',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().toggleStrike().run(),
      isActive: () => editor?.isActive('strike'),
    },
    // {
    //   icon: 'bold',
    //   title: '合并单元格',
    //   action: () => editor?.chain().focus().mergeCells().run(),
    // },
    // {
    //   icon: 'italic',
    //   title: '拆分单元格',
    //   action: () => editor?.chain().focus().splitCell().run(),
    // },
  ])
}
