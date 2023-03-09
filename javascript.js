// Gameboard function controls what is displayed on the board.
// To get it to work properly, you need to input selector of the element that will display the turns and announce the winner.
// The line to input the selector is at the end
const Gameboard = (selector) => {

	let selectorAnnounce = document.querySelector(selector);

	function updateTurn(content) {
		selectorAnnounce.textContent = `It's ${content}'s turn.`;
	}

	function announceWinner(content) {
		selectorAnnounce.textContent = `And the winner is ${content}!`;
	}

	function updateGrid(area, content) {
		let areaToUpdate = document.querySelector(`div[place="${area}"]`);
			areaToUpdate.textContent = content;
	}

	return {updateTurn, updateGrid, announceWinner}
}


// This function initializes and controls the game
const GameController = () => {
	setGameboard.updateTurn("O");
	const _gameboard = Array.apply(null, Array(9)).map(x => "");

	//Check winner of row, col, and diagonal using transitivity of identity
	function _checkWinnerRow() {
		for (let i = 0; i < 7;){
			if (_gameboard[i] === _gameboard[i+1] && _gameboard[i+1] === _gameboard[i+2] && _gameboard[i] !== "") {
				return _gameboard[i];
			}
			i += 3;
		}
		return false;
	}

	function _checkWinnerCol() {
		for (let i = 0; i < 3; i++) {
			if (_gameboard[i] === _gameboard[i+3] && _gameboard[i+3] === _gameboard[i + 6] && _gameboard[i] !== "") {
				return _gameboard[i];
			}
		}
	}

	function _checkWinnerDiag() {
		if (_gameboard[0] === _gameboard[4] && _gameboard[4] === _gameboard[8] && _gameboard[0] !== "") {
			return _gameboard[0];
		}

		if (_gameboard[2] === _gameboard[4] && _gameboard[4] === _gameboard[6] && _gameboard[2] !== "") {
			return _gameboard[2];
		}

	}

	let _counter =0;
	
	// Get input from player and update array
	const updateGame = function (area) {
		// Prevent player from choosing an already filed area
		if (_gameboard[area] !== ""){
			// console.log(_gameboard);
			console.log("Choose a different area! this one is already taken.")
			return 
		}

		let sign = (_counter % 2 === 0) ? "O" : "X";
		_counter++;

		// Update array
		_gameboard[area] = sign;
		// Update Gameboard grid
		setGameboard.updateGrid(area, sign);

		//CHECK IF THERE'S A WINNER
		if (_checkWinnerRow() || _checkWinnerCol() || _checkWinnerDiag()) {
			grid.removeEventListener('click', myFunction)

			// Display winner
			setGameboard.announceWinner(sign);
			return 
		}
		else if (_counter === 9) {
			grid.removeEventListener('click', myFunction)
			console.log("It's a tie!");
		}

		let nextSign = (_counter % 2 === 0) ? "O" : "X"
		setGameboard.updateTurn(nextSign);

		return sign;
	}

	// Clean array and HTML
	const reset = () => {
		for (let i = 0; i <=8; i++ ) {
			setGameboard.updateGrid(i, "");
			_gameboard[i] = "";
		}
		grid.addEventListener('click', myFunction);
		_counter = 0;
		setGameboard.updateTurn("O");
	} 

	return {updateGame, reset};
}





function myFunction(e) {
	if (e.target.id === "reset") {
		setGameController.reset();
		return
	}

	if (e.target.id === "start") {
		// Begin game
		setGameController = GameController();

		// Maake reset button to function

	}

	let area = e.target.getAttribute('place');
	if (!area) {return}
		setGameController.updateGame(area);
}

const grid = document.querySelector(".grid");
grid.addEventListener('click', myFunction);

const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener('click', myFunction);



// This determines the div that will display turns and the winner
const setGameboard = Gameboard("#turn-announce");

// This begins the game
let setGameController = GameController();

