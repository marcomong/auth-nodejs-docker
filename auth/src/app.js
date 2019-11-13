const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('./configurations/db')

const config = require('./configurations/config')

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
  console.log(`listening on port ${config.app.port}`)
})