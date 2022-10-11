import type { App } from 'vue'
import TipEditor from '../src/Tiptap.vue'

TipEditor.install = (app: App) => {
  app.component('TipEditor', TipEditor)
}
export default TipEditor
