const argon2 = require("argon2");

const User = require("../db/Schema/User");
const AlreadyExists = require("../utils/errors/AlreadyExists");

async function registerUser(name, email, password) {
  let users = await User.findOne({ email });

  if (users) {
    throw new AlreadyExists("User already exists");
  }

  const hashedPassword = await argon2.hash(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  const result = await user.save();
  return result;
}

module.exports = {
  registerUser,
};
