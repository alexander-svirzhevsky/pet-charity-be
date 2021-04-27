class BadRequest {
	constructor(errors = {}, message = "Bad Request", statusCode = 400) {
		this.errors = errors;
		this.message = message;
		this.statusCode = statusCode;
	}
}

module.exports = BadRequest;
