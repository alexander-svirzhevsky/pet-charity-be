const AnimalType = require("../../db/Schema/AnimalType");
const Animal = require("../../db/Schema/Animal");
const Breed = require("../../db/Schema/Breed");

async function filtration({ type, sex, breedName }) {
  const typeId = await AnimalType.findOne({ type });
  const breedId = await Breed.findOne({ breedName });

  const filter = {};
  if (type) filter.type = typeId;
  if (sex) filter.sex = sex;
  if (breedName) filter.breedName = breedId;

  return Animal.find(filter).populate("type").populate("breedName");
}

module.exports = {
  filtration,
};
