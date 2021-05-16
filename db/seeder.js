const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const AnimalType = require("./Schema/AnimalType");
const Animal = require("./Schema/Animal");
const Breed = require("./Schema/Breed");

const {
	createAnimalTypeSeeds,
	createBreedSeeds,
	createAnimalSeeds,
} = require("./Seeds");

const seedDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		console.log("Connected to DB...");

		const animalTypeSeeds = createAnimalTypeSeeds();
		const animalTypes = await AnimalType.insertMany(animalTypeSeeds);
		console.log("Animal types have been seeded");

		const breedSeeds = createBreedSeeds(animalTypes);
		const breeds = await Breed.insertMany(breedSeeds);
		console.log("Breeds have been seeded");

		const animalSeeds = createAnimalSeeds(breeds);
		await Animal.insertMany(animalSeeds);
		console.log("Animals have been seeded");

		mongoose.disconnect();
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
};

seedDB();
