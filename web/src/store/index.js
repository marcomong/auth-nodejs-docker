import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import AuthService from '@/services/AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null
  },
  getters: {
    isUserLoggedIn: state => state.user != null,
    getError: state => state.error
  },
  mutations: {
    setUserInfo (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    }
  },
  actions: {
    logIn ({ commit }, payload) {
      commit('setError', null)
      return AuthService.logIn(payload)
        .then((res) => {
          commit('setUserInfo', res.data.body)
          router.push({ name: 'home' })
        })
        .catch((err) => {
          commit('setError', err.response.data.message)
        })
    },
    signUp ({ commit }, payload) {
      commit('setError', null)
      return AuthService.signUp(payload)
        .then((res) => {
          commit('setUserInfo', res.data.body)
          router.push({ name: 'home' })
        })
        .catch((err) => {
          commit('setError', err.response.data.message)
        })
    },
    logout ({ commit }) {
      commit('setError', null)
      commit('setUserInfo', null)
    }
  },
  modules: {
  }
})
