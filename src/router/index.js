import Vue from 'vue';
import VueRouter from 'vue-router';
import login from '@/views/login.vue';
import Home from '@/views/layout/Home.vue';
import store from '@/store/index';
import getAuthorityRouter from '../tools/authority';

const originalPush = VueRouter.prototype.push;

// 解决重复点击路由报错
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);
// 左侧菜单路由配置
const menuRouters = [
  {
    path: '/product',
    name: 'product',
    meta: {
      title: '商品',
      hidden: false,
      icon: 'shop',
    },
    component: Home,
    children: [
      {
        path: 'list',
        name: 'list',
        meta: {
          title: '商品列表',
          icon: 'unordered-list',
        },
        component: () => import('../views/page/productList.vue'),
      },
      {
        path: 'add',
        name: 'add',
        meta: {
          title: '添加商品',
          icon: 'edit',
        },
        component: () => import('../views/page/productAdd.vue'),
      },
      {
        path: 'category',
        name: 'category',
        meta: {
          title: '商品类目',
          icon: 'project',
        },
        component: () => import('../views/page/category.vue'),
      },
    ],
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home',
    },
    children: [{
      path: 'index',
      name: 'index',
      meta: {
        title: '统计',
        icon: 'number',
      },
      component: () => import('../views/page/index.vue'),
    }],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      hidden: true,
      title: '登录',
    },
    component: login,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});
let isAuthority = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username) {
      if (!isAuthority) {
        const newMenuRouters = getAuthorityRouter(store.state.user.role, menuRouters);
        store.dispatch('setMenuRouters', routes.concat(newMenuRouters)).then(() => {
          next();
          router.addRoutes(newMenuRouters);
        });
        isAuthority = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});
export default router;
