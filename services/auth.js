const argon2 = require("argon2");

const InvalidCredentials = require("../utils/errors/InvalidCredentials");
const User = require("../db/Schema/User");

async function logIn(email, password) {
  let user = await User.findOne({ email });

  if (!user) {
    throw new InvalidCredentials();
  }

  const isMatch = await argon2.verify(user.password, password);

  if (!isMatch) {
    throw new InvalidCredentials();
  }

  return (payload = {
    user: {
      id: user.id,
    },
  });
}

module.exports = {
  logIn,
};
