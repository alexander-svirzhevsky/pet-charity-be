const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const animalTypeController = require("../../controllers/animalType");
const authMiddleware = require("../../middleware/auth");
const isAdminMiddleware = require("../../middleware/isAdmin");

router.post(
  "/",
  [
    authMiddleware,
    isAdminMiddleware,
    check("type", "Type is required").not().isEmpty(),
  ],
  animalTypeController.addAnimalType
);

module.exports = router;
