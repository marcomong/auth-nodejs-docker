const Token = require('../models/Token')

function generateToken (req, res) {
  const { body } = req
  try {
    const token = Token.generateToken(body.username, body._id)
    res.status(200).send(token)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports.generateToken = generateToken