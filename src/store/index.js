import Vue from 'vue';
import Vuex from 'vuex';
import { setUserCookie, getUserCookie, removeCookie } from '@/tools/userCookies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 菜单导航的状态
    collapsed: false,
    // 用户信息
    user: getUserCookie(),
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    logout(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setUserCookie(userInfo);
    },
    logout({ commit }) {
      commit('logout');
      removeCookie();
    },
  },
  modules: {
  },
});
