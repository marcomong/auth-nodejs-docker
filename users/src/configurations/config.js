module.exports = {
  db: {
    server: process.env.MONGODB_SERVER || 'localhost',
    port: process.env.MONGODB_PORT || '27017',
    name: process.env.MONGODB_NAME || 'users'
  },
  app: {
    port: process.env.PORT || 8081
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'shhhhhh'
  },
  servers: {
    auth: {
      host: process.env.AUTH_HOST || 'localhost'
    }
  }
}