const HTTPStatus = require('http-status')
const logger = require('helpers/logger')({ context: 'USER' })

const { userController } = require('../controller')

let userHandler = {}

userHandler.listUsers = async (req, res, next) => {
  logger.info('List Users')
  try {
    res
      .status(HTTPStatus.OK)
      .json(await userController.list())
  } catch (err) {
    return next(err)
  }
}

userHandler.createUser = async (req, res, next) => {
  logger.info('Create User')
  try {
    res
      .status(HTTPStatus.CREATED)
      .json(await userController.create({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }))
  } catch (err) {
    return next(err)
  }
}

userHandler.updateUser = async (req, res, next) => {
  logger.info('Update User')
  try {
    res
      .status(HTTPStatus.OK)
      .json(await userController.update({
        id: req.params.userId,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }))
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  ...userHandler
}
