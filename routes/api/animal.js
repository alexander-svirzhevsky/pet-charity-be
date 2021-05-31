const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const authMiddleware = require("../../middleware/auth");
const isAdminMiddleware = require("../../middleware/isAdmin");
const animalController = require("../../controllers/animal");

router.post(
  "/api/animal",
  [
    authMiddleware,
    isAdminMiddleware,
    check("name", "Name is required").not().isEmpty(),
    check("sex", "Sex is required").not().isEmpty(),
    check("type", "Type is required").not().isEmpty(),
    check("breedName", "breedName is required").not().isEmpty(),
  ],
  animalController.createAnimal
);

router.get("/api/animal", animalController.getAllAnimals);

router.delete(
  "/admin/api/animal/:id",
  authMiddleware,
  isAdminMiddleware,
  animalController.deleteAnimal
);

module.exports = router;
