const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const config = require('./configurations/config')

require('./db/db')

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

app.use('/', AuthRoutes)

app.listen(app.get('port'), function () {
  console.log(`listening on port ${config.app.port}`)
})