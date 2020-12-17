<template>
  <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
    <div class="main-header">
      <!-- 菜单按钮 -->
      <a-button
        type="primary"
        style="margin-bottom: 16px; margin-top: 10px"
        @click="toggleCollapsed"
      >
        <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <a-breadcrumb>
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item
            ><a href="">Application Center</a></a-breadcrumb-item
          >
        </a-breadcrumb>
      </div>
      <!--用户信息 -->
      <div class="user-info">
        <ul>
          <li>
            用户信息
            <a-icon type="down" />
          </li>
          <li>退出</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
  },
};
</script>
