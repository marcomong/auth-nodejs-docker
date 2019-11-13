import { instance as axios } from './axios'

function logIn (payload) {
  return axios.post('/auth/logIn', payload)
}

function signUp (payload) {
  return axios.post('/auth/signUp', payload)
}

export default {
  logIn,
  signUp
}
