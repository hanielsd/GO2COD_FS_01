const bcrypt = require('bcrypt')
const UserService = require('../services/userService')

class UserController {
  constructor() {
    this.userService = new UserService()
  }

  async createUser(req, res) {
    const { password, ...rest } = req.body

    // Hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Store the user in the database with the hashed password
    const user = await this.userService.create(
      {
        password: hashedPassword,
        ...rest,
      },
      req
    )
    res.status(201).json(user)
  }

  async getUserById(req, res) {
    const user = await this.userService.findById(req.params.id)
    res.json(user)
  }

  async updateUserById(req, res) {
    const user = await this.userService.updateById(req.params.id, req.body)
    res.json(user)
  }
}

module.exports = UserController
