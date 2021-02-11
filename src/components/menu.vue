<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="['index']"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <template v-for="router in $store.state.menuRouters">
        <a-sub-menu :key="router.name" v-if="!router.meta.hidden">
          <span slot="title"
            ><a-icon :type="router.meta.icon" /><span>{{
              router.meta.title
            }}</span></span
          >
          <a-menu-item :key="child.name" v-for="child in router.children">
            <router-link :to="{ name: child.name }">
              <a-icon :type="child.meta.icon" />
              {{ child.meta.title }}</router-link
            >
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<style scoped lang="less">
.menu-list {
  width: 180px;
  position: fixed;
  height: 100%;
  .ant-menu {
    height: 100%;
  }
}
</style>
