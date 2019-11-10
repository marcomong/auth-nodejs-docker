const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.post('/generateToken', AuthController.generateToken)
router.post('/isTokenValid', AuthController.isTokenValid)

module.exports = router