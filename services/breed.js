const Breed = require("../db/Schema/Breed");
const AnimalType = require("../db/Schema/AnimalType");
const AlreadyExists = require("../utils/errors/AlreadyExists");
const NotFound = require("../utils/errors/NotFound");

async function addBreed(breedName, type) {
  let breed = await Breed.findOne({ breedName });

  if (breed) {
    throw new AlreadyExists("Breed already exists");
  }

  const typeId = await AnimalType.findOne({ type: type });

  if (!typeId) {
    throw new NotFound("Breed not found");
  }

  breed = new Breed({
    breedName,
    type: typeId._id,
  });

  const newBreed = await breed.save();

  return newBreed;
}

module.exports = {
  addBreed,
};
