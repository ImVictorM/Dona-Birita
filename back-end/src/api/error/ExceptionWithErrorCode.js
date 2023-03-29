class ExceptionWithErrorCode extends Error {
  constructor(errorCode, message) {
    super(message);
    this.stack = errorCode.toString();
  }
}
module.exports = ExceptionWithErrorCode;
