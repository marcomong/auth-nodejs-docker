const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.post('/getUserInfo', AuthMiddleware.isTokenValid, UserController.getUserInfo)

module.exports = router