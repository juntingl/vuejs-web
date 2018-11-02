<template>
  <div class="navbar-right">
    <ul v-if="auth" class="nav navbar-nav github-login">
      <li>
        <a href="javascript:;">
          <span v-if="user">
            <img v-if="user.avatar" :src="user.avatar" class="avatar-topnav" alt="">
            <span v-if="user.name">{{ user.name }}</span>
          </span>
        </a>
        <ul class="dropdown-menu">
          <li><a href="#"><i class="fa fa-sign-out text-md"></i>退出</a></li>
        </ul>
      </li>
    </ul>
    <div v-else class="nav navbar-nav github-login">
      <a href="#" class="btn btn-default login-btn">
        <i class="fa fa-user"></i> 登 录
      </a>
      <router-link to="/auth/register" class="btn btn-default login-btn">
        <i class="fa fa-user-plus"></i> 注 册
      </router-link>
    </div>
  </div>
</template>

<script>
// 引入 mapState 辅助函数
import { mapState } from 'vuex';

export default {
  name: 'TheEntry',
  // 状态一一声明就显得重复和冗余了
  // 使用 mapState 辅助函数一次导入
  // 通过计算属性生成我们要的新数据
  computed: {
    // 不使用辅助函数的写法
    // auth() {
    //   return this.$store.state.auth
    // },
    ...mapState([
      // 映射 this.auth 为 store.state.auth
      'auth',
      'user'
    ])
  }
}
</script>

<style lang="scss" scoped>

</style>
