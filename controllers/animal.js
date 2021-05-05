const { validationResult } = require("express-validator");

const animalService = require("../services/animal");
const BadRequest = require("../utils/errors/BadRequest");
const BaseResponse = require("../utils/BaseResponse");

async function createAnimal(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const animal = await animalService.createAnimal(req.body);

  res.json(
    new BaseResponse(animal, "Animal has been successfully created", 201)
  );
}

async function getAllAnimals(req, res) {
  const animals = await animalService.getAllAnimals(req.query);

  res.json(new BaseResponse(animals));
}

async function deleteAnimal(req, res) {
  await animalService.deleteAnimal(req.body);

  res.json(new BaseResponse("Animal & profile removed"));
}

module.exports = {
  createAnimal,
  getAllAnimals,
  deleteAnimal,
};
