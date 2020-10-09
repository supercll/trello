import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TMessage from '@/components/TMessage/TMessage.js';

import '@/assets/css/css.css'

Vue.config.productionTip = false

Vue.prototype.$message = TMessage;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
