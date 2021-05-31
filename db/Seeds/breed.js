function createBreedSeeds(animalTypes) {
	const breeds = [];

	animalTypes.forEach(({ _id }) => {
		breeds.push(
			{
				breedName: "beautiful",
				type: _id,
			},
			{
				breedName: "strange",
				type: _id,
			},
			{
				breedName: "creepy",
				type: _id,
			}
		);
	});

	return breeds;
}

module.exports = createBreedSeeds;
