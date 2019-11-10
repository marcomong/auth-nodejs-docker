module.exports = {
  db: {
    server: process.env.MONGODB_SERVER || 'localhost',
    port: process.env.MONGODB_PORT || '27017',
    name: process.env.MONGODB_NAME || 'auth'
  },
  app: {
    port: process.env.PORT || 8081
  }
}