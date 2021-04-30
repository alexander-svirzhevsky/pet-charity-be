const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "animal",
  },
  location: [
    {
      country: {
        type: String,
        required: true,
      },
      web: {
        type: String,
      },
      phone: {
        type: Number,
        required: true,
      },
    },
  ],
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
