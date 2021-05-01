const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const config = require("config");

const sign = promisify(jwt.sign);

function createToken(payload) {
	return sign(payload, config.get("jwtToken"), { expiresIn: 360000 });
}

module.exports = {
	createToken,
};
