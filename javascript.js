const Gameboard = (() => {
	const gameboard = [];

	// Get input from player and update array
	const updateBoard = function () {
		gameboard.forEach( position => {
		const place = document.querySelector(`div[place="${gameboard.indexOf(position)}"]`);
		place.textContent = position.toUpperCase();
		});
	}
	return {gameboard, updateBoard};
})();

const gameFlow = (() => {
	// Not sure what to have here yet

	return {}
})();

const player = (name) => {
	return {name};
};


const player1 = player('José');


Gameboard.updateBoard();