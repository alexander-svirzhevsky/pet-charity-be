const express = require("express");
const router = express.Router();
// const { check, validationResult } = require("express-validator");

const Breed = require("../../db/Schema/Breed");

router.post("/", async (req, res) => {
  try {
    const { breedName } = req.body;

    let breed = await Breed.findOne({ breedName });

    if (breed) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Breed already exists" }] });
    }

    breed = new Breed({
      breedName,
    });

    await breed.save();

    res.send("Breed saved!");
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
