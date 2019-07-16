const express = require('express')
const router = express.Router()

// const validateJWT = require('helpers/jwt')

const { listUsers, createUser, updateUser } = require('../handler')

router.get('/', listUsers)

router.post('/', createUser)

router.put('/:userId', updateUser)

module.exports = router
