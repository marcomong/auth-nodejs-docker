const jwt = require('jsonwebtoken')
const config = require('../configurations/config')
const mongoose = require('mongoose')

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
          UserToken.findOneAndUpdate({userId}, {$set:{isRefreshTokenValid: true}}, {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            } else {
              console.log(doc);
              resolve (doc)
            }
        });
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
        console.log(err)
        let emptyToken = ''
        return emptyToken
      })
  }
  return jwt.sign({
    _id: _id
  }, config.jwt.token_secret,
  {
    expiresIn: '10s'
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
      console.log(err)
      return false
    })
}

function isTokenValid (userId, token) {
  let decoded = jwt.verify(token, config.jwt.token_secret)
  if (decoded == null)
    return false
  return decoded._id == userId
}

module.exports.generateToken = generateToken
module.exports.isTokenValid = isTokenValid
module.exports.isRefreshTokenValid = isRefreshTokenValid