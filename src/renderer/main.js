import Vue from 'vue'
import App from './App'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import router from './router'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import store from './store'
import anime from 'animejs'
import db from '../datastore'

Vue.prototype.$db = db
Vue.prototype.$anime = anime
dayjs.locale('zh-cn')
Vue.prototype.$dayjs = dayjs
Vue.use(VueMaterial)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
