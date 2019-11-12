const mongoose = require('mongoose')
const crypto = require('crypto')
const config = require('../configurations/config')

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String
})

UserSchema.methods.setPassword = function (password) {
  this.hash = crypto.pbkdf2Sync(password, config.jwt.secret, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.isValidPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, config.jwt.secret, 10000, 512, 'sha512').toString('hex')
  return this.hash == hash
}

UserSchema.methods.toJSON = function () {
  return {
    username: this.username,
    _id: this._id
  }
}

module.exports = User = mongoose.model('User', UserSchema)

module.exports.signUp = (username, password) => {
  return new Promise((resolve, reject) => {
    const user = User.findOne({username})
      .then((user) => {
        if (user) {
          reject({
            message: 'User already exists'
          })
          return
        }
        const newUser = new User({
          username: username
        })
        newUser.setPassword(password)
        newUser.save()
          .then(() => {
            resolve(newUser.toJSON())
          })
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports.logIn = (username, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({username})
      .then((user) => {
        if (!user) {
          reject({message: 'User does not exists'})
          return
        }
        if (user.isValidPassword(password)) {
          resolve(user.toJSON())
        } else {
          reject({ message: 'Password not valid'})
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}