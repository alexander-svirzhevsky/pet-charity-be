const Breed = require("../db/Schema/Breed");
const AnimalType = require("../db/Schema/AnimalType");
const Animal = require("../db/Schema/Animal");
const NotFound = require("../utils/errors/NotFound");
const AlreadyExists = require("../utils/errors/AlreadyExists");

async function createAnimal({ name, age, sex, type, breedName }) {
	const animalId = await Animal.findOne({ name });

	if (animalId) {
		throw new AlreadyExists("Animal already exists");
	}

	const typeId = await AnimalType.findOne({ type });

	if (!typeId) {
		throw new NotFound("Animal type not found");
	}

	const breedId = await Breed.findOne({ breedName: breedName });

	if (!breedId) {
		throw new NotFound("Breed not found");
	}

	const newAnimal = new Animal({
		name: name,
		age: age,
		sex: sex,
		type: typeId._id,
		breedName: breedId._id,
	});

	await newAnimal.save();

	return newAnimal;
}

async function getAllAnimals() {
	const allAnimals = await Animal.find().populate("type").populate("breedName");
	return allAnimals;
}

module.exports = {
	createAnimal,
	getAllAnimals,
};