const jwt = require('jsonwebtoken')
const config = require('../configurations/config')
const mongoose = require('mongoose')
const log = require('../configurations/logger')

const UserTokenSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  isRefreshTokenValid: Boolean,
})

module.exports = UserToken = mongoose.model('UserToken', UserTokenSchema)

module.exports.createUserRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    UserToken.findOne({userId})
      .then((user) => {
        if (user) {
          setIsRefreshTokenValid(userId, true)
            .then ((res) => {
              resolve(res)
            })
        } else {
          const newRecord = new UserToken({
            userId,
            isRefreshTokenValid: true
          })
          newRecord.save()
            .then(() => {
              resolve(newRecord)
            })
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function generateToken (_id, isRefreshToken = false) {
  if (isRefreshToken) {
    return this.createUserRefreshToken(_id)
      .then(() => {
        return jwt.sign({
          _id: _id
        }, config.jwt.refresh_token)
      })
      .catch((err) => {
        log.error('%o', err)
        let emptyToken = ''
        return emptyToken
      })
  }
  return jwt.sign({
    _id: _id
  }, config.jwt.token_secret,
  {
    expiresIn: '5s'
  })
}

function isRefreshTokenValid (userId, token) {
  return UserToken.findOne({userId})
    .then((user) => {
      if(!user) {
        return false
      } else if (!user.isRefreshTokenValid) {
        return false
      } else {
        let decoded = jwt.verify(token, config.jwt.refresh_token)
        if (decoded == null)
          return false
        return decoded._id == userId
      }
    })
    .catch((err) => {
      log.error('%o', err)
      return false
    })
}

function isTokenValid (userId, token) {
  let decoded = jwt.verify(token, config.jwt.token_secret)
  if (decoded == null)
    return false
  return decoded._id == userId
}

function setIsRefreshTokenValid (userId, isValid) {
  return new Promise((resolve, reject) => {
    UserToken.findOneAndUpdate({userId}, {$set:{isRefreshTokenValid: isValid}}, {new: true}, (err, doc) => {
      if (err) {
        log.error('Error when updating the data, %o', err)
          reject(err)
      } else {
        log.info(doc)
        resolve (doc)
      }
    })
  })
  
}

module.exports.generateToken = generateToken
module.exports.isTokenValid = isTokenValid
module.exports.isRefreshTokenValid = isRefreshTokenValid
module.exports.setIsRefreshTokenValid = setIsRefreshTokenValid