const Token = require('../models/Token')
const log = require('../configurations/logger')

async function generateTokens (req, res) {
  const { body } = req
  try {
    const token = await Token.generateToken(body._id)
    const refreshToken = await Token.generateToken(body._id, true)

    const tokens = {
      token,
      refreshToken
    }

    res.status(200).send(tokens)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function grantNewAccessToken (req, res) {
  const { body } = req
  const refreshToken = body.refreshToken
  const _id = body._id

  try {
    let isValid = await Token.isRefreshTokenValid(_id, refreshToken)
    if(!isValid) {
      res.status(401).send({
        success: false,
        message: 'Unauthorized',
      })
    } else {
      const token = await Token.generateToken(_id)
      res.status(200).send({ token })
    }
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
      message: 'Unauthorized'
    })
  }

  try {
    let isValid = Token.isTokenValid(body._id, token)
    req.body.isTokenValid = isValid

    if(isValid) {
      res.status(200).send({
        success: true,
        message: 'Token is valid',
        body: req.body
      })
    } else {
      res.status(401).send({
        success: false,
        message: 'Token is not correct for the user',
      })
    }
  } catch (err) {
    res.status(401).send({
      success: false,
      message: 'Unauthorized',
    })
  }
}

function logOut(req, res) {
  const { body } = req

  Token.setIsRefreshTokenValid(body._id, false)
    .catch((err) => {
      log.error('%o', err)
    })
}

module.exports.isTokenValid = isTokenValid
module.exports.generateTokens = generateTokens
module.exports.grantNewAccessToken = grantNewAccessToken
module.exports.logOut = logOut