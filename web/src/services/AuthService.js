import axios from 'axios'

function login (payload, callback) {
  axios.post('/login', payload)
    .then((res) => {
      return callback(null, res.data)
    })
    .catch((err) => {
      return callback(err)
    })
}

function signUp (payload, callback) {
  console.log(payload)
  axios.post('/signUp', payload)
    .then((res) => {
      debugger
      return callback(null, res.data)
    })
    .catch((err) => {
      return callback(err)
    })
}

export default {
  login,
  signUp
}
