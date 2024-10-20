const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserService = require('../services/userService')
const { UnauthorizedError, BadRequestError } = require('../errors/commonError')

class AuthController {
  constructor() {
    this.userService = new UserService()
  }

  async login(req, res, next) {
    try {
      const user = await this.userService.findOne({
        email: req.body.email,
      })

      if (!user) throw new UnauthorizedError('Incorrect email or password')

      // Compare the passwords
      const passwordsMatch = await bcrypt.compare(
        req.body.password,
        user.password
      )

      // If the passwords don't match, return an error
      if (!passwordsMatch)
        throw new UnauthorizedError('Incorrect email or password')

      // If the user's credentials are valid, generate a JWT
      const payload = {
        userId: user._id,
        username: user.email,
      }
      const secret = process.env.JWT_SECRET
      const options = { expiresIn: '1h' }
      const token = jwt.sign(payload, secret, options)

      res.json({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,

        token,
      })
    } catch (e) {
      next(e)
    }
  }

  async changePassword(req, res, next) {
    try {
      const { password, newPassword } = req.body

      let user = await this.userService.findById(req.userId)
      const passwordsMatch = await bcrypt.compare(password, user.password)

      // If the passwords don't match, return an error
      if (!passwordsMatch) throw new BadRequestError('Incorrect password')

      // Hash the password
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

      // Store the user in the database with the hashed password
      user = await this.userService.updateById(req.userId, {
        password: hashedPassword,
      })
      res.status(201).json(user)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = AuthController
