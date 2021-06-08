const BadRequest = require("../../utils/errors/BadRequest");

const createAnimalValidationFields = ({ name, age, sex, breedName, type }) => {
  if (!name) {
    throw new BadRequest({
      msg: "Please inclide a valid name",
      param: "name",
      location: "body",
    });
  }

  if (!age || isNaN(age)) {
    throw new BadRequest({
      msg: "Please inclide a valid age",
      param: "age",
      location: "body",
    });
  }

  if (!sex || !isNaN(sex)) {
    throw new BadRequest({
      msg: "Please inclide a valid gender",
      param: "sex",
      location: "body",
    });
  }

  if (!breedName) {
    throw new BadRequest({
      msg: "Please inclide a valid breed",
      param: "breedName",
      location: "body",
    });
  }

  if (!type) {
    throw new BadRequest({
      msg: "Please inclide a valid type of animal",
      param: "type",
      location: "body",
    });
  }
};

module.exports = createAnimalValidationFields;
