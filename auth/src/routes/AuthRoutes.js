const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.post('/login', AuthController.login)
router.post('/signUp', AuthController.signUp)

module.exports = router