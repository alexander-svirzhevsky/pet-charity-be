const userService = require("../services/googleAuth");

const BaseResponse = require("../utils/BaseResponse");
const { createToken } = require("../utils/auth/jwt");

async function googleAuth(req, res) {
  const user = await userService.googleAuth(req.body);

  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = await createToken(payload);

  res.header("Authorization", token);
  res.json(new BaseResponse());
}

module.exports = {
  googleAuth,
};
