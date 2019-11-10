import Vue from 'vue'
import Vuex from 'vuex'

import AuthService from '@/services/AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    isUserLoggedIn: state => state.user != null
  },
  mutations: {
    setUserInfo (state, payload) {
      state.user = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      AuthService.login(payload, (err, res) => {
        if (err) {
          console.log(err)
          return
        }
        commit('setUserInfo', res)
      })
    },
    signUp ({ commit }, payload) {
      AuthService.signUp(payload, (err, res) => {
        if (err) {
          console.log(err)
          return
        }
        commit('setUserInfo', res)
      })
    },
    logout ({ commit }) {
      commit('setUserInfo', null)
    }
  },
  modules: {
  }
})
