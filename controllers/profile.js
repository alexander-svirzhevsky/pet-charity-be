const { validationResult } = require("express-validator");

const profileService = require("../services/profile");
const BadRequest = require("../utils/errors/BadRequest");
const BaseResponse = require("../utils/BaseResponse");

async function createProfile(req, res) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new BadRequest(errors.array());
	}

	const profile = await profileService.createProfile(req.body);

	res.json(new BaseResponse(profile));
}

async function getAllProfiles(_, res) {
	const profiles = await profileService.getAllProfiles();

	res.json(new BaseResponse(profiles));
}

async function getCurrentProfile(req, res) {
	const { animal_id } = req.params;

	const profile = await profileService.getCurrentProfile(animal_id);

	res.json(new BaseResponse(profile));
}

module.exports = {
	createProfile,
	getAllProfiles,
	getCurrentProfile,
};
