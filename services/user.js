const argon2 = require("argon2");

const User = require("../db/Schema/User");
const AlreadyExists = require("../utils/errors/AlreadyExists");

async function register({ name, email, password, isAdmin = false }) {
  const user = await User.findOne({ email });

  if (user) {
    throw new AlreadyExists("User with this email already exists");
  }

  const hashedPassword = await argon2.hash(password);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    isAdmin,
  });

  await newUser.save();

  return newUser;
}

module.exports = {
  register,
};
