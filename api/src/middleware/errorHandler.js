const {
  NotFoundError,
  InternalServerError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
} = require('../errors/commonError')

function errorHandler(err, req, res, next) {
  if (
    [
      NotFoundError,
      InternalServerError,
      BadRequestError,
      UnauthorizedError,
      ForbiddenError,
    ].some((ErrClass) => err instanceof ErrClass)
  ) {
    res.status(err.statusCode).json({ error: err.message })
  } else if (err instanceof ValidationError) {
    res
      .status(err.statusCode)
      .json({ error: err.message, details: err.details })
  } else {
    console.error(err.stack)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = errorHandler
