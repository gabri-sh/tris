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
	//funzione funziona
	let emptyCells = [];
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (grid[i][j] === null) {
				emptyCells.push(i + " - " + j);
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

function getRandomMove(grid) {
	let celleLibere = getEmptyCells(grid);

	let cellaCasuale =
		Math.floor(Math.random() * (celleLibere.length - 1 - 0 + 1)) + 0; //questa funzione mi restituisce l'indice che corrisponde
	//all'indice casuale che devo andare a riempire della griglia
	let valoreMossa1 = parseInt(celleLibere[cellaCasuale].substring(0, 1));
	let valoreMossa2 = parseInt(celleLibere[cellaCasuale].substring(4));
	grid[valoreMossa1][valoreMossa2] = "O";
	return trovaCella(valoreMossa1, valoreMossa2);
}

let count = 0;

cellIsOccupied = true;
let v1, v2;

function playAudio(url) {
	let audio = new Audio(url);
	setTimeout(() => {
		console.log("Delayed for 2 second.");
	}, 2000);
	audio.play();
	setTimeout(() => {
		console.log("Delayed for 2 second.");
	}, 2000);
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
				let cellRandom = getRandomMove(grid);
				console.log(cellRandom);

				cells[cellRandom].classList.toggle("player2");
				cells[cellRandom].classList.add("nes-icon");
				cells[cellRandom].classList.add("coin");
				cells[cellRandom].classList.add("is-medium");
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
