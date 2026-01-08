import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import App from './App.vue'
import { router } from './router/router'
import axios from 'axios'
import VueAxios from 'vue-axios'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(VueAxios, axios)
app.use(pinia)
app.use(router)

app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
