class NotFound {
	constructor(message = "Not Found", statusCode = "404") {
		this.message = message;
		this.statusCode = statusCode;
	}
}

module.exports = NotFound;
