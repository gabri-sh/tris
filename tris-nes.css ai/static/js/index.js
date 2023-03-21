let cells = document.querySelectorAll(".button");
let resetBtn = document.querySelector(".resetBtn");
//let isGameFinish = false;
let output = document.querySelector(".output");

function checkWinner(grid) {
	let winner = null;
	for (let i = 0; i < 3; i++) {
		if (
			grid[i][0] != null &&
			grid[i][0] === grid[i][1] &&
			grid[i][1] === grid[i][2]
		) {
			winner = grid[i][0];
			return winner;
		}
	}

	for (let j = 0; j < 3; j++) {
		if (
			grid[0][j] != null &&
			grid[0][j] === grid[1][j] &&
			grid[1][j] === grid[2][j]
		) {
			winner = grid[0][j];
			return winner;
		}
	}

	if (
		grid[0][0] != null &&
		grid[0][0] === grid[1][1] &&
		grid[1][1] === grid[2][2]
	) {
		winner = grid[0][0];
		return winner;
	}

	if (
		grid[0][2] != null &&
		grid[0][2] === grid[1][1] &&
		grid[1][1] === grid[2][0]
	) {
		winner = grid[0][2];
		return winner;
	}

	let openSpots = 0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (grid[i][j] === null) {
				openSpots++;
			}
		}
	}

	if (winner === null && openSpots === 0) {
		return "pareggio";
	} else {
		return winner;
	}
}

resetBtn.addEventListener("click", (event) => {
	event.preventDefault();
	location.reload();
});

let currentPlayer = "X";
let grid = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

function getEmptyCells(grid) {
	let emptyCells = [];
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (grid[i][j] === null) {
				emptyCells.push([i, j]);
			}
		}
	}
	return emptyCells;
}

function trovaCella(v1, v2) {
	let posizioneCella;
	if (v1 == 0 && v2 == 0) {
		posizioneCella = 0;
	} else if (v1 == 0 && v2 == 1) {
		posizioneCella = 1;
	} else if (v1 == 0 && v2 == 2) {
		posizioneCella = 2;
	} else if (v1 == 1 && v2 == 0) {
		posizioneCella = 3;
	} else if (v1 == 1 && v2 == 1) {
		posizioneCella = 4;
	} else if (v1 == 1 && v2 == 2) {
		posizioneCella = 5;
	} else if (v1 == 2 && v2 == 0) {
		posizioneCella = 6;
	} else if (v1 == 2 && v2 == 1) {
		posizioneCella = 7;
	} else {
		posizioneCella = 8;
	}

	return posizioneCella;
}

function getBestMove(grid, player) {
	let bestScore = player === "X" ? Infinity : -Infinity,
		bestMove = [],
		empty = getEmptyCells(grid);

	empty.forEach((emptyCell) => {
		let i = emptyCell[0];
		let j = emptyCell[1];
		grid[i][j] = player === "X" ? "X" : "O";
		let currentMoveScore = minimax(grid, player === "X" ? "O" : "X");
		if (player === "X") {
			// min
			if (currentMoveScore <= bestScore) {
				bestScore = currentMoveScore;
				bestMove = [i, j];
			}
		} else {
			if (currentMoveScore >= bestScore) {
				bestScore = currentMoveScore;
				bestMove = [i, j];
			}
		}
		grid[i][j] = null;
	});
	console.log(bestScore)
	return bestMove;
}

function minimax(grid, player) {
	let bestScore;

	if (player === "O") {
		bestScore = -Infinity;
	} else {
		bestScore = Infinity;
	}

	let emptyCells = getEmptyCells(grid);
	let vincitore = checkWinner(grid);

	//controllo il vincitore
	if (vincitore != null) {
		if (vincitore === "O") {
			return 1;
		} else if (vincitore === "X") {
			return -1;
		} else if (vincitore === "pareggio") {
			return 0;
		}
	} else {
		if (player === "O") {
			emptyCells.forEach(function (element) {
				let i = element[0];
				let j = element[1];
				grid[i][j] = "O";
				let score = minimax(grid, "X");
				bestScore = Math.max(score, bestScore);
				grid[i][j] = null;
			});
			return bestScore;
		} else {
			emptyCells.forEach(function (element) {
				let i = element[0];
				let j = element[1];
				grid[i][j] = "X";
				let score = minimax(grid, "O");
				bestScore = Math.min(bestScore, score);
				grid[i][j] = null;
			});
			return bestScore;
		}
	}

	return bestScore;
}
cellIsOccupied = true;
let v1, v2;

function playAudio(url) {
	let audio = new Audio(url);
	audio.play();
}

for (let i = 0; i < cells.length; i++) {
	cells[i].addEventListener("click", function (e) {
		e.preventDefault();

		cellIsOccupied =
			e.currentTarget.classList.contains("player2") ||
			e.currentTarget.classList.contains("player1");

		winner = checkWinner(grid);

		if (!cellIsOccupied && winner === null) {
			v1 = cells[i].dataset.row;
			v2 = cells[i].dataset.cell;

			e.currentTarget.classList.toggle("player1");
			cells[i].classList.add("nes-icon");
			cells[i].classList.add("close");
			cells[i].classList.add("is-medium");
			playAudio("static/sound/playerX.mp3");
			grid[v1][v2] = "X";

			winner = checkWinner(grid);

			if (winner === "X") {
				playAudio("static/sound/win.mp3");
				output.innerHTML = `hai vinto player ${currentPlayer}`;
				output.classList.add("colorOutput");
			} else if (winner === "pareggio") {
				playAudio("static/sound/lose.mp3");
				output.innerHTML = `pareggio`;
				output.classList.add("colorOutput");
			} else {
				let mossaMigliore = getBestMove(grid, "O");
				v1 = mossaMigliore[0];
				v2 = mossaMigliore[1];
				grid[v1][v2] = "O";
				let mossaDaEseguire = trovaCella(v1, v2);
				cells[mossaDaEseguire].classList.toggle("player2");
				cells[mossaDaEseguire].classList.add("nes-icon");
				cells[mossaDaEseguire].classList.add("coin");
				cells[mossaDaEseguire].classList.add("is-medium");

				winner = checkWinner(grid);

				if (winner === "O") {
					playAudio("static/sound/lose.mp3");
					output.innerHTML = `hai vinto player O`;
					output.classList.add("colorOutput");
				}
			}
		}
	});
}
