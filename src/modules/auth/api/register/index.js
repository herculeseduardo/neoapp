const express = require('express')
const router = express.Router()

const { register } = require('../../handler')

router.post('/', register)

module.exports = router
