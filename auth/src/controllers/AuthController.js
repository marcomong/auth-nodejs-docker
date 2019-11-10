const User = require('../models/User')

function login (req, res) 
{
  const { body } = req

  User.login(body.username, body.password)
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}

function signUp (req, res) 
{
  const { body } = req

  User.signUp(body.username, body.password)
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}


module.exports.login = login
module.exports.signUp = signUp