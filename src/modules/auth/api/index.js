const express = require('express')
const router = express.Router()
const HTTPStatus = require('http-status')
const logger = require('helpers/logger')({ context: 'AUTH' })
const { celebrate } = require('celebrate')
const { authSchema } = require('../schema')

const { userController } = require('../../user/controller')

router.post('/', celebrate({
  body: authSchema
}), (req, res, next) => {
  try {
    logger.info('Router User')

    userController.create({
      data: 'teste'
    })

    res
      .status(HTTPStatus.OK)
      .json({ 'auths': [] })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
