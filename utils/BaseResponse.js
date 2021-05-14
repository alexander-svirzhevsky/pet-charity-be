class BaseResponse {
  constructor(data = {}, total, message = "Ok", statusCode = "200") {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.total = total;
  }
}

module.exports = BaseResponse;
