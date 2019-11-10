const User = require('../models/User')

function signUp (req, res, next) {
  const { body } = req

  User.signUp(body.username, body.password)
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}

module.exports.signUp = signUp