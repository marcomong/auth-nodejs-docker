import { authInstance } from './axios'

function logIn (payload) {
  return authInstance.post('/auth/logIn', payload)
}

function signUp (payload) {
  return authInstance.post('/auth/signUp', payload)
}

function logOut (payload) {
  return authInstance.post('/auth/logOut', payload)
}

function isTokenValid (payload) {
  return authInstance.post('/auth/isTokenValid', payload)
}

export default {
  logIn,
  signUp,
  logOut,
  isTokenValid
}
