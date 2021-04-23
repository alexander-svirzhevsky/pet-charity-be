const mongoose = require("mongoose");

const TypeOfAnimalSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  breed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "breed",
    },
  ],
});

module.exports = mongoose.model("typeOfAnimal", TypeOfAnimalSchema);
