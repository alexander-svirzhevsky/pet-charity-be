const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const profileController = require("../../controllers/profile");

router.post(
  "/",
  [
    check("age", "Age is required").not().isEmpty().isNumeric(),
    check("color", "Color is required").not().isEmpty(),
    check("size", "Size is required").not().isEmpty(),
    check("story", "Story is required").not().isEmpty(),
  ],
  profileController.createProfile
);

router.get("/", profileController.getAllProfiles);

router.get("/:animal_id", profileController.getCurrentProfile);

module.exports = router;
