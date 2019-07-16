class CustomError extends Error {
  constructor () {
    super()
    this.errors = []
  }

  addError (code, message, path) {
    this.code = this.code || code
    this.message = this.message || message
    this.errors.push({
      code, message: message || code, path
    })
  }
}

const errors = {
  ERR_NOT_FOUND: 'ERR_NOT_FOUND',

  getErrorInstance () {
    return new CustomError()
  },

  buildError (code, message, options) {
    options = options || { }
    let error = errors.getErrorInstance()
    error.addError(code, message)
    console.error(`ERROR: ${code} ${message}`)
    return error
  }
}

module.exports = errors
