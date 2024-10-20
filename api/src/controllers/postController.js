const PostService = require('../services/postService')

class PostController {
  constructor() {
    this.postService = new PostService()
  }

  async createPost(req, res) {
    const post = await this.postService.create(
      { ...req.body, author: req.userId },
      req
    )
    res.status(201).json(post)
  }
}

module.exports = PostController
