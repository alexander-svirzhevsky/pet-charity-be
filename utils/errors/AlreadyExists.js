class AlreadyExists {
	constructor(message = "User already exists", statusCode = "400") {
		this.message = message;
		this.statusCode = statusCode;
	}
}

module.exports = AlreadyExists;
