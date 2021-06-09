const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth");
const isAdminMiddleware = require("../../middleware/isAdmin");
const animalController = require("../../controllers/animal");
const upload = require("../../utils/cloudinary/multer");

router.post(
  "/api/animal",
  authMiddleware,
  isAdminMiddleware,
  upload.single("image"),
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
