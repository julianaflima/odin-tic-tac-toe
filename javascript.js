const GameController = (() => {
	const _gameboard = Array.apply(null, Array(9)).map(x => "");

	const turnPara = document.querySelector('#turn-announce')
	turnPara.textContent = "It's O's turn";

	function _updateGameboard(area, content) {
		let areaToUpdate = document.querySelector(`div[place="${area}"]`);
			areaToUpdate.textContent = content;
	}

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
		if (_gameboard[area]){
			return console.log("Choose a different area! this one is already taken.")
		}

		let sign = (_counter % 2 === 0) ? "O" : "X";
		_counter++;

		// Update array
		_gameboard[area] = sign;
		// Update display
		_updateGameboard(area, _gameboard[area]);

		//CHECK IF THERE'S A WINNER
		if (_checkWinnerRow() || _checkWinnerCol() || _checkWinnerDiag()) {
			grid.removeEventListener('click', myFunction)

			// Display winner
			turnPara.textContent = `And the winner is ${_gameboard[area]}!`;
			return 
		}
		else if (_counter === 9) {
			grid.removeEventListener('click', myFunction)
			console.log("It's a tie!");
		}

		let nextSign = (_counter % 2 === 0) ? "O" : "X"
		turnPara.textContent = `It's ${nextSign}'s turn`; 
	}

	// Clean array and HTML
	const reset = () => {
		for (let i = 0; i <=8; i++ ) {
			_updateGameboard(i, "");
			_gameboard[i] = "";
		}
		grid.addEventListener('click', myFunction);
		_counter = 0;
		turnPara.textContent = "It's O's turn";
	} 

	return {updateGame, reset};
})();


function myFunction(e) {
	if (e.target.id === "reset") {
		GameController.reset();
		return
	}

	let area = e.target.getAttribute('place');
	if (!area) {return}
	console.log(GameController.updateGame(area));
}

const grid = document.querySelector(".grid");
grid.addEventListener('click', myFunction);


// ADD RESET BUTTON
const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener('click', myFunction);






// NOT SURE WHAT TO DO WITH THIS JUST YET
const player = (name, xOrO) => {
	return {name, xOrO};
};

