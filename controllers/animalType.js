const { validationResult } = require("express-validator");

const animalTypeService = require("../services/animalType");
const BadRequest = require("../utils/errors/BadRequest");
const BaseResponse = require("../utils/BaseResponse");

async function addAnimalType(req, res) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new BadRequest(errors.array());
	}

	const type = await animalTypeService.addAnimalType(req.body);

	res.json(new BaseResponse(type));
}
module.exports = {
	addAnimalType,
};
