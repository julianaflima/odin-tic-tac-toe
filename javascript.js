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
	function checkWinner() {

		return;
	}
	
	// Get input from player and update array
	const updateGame = function (area) {
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

	}

	// Clean array and HTML
	const reset = () => {
		_gameboard.length = 0;
		for (let i = 0; i <=8; i++ ) {
			_updateGameboard(i, "");
		}
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
	GameController.updateGame(area);
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

