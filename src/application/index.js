require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const logger = require('helpers/logger')({ context: 'Application' })
const { errors } = require('celebrate')

app.use(cors({
  origin: [process.env.CORS_DOMAINS_ALLOWED],
  credentials: true
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text())

app.use(cookieParser())

app.use('/api/user', require('modules/user/api'))
app.use('/api/register', require('modules/auth/api/register'))
app.use('/api/login', require('modules/auth/api/login'))

const swagger = require('helpers/swagger')({
  apis: [
    `./src/modules/doc/**/*.js`
  ]
})

app.use('/swagger', swagger.router)
app.get('/', (req, res, next) => res.redirect('/swagger'))

app.use(errors())

app.use(morgan('dev', {
  skip: function (req, res) {
    return res.statusCode < 400
  },
  stream: process.stderr
}))

app.use(morgan('dev', {
  skip: function (req, res) {
    return res.statusCode >= 400
  },
  stream: process.stdout
}))

app.get('/', (req, res) => {
  logger.debug('Debug statement')
  logger.info('Info statement')
  res.send('Hello World!')
})

app.use(function (req, res, next) {
  logger.error('404 page requested')
  res.status(404).send('This page does not exist!')
})

module.exports = app
