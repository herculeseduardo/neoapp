const HTTPStatus = require('http-status')
const logger = require('helpers/logger')({ context: 'USER' })

const { register, login } = require('../controller')

let authHandler = {}

authHandler.register = async (req, res, next) => {
  logger.info('registering')
  try {
    res
      .status(HTTPStatus.CREATED)
      .json(await register({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }))
  } catch (err) {
    return next(err)
  }
}

authHandler.login = async (req, res, next) => {
  logger.info('login')
  try {
    res
      .status(HTTPStatus.OK)
      .json(await login({
        email: req.body.email,
        password: req.body.password
      }))
  } catch (err) {
    if (err.code === 'ERR_LOGIN_FAILURE') {
      err.status = HTTPStatus.UNAUTHORIZED
    }
    return next(err)
  }
}

module.exports = {
  ...authHandler
}
