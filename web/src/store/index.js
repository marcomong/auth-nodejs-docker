import Vue from 'vue'
import Vuex from 'vuex'

import UserService from '@/services/UserService'
import auth from './modules/auth'

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
    retrieveSecretInfo ({ commit, state }) {
      return UserService.retrieveSecretInfo({ _id: state.user._id })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {
    auth
  }
})
