import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
const pinia = createPinia()
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.mount('#app')
