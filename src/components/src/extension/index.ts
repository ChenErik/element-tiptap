import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Document from '@tiptap/extension-document'
import Paper from '../modules/draw/paper'
import TableExtension from './table'
import ColorExtension from './color'
import TaskExtension from './taskList'
import CodeBlockExtension from './codeBlock'
export default [
  Document.extend({
    content: 'heading block*',
  }),
  StarterKit.configure({
    document: false,
    codeBlock: false,
  }),
  ...CodeBlockExtension,
  Typography,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  ...TaskExtension,
  ...TableExtension,
  ...ColorExtension,
  Paper,
]
