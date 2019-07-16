process.env.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret'
process.env.JWT_AUTH_HEADER_PREFIX = process.env.JWT_AUTH_HEADER_PREFIX || 'Bearer'

const jwt = require('express-jwt-token')

/**
 * @swagger
 * securityDefinitions:
 *   Bearer:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */
module.exports = jwt.jwtAuthProtected
