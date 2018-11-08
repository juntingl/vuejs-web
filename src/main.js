import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import './directives';
import './components';
import VueSweetalert2 from './plugins/vue-sweetalert2';
import Message from './plugins/message';

// 使用插件
Vue.use(VueSweetalert2)
Vue.use(Message)
// 设置 false 阻止 Vue 在启动时生成生产提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
