import type { Editor } from '@tiptap/vue-3'
import { markRaw, ref } from 'vue'
import MenuItem from '../components/MenuItem.vue'
import FontSelectList from '../font/FontSelect.vue'
import { useTableData } from '../table/index'
import { useColorData } from '../color/index'
export function useMenuData(editor: Editor) {
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
    {
      icon: 'code-view',
      title: '行内代码',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().toggleCode().run(),
      isActive: () => editor?.isActive('code'),
    },
    ...useColorData(editor),
    useTableData(editor),
    {
      type: 'divider',
      title: '分割线',
    },
    {
      icon: 'list-unordered',
      title: 'Bullet List',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: () => editor?.isActive('bulletList'),
    },
    {
      icon: 'list-ordered',
      title: 'Ordered List',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().toggleOrderedList().run(),
      isActive: () => editor?.isActive('orderedList'),
    },
    // {
    //   icon: 'list-check-2',
    //   title: 'Task List',
    //   render: markRaw(MenuItem),
    //   action: () => editor?.chain().focus().toggleTaskList().run(),
    //   isActive: () => editor?.isActive('taskList'),
    // },
    {
      icon: 'code-box-line',
      title: 'Code Block',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor?.isActive('codeBlock'),
    },
    {
      type: 'divider',
      title: '分割线',
    },
    {
      icon: 'double-quotes-l',
      title: 'Blockquote',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().toggleBlockquote().run(),
      isActive: () => editor?.isActive('blockquote'),
    },
    {
      icon: 'separator',
      title: 'Horizontal Rule',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().setHorizontalRule().run(),
    },
    {
      type: 'divider',
      title: '分割线',
    },
    {
      icon: 'text-wrap',
      title: 'Hard Break',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().setHardBreak().run(),
    },
    {
      icon: 'format-clear',
      title: 'Clear Format',
      render: markRaw(MenuItem),
      action: () => editor?.chain()
        .focus()
        .clearNodes()
        .unsetAllMarks()
        .run(),
    },
    {
      type: 'divider',
      title: '分割线',
    },
    {
      icon: 'arrow-go-back-line',
      title: 'Undo',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().undo().run(),
    },
    {
      icon: 'arrow-go-forward-line',
      title: 'Redo',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().redo().run(),
    }])
}
