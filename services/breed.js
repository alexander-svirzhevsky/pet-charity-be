const Breed = require("../db/Schema/Breed");
const AnimalType = require("../db/Schema/AnimalType");
const AlreadyExists = require("../utils/errors/AlreadyExists");
const NotFound = require("../utils/errors/NotFound");

async function addBreed({ breedName, type }) {
	let breed = await Breed.findOne({ breedName });

	if (breed) {
		throw new AlreadyExists("Breed already exists");
	}

	const typeId = await AnimalType.findOne({ type });

	if (!typeId) {
		throw new NotFound("Animal type not found");
	}

	breed = new Breed({
		breedName,
		type: typeId._id,
	});

	await breed.save();

	return breed;
}

module.exports = {
	addBreed,
};
