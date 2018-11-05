<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: '',
      msgType: '',
      msgShow: false
    }
  },
  // 组件内的路由导航守卫，在确认渲染该组件的对应路由前调用。
  // 该守卫不能访问 this，但我们通过传一个回调给 next，就可以使用上面的 vm 来访问组件实例。
  beforeRouteEnter(to, from, next) {
    // 路由的名称，对应路由配置中的 name
    const fromName = from.name;
    const logout = to.params.logout;
    // 确认导航
    next(vm => {
      // 通过 vm 参数访问组件实例，已登录时，评估路由名称
      if (vm.$store.state.auth) {
        switch(fromName) {
          // 如果从注册页面跳转过来
          case 'Register':
            vm.showMsg('注册成功')
            break
        }
      } else if (logout) {
        vm.showMsg('操作成功')
      }
    })
  },
  computed: {
    auth() {
      return this.$store.state.auth
    }
  },
  watch: {
    // 首页退出时 `beforeRouteEnter` 不会被调用
    // 监听下 auth 的值
    auth(newValue) {
      if (!newValue) {
        this.showMsg('操作成功')
      }
    }
  },
  methods: {
    showMsg(msg, type = 'success') {
      this.msg = msg;
      this.msgType = type;
      this.msgShow = true;
    }
  }
}
</script>

<style scoped>

</style>
