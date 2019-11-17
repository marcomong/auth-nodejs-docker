const mongoose = require('mongoose')
const config = require('./config')
const log = require('./logger')

const mongodb_url = `mongodb://${config.db.server}:${config.db.name}/${config.db.name}`

const connectionStatus = setInterval(() => {log.warn(`Connecting to db: ${config.db.name}`)}, 1000)

mongoose.connect(mongodb_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  reconnectTries: 3
})
.then(() => {
  clearInterval(connectionStatus)
  log.info(`Connected to db: ${config.db.name}`)
})
.catch((err) => {
  clearInterval(connectionStatus)
  log.error(err.message)
})
