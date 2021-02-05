import Vue from 'vue';
import VueRouter from 'vue-router';
import login from '@/views/login.vue';
import Home from '@/views/layout/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/layout/About.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
