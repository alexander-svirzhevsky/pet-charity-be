class NotFound {
	constructor(message = "Invalid Credentials", statusCode = 401) {
		this.message = message;
		this.statusCode = statusCode;
	}
}

module.exports = NotFound;
