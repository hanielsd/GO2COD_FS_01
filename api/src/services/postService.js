const AppService = require('./AppService')
const PostModel = require('../models/PostModel')

class PostService extends AppService {
  constructor() {
    super(PostModel)
  }
}

module.exports = PostService
