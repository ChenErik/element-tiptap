import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Document from '@tiptap/extension-document'
import Paper from '../modules/draw/paper'
import HighlightBlock from '../modules/highLightBlock/index'
import TableExtension from './table'
import ColorExtension from './color'
import TaskExtension from './taskList'
import CodeBlockExtension from './codeBlock'
import ImageExtension from './imageDrag'
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
    types: ['heading', 'paragraph', 'image'],
  }),
  ...TaskExtension,
  ...TableExtension,
  ...ColorExtension,
  ...ImageExtension,
  Paper,
  HighlightBlock,
]