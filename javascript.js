const GameController = (() => {
	const _gameboard = Array.apply(null, Array(9)).map(x => "");
	const gameboard = () => {console.log(_gameboard)};
	
	const _whosTurn = () => {
		let _counter = 0;
		return () => {
			const play = (_counter % 2 === 0) ? "O" : "X"
			_counter++;
			return play;
		};
	};
	const turn = _whosTurn();

	function _updateGameboard(area, content) {
		let areaToUpdate = document.querySelector(`div[place="${area}"]`);
			areaToUpdate.textContent = content;
	}

	//Check winner WITHOUT USING HTML
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
	
	// Get input from player and update array
	const updateGame = function (area, e) {
		// Prevent player from choosing an already filed area
		if (_gameboard[area]){
			return console.log("Choose a different area! this one is already taken.")
		}
		// Update array
		_gameboard[area] = turn();
		// Update display
		_updateGameboard(area, _gameboard[area]);
		console.log(_gameboard);		

		//CHECK IF THERE'S A WINNER
		if (_checkWinnerRow() || _checkWinnerCol() || _checkWinnerDiag()) {
			grid.removeEventListener('click', myFunction)
			console.log(`And the winner is ${_gameboard[area]}`)
		}
	}

	// Clean array and HTML
	const reset = () => {
		for (let i = 0; i <=8; i++ ) {
			_updateGameboard(i, "");
			_gameboard[i] = "";
		}
		grid.addEventListener('click', myFunction);
	} 

	return {updateGame, reset, gameboard};
})();





function myFunction(e) {
	if (e.target.id === "reset") {
		GameController.reset();
		return
	}

	let area = e.target.getAttribute('place');
	if (!area) {return}
	GameController.updateGame(area, e);
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

