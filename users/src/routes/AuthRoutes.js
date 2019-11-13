   const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.post('/logIn', AuthController.logIn, AuthMiddleware.generateTokens)
router.post('/signUp', AuthController.signUp, AuthMiddleware.generateTokens)

module.exports = router