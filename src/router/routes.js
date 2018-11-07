export default [
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/Register')
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/auth/Login')
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
  },
  // 个人中心页
  {
    path: '/users/1/edit',
    name: 'EditUsers',
    component: () => import('@/views/users/Edit.vue')
  }
]
