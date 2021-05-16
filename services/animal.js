const Breed = require("../db/Schema/Breed");
const AnimalType = require("../db/Schema/AnimalType");
const Animal = require("../db/Schema/Animal");
const Profile = require("../db/Schema/Profile");
const NotFound = require("../utils/errors/NotFound");
const AlreadyExists = require("../utils/errors/AlreadyExists");
const { runInTransaction } = require("mongoose-transact-utils");

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

async function getAllAnimals(filter, limit, skipIndex) {
	const query = Animal.find(filter)
		.populate("type")
		.populate("breedName")
		.sort({ _id: 1 });

	if (limit) {
		query.limit(limit);
	}

	if (skipIndex) {
		query.skip(skipIndex);
	}

	const count = await Animal.countDocuments(filter);

	const animals = await query.exec();

	return { animals, count };
}

async function deleteAnimal(id) {
	await runInTransaction(async () => {
		await Profile.findOneAndRemove({ animal: id });

		await Animal.findOneAndRemove({ _id: id });
	});
}

module.exports = {
	createAnimal,
	getAllAnimals,
	deleteAnimal,
};
