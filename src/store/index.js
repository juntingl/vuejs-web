import Vue from 'vue';
import Vuex from 'vuex';
import ls from '@/utils/localStorage';
import router from '@/router';

Vue.use(Vuex)

// 共享状态
// 不能直接更改状态
const state = {
  user: ls.getItem('user')
}

// 更改状态的方法，不能包含异步操作
const mutations = {
  UPDATE_USER(state, user) {
    state.user = user;
    ls.setItem('user', user)
  }
}

// 处理异步（Ajax）操作，触发 mutation 更改数据状态
// 不能直接更改状态
const actions = {
  login({ commit }, user) {
    if (user) commit('UPDATE_USER', user)
    router.push('/')
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
