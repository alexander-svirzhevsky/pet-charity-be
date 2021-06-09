const BadRequest = require("../../utils/errors/BadRequest");

const createAnimalValidationFields = ({ name, age, sex, breedName, type }) => {
  if (!name) {
    throw new BadRequest(
      {
        msg: "Please include a valid name",
        param: "name",
        location: "body",
      },
      (message = "Please include a valid name")
    );
  }

  if (!sex || !isNaN(sex)) {
    throw new BadRequest(
      {
        msg: "Please include a valid gender",
        param: "sex",
        location: "body",
      },
      (message = "Please include a valid gender")
    );
  }

  if (!breedName) {
    throw new BadRequest(
      {
        msg: "Please include a valid breed",
        param: "breedName",
        location: "body",
      },
      (message = "Please include a valid breed")
    );
  }

  if (!type) {
    throw new BadRequest(
      {
        msg: "Please include a valid type of animal",
        param: "type",
        location: "body",
      },
      (message = "Please include a valid type of anima")
    );
  }
};

module.exports = createAnimalValidationFields;
