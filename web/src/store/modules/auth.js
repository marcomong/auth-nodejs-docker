import AuthService from '@/services/AuthService'
import router from '@/router'

const state = {}

const getters = {}

const mutations = {
  setCookies (_, payload) {
    payload.token != null ? localStorage.setItem('token', payload.token) : localStorage.removeItem('token')
    payload.refreshToken != null ? localStorage.setItem('refreshToken', payload.refreshToken) : localStorage.removeItem('refreshToken')
    payload.userId != null ? localStorage.setItem('userId', payload.userId) : localStorage.removeItem('userId')
  },
  setUserInfo (state, payload) {
    if (!payload) {
      state.user = null
      return
    }
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
        commit('setError', err)
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
        commit('setError', err)
      })
  },
  logout ({ commit }) {
    let _id = localStorage.getItem('userId')
    AuthService.logOut({ _id })
    commit('setError', null)
    commit('setCookies', { token: null, refreshToken: null, userId: null })
    commit('setUserInfo', null)
    commit('setSecretInfo', null)
    router.push({ name: 'logIn' })
  },
  tryAutoSignIn ({ commit }, page) {
    const token = localStorage.getItem('token')
    const _id = localStorage.getItem('userId')
    const refreshToken = localStorage.getItem('refreshToken')

    if (!token || !_id || !refreshToken) {
      if (router.currentRoute.name !== 'logIn') {
        router.push({ name: 'logIn' })
      }
      return
    }

    return AuthService.isTokenValid({ _id })
      .then(() => {
        commit('setUserInfo', { _id })
      })
      .catch(() => {
        commit('setCookies', { token: null, refreshToken: null, userId: null })
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
