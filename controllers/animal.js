const { validationResult } = require("express-validator");

const animalService = require("../services/animal");
const BadRequest = require("../utils/errors/BadRequest");

async function createAnimal(req, res, next) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new BadRequest(errors.array());
	}

	const { name, age, sex, type, breedName } = req.body;

	const animal = await animalService.createAnimal(
		name,
		age,
		sex,
		type,
		breedName
	);

	res.json(animal);
}

function getAllAnimals(req, res, next) {}

module.exports = {
	createAnimal,
	getAllAnimals,
};
