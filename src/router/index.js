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
  // 获取目标页面路由参数里的 articleId
  const articleId = to.params.articleId;

  // 进入新路由前，把直接留下的消息提示框都给隐藏起来
  app.$message.hide();
  // 当用户已登录并且还访问 `/auth/` 相关页面时，跳转到首页
  // 当用户没登录且目标页面要求登录时,跳转到首页
  if (
    (auth && ~to.path.indexOf('/auth/')) ||
    (!auth && to.meta.auth) ||
    // 有 articleId 且不能找到与其对应的文章时，跳转到首页
    (articleId && !store.getters.getArticleById(articleId))
  ) {
    next('/')
  } else {
    next()
  }
})

// 注册全局后置钩子
// 在导航被确认后调用，因此它不接受 next 函数也不会改变导航本身。
router.afterEach((to, from) => {
  const app = router.app;
  const store = app.$options.store;
  // 获取目标页面路由参数里的 showMsg
  const showMsg = to.params.showMsg;

  if(showMsg) {
    // showMsg 是一个字符时，使用它作为消息内容
    if(typeof showMsg === 'string') {
      app.$message.show(showMsg)
    } else {
      app.$message.show('操作成功')
    }
  }
})

export default router;
