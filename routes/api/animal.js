const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const animalController = require("../../controllers/animal");
const TypeOfAnimal = require("../../db/Schema/TypeOfAnimal");
const Animal = require("../../db/Schema/Animal");
const Breed = require("../../db/Schema/Breed");

const NotFound = require("../../utils/errors/NotFound");
const BaseResponse = require("../../utils/BaseResponse");

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

router.get("/", async (req, res) => {
	const animals = await Animal.find().populate("type").populate("breedName");

	res.json(new BaseResponse(animals));
});

module.exports = router;
