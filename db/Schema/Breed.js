const mongoose = require("mongoose");

const Breed = new mongoose.Schema({
  breedName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("breed", Breed);
