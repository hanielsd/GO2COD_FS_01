const express = require('express')
const PostController = require('../controllers/postController')

const { boundInstance } = require('../utils/oop')
const { authGuard } = require('../middleware/authMiddleware')

const router = express.Router()
let controller = new PostController()
controller = boundInstance(controller)

router.post('/', authGuard, controller.createPost)

module.exports = router
