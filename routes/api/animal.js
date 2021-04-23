const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const TypeOfAnimal = require("../../db/Schema/TypeOfAnimal");
const Animal = require("../../db/Schema/Animal");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("sex", "Sex is required").not().isEmpty(),
    check("type", "Type is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, age, sex, type } = req.body;

      const typeId = await TypeOfAnimal.findOne({ type: type });

      const newAnimal = new Animal({
        name: name,
        age: age,
        sex: sex,
        type: typeId._id,
      });

      const postAnimal = await newAnimal.save();

      res.json(postAnimal);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
