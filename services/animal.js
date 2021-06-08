const Breed = require("../db/Schema/Breed");
const AnimalType = require("../db/Schema/AnimalType");
const Animal = require("../db/Schema/Animal");
const Profile = require("../db/Schema/Profile");
const NotFound = require("../utils/errors/NotFound");
const AlreadyExists = require("../utils/errors/AlreadyExists");
const BadRequest = require("../utils/errors/BadRequest");
const { runInTransaction } = require("mongoose-transact-utils");
const cloudinary = require("../utils/cloudinary/cloudinary");

async function createAnimal({ name, age, sex, type, breedName }, file) {
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

  if (!file) {
    throw new BadRequest({
      msg: "Please attached a photo",
      param: "file",
      location: "body",
    });
  }

  const result = await cloudinary.uploader.upload(file.path);

  const newAnimal = new Animal({
    name,
    age,
    sex,
    type: typeId._id,
    breedName: breedId._id,
    avatar: result.secure_url,
    cloudinary_id: result.public_id,
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

    const animal = await Animal.findOne({ _id: id });

    await cloudinary.uploader.destroy(animal.cloudinary_id);

    await Animal.findOneAndRemove({ _id: id });
  });
}

module.exports = {
  createAnimal,
  getAllAnimals,
  deleteAnimal,
};
