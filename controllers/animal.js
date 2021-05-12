const { validationResult } = require("express-validator");

const animalService = require("../services/animal");
const BadRequest = require("../utils/errors/BadRequest");
const BaseResponse = require("../utils/BaseResponse");
const NotFound = require("../utils/errors/NotFound");

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

  if (animals.length === 0) {
    throw new NotFound("Animals not found");
  }

  res.json(new BaseResponse(animals));
}

async function deleteAnimal(req, res) {
  const { id } = req.params;

  await animalService.deleteAnimal(id);

  res.json(new BaseResponse("Animal & profile removed"));
}

module.exports = {
  createAnimal,
  getAllAnimals,
  deleteAnimal,
};
