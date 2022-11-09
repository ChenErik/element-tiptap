import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as TipEditor from './components/index'
const app = createApp(App)
app.config.unwrapInjectedRef = true
app.use(TipEditor)
app.mount('#app')

