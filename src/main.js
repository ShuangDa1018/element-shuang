import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import { CountTo } from 'vue3-count-to'
const app = createApp(App)
installElementPlus(app)
app.component('CountTo', CountTo)
app
    .use(store)
    .use(router)
    .mount('#app')