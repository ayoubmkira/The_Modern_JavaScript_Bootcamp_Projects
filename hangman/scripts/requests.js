
const getPuzzle = async (wordCount) => {
	const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`);

	if(!response.ok)
		throw Error('Can\'t fetch data!');

	const data = await response.json();
	return data.puzzle;
};
