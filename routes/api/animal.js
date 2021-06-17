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

/**
 * @swagger
 * components:
 *   schemas:
 *     Animals:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - sex
 *         - type
 *         - breedName
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the animals
 *         name:
 *           type: string
 *           description: The animal's name
 *         age:
 *           type: number
 *           description: The animal's age
 *         sex:
 *           type: string
 *           description: The animal's sex
 *         breedName:
 *           type: object
 *           properties:
 *            _id: string
 *            breedName: string
 *            type: string
 *         type:
 *           type: object
 *           properties:
 *            _id: string
 *            type: string
 *       example:
 *         id: 60a63dc45df5c50abca95706
 *         name: Bobik
 *         age: 5
 *         sex: he
 *         breedName: {
 *          _id: 60a23dc15df5c50aaca956d5,
 *          breedName: strange,
 *          type: 87h63dc11df5c20aa12956d
 *         }
 *         type: {
 *          _id: 60a23dc15df5c50aaca956d5,
 *          type: dog
 *         }
 */

/**
 * @swagger
 * tags:
 *   name: Animals
 *   description: The animals managing API
 */

/**
 * @swagger
 * /api/animal:
 *   get:
 *     summary: Returns the list of all the animals
 *     tags: [Animals]
 *     responses:
 *       200:
 *         description: The list of the animals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Animals'
 */
router.get("/api/animal", animalController.getAllAnimals);

router.delete(
  "/admin/api/animal/:id",
  authMiddleware,
  isAdminMiddleware,
  animalController.deleteAnimal
);

module.exports = router;
