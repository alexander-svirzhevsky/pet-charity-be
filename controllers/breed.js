const { validationResult } = require("express-validator");

const breedService = require("../services/breed");
const BadRequest = require("../utils/errors/BadRequest");
const BaseResponse = require("../utils/BaseResponse");

async function addBreed(req, res) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new BadRequest(errors.array());
	}

	const breed = await breedService.addBreed(req.body);

	res.json(new BaseResponse(breed, "Breed has been successfully created", 201));
}

module.exports = {
	addBreed,
};
