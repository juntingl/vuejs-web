<template>
  <div class="navbar navbar-default topnav">
    <div class="container">
      <div class="navbar-header">
        <!-- 屏幕尺寸缩小时，导航兼容 -->
        <button type="button" class="navbar-toggle" @click="handleNavToggle">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <router-link to="/" class="navbar-brand">
          <span class="title">{{ logo.title }}</span>
          <img :src="logo.src" :alt="logo.title">
        </router-link>
      </div>

      <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', { in: showCollapsedNav }]">
        <ul class="nav navbar-nav">
          <li
            v-for="(item, index) of navList"
            :key="`nav-list-${index}`"
            :class="{ active: index === activeNavIndex }"
          >
            <a href="#" @click="handleNavClick(index)">{{ item }}</a>
          </li>
        </ul>
        <!-- 入口组件 -->
        <div class="navbar-right">
          <SearchInput/>
          <TheEntry/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheEntry from '@/components/layouts/TheEntry';
import SearchInput from '@/components/layouts/SearchInput';

export default {
  name: 'TheHeader',
  components: {
    TheEntry,
    SearchInput
  },
  data() {
    return {
      logo: {
        src: `${this.uploadsUrl}sites/ByvFbNlQYVwhvTyBgLdqitchoacDNznN.jpg`,
        title: 'VuejsBBS'
      },
      navList: ['社区', '头条', '问答', '教程'],
      activeNavIndex: 0,
      showCollapsedNav: false
    };
  },
  beforeCreate() {
    this.uploadsUrl = 'https://vuejscaffcdn.phphub.org/uploads/';
  },
  methods: {
    handleNavClick(index) {
      this.activeNavIndex = index;
    },
    handleNavToggle() {
      this.showCollapsedNav = !this.showCollapsedNav;
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  display: none;
}
.navbar-default .navbar-nav > .active > a { background: rgba(0, 0, 0, .03);}
</style>
