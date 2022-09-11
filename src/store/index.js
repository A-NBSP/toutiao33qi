import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'TOUTIAO_TOKEN',
      reducer({ tokenObj }) {
        return { tokenObj }
      }
    })
  ],
  state: {
    a: 1,
    tokenObj: {}
  },
  // 相当于组件中的计算属性
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    }
  },
  actions: {},
  modules: {}
})
