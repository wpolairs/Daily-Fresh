<template>
  <div class="home">
    <!-- 左边菜单列表 -->
    <menu-list />
    <!-- 右边内容 -->
    <main-header></main-header>
  </div>
</template>

<script>
import menuList from '@/components/menu.vue';
import mainHeader from '@/components/header.vue';

export default {
  components: {
    menuList,
    mainHeader,
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/home.less");
</style>
