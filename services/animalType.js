const AnimalType = require("../db/Schema/AnimalType");
const AlreadyExists = require("../utils/errors/AlreadyExists");

async function addAnimalType(type) {
  let animalType = await AnimalType.findOne({ type });

  if (animalType) {
    throw new AlreadyExists("Type already exists");
  }

  animalType = new AnimalType({
    type,
  });

  const newType = await animalType.save();

  return newType;
}

module.exports = {
  addAnimalType,
};
