import Vue from 'vue';
import Vuex from 'vuex';
import ls from '@/utils/localStorage';
import router from '@/router';

Vue.use(Vuex)

// 共享状态
// 不能直接更改状态
const state = {
  user: ls.getItem('user'),
  // 添加 auth 来保存当前用户的登录状态
  auth: ls.getItem('auth')
}

// 更改状态的方法，不能包含异步操作
const mutations = {
  UPDATE_USER(state, user) {
    state.user = user;
    ls.setItem('user', user)
  },
  // 更新登录状态
  UPDATE_AUTH(state, auth) {
    state.auth = auth;
    ls.setItem('auth', auth)
  }
}

// 处理异步（Ajax）操作，触发 mutation 更改数据状态
// 不能直接更改状态
const actions = {
  login({ commit }, user) {
    if (user) commit('UPDATE_USER', user)
    // 更新当前用户的登录状态为已登录
    commit('UPDATE_AUTH', true)
    router.push('/')
  },
  logout({ commit }) {
    commit('UPDATE_AUTH', false)
    router.push({ name: 'Home', params: { logout: true } })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
