const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../../middleware/auth");
const authController = require("../../controllers/auth");

router.get("/", auth, authController.getAuthUser);

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  authController.login
);

router.put("/forgot-password", authController.forgotPassword);

router.put("/reset-password", authController.resetPassword);

module.exports = router;
