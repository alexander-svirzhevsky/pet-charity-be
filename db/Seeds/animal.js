const petNames = [
	"Bella",
	"Charlie",
	"Luna",
	"Lucy",
	"Max",
	"Bailey",
	"Cooper",
	"Daisy",
	"Sadie",
	"Molly",
	"Buddy",
	"Lola",
	"Stella",
	"Tucker",
	"Bentley",
	"Zoey",
	"Harley",
	"Maggie",
	"Riley",
	"Bear",
	"Sophie",
	"Duke",
];

function createAnimalSeeds(breeds) {
	const animals = [];

	breeds.forEach((breed) => {
		animals.push({
			name: petNames[Math.floor(Math.random() * petNames.length)],
			age: Math.floor(Math.random() * 20 + 1),
			sex: Math.random() > 0.5 ? "he" : "she",
			breedName: breed._id,
			type: breed.type,
		});
	});

	return animals;
}

module.exports = createAnimalSeeds;
