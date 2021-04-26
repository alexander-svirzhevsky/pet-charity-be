function errorHandler(err, req, res, next) {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server error";
	const errors = err.errors || {};

	res.status(statusCode);
	res.json({
		statusCode,
		message,
		errors,
	});
}

module.exports = errorHandler;
