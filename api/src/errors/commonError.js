class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message)
    this.name = this.constructor.name
    this.statusCode = 404
  }
}

class InternalServerError extends Error {
  constructor(message = 'Internal server error') {
    super(message)
    this.name = this.constructor.name
    this.statusCode = 500
  }
}

class BadRequestError extends Error {
  constructor(message = 'Bad request') {
    super(message)
    this.name = this.constructor.name
    this.statusCode = 400
  }
}

class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
    this.name = this.constructor.name
    this.statusCode = 401
  }
}

class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super(message)
    this.name = this.constructor.name
    this.statusCode = 403 // Forbidden
  }
}

class ValidationError extends Error {
  constructor(message = 'Validation error', details = {}) {
    super(message)
    this.name = this.constructor.name
    this.details = details
    this.statusCode = 422 // Unprocessable Entity
  }
}

module.exports = {
  NotFoundError,
  InternalServerError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
}
