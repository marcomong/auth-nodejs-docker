const User = require('../models/User')
const Response = require('../models/Response')

function signUp (req, res, next) {
  const { body } = req

  User.signUp(body.username, body.password)
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => {
      return new Response(res, 500, err.message).send()
    })
}

function logIn (req, res, next) {
  const { body } = req

  User.logIn(body.username, body.password)
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => {
      return new Response(res, 500, err.message).send()
    })
}

module.exports.logIn = logIn
module.exports.signUp = signUp