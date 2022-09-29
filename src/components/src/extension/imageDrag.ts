import { Node, VueNodeViewRenderer, mergeAttributes } from '@tiptap/vue-3'
import Image from '@tiptap/extension-image'
import ImageDrag from '../modules/image/ImageDrag.vue'
// export default [
//   Image.extend({
//     draggable: true,
//     addNodeView() {
//       return VueNodeViewRenderer(ImageDrag)
//     },
//   }),
// ]

export default Node.create({
  name: 'imageDrag',
  draggable: true,
  group: 'block',
  content: 'block+',
  atom: true,
  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
    }
  },
  addCommands() {
    return {
      setImage: options => ({ commands }) => {
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
        tag: 'div[data-type="imageDrag"]',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-type': 'imageDrag' })]
  },
  addNodeView() {
    return VueNodeViewRenderer(ImageDrag)
  },
})
