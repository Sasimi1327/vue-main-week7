import { createApp } from 'vue'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import './assets/all.scss'
import App from './App.vue'
import router from './router'
import { date, currency } from './methods/filters'

const app = createApp(App)
app.config.globalProperties.$filters = {
  date,
  currency
}

app.component('LoadingView', Loading)
app.use(router)

app.use(VueAxios, axios)
app.mount('#app')
