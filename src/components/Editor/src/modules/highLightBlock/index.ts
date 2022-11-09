import type { CommandProps } from '@tiptap/vue-3'
import { Node, VueNodeViewRenderer, mergeAttributes } from '@tiptap/vue-3'

import HighLightBlock from './HighLightBlock.vue'

export default Node.create({
  name: 'highlightBlock',
  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },
  content: 'block+',

  group: 'block',

  defining: true,
  draggable: true,

  addCommands() {
    return {
      setHighlightBlock: (_attributes: { language: string } | undefined) => ({ commands }: CommandProps) => {
        return commands.wrapIn(this.name)
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
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-type': 'highlight-block' }), 0]
  },

  addNodeView() {
    return VueNodeViewRenderer(HighLightBlock)
  },
})
