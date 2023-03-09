let setGameController = {};
const grid = document.querySelector(".grid");
const start = document.querySelector("#start");
start.addEventListener("click", begin);


// Gameboard function controls what is displayed on the board.
// To get it to work properly, you need to input selector of the element that will display the turns and announce the winner.
// The line to input the selector is at the end
// const Gameboard = (selector) => {
const Gameboard = (() => {
	let selectorAnnounce;

	const setSelector = (value) => {
		selectorAnnounce = document.querySelector(value);
	}

	function announce(content) {
		selectorAnnounce.textContent = content;	
	}

	function updateGrid(area, content) {
		let areaToUpdate = document.querySelector(`div[place="${area}"]`);
		areaToUpdate.textContent = content;
	}

	return {updateGrid, announce, setSelector};
})();


// This function controls the game
const GameController = () => {
	Gameboard.announce("It's O's turn.");
	const _gameboard = Array.apply(null, Array(9)).map((x) => "");

	//Check winner of row, col, and diagonal using transitivity of identity
	function _checkWinner() {
		//Check row
		for (let i = 0; i < 7; ) {
			if (
				_gameboard[i] === _gameboard[i + 1] &&
				_gameboard[i + 1] === _gameboard[i + 2] &&
				_gameboard[i] !== ""
			) {
				return _gameboard[i];
			}
			i += 3;
		}

		// Check column
		for (let i = 0; i < 3; i++) {
			if (
				_gameboard[i] === _gameboard[i + 3] &&
				_gameboard[i + 3] === _gameboard[i + 6] &&
				_gameboard[i] !== ""
			) {
				return _gameboard[i];
			}
		}

		//Check diagonal
		if (
			_gameboard[0] === _gameboard[4] &&
			_gameboard[4] === _gameboard[8] &&
			_gameboard[0] !== ""
		) {return _gameboard[0];}

		if (
			_gameboard[2] === _gameboard[4] &&
			_gameboard[4] === _gameboard[6] &&
			_gameboard[2] !== ""
		) {return _gameboard[2];}

		return false
	}

	let _counter = 0;

	// Get input from player and update array
	const updateGame = function (area) {
		// Prevent player from choosing an already filed area
		if (_gameboard[area] !== "") {return}

		let player = _counter % 2 === 0 ? "O" : "X";
		_counter++;

		// Update array
		_gameboard[area] = player;
		// Update Gameboard grid
		Gameboard.updateGrid(area, player);

		//Check if there's a winner
		if (_checkWinner()) {
			grid.removeEventListener("click", gameFunction);
			Gameboard.announce(`And the winner is ${player}!`);
			return;
		} else if (_counter === 9) {
			grid.removeEventListener("click", gameFunction);
			Gameboard.announce(`It's a tie!`);
			return
		}

		let nextSign = _counter % 2 === 0 ? "O" : "X";
		Gameboard.announce(`It's ${nextSign}'s turn.`);
	};

	// Clean array and HTML
	const reset = () => {
		for (let i = 0; i <= 8; i++) {
			Gameboard.updateGrid(i, "");
			_gameboard[i] = "";
		}
		grid.addEventListener("click", gameFunction);
		_counter = 0;
		Gameboard.announce("It's O's turn.");
	};

	return { updateGame, reset };
};

function gameFunction(e) {
	if (e.target.id === "reset") {
		setGameController.reset();
		return;
	}

	let area = e.target.getAttribute("place");
	if (!area) {
		return;
	}
	setGameController.updateGame(area);
}

function begin() {
	setGameController = GameController();
	// Allow players to fill in the grid
	grid.addEventListener("click", gameFunction);

	// Turn reset button on
	const resetBtn = document.querySelector("#reset");
	resetBtn.addEventListener("click", gameFunction);

	//Block start button
	start.removeEventListener('click', begin);
}


// #turn-announce is the div that will display turns and the winner
Gameboard.setSelector("#turn-announce");