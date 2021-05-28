const argon2 = require("argon2");
const config = require("config");
const jwt = require("jsonwebtoken");
const mailgun = require("mailgun-js");
const DOMAIN = "sandboxa8f7fd0bacb34070bea22984266964f9.mailgun.org";
const mg = mailgun({ apiKey: config.get("mailgunApiKey"), domain: DOMAIN });

const InvalidCredentials = require("../utils/errors/InvalidCredentials");
const NotFound = require("../utils/errors/NotFound");
const BadRequest = require("../utils/errors/BadRequest");
const BaseResponse = require("../utils/BaseResponse");
const User = require("../db/Schema/User");
const { createTokenResetPass } = require("../utils/auth/jwt");
const { JsonWebTokenError } = require("jsonwebtoken");

async function login({ email, password }) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new InvalidCredentials();
  }

  const isMatch = await argon2.verify(user.password, password);

  if (!isMatch) {
    throw new InvalidCredentials();
  }

  return user;
}

async function forgotPassword({ email }) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound("User with this email does not exists");
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = await createTokenResetPass(payload);
  const data = {
    from: "alexander.svirzhevsky@gmail.com",
    to: email,
    subject: "Account Activation Link",
    html: `
	 	<h2>Please click on given link to reset your password</h2>
		 <p>${config.get("clientUrl")}/resetpassword/${token}</p> 
	  `,
  };

  await user.updateOne({ resetLink: token });

  const result = await mg.messages().send(data, (error, body) => {
    if (error) {
      throw new BadRequest();
    }

    return result;
  });
}

async function resetPassword({ resetLink, newPass }) {
  if (resetLink) {
    const decodedData = jwt.verify(resetLink, config.get("resetPassToken"));

    if (!decodedData) {
      throw new InvalidCredentials();
    }
    let user = await User.findOne({ resetLink });

    if (!user) {
      throw new NotFound("User with this token does not exists");
    }
    // Problems , need debuging

    // console.log(user._id);
    // user = await User.findOneAndUpdate(
    //   { user: user._id },
    //   { password: newPass },
    //   { new: true }
    // );

    await user.save();

    return user;
  } else {
    throw new InvalidCredentials();
  }
}

module.exports = {
  login,
  forgotPassword,
  resetPassword,
};
