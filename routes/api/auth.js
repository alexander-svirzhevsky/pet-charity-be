const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const User = require("../../db/Schema/User");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
