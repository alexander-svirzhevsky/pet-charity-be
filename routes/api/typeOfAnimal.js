const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Animal = require("../../db/Schema/Animal");
const TypeOfAnimal = require("../../db/Schema/TypeOfAnimal");

router.post(
  "/",
  [check("type", "Type is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type } = req.body;

    try {
      let typeOfAnimal = await TypeOfAnimal.findOne({ type });

      if (typeOfAnimal) {
        return res
          .status(400)
          .json({ errors: [{ msg: "TypeOfAnimal already exists" }] });
      }

      typeOfAnimal = new TypeOfAnimal({
        type,
      });

      await typeOfAnimal.save();

      res.send("TypeOfAnimal saved!");
    } catch (error) {
      console.error(error.message);
    }
  }
);

module.exports = router;
