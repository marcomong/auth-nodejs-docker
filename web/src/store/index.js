import Vue from 'vue'
import Vuex from 'vuex'

import UserService from '@/services/UserService'
import auth from './modules/auth'
import error from './modules/error'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    secretInfo: null
  },
  getters: {
    isUserLoggedIn: state => state.user != null,
    getSecretInfo: state => state.secretInfo
  },
  mutations: {
    setUserInfo (state, payload) {
      state.user = payload
    },
    setSecretInfo (state, payload) {
      state.secretInfo = payload
    }
  },
  actions: {
    retrieveSecretInfo ({ commit, state }) {
      commit('setSecretInfo', null)
      return UserService.retrieveSecretInfo({ _id: state.user._id })
        .then((res) => {
          commit('setSecretInfo', res.data.user)
        })
        .catch((err) => {
          commit('setError', err)
        })
    }
  },
  modules: {
    auth,
    error
  }
})
