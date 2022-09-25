import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'
import TableExtension from './table'
import ColorExtension from './color'
import TaskExtension from './taskList'
export default [
  Typography,
  StarterKit,
  ...TaskExtension,
  ...TableExtension,
  ...ColorExtension,
]
