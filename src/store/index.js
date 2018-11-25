import Vue from 'vue';
import Vuex from 'vuex';
import ls from '@/utils/localStorage';
import router from '@/router';
import * as moreActions from './actions';
import * as moreGetters from './getters';

Vue.use(Vuex)

// 共享状态
// 不能直接更改状态
const state = {
  user: ls.getItem('user'),
  // 添加 auth 来保存当前用户的登录状态
  auth: ls.getItem('auth'),
  // 所有文章状态
  articles: ls.getItem('articles')
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
  },
  // 更改所有文章的事件类型
  UPDATE_ARTICLES(state, articles) {
    state.articles = articles;
    ls.setItem('articles', articles);
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
  },
  // 更新个人信息
  updateUser({ state, commit }, user) {
    const stateUser = state.user;

    if (stateUser && typeof stateUser === 'object') {
      // 合并新旧个人信息，等价于 user = Object.assign({}, stateUser, user)
      user = { ...stateUser, ...user }
    }

    commit('UPDATE_USER', user)
  },
  // 使用对象展开运算符混入 moreActions;
  ...moreActions
}

const getters = {
  // Getter 有两个参数 state （访问仓库的状态）和 getters（访问仓库的派生状态）
  //
  getArticleById: (state, getters) => (id) => {
  let articles = getters.computedArticles;

    if (Array.isArray(articles)) {
      articles = articles.filter(articles => parseInt(id) === parseInt(articles.articleId));
      return articles.length ? articles[0] : null
    } else {
      return null
    }
  },
  // 混入 moreGetters, 你可以理解为 getters = Object.assign(getters, moreGetters)
  ...moreGetters
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
