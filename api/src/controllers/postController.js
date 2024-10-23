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

  async getPosts(req, res) {
    const posts = await this.postService.findAll(req)
    res.json(posts)
  }

  async getPost(req, res) {
    const posts = await this.postService.findById(req.params.id, req)
    res.json(posts)
  }
}

module.exports = PostController
