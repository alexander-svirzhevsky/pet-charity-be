const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "animal",
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("profile", AnimalSchema);
