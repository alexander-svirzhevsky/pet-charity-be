const mongoose = require("mongoose");

const Breed = new mongoose.Schema({
  breedName: {
    type: String,
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "animalType",
  },
});

module.exports = mongoose.model("breed", Breed);
