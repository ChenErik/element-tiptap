import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Document from '@tiptap/extension-document'
import Link from '@tiptap/extension-link'
import Paper from '../modules/draw/paper'
import HighlightBlock from '../modules/highLightBlock/index'
import TableExtension from './table'
import ColorExtension from './color'
import TaskExtension from './taskList'
import CodeBlockExtension from './codeBlock'
import ImageExtension from './imageDrag'
import { EventHandler } from './paste'
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
  Link.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        color: {
          default: null,
          // Take the attribute values
          renderHTML: (_attributes) => {
            // … and return an object with HTML attributes.
            return {
              style: 'color: #1890ff',
            }
          },
        },
      }
    },
  }),
  ...TaskExtension,
  ...TableExtension,
  ...ColorExtension,
  ...ImageExtension,
  Paper,
  HighlightBlock,
  EventHandler,
]
