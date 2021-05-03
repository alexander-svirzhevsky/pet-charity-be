const { validationResult } = require("express-validator");

const userService = require("../services/user");
const BadRequest = require("../utils/errors/BadRequest");
const BaseResponse = require("../utils/BaseResponse");
const { createToken } = require("../utils/auth/jwt");

async function register(req, res) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new BadRequest(errors.array());
	}

	const user = await userService.register(req.body);

	const payload = {
		user: {
			id: user.id,
		},
	};

	const token = await createToken(payload);

	res.header("Authorization", token);
	res.json(new BaseResponse());
}

module.exports = {
	register,
};
