const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const profileController = require("../../controllers/profile");
const authMiddleware = require("../../middleware/auth");
const isAdminMiddleware = require("../../middleware/isAdmin");

router.post(
  "/",
  [
    authMiddleware,
    isAdminMiddleware,
    check("age", "Age is required").not().isEmpty().isNumeric(),
    check("phone", "Phone is required").not().isEmpty().isNumeric(),
    check("color", "Color is required").not().isEmpty(),
    check("location", "Location is required").not().isEmpty(),
    check("size", "Size is required").not().isEmpty(),
    check("story", "Story is required").not().isEmpty(),
  ],
  profileController.createProfile
);

router.get("/", profileController.getAllProfiles);

router.get(
  "/:animal_id",
  [authMiddleware],
  profileController.getCurrentProfile
);

module.exports = router;
