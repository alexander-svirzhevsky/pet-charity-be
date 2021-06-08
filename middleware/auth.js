const jwt = require("jsonwebtoken");
const config = require("config");

const InvalidCredentials = require("../utils/errors/InvalidCredentials");

module.exports = function (req, _, next) {
  const token = req.header("Authorization");

  if (!token) {
    throw new InvalidCredentials();
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtToken"));
    req.user = decoded.user;

    next();
  } catch (_) {
    throw new InvalidCredentials();
  }
};
