import router from '@/router'

const state = {
  message: null,
  code: null
}

const getters = {
  getError: state => state,
  getErrorMessage: state => state.message
}

const mutations = {
  setError (state, error) {
    if (!error) {
      state.message = null
      state.code = null
    } else if (!error.response) {
      state.message = error.message
      state.code = 500
    } else {
      state.message = error.response.data.message
      state.code = error.response.status
      if (state.code === 401) {
        if (router.currentRoute.name !== 'logIn') {
          router.push({ name: 'logIn' })
        }
      }
    }
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
