const express = require('express')
const UserController = require('../controllers/userController')
const { authGuard } = require('../middleware/authMiddleware')

const { boundInstance } = require('../utils/oop')

const router = express.Router()
let userController = new UserController()
userController = boundInstance(userController)

router.post('/', authGuard, userController.createUser)
router.get('/:id', authGuard, userController.getUserById)
router.get('/', authGuard, userController.getAllUsers)
router.put('/:id', authGuard, userController.updateUserById)
router.delete('/:id', authGuard, userController.deleteUserById)

module.exports = router
