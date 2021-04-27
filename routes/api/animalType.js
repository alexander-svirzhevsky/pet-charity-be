const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const animalTypeController = require("../../controllers/animalType");

router.post(
  "/",
  [check("type", "Type is required").not().isEmpty()],
  animalTypeController.addAnimalType
);

module.exports = router;
