const axios = require('axios')

var authInstance = axios.create({
  baseURL: 'http://localhost:8082/auth/',
  timeout: 1000,
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

module.exports.generateToken = generateToken