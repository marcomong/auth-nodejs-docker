const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.post('/signUp', AuthController.signUp)
router.post('/logIn', AuthController.logIn)
router.post('/logOut', AuthController.logOut)

router.post('/generateTokens', AuthController.generateTokens)
router.post('/isTokenValid', AuthController.isTokenValid)
router.post('/grantNewAccessToken', AuthController.grantNewAccessToken)
module.exports = router