import type { Editor } from '@tiptap/vue-3'
import { markRaw } from 'vue'
import IconDropdown from '../components/IconDropdown.vue'

export function useTableData(editor: Editor) {
  return {
    icon: 'table-line',
    title: '表格',
    render: markRaw(IconDropdown),
    list: [
      {
        title: '插入表格',
        action: () => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
      },
      {
        title: '前面添加列',
        divided: true,
        action: () => editor?.chain().focus().addColumnBefore().run(),
        disabled: () => !editor?.can().addColumnBefore(),
      },
      {
        title: '后面添加列',
        action: () => editor?.chain().focus().addColumnAfter().run(),
        disabled: () => !editor?.can().addColumnAfter(),
      },
      {
        title: '删除列',
        action: () => editor?.chain().focus().deleteColumn().run(),
        disabled: () => !editor?.can().deleteColumn(),
      },
      {
        title: '前面添加行',
        divided: true,
        action: () => editor?.chain().focus().addRowBefore().run(),
        disabled: () => !editor?.can().addRowBefore(),
      },
      {
        title: '后面添加行',
        action: () => editor?.chain().focus().addRowAfter().run(),
        disabled: () => !editor?.can().addRowAfter(),
      },
      {
        title: '删除行',
        action: () => editor?.chain().focus().deleteRow().run(),
        disabled: () => !editor?.can().deleteRow(),
      },
      {
        title: '合并单元格',
        divided: true,
        action: () => editor?.chain().focus().mergeCells().run(),
        disabled: () => !editor?.can().mergeCells(),
      },
      {
        title: '拆分单元格',
        action: () => editor?.chain().focus().splitCell().run(),
        disabled: () => !editor?.can().splitCell(),
      },
      {
        title: '删除表格',
        divided: true,
        action: () => editor?.chain().focus().deleteTable().run(),
        disabled: () => !editor?.can().deleteTable(),
      },
    ],
  }
}
