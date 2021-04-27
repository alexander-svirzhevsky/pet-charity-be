class BaseResponse {
	constructor(data = {}, message = "Ok", statusCode = "200") {
		this.message = message;
		this.statusCode = statusCode;
		this.data = data;
	}
}

module.exports = BaseResponse;
