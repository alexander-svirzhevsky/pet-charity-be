const Profile = require("../db/Schema/Profile");
const Animal = require("../db/Schema/Animal");
const NotFound = require("../utils/errors/NotFound");

async function createProfile({ name, age, color, size, story }) {
  const animalId = await Animal.findOne({ name });

  if (!animalId) {
    throw new NotFound("Animal not found");
  }

  const profileFields = {};
  profileFields.animal = animalId;
  if (age) profileFields.age = age;
  if (color) profileFields.color = color;
  if (size) profileFields.size = size;
  if (story) profileFields.story = story;

  let profile = await Profile.findOne({ animal: animalId._id });

  if (profile) {
    profile = await Profile.findOneAndUpdate(
      { animal: animalId._id },
      { $set: profileFields },
      { new: true }
    );

    return profile;
  }

  const newProfile = new Profile(profileFields);

  await newProfile.save();

  return newProfile;
}

async function getAllProfiles() {
  const profiles = await Profile.find().populate("animal");

  return profiles;
}

async function getCurrentProfile(animal_id) {
  const profile = await Profile.findOne({ animal: animal_id }).populate([
    {
      path: "animal",
      populate: {
        path: "type",
        model: "animalType",
      },
    },
    {
      path: "animal",
      populate: {
        path: "breedName",
        model: "breed",
      },
    },
  ]);

  if (!profile) {
    throw new NotFound("There is no profile for this animal");
  }

  return profile;
}

module.exports = {
  createProfile,
  getAllProfiles,
  getCurrentProfile,
};
