const mongoose = require('mongoose')
const config = require('./config')

const mongodb_url = `mongodb://${config.db.server}:${config.db.name}/${config.db.name}`

mongoose.connect(mongodb_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})