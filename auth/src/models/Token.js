const jwt = require('jsonwebtoken')
const config = require('../configurations/config')

function generateToken (username, _id) {
  return jwt.sign({
    username: username,
    _id: _id
  }, config.jwt.secret)
}

module.exports.generateToken = generateToken