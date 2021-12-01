"use strict";

const word_elm = document.getElementById('word');
const left_guesses_elm = document.getElementById('left-guesses');
const btn_reset_elm = document.getElementById('reset');
let game1;

const insertDataIntoDOM = () => {

	word_elm.innerHTML = game1.puzzle.split('').map((char) => {
		return (char === ' ')? `<span class="empty"></span>`: `<span>${char}</span>`;
	}).join('');
	left_guesses_elm.textContent = game1.statusMessage;

};

const startGame = async () => {

	try {
		const puzzle = await getPuzzle(2);
		game1 = new Hangman(puzzle, 5);
		insertDataIntoDOM();
	} catch(err) {
		console.log(err);
	}

};

window.addEventListener('keydown', (e) => {

	if(e.keyCode >= 65 && e.keyCode <= 90) {
		const guess = e.key.toLowerCase();
		game1.makeGuess(guess);
		insertDataIntoDOM();
	}

});

btn_reset_elm.addEventListener('click', startGame);

startGame();
