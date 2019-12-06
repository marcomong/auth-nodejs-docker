const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
  username: String
})

UserSchema.methods.toJSON = function () {
  return {
    username: this.username,
    _id: this._id
  }
}

module.exports = User = mongoose.model('User', UserSchema)
