import AuthService from '@/services/AuthService'
import router from '@/router'

const state = {}

const getters = {}

const mutations = {
  setCookies (_, payload) {
    localStorage.setItem('token', payload.token)
    localStorage.setItem('refreshToken', payload.refreshToken)
    localStorage.setItem('userId', payload.userId)
  },
  setUserInfo (state, payload) {
    delete payload.auth
    state.user = payload
  }
}

const actions = {
  logIn ({ commit }, payload) {
    commit('setError', null)
    return AuthService.logIn(payload)
      .then((res) => {
        const auth = res.data.body.auth
        commit('setCookies', auth)
        commit('setUserInfo', res.data.body, { root: true })
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
        const auth = res.data.body.auth
        commit('setCookies', auth)
        commit('setUserInfo', res.data.body, { root: true })
        router.push({ name: 'home' })
      })
      .catch((err) => {
        commit('setError', err.response.data.message)
      })
  },
  logout ({ commit }) {
    commit('setError', null)
    commit('setCookies', { token: null, refreshToken: null, userId: null })
  },
  tryAutoSignIn ({ commit }, page) {
    const token = localStorage.getItem('token')
    const _id = localStorage.getItem('userId')
    const refreshToken = localStorage.getItem('refreshToken')
    if (!token || !_id || !refreshToken) return

    commit('setUserInfo', { _id })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
