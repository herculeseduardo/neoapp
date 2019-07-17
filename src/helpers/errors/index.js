const HTTPStatus = require('http-status')
class AppError extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

class ResourceNotFoundError extends AppError {
  constructor (resource, query) {
    super(`Resource ${resource} was not found.`)
    this.data = { resource, query }
    this.status = HTTPStatus.NOT_FOUND
    this.code = 'NOT_FOUND'
  }
}

class InternalError extends AppError {
  constructor (error) {
    super(error.message)
    this.data = { error }
  }
}

module.exports = {
  ResourceNotFoundError,
  InternalError
}
