const axios = require('axios')

var authInstance = axios.create({
  baseURL: 'http://localhost:8082/auth/',
  timeout: 10000000,
  headers: {}
})

function generateToken (req, res) {
  authInstance.post('/generateToken', req.user)
    .then((token) => {
      req.user.token = token.data
      res.status(200).send(req.user)
    })
    .catch((err) => {
      res.status(500).send(err)
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
      res.status(500).send({
        success: false,
        message: 'Faild while authorizing user token'
      })
    })
    .catch((err) => {
      res.status(err.response.status).send({
        success: false,
        message: err.message
      })
    })
}

module.exports.generateToken = generateToken
module.exports.isTokenValid = isTokenValid