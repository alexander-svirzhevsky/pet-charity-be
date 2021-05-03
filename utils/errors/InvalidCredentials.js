class InvalidCredentials {
	constructor(message = "Invalid Credentials", statusCode = 401) {
		this.message = message;
		this.statusCode = statusCode;
	}
}

module.exports = InvalidCredentials;
