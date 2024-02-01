import { createApp } from 'vue'
import App from './App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import router from './router'
import store from './store'
const app = createApp(App).use(store).use(router)
app.config.globalProperties.APP_VERSION = "1.2.2"
store.subscribe((mutation, state) => {
    const savedState = JSON.parse(JSON.stringify(state))
    delete savedState["currentlyShownModalName"]
    delete savedState["gameState"]
    localStorage.setItem('qwertleData2', JSON.stringify(savedState))
})
app.use(Toast, {})
app.mount('#app')
