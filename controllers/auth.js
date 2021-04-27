const { validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");

const authService = require("../services/auth");
const User = require("../db/Schema/User");
const BadRequest = require("../utils/errors/BadRequest");
const BaseResponse = require("../utils/BaseResponse");

async function logIn(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { email, password } = req.body;

  let payload = await authService.logIn(email, password);

  jwt.sign(
    payload,
    config.get("jwtToken"),
    { expiresIn: 360000 },
    (err, token) => {
      res.header("Authorization", token).json();
    }
  );
}

async function getAuthUser(req, res) {
  const user = await User.findById(req.user.id).select("-password");
  res.json(new BaseResponse(user));
}

module.exports = {
  logIn,
  getAuthUser,
};
