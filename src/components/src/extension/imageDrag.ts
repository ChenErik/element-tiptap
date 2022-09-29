import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Image from '@tiptap/extension-image'
import ImageDrag from '../modules/image/ImageDrag.vue'
export default [
  Image.extend({
    draggable: true,
    addNodeView() {
      return VueNodeViewRenderer(ImageDrag)
    },
  }),
]
