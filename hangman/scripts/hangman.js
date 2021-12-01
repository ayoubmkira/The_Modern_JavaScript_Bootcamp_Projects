
class Hangman {

	constructor (word, remainingGuesses) {
		this.word = word.toLowerCase().split('');
		this.remainingGuesses = remainingGuesses;
		this.guessedLetters = [];
		this.status = 'playing';
	}

	get puzzle () {
		let puzzle = '';

		this.word.forEach((letter) => {
			puzzle += (letter === ' ' || this.guessedLetters.includes(letter))? letter: '*'; 
		});

		return puzzle;
	}

	makeGuess (guess) {
		guess = guess.toLowerCase();
		const isUnique = !this.guessedLetters.includes(guess);
		const isBadGuess = !this.word.includes(guess);

		if(this.status !== 'playing')
			return;

		if(isUnique) {
			if(isBadGuess) {
				this.remainingGuesses--;
			}
			this.guessedLetters.push(guess);
		}
		this.recalculateStatus();
	}

	recalculateStatus () {
		const allGuessed = this.word.every(char => {
			return char === ' ' || this.guessedLetters.includes(char);
		});

		if(this.remainingGuesses <= 0) {
			this.status = 'failed';
		} else if(allGuessed) {
			this.status = 'finished';
		} else {
			this.status = 'playing';
		}
	}

	get statusMessage () {
		let message = '';

		if(this.status === 'failed') {
			message = `Nice try! The word was "${this.word.join('')}".`;
		} else if(this.status === 'finished') {
			message = 'Great work! You guessed the word.';		
		} else {
			message = `Guesses Left: ${this.remainingGuesses}.`;		
		}

		return message;
	}

}


