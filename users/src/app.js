const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const log = require('./configurations/logger')

require('./configurations/db')

const AuthRoutes = require('./routes/AuthRoutes')
const UserInfoRoutes = require('./routes/UserInfoRoutes')
const config = require('./configurations/config')


const port = config.app.port

const app = express()

app.set('port', port)

app.use(cors())

app.use(bodyParser.json({
  limit: '10mb'
}))
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}))

app.use('/auth', AuthRoutes)
app.use('/user', UserInfoRoutes)

app.listen(app.get('port'), () => {
  log.info(`listening on port ${port}`)
})