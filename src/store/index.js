import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenObj: {}
  },
  // 相当于组件中的计算属性
  getters: {},
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    }
  },
  actions: {},
  modules: {}
})
