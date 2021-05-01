const argon2 = require("argon2");

const User = require("../db/Schema/User");
const AlreadyExists = require("../utils/errors/AlreadyExists");

async function register({ name, email, password }) {
	const user = await User.findOne({ email });

	if (user) {
		throw new AlreadyExists("User already exists");
	}

	const hashedPassword = await argon2.hash(password);

	const newUser = new User({
		name,
		email,
		password: hashedPassword,
	});

	await newUser.save();

	return newUser;
}

module.exports = {
	register,
};