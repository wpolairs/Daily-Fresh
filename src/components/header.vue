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
          <a-breadcrumb-item>{{ $router.currentRoute.matched[0].meta.title }}</a-breadcrumb-item>
          <a-breadcrumb-item
            ><router-link :to="{name: $router.currentRoute.matched[1].name}">
              {{ $router.currentRoute.matched[1].meta.title }}
              </router-link></a-breadcrumb-item
          >
        </a-breadcrumb>
      </div>
      <!--用户信息 -->
      <div class="user-info">
        <ul>
          <li>
            {{ this.$store.state.user.username }}
            <a-icon type="down" />
          </li>
          <li @click="logout">退出</li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$router);
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({
        name: 'login',
      });
    },
  },
};
</script>
