import { instance as axios } from './axios'

function retrieveSecretInfo (userId) {
  return axios.post('user/getUserInfo', userId)
}

export default {
  retrieveSecretInfo
}
