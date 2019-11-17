const axios = require('axios')
const config = require('../configurations/config')
const Response = require('../models/Response')

var authInstance = axios.create({
  baseURL: `http://${config.servers.auth.host}:8082/auth/`,
  timeout: 30000,
  headers: {}
})

function generateTokens (req, res) {
  authInstance.post('/generateTokens', req.user)
    .then((tokens) => {
      const auth = {
        userId: req.user._id,
        ...tokens.data
      }
      req.user.auth = auth
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
      if(result.data.success)
        next()
      else {
        return new Response(res, 500, 'Faild while authorizing user token').send()
      }
    })
    .catch((err) => {
      return new Response(res, err.response.status, err.response.data.message).send()
    })
}

module.exports.generateTokens = generateTokens
module.exports.isTokenValid = isTokenValid