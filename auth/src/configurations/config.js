module.exports = {
  app: {
    port: process.env.PORT || 8082
  },
  db: {
    server: process.env.MONGODB_SERVER || 'localhost',
    port: process.env.MONGODB_PORT || '27017',
    name: process.env.MONGODB_AUTH_NAME || 'auth'
  },
  jwt: {
    token_secret: process.env.JWT_TOKEN_SECRET || 'shhhhhh',
    refresh_token: process.env.JWT_REFRESH_SECRET || 'shhhhhrefresh'
  }
}