import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import './directives';
import './components';
import VueSweetalert2 from './plugins/vue-sweetalert2';
import Message from './plugins/message';
import './filters';
import { mockArticles } from './mock/data';
import ls from './utils/localStorage';

// 使用插件
Vue.use(VueSweetalert2)
Vue.use(Message)
// 设置 false 阻止 Vue 在启动时生成生产提示
Vue.config.productionTip = false;

const AddMockData = (() => {
  // 是否加入测试数据
  const isAddMockData = true;
  // 用户数据
  let userAricles = ls.getItem('articles');

  if (Array.isArray(userAricles)) {
    userAricles = userAricles.filter(artilce => parseInt(artilce.uid) === 1);
  } else {
    userAricles = [];
  }

  if (isAddMockData) {
    // 合并用户数据和测试数据，使用合并值作为所有文章
    store.commit('UPDATE_ARTICLES', [...userAricles, ...mockArticles(60)])
  } else {
    // 使用数据作为所有文章
    store.commit('UPDATE_ARTICLES', userAricles)
  }
});

AddMockData();

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
