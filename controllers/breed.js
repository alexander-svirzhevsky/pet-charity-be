const { validationResult } = require("express-validator");

const breedService = require("../services/breed");
const BadRequest = require("../utils/errors/BadRequest");

async function addBreed(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { breedName, type } = req.body;

  const addBreed = await breedService.addBreed(breedName, type);

  res.json(addBreed);
}

module.exports = {
  addBreed,
};
