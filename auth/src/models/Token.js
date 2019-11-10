const jwt = require('jsonwebtoken')
const config = require('../configurations/config')

function generateToken (username, _id) {
  return jwt.sign({
    username: username,
    _id: _id
  }, config.jwt.secret)
}

function isTokenValid (token) {
  return jwt.verify(token, config.jwt.secret)
}

module.exports.generateToken = generateToken
module.exports.isTokenValid = isTokenValid