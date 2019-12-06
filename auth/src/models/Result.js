class Result {
  constructor(success) {
    this.success = success
  }
}

class SuccessResult extends Result {
  constructor(body) {
    super(true)
    this.body = body
  }
}

class FailResult extends Result {
  constructor(code, message) {
    super(false)
    this.message = message
    this.code = code == null ? -1 : code
  }
}

module.exports = {
  Result: Result,
  SuccessResult: SuccessResult,
  FailResult: FailResult
}