const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const animalController = require("../../controllers/animal");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("sex", "Sex is required").not().isEmpty(),
    check("type", "Type is required").not().isEmpty(),
    check("breedName", "breedName is required").not().isEmpty(),
  ],
  animalController.createAnimal
);

router.get("/", animalController.getAllAnimals);

module.exports = router;
