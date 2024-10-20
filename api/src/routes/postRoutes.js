const express = require('express')
const PostController = require('../controllers/postController')

const { boundInstance } = require('../utils/oop')

const router = express.Router()
let controller = new PostController()
controller = boundInstance(controller)

router.post('/', controller.createPost)

module.exports = router
