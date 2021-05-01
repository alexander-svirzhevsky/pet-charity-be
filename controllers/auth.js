const { validationResult } = require("express-validator");

const { createToken } = require("../utils/auth/jwt");
const authService = require("../services/auth");
const User = require("../db/Schema/User");
const BadRequest = require("../utils/errors/BadRequest");
const BaseResponse = require("../utils/BaseResponse");

async function login(req, res) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new BadRequest(errors.array());
	}

	const user = await authService.login(req.body);

	const payload = {
		user: {
			id: user.id,
		},
	};

	const token = await createToken(payload);

	res.header("Authorization", token);
	res.json(new BaseResponse());
}

async function getAuthUser(req, res) {
	const user = await User.findById(req.user.id).select("-password");
	res.json(new BaseResponse(user));
}

module.exports = {
	login,
	getAuthUser,
};
