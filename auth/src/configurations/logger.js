const { createLogger, format, transports } = require('winston')

const path = require('path')

const logPath = path.join(__dirname, '../../Logs')

const logFormatConsole = format.combine(
  format.colorize(),
  format.timestamp(),
  format.splat(),
  format.printf(info => `${info.timestamp} - ${info.level}: ${info.message}`)
)


const logFormatFile = format.combine(
  format.timestamp(),
  format.splat(),
  format.printf(info => `${info.timestamp} - ${info.level}: ${info.message}`)
)

const logger = module.exports = createLogger({
  level: 'silly', // logging everything from silly to the most necessary => error
  format: logFormatFile,
  defaultMeta: { service: 'user-module' },
  transports: [
    new transports.File({ filename: path.join(logPath, path.join(getFormattedDate(true))), level: 'error', handleExceptions: true }),
    new transports.File({ filename: path.join(logPath, path.join(getFormattedDate())) })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    handleExceptions: true, 
    format: logFormatConsole
  }));
}


function getFormattedDate(isError = false) {
  var date = new Date()

  var year = date.getFullYear()

  var month = (1 + date.getMonth()).toString()
  month = month.length > 1 ? month : '0' + month

  var day = date.getDate().toString()
  day = day.length > 1 ? day : '0' + day

  if (isError) {
    return 'Errors/'+ month + '-' + day + '-' + year + '.log'
  }
  return 'Combined/' + month + '-' + day + '-' + year + '.log'
}
