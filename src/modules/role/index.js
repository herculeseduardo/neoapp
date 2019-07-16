const express = require('express')
const router = express.Router()
const HTTPStatus = require('http-status')
const logger = require('helpers/logger')({ context: 'USER' })

const validateJWT = require('helpers/jwt')

const { userController } = require('../user/controller')

router.get('/', validateJWT, (req, res, next) => {
  try {
    logger.info('Router User')
    res
      .status(HTTPStatus.OK)
      .json({ 'users': [] })
  } catch (err) {
    return next(err)
  }
})

router.post('/', (req, res, next) => {
  try {
    logger.info('Router User')

    userController.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })

    res
      .status(HTTPStatus.OK)
      .json({ 'auths': [] })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
