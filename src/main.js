import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import './directives';
import './components';
// 设置 false 阻止 Vue 在启动时生成生产提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
