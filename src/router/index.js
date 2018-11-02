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
  },
  // 首页
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  // 其他未配置的路由都跳转到首页
  {
    path: '*',
    // 重定向
    redirect: '/'
  }
];

const router = new Router({
  // 路由模式，默认 ‘hash’ 使用 `#` 做路由; `history` 利用 `History API` 来完成页面跳转且无需重新加载,需要服务端配置支持
  mode: 'history',
  // 路由配置列表
  routes
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 使用 router.app 可以获取 router 对应的 Vue 根实例
  // 实例的 $options 是用于当前 Vue 实例的初始化选项
  const auth = router.app.$options.store.state.auth;

  if (auth && ~to.path.indexOf('/auth/')) {
    next('/')
  } else {
    next()
  }
})

export default router;
