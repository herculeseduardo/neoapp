require('dotenv').config()
const express = require('express')
const http = require('http')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const logger = require('helpers/logger')({ context: 'Application' })

const port = process.env.PORT || 3000

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
app.use('/api/login', require('modules/auth/api'))

const swagger = require('helpers/swagger')({
  apis: [
    `./src/modules/doc/**/*.js`
  ]
})

app.use('/swagger', swagger.router)
app.get('/', (req, res, next) => res.redirect('/swagger'))

app.use(errors())

// error handler
/* app.use(function (err, req, res, next) {
  if (err.isBoom) {
    return res.status(err.output.statusCode).json(err.output.payload)
  }
}) */

/* app.use((err, req, res, next) => {
  res.status(err.status || HTTPStatus.INTERNAL_SERVER_ERROR)
  if (!err.code) {
    console.trace(err)
  }
  res.json(err)
}) */

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

const server = http.createServer(app)

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

server.listen(port)

server.on('error', onError)

server.on('listening', server => {
  console.log(`Listening on ${port}...`)
})
