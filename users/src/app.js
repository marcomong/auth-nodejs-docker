const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

require('./configurations/db')

const AuthRoutes = require('./routes/AuthRoutes')
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

app.listen(app.get('port'), () => {
  console.log(`listening on port ${port}`)
})