const http = require('http')

const app = require('./application')

const server = http.createServer(app)

const port = process.env.PORT || 3000

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
