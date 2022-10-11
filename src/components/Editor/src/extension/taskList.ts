import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
export default [
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
]
