const axios = require('axios')

function generateToken (req, res) {
  axios.post('http://localhost:8082/auth/generateToken', req.user)
    .then((token) => {
      req.user.token = token.data
      res.status(200).send(req.user)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}

module.exports.generateToken = generateToken