import axios from 'axios'

function logIn (payload, callback) {
  return axios.post('/logIn', payload)
}

function signUp (payload) {
  return axios.post('/signUp', payload)
}

export default {
  logIn,
  signUp
}
