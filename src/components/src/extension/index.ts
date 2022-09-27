import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import TableExtension from './table'
import ColorExtension from './color'
import TaskExtension from './taskList'
export default [
  Typography,
  StarterKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  ...TaskExtension,
  ...TableExtension,
  ...ColorExtension,
]
