const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const breedController = require("../../controllers/breed");
const authMiddleware = require("../../middleware/auth");
const isAdminMiddleware = require("../../middleware/isAdmin");

router.post(
  "/",
  [
    authMiddleware,
    isAdminMiddleware,
    check("breedName", "BreedName is required").not().isEmpty(),
    check("type", "Type is required").not().isEmpty(),
  ],
  breedController.addBreed
);

module.exports = router;
