import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

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
    logIn ({ commit }, payload) {
      return AuthService.logIn(payload)
        .then((res) => {
          commit('setUserInfo', res.data.body)
          router.push({ name: 'home' })
        })
        .catch(() => {
          // console.log(err.response.data.message)
        })
    },
    signUp ({ commit }, payload) {
      return AuthService.signUp(payload)
        .then((res) => {
          commit('setUserInfo', res.data.body)
          router.push({ name: 'home' })
        })
        .catch(() => {
          // console.log(err.response.data.message)
        })
    },
    logout ({ commit }) {
      commit('setUserInfo', null)
    }
  },
  modules: {
  }
})
