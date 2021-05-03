const argon2 = require("argon2");

const InvalidCredentials = require("../utils/errors/InvalidCredentials");
const User = require("../db/Schema/User");

async function login({ email, password }) {
	const user = await User.findOne({ email });

	if (!user) {
		throw new InvalidCredentials();
	}

	const isMatch = await argon2.verify(user.password, password);

	if (!isMatch) {
		throw new InvalidCredentials();
	}

	return user;
}

module.exports = {
	login,
};
