import Vue from 'vue'
import App from './App.vue'

// 设置 false 阻止 Vue 在启动时生成生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
