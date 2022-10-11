import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import { ColorHighlighter } from './colorHighlighter'
export default [
  Highlight.configure({ multicolor: true }),
  TextStyle,
  Color.configure({ types: ['textStyle'] }),
  ColorHighlighter,
]
