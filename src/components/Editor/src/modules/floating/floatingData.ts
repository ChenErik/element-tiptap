import type { Editor } from '@tiptap/vue-3'
import { markRaw, ref } from 'vue'
import MenuItem from '../components/MenuItem.vue'
import { useTableData } from '../table/index'
export function useFloatingData(editor: Editor) {
  return ref<MenuItemProps[]>([
    useTableData(editor),
    {
      icon: 'list-unordered',
      title: '无序列表',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: () => editor?.isActive('bulletList'),
    },
    {
      icon: 'list-ordered',
      title: '有序列表',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().toggleOrderedList().run(),
      isActive: () => editor?.isActive('orderedList'),
    },
    {
      icon: 'list-check-2',
      title: '代办列表',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().toggleTaskList().run(),
      isActive: () => editor?.isActive('taskList'),
    },
    {
      icon: 'code-box-line',
      title: '代码块',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor?.isActive('codeBlock'),
    },
    {
      icon: 'double-quotes-l',
      title: '引用',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().toggleBlockquote().run(),
      isActive: () => editor?.isActive('blockquote'),
    },
    {
      icon: 'separator',
      title: '分割线',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: 'brush-line',
      title: '添加画布',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().insertContent('<div data-type="paper"></div>').run(),
    },
    {
      icon: 'image-add-line',
      title: '添加图片',
      render: markRaw(MenuItem),
      action: () => {
        const url = window.prompt('URL')
        if (url)
          return editor?.chain().focus().setImage({ src: url }).run()

        else
          return false
      },
    },
  ])
}
