const Breed = require("../db/Schema/Breed");
const AnimalType = require("../db/Schema/AnimalType");
const Animal = require("../db/Schema/Animal");
const NotFound = require("../utils/errors/NotFound");

async function createAnimal(name, age, sex, type, breedName) {
  const typeId = await AnimalType.findOne({ type: type });

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

async function getAllAnimals() {
  const allAnimals = await Animal.find().populate("type").populate("breedName");
  return allAnimals;
}

module.exports = {
  createAnimal,
  getAllAnimals,
};
