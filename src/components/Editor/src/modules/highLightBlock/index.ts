import type { CommandProps } from '@tiptap/vue-3'
import { Node, VueNodeViewRenderer, mergeAttributes } from '@tiptap/vue-3'

import HighLightBlock from './HighLightBlock.vue'

export default Node.create({
  name: 'highlightBlock',

  content: 'text*',

  group: 'block',

  code: true,

  defining: true,

  addCommands() {
    return {
      setHighlightBlock: (_attributes: { language: string } | undefined) => ({ commands }: CommandProps) => {
        return commands.insertContent({
          type: 'highlightBlock',
        })
      },
    }
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="highlight-block"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'highlight-block' })]
  },

  addNodeView() {
    return VueNodeViewRenderer(HighLightBlock)
  },
})
