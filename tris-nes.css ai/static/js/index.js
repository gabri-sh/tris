let cells = document.querySelectorAll(".button");
let resetBtn = document.querySelector(".resetBtn");
let isGameFinish = false;
let output = document.querySelector(".output");

function checkWinner(grid, contatore) {
	let winner;
	for (let i = 0; i < 3; i++) {
		if (
			grid[i][0] != null &&
			grid[i][0] === grid[i][1] &&
			grid[i][1] === grid[i][2]
		) {
			isGameFinish = true;
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
			isGameFinish = true;
			winner = grid[0][j];
			return winner;
		}
	}

	if (
		grid[0][0] != null &&
		grid[0][0] === grid[1][1] &&
		grid[1][1] === grid[2][2]
	) {
		isGameFinish = true;
		winner = grid[0][0];
		return winner;
	}

	if (
		grid[0][2] != null &&
		grid[0][2] === grid[1][1] &&
		grid[1][1] === grid[2][0]
	) {
		isGameFinish = true;
		winner = grid[0][2];
		return winner;
	}

	//controllo per il pareggio

	if (contatore >= 9 && !isGameFinish) {
		isGameFinish = true;
		return "pareggio";
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
	let bestScore;
	if (player === "X") {
		bestScore = Infinity;
	} else if (player === "O") {
		bestScore = -Infinity;
	}

	let bestMove = null;
	let emptyCells = getEmptyCells(grid);

	emptyCells.forEach(function (element) {
		//console.log("celle vuote" + element)
		i = element[0];
		j = element[j];
		grid[i][j] = player;

		let currentMoveScore = minimax(grid, player);
		grid[i][j] = null;

		if (currentMoveScore > bestScore) {
			bestScore = currentMoveScore;
			bestMove = [i, j];
		} else {
			bestScore = currentMoveScore;
			bestMove = [i, j];
		}
	});
	return bestMove;
}

let scores = {
	X: -1,
	O: 1,
	pareggio: 0,
};

function minimax(grid, player) {
	let bestScore;
	let score;
	if (player === "O") {
		bestScore = Infinity;
	} else {
		bestScore = -Infinity;
	}

	let emptyCells = getEmptyCells(grid);

	if (isGameFinish) {
		let vincitore = checkWinner(grid, contatore);
		if (vincitore === "O") {
			return 1;
		} else if (vincitore === "X") {
			return 1;
		} else if (vincitore === "pareggio") {
			return 0;
		}
	} else {
		if (player === "O") {
			emptyCells.forEach(function (element) {
				let i = element[0];
				let j = element[1];

				grid[i][j] = player;

				score = minimax(grid, "X");

				grid[i][j] = null;
			});
			bestScore = Math.max(bestScore, score);
		} else {
			emptyCells.forEach(function (element) {
				let i = element[0];
				let j = element[1];
				grid[i][j] = player;
				score = minimax(grid, "O");
				grid[i][j] = null;
			});
			bestScore = Math.max(bestScore, score);
		}
	}

	return bestScore;
}

let count = 0;

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

		if (!cellIsOccupied && !isGameFinish) {
			v1 = cells[i].dataset.row;
			v2 = cells[i].dataset.cell;

			e.currentTarget.classList.toggle("player1");
			cells[i].classList.add("nes-icon");
			cells[i].classList.add("close");
			cells[i].classList.add("is-medium");
			playAudio("static/sound/playerX.mp3");
			grid[v1][v2] = "X";

			count = count + 2;
			winner = checkWinner(grid, count);

			if (winner === "X") {
				playAudio("static/sound/win.mp3");
				output.innerHTML = `hai vinto player ${currentPlayer}`;
				output.classList.add("colorOutput");
			} else if (count >= 9 && winner === "pareggio") {
				playAudio("static/sound/lose.mp3");
				output.innerHTML = `pareggio`;
				output.classList.add("colorOutput");
			} else {
				let mossaMigliore = getBestMove(grid, "X");
				let x = mossaMigliore[0];
				let y = mossaMigliore[1];
				let mossaDaEseguire = trovaCella(x, y);
				cells[mossaDaEseguire].classList.toggle("player2");
				cells[mossaDaEseguire].classList.add("nes-icon");
				cells[mossaDaEseguire].classList.add("coin");
				cells[mossaDaEseguire].classList.add("is-medium");
				winner = checkWinner(grid, count);

				if (winner === "O") {
					playAudio("static/sound/lose.mp3");
					output.innerHTML = `hai vinto player O`;
					output.classList.add("colorOutput");
				}
			}
		}
	});
}
