const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const auth = require("../../middleware/auth");
const User = require("../../db/Schema/User");
const InvalidCredentials = require("../../utils/errors/InvalidCredentials");

router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (error) {
		console.error(error.message);
	}
});

router.post(
	"/",
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password is required").exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		let user = await User.findOne({ email });

		if (!user) {
			throw new InvalidCredentials();
		}

		const isMatch = await argon2.verify(user.password, password);

		if (!isMatch) {
			throw new InvalidCredentials();
		}

		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			config.get("jwtToken"),
			{ expiresIn: 360000 },
			(err, token) => {
				if (err) throw err;
				res.header("Authorization", token).json();
			}
		);
	}
);

module.exports = router;
