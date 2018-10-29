<template>
  <div id="wrap">
    <TheHeader/>
    <div id="main-container" class="container main-container">
      <router-view/>
    </div>
    <TheFooter/>
  </div>
</template>

<script>
import TheHeader from '@/components/layouts/TheHeader';
import TheFooter from '@/components/layouts/TheFooter';

export default {
  name: 'app',
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style lang="scss">
// 波浪号（~）会将后面的内容当模块路径对待，默认指向 node_modules 目录。
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
$fa-font-path: "~font-awesome/fonts/";
$container-large-desktop: 1200px;
$btn-primary-bg: #00b5ad;
$btn-primary-border: #00b5ad;
$label-primary-bg: #00b5ad;
$pagination-active-bg: #00b5ad;
$pagination-active-border: #00b5ad;
$pagination-color: #00b5ad;
$input-border-focus: #00b5ad;
$link-color: #12c4c5;
$link-hover-color: #22ddde;

@import "~bootstrap-sass/assets/stylesheets/_bootstrap";
@import "~font-awesome/scss/font-awesome";
@import "./stlyes/main.scss";
@import "./stlyes/extra.scss";

body > .container { margin-top: 15px; }
</style>
