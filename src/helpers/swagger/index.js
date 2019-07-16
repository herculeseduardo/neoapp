const express = require('express')
const router = express.Router()

module.exports = ({ apis }) => {
  const options = {
    swaggerDefinition: {
      info: {
        title: 'REST - Swagger',
        version: '1.0.0',
        description: 'REST API with Swagger doc'
      },
      produces: ['application/json'],
      consumes: ['application/json'],
      securityDefinitions: {
        jwt: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      },
      security: [
        { jwt: [] }
      ],
      basePath: '/'
    },
    apis
  }

  const swaggerJSDoc = require('swagger-jsdoc')
  const swaggerUi = require('swagger-ui-express')
  const swaggerSpec = swaggerJSDoc(options)

  router.get('/json', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  return {
    router
  }
}
