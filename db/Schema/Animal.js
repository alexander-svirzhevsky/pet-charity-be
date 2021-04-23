const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
    ref: "typeOfAnimal",
  },
});

module.exports = mongoose.model("animal", AnimalSchema);
