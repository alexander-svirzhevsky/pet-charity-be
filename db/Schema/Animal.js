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
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

module.exports = mongoose.model("animal", AnimalSchema);
