import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

// 使用（安装） Vue-Router 插件
// *需要在 new Vue() 之前调用
Vue.use(Router)

const router = new Router({
  // 路由模式，默认 ‘hash’ 使用 `#` 做路由; `history` 利用 `History API` 来完成页面跳转且无需重新加载,需要服务端配置支持
  mode: 'history',
  // 此值为一个 `css class 类名`, 精准激活当前访问路由，然后给此路由对应的 <router-link> 上，激活样式
  linkExactActiveClass: 'active',
  // 路由配置列表
  routes
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 使用 router.app 可以获取 router 对应的 Vue 根实例
  // 实例的 $options 是用于当前 Vue 实例的初始化选项
  const app = router.app;
  const store = app.$options.store;
  const auth = store.state.auth;

  // 进入新路由前，把直接留下的消息提示框都给隐藏起来
  app.$message.hide();
  // 当用户已登录并且还访问 `/auth/` 相关页面时，跳转到首页
  // 当用户没登录且目标页面要求登录时,跳转到首页
  if ((auth && ~to.path.indexOf('/auth/')) || (!auth && to.meta.auth)) {
    next('/')
  } else {
    next()
  }
})

export default router;
