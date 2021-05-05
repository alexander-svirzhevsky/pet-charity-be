const NotFound = require("../../utils/errors/NotFound");
const AnimalType = require("../../db/Schema/AnimalType");
const Animal = require("../../db/Schema/Animal");
const Breed = require("../../db/Schema/Breed");

async function filterByType(type) {
  const typeId = await AnimalType.findOne({ type });

  if (!typeId) {
    throw new NotFound("Animal type not found");
  }

  const filterByType = await Animal.find({
    type: { $in: [typeId] },
  })
    .populate("type")
    .populate("breedName");

  if (filterByType.length === 0) {
    throw new NotFound("Animal not found");
  }

  return filterByType;
}

async function filterByGender(sex) {
  if (!sex) {
    throw new NotFound("Gender not found");
  }

  const filterByGender = await Animal.find({ sex: sex.toUpperCase() });

  if (filterByGender.length === 0) {
    throw new NotFound("Animal not found");
  }

  return filterByGender;
}

async function filterByBreed(breedName) {
  const breedId = await Breed.findOne({ breedName });

  if (!breedId) {
    throw new NotFound("Breed not found");
  }

  const filterByBreed = await Animal.find({ breedName: { $in: [breedId] } })
    .populate("type")
    .populate("breedName");

  if (filterByBreed.length === 0) {
    throw new NotFound("Animal not found");
  }

  return filterByBreed;
}

module.exports = {
  filterByType,
  filterByGender,
  filterByBreed,
};
