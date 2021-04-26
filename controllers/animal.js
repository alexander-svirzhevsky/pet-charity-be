const { validationResult } = require("express-validator");

const animalService = require("../services/animal");
const BadRequest = require("../utils/errors/BadRequest");
const BaseResponse = require("../utils/BaseResponse");

async function createAnimal(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { name, age, sex, type, breedName } = req.body;

  const animal = await animalService.createAnimal(
    name,
    age,
    sex,
    type,
    breedName
  );

  res.json(animal);
}

async function getAllAnimals(req, res, next) {
  const animals = await animalService.getAllAnimals();

  res.json(new BaseResponse(animals));
}

module.exports = {
  createAnimal,
  getAllAnimals,
};
