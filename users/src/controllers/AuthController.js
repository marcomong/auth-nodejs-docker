const User = require('../models/User')

function signUp (req, res, next) {
  const { body } = req

  User.signUp(body.username, body.password)
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message
      })
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
      res.status(500).send({
        error: err.message
      })
    })
}

module.exports.logIn = logIn
module.exports.signUp = signUp