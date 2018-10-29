import Vue from 'vue'
import App from './App.vue'
import router from './router';

// 设置 false 阻止 Vue 在启动时生成生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
