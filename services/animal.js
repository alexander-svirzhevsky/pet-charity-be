const Breed = require("../db/Schema/Breed");
const TypeOfAnimal = require("../db/Schema/TypeOfAnimal");
const Animal = require("../db/Schema/Animal");
const NotFound = require("../utils/errors/NotFound");

async function createAnimal(name, age, sex, type, breedName) {
	const typeId = await TypeOfAnimal.findOne({ type: type });

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

	const animal = await newAnimal.save();

	return animal;
}

function getAllAnimals() {}

module.exports = {
	createAnimal,
	getAllAnimals,
};
