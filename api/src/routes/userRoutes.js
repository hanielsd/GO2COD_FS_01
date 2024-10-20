const express = require('express')
const UserController = require('../controllers/userController')
const { authGuard } = require('../middleware/authMiddleware')

const { boundInstance } = require('../utils/oop')

const router = express.Router()
let userController = new UserController()
userController = boundInstance(userController)

router.post('/', userController.createUser)
router.get('/:id', authGuard, userController.getUserById)
router.put('/:id', authGuard, userController.updateUserById)

module.exports = router
