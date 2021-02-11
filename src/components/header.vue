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
          <a-breadcrumb-item>{{
            $router.currentRoute.matched[0].meta.title
          }}</a-breadcrumb-item>
          <a-breadcrumb-item
            ><router-link :to="{ name: $router.currentRoute.matched[1].name }">
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

<style scoped lang="less">
.main-app {
  margin-left: 180px;
  transition: all 0.3s;
  &.menu-unfold {
    margin-left: 80px;
  }
  .breadcrumb {
    display: inline-block;
    margin-left: 10px;
  }
  .user-info {
    float: right;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    li:not(:first-child) {
      display: none;
      font-weight: bold;
      &:hover {
        background-color: rgb(14, 199, 91);
        color: #fff;
      }
    }
    li {
      padding: 0 30px;
      transition: all 0.3s;
    }
    &:hover {
      li {
        display: block;
      }
    }
  }
}
.main-header {
  border-bottom: 1px solid #ccc;
  height: 50px;
  line-height: 50px;
  padding-right: 20px;
  .ant-btn {
    margin-left: 10px;
  }
}
</style>
