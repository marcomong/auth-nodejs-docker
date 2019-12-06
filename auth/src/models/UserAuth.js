const jwt = require('jsonwebtoken')
const config = require('../configurations/config')
const mongoose = require('mongoose')
const log = require('../configurations/logger')
const crypto = require('crypto')
const { SuccessResult, FailResult } = require('./Result')

const UserAuthSchema = new mongoose.Schema({
  username: String,
  isRefreshTokenValid: Boolean,
  hash: String
})

UserAuthSchema.methods.setPassword = function (password) {
  this.hash = crypto.pbkdf2Sync(password, config.hash.salt, 10000, 512, 'sha512').toString('hex')
}

UserAuthSchema.methods.isValidPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, config.hash.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash == hash
}

module.exports = UserAuth = mongoose.model('UserAuth', UserAuthSchema)

const saveUser = (userDb, username, password) => {
  return new Promise((_, reject) => {
    if(userDb != null) {
      reject(new FailResult(1, 'User already exists'))
    } else {
      const newUser = new UserAuth({
        username: username
      })
      newUser.setPassword(password)
      return newUser.save()
    }
  })
}

module.exports.signUp = (username, password) => {
  return UserAuth.findOne({ username })
    .then(user => {
      return saveUser(user, username, password)
    })
    .then(user => {
      return new SuccessResult(user.toJSON()) 
    })
    .catch(err => {
      return new FailResult(err.code, err.message)
    })
}

const validatePassword = (user, password) => {
  return new Promise((resolve, reject) => {
    if(user == null) {
      reject(new FailResult(2, 'User does not exists'))
    } else {
      if (user.isValidPassword(password)) {
        resolve(new SuccessResult(user.toJSON()))
      } else {
        reject(new FailResult(3, 'Password is not correct'))
      }
    }
  })
}

module.exports.logIn = async (username, password) => {
  return UserAuth.findOne({ username })
    .then(user => {
      return validatePassword(user, password)
    })
    .catch(err => {
      return new FailResult(err.code, err.message)
    })
}

module.exports.createUserRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    UserAuth.findOne({ userId })
      .then((user) => {
        if (user) {
          setIsRefreshTokenValid(userId, true)
            .then((res) => {
              resolve(res)
            })
        } else {
          const newRecord = new User({
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

function generateToken(_id, isRefreshToken = false) {
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

function isRefreshTokenValid(userId, token) {
  return UserAuth.findOne({ userId })
    .then((user) => {
      if (!user) {
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

function isTokenValid(userId, token) {
  let decoded = jwt.verify(token, config.jwt.token_secret)
  if (decoded == null)
    return false
  return decoded._id == userId
}

function setIsRefreshTokenValid(userId, isValid) {
  return UserAuth.findOneAndUpdate({ userId }, { $set: { isRefreshTokenValid: isValid } }, { new: true }, (err, doc) => {
    if (err) {
      log.error('Error when updating the data, %o', err)
      throw new Error (err)
    } else {
      log.info(doc)
      return doc
    }
  })
}

module.exports.generateToken = generateToken
module.exports.isTokenValid = isTokenValid
module.exports.isRefreshTokenValid = isRefreshTokenValid
module.exports.setIsRefreshTokenValid = setIsRefreshTokenValid