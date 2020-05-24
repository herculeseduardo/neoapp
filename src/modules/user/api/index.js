const express = require('express')
const router = express.Router()

const validateJWT = require('helpers/middlewares/jwt')

const {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  findUser
} = require('../handler')

router.get('/', validateJWT, listUsers)

router.get('/:userId', validateJWT, findUser)

router.post('/', validateJWT, createUser)

router.put('/:userId', validateJWT, updateUser)

router.delete('/:userId', validateJWT, deleteUser)

module.exports = router
