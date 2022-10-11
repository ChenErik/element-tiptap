import { VueNodeViewRenderer } from '@tiptap/vue-3'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { lowlight } from 'lowlight'

import CodeBlock from '../modules/code/CodeBlock.vue'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

export default [
  CodeBlockLowlight.extend({
    addNodeView() {
      return VueNodeViewRenderer(CodeBlock)
    },
  }).configure({ lowlight }),
]
