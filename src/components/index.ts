import type { App } from 'vue'
import TipEditor from './Editor'
const components = [
  TipEditor,
]
const install = (App: App<Element>) => {
  /* 可能会加入其他组件 */
  components.forEach((item) => {
    App.component(item.name, item)
  })
  App.component(TipEditor.name, TipEditor)
}
export { TipEditor }
export default {
  install,
}
