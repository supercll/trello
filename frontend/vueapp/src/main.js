import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import TMessage from '@/components/TMessage/TMessage.js';

import '@/assets/css/css.scss';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;

Vue.prototype.$message = TMessage;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
