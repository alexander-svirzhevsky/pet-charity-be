const axios = require("axios");
const User = require("../db/Schema/User");
const argon2 = require("argon2");

async function googleAuth({ email, googleId, token, isAdmin = false }) {
  const res = await axios.get(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
  );

  if (res) {
    const user = await User.findOne({ email });

    if (!user) {
      const hashedPassword = await argon2.hash(googleId);

      const newUser = new User({
        name: res.data.name,
        email: res.data.email,
        password: hashedPassword,
        isAdmin,
      });

      await newUser.save();

      return newUser;
    } else {
      return user;
    }
  }
}

module.exports = {
  googleAuth,
};
