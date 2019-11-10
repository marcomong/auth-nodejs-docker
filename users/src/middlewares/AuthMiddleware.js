const axios = require('axios')
const Response = require('../models/Response')

var authInstance = axios.create({
  baseURL: 'http://localhost:8082/auth/',
  timeout: 10000000,
  headers: {}
})

function generateToken (req, res) {
  authInstance.post('/generateToken', req.user)
    .then((token) => {
      req.user.token = token.data
      return new Response(res, 200, null, req.user).send()
    })
    .catch((err) => {
      return new Response(res, 500, err.message).send()
    })
}

function isTokenValid (req, res, next) {
  authInstance.post('/isTokenValid', req.body, {
    headers: { Authorization: req.headers.authorization}
  })
    .then((result) => {
      req.body.isTokenValid = result.data.body.isTokenValid
      if(req.data.success)
        next()
      return new Response(res, 500, 'Faild while authorizing user token').send()
    })
    .catch((err) => {
      return new Response(res, err.response.status, err.message).send()
    })
}

module.exports.generateToken = generateToken
module.exports.isTokenValid = isTokenValid