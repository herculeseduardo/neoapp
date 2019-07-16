const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format

const loggerFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

const level = process.env.LOG_LEVEL || 'debug'

module.exports = (options = {}) => {
  let { context = 'App' } = options
  const logger = createLogger({
    format: combine(
      label({ label: context }),
      timestamp(),
      loggerFormat
    ),
    transports: [new transports.Console({
      level
    })]
  })

  return logger
}
