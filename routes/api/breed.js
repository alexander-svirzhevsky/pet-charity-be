const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const breedController = require("../../controllers/breed");

router.post(
  "/",
  [
    check("breedName", "BreedName is required").not().isEmpty(),
    check("type", "Type is required").not().isEmpty(),
  ],
  breedController.addBreed
);

module.exports = router;
