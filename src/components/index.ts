import type { App } from 'vue'
import ElementTiptapEditor from './src/Tiptap.vue'

ElementTiptapEditor.install = (app: App) => {
  app.component('ElementTiptapEditor', ElementTiptapEditor)
}
export default ElementTiptapEditor
