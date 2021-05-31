const { validationResult } = require("express-validator");

const animalService = require("../services/animal");
const BadRequest = require("../utils/errors/BadRequest");
const BaseResponse = require("../utils/BaseResponse");
const NotFound = require("../utils/errors/NotFound");

const AnimalType = require("../db/Schema/AnimalType");
const Breed = require("../db/Schema/Breed");

async function createAnimal(req, res) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new BadRequest(errors.array());
	}

	const animal = await animalService.createAnimal(req.body);

	res.json(
		new BaseResponse(animal, "Animal has been successfully created", 201)
	);
}

async function getAllAnimals(req, res) {
	const { type, sex, breedName } = req.query;

	const typeId = await AnimalType.findOne({ type });
	const breedId = await Breed.findOne({ breedName });

	const filter = {};
	if (type) filter.type = typeId;
	if (sex) filter.sex = sex;
	if (breedName) filter.breedName = breedId;

	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const skipIndex = (page - 1) * limit;

	const { animals, count } = await animalService.getAllAnimals(
		filter,
		limit,
		skipIndex
	);

	if (animals.length === 0) {
		throw new NotFound("Animals not found");
	}

	res.json(
		new BaseResponse({
			animals,
			count,
		})
	);
}

async function deleteAnimal(req, res) {
	const { id } = req.params;

	await animalService.deleteAnimal(id);

	res.json(new BaseResponse("Animal & profile removed"));
}

module.exports = {
	createAnimal,
	getAllAnimals,
	deleteAnimal,
};
