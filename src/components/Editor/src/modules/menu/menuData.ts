import type { Editor } from '@tiptap/vue-3'
import { markRaw, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import MenuItem from '../components/MenuItem.vue'
import FontSelectList from '../font/FontSelect.vue'
import FontStyle from '../font/FontStyle.vue'
import EmojiSelect from '../emoji/Emoji.vue'
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
      type: 'title',
      title: '字体样式',
      render: markRaw(FontStyle),
    },
    ...useColorData(editor),
    useTableData(editor),
    {
      type: 'divider',
      title: '分割线',
    },
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
      type: 'divider',
      title: '分割线',
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
      icon: 'emotion-line',
      title: 'Emoji表情',
      render: markRaw(EmojiSelect),
    },
    {
      icon: 'brush-line',
      title: '画布',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().insertContent('<div data-type="paper"></div>').run(),
    },
    {
      icon: 'lightbulb-line',
      title: '高亮块',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().setHighlightBlock().run(),
    },
    {
      icon: 'image-add-line',
      title: '图片',
      render: markRaw(MenuItem),
      action: async () => {
        const { value } = await ElMessageBox.prompt('请输入图片链接', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '关闭',
          inputPattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/,
          inputErrorMessage: '请输入正确的网址',
        })
        if (value)
          return editor?.chain().focus().setImage({ src: value }).run()

        else
          return false
      },
    },
    {
      icon: 'upload-cloud-line',
      title: '上传附件',
      render: markRaw(MenuItem),
      action: async () => {
        return editor?.chain().focus().setAttachment({ name: '文件名', size: '120kb', src: 'https://cn.vitejs.dev/logo-with-shadow.png' }).run()
      },
    },
    {
      icon: 'links-line',
      title: '链接',
      render: markRaw(MenuItem),
      isActive: () => editor?.isActive('link'),
      action: () => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null)
          return false

        // empty
        if (url === '') {
          return editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .unsetLink()
            .run()
        }

        // update link
        return editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run()
      },
    },
    {
      type: 'divider',
      title: '分割线',
    },
    {
      icon: 'text-wrap',
      title: '换行',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().setHardBreak().run(),
    },
    {
      icon: 'format-clear',
      title: '清除格式',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      type: 'divider',
      title: '分割线',
    },
    {
      icon: 'arrow-go-back-line',
      title: '撤销',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().undo().run(),
    },
    {
      icon: 'arrow-go-forward-line',
      title: '重做',
      render: markRaw(MenuItem),
      action: () => editor?.chain().focus().redo().run(),
    },
    {
      type: 'divider',
      title: '分割线',
    },
    {
      icon: 'fullscreen-line',
      activeIcon: 'fullscreen-exit-line',
      title: '全屏',
      render: markRaw(MenuItem),
    },
  ])
}
