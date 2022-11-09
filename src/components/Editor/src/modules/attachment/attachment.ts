import { Node, VueNodeViewRenderer, mergeAttributes } from '@tiptap/vue-3'
import Attachment from './Attachment.vue'
export interface AttachmentOptions {
  HTMLAttributes: Record<string, any>
}
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    attachment: {
      /**
       * Set a blockquote node
       */
      setAttachment: (options: { name: string; size: number | string; src: string }) => ReturnType
    }
  }
}
export default Node.create<AttachmentOptions>({
  name: 'attachment',
  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },
  addAttributes() {
    return {
      name: {
        default: null,
      },
      size: {
        default: null,
      },
      src: {
        default: null,
      },
    }
  },
  // content: 'block+',

  group: 'block',

  // defining: true,
  draggable: true,

  addCommands() {
    return {
      setAttachment: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },
    }
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="attachment"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-type': 'attachment' })]
  },

  addNodeView() {
    return VueNodeViewRenderer(Attachment)
  },
})
