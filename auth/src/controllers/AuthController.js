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

function isTokenValid(req, res) {
  const { body } = req
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (!token) {
    res.status(401).send({
      success: false,
      message: err.message
    })
  }

  try {
    let decoded = Token.isTokenValid(token)
    req.body.isValidToken = true

    if(body._id != decoded._id) {
      res.status(401).send({
        success: false,
        message: 'Token is not correct for the user',
      })
    } else {
      res.status(200).send({
        success: true,
        message: 'Token is valid',
        body: req.body
      })
    }
  } catch (err) {
    res.status(401).send({
      success: false,
      message: err.message,
    })
  }
}

module.exports.isTokenValid = isTokenValid
module.exports.generateToken = generateToken