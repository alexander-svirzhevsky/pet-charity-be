const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
	},
	sex: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "animalType",
	},
	breedName: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "breed",
	},
});

module.exports = mongoose.model("animal", AnimalSchema);
