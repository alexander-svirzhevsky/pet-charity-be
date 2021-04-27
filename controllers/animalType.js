const { validationResult } = require("express-validator");

const animalTypeService = require("../services/animalType");
const BadRequest = require("../utils/errors/BadRequest");

async function addAnimalType(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { type } = req.body;

  const addType = await animalTypeService.addAnimalType(type);

  res.json(addType);
}
module.exports = {
  addAnimalType,
};
