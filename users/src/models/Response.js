const Result = require('./Result')

module.exports = class Response extends Result {
  constructor(res, status, message, body = null) {
    super(status == 200 ? true : false, message)
    this.res = res
    this.status = status
    this.body = body
  }

  send() {
    if(!this.success) {
      return this.res.status(this.status).send({
        success: this.success,
        message: this.message
      })
    } else {
      return this.res.status(this.status).send({
        success: this.success,
        body: this.body
      })
    }
  }
}