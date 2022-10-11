import { Node, VueNodeViewRenderer, mergeAttributes } from '@tiptap/vue-3'

import HighLightBlock from './HighLightBlock.vue'

export default Node.create({
  name: 'highlightBlock',

  group: 'block',
  content: 'inline*',
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
