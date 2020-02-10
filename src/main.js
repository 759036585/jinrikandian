import Vue from 'vue'
import App from './App.vue'
import router from './utils/router'
import store from './store'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './styles/index.css'
import Plugin from './utils/plugin'
// import vueg from 'vueg'

Vue.use(Vant)
Vue.use(Plugin)
Vue.use(Lazyload)
// Vue.use(vueg)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
