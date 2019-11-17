const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const log = require('./configurations/logger')
require('./configurations/db')

const config = require('./configurations/config')
const port = config.app.port

let AuthRoutes = require('./routes/AuthRoutes')

let app = express()
app.use(cors())

app.use(bodyParser.json({
  limit: '10mb'
}))
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}))

app.set('port', config.app.port)

app.use('/auth', AuthRoutes)

app.listen(app.get('port'), function () {
  log.info(`listening on port ${port}`)
})