class ResponseError extends Error {
  /**
   *
   * @param {number} status
   * @param {string} message
   */
  constructor(status = 500, message = "Internal Server Error") {
    super(message);
    this.status = status;
  }
}

module.exports = { ResponseError };
