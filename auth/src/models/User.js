const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')


const UserAuthSchema = new mongoose.Schema({
  username: {
    type: String,
    // unique: true
  },
  salt: String,
  hash: String
})

UserAuthSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserAuthSchema.methods.generateJWT = function (secret) {
  return jwt.sign({
    username: this.username,
    _id: this._id
  }, secret)
}

UserAuthSchema.methods.toAuthJSON = function (hash) {
  return {
    _id: this._id,
    username: this.username,
    token: this.generateJWT(hash)
  }
}

UserAuthSchema.methods.isValidPasswrod = function (password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash == hash
}

module.exports = UserAuth= mongoose.model('AuthUser', UserAuthSchema)

module.exports.signUp = (username, password) => {
  let newUser = new UserAuth({
    username: username
  })
  newUser.setPassword(password)
  return new Promise((resolve, reject) => {
    newUser.save()
      .then(() => {
        resolve(newUser.toAuthJSON(newUser.hash))
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports.login = async (username, password) => {
  const user = await UserAuth.findOne({username})
  if(!user) {
    throw new Error({error: 'user not registered'})
  }
  if(user.isValidPasswrod(password)) {
    user.toAuthJSON(user.hash)
  } else {
    throw new Error({error: 'wrong password'})
  }
}