const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Breed = require("../../db/Schema/Breed");
const TypeOfAnimal = require("../../db/Schema/TypeOfAnimal");

router.post(
  "/",
  [
    check("breedName", "BreedName is required").not().isEmpty(),
    check("type", "Type is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { breedName, type } = req.body;

      let breed = await Breed.findOne({ breedName });

      if (breed) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Breed already exists" }] });
      }

      const typeId = await TypeOfAnimal.findOne({ type: type });

      breed = new Breed({
        breedName,
        type: typeId._id,
      });

      await breed.save();

      res.send("Breed saved!");
    } catch (error) {
      console.error(error.message);
    }
  }
);

module.exports = router;
