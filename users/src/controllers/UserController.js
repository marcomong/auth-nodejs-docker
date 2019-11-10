const User = require('../models/User')

function getUserInfo (req, res) {
  const { body } = req
  
  res.status(200).send({
    user: 'ciaoooo'
  })
}

module.exports.getUserInfo = getUserInfo