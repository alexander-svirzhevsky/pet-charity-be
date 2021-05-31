const express = require("express");
const router = express.Router();

const userController = require("../../controllers/googleAuth");

router.post("/", userController.googleAuth);

module.exports = router;
