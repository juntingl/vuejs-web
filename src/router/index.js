import Vue from 'vue';
import Router from 'vue-router';

// 使用（安装） Vue-Router 插件
// *需要在 new Vue() 之前调用
Vue.use(Router)

const routes = [
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/Register')
  }
];

const router = new Router({
  // 路由模式，默认 ‘hash’ 使用 `#` 做路由; `history` 利用 `History API` 来完成页面跳转且无需重新加载,需要服务端配置支持
  mode: 'history',
  // 路由配置列表
  routes
});

export default router;
