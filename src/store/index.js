import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '../utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  // 放置数据的地方 初始化的时候直接将用户信息给我们的公共状态
  state: {
    user: auth.getUser()
  },
  mutations: {
    updateUser (state, payload) {
      state.user = payload.user // 更新数据
      auth.setUser(payload.user) // 将数据同步设置到本地存储中
    },
    clearUser (state) {
      state.user = {}
      auth.delUser() // 将缓存中的数据也清空
    }
  },
  actions: {
  },
  modules: {
  }
})
