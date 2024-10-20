const express = require('express')
const AuthController = require('../controllers/authController')
const { boundInstance } = require('../utils/oop')
const { authGuard } = require('../middleware/authMiddleware')

const router = express.Router()
let authController = new AuthController()
authController = boundInstance(authController)

router.post('/login', authController.login)
router.put('/change-password', authGuard, authController.changePassword)

module.exports = router
