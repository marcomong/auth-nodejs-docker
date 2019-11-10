module.exports = {
  app: {
    port: process.env.PORT || 8082
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'shhhhhh'
  }
}