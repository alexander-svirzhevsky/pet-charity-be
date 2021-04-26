const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const userService = require("../services/user");
const BadRequest = require("../utils/errors/BadRequest");

async function registerUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { name, email, password } = req.body;

  const user = await userService.registerUser(name, email, password);

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
      res.header("Authorization", token).json();
    }
  );
}

module.exports = {
  registerUser,
};
