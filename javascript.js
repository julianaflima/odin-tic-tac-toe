
// Decide which turn it is
const whoseTurn = () => {
	let _counter = 0;

	return () => {
		_counter++;
		return (_counter % 2 === 0) ? "O" : "X";
	};
};

// Only deals with updating gameboard
const Gameboard = (() => {
	const _gameboard = Array.apply(null, Array(9)).map(function () {});

	// Array with the index of all empty slots in _gameboar
	// const emptyAreas = _gameboard.map(area => {
	// 	if (!area) {_gameboard.indexOf(searchElement, fromIndex?)}
	// });


	const turn = whoseTurn();

	// Get input from player and update array
	const updateGame = function (area) {
		// Prevent player from choosing an already filed area
		if (_gameboard[area]){
			return console.log("Choose a different area! this one is already taken.")
		}

		// Update array
		_gameboard[area] = turn();
		// Update display
		updateGameboard(area, _gameboard[area]);
		console.log(_gameboard);

		//CHECK IF THERE'S A WINNER
	}

	const resetGame = () => {
		_gameboard.length = 0;
	}
	return {updateGame, resetGame};
})();


// Decides who's turn it is; checks if there's a winner, check if move is allowed
const GameController = (() => {


})();

function updateGameboard(area, content) {
	let areaToUpdate = document.querySelector(`div[place="${area}"]`);
		areaToUpdate.textContent = content;
}


function myFunction(e) {
	let area = e.target.getAttribute('place');
	if (!area) {return}
	Gameboard.updateGame(area);
}
 

function reset() {
	Gameboard.resetGame();
	for (let i = 0; i <=8; i++ ) {
		updateGameboard(i, "")
	}
} 

const grid = document.querySelector(".grid");
grid.addEventListener('click', myFunction);


// ADD RESET BUTTON
const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener('click', reset);


// NOT SURE WHAT TO DO WITH THIS JUST YET
const player = (name, xOrO) => {
	return {name, xOrO};
};


