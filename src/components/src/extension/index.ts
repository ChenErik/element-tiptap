import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'
import TableExtension from './table'
import ColorExtension from './color'
export default [
  Typography,
  StarterKit,
  ...TableExtension,
  ...ColorExtension,
]
