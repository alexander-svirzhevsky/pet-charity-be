const User = require("../db/Schema/User");

const InvalidCredentials = require("../utils/errors/InvalidCredentials");

module.exports = async function (req, res, next) {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new InvalidCredentials();
  }

  if (!user.isAdmin) {
    throw new InvalidCredentials();
  }

  next();
};
