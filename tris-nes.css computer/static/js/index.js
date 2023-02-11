//il controllo della vittoria, verrà fatto in base al player che cambierà ogni turno
let cells = document.querySelectorAll(".button");
let resetBtn = document.querySelector(".resetBtn");
let isGameFinish = false;

function checkWinner(player) {
	if (grid[0][0] === player && grid[1][1] === player && grid[2][2] === player) {
		isGameFinish = true;
		return true;
	} else if (
		grid[0][2] === player &&
		grid[1][1] === player &&
		grid[2][0] === player
	) {
		isGameFinish = true;
		return true;
	} else if (
		grid[0][0] === player &&
		grid[1][0] === player &&
		grid[2][0] === player
	) {
		isGameFinish = true;
		return true;
	} else if (
		grid[0][1] === player &&
		grid[1][1] === player &&
		grid[2][1] === player
	) {
		isGameFinish = true;
		return true;
	} else if (
		grid[0][2] === player &&
		grid[1][2] === player &&
		grid[2][2] === player
	) {
		isGameFinish = true;
		return true;
	} else if (
		grid[0][0] === player &&
		grid[0][1] === player &&
		grid[0][2] === player
	) {
		isGameFinish = true;
		return true;
	} else if (
		grid[1][0] === player &&
		grid[1][1] === player &&
		grid[1][2] === player
	) {
		isGameFinish = true;
		return true;
	} else if (
		grid[2][0] === player &&
		grid[2][1] === player &&
		grid[2][2] === player
	) {
		isGameFinish = true;
		return true;
	} else {
		//isGameFinish = true;
		return false;
	}
}

function RefreshWindow() {
	window.location.reload(true);
}

resetBtn.addEventListener("click", function (e) {
	e.preventDefault();
	RefreshWindow();
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
		return posizioneCella;
	}
	if (v1 == 0 && v2 == 1) {
		posizioneCella = 1;
		return posizioneCella;
	}
	if (v1 == 0 && v2 == 2) {
		posizioneCella = 2;
		return posizioneCella;
	}
	if (v1 == 1 && v2 == 0) {
		posizioneCella = 3;
		return posizioneCella;
	}
	if (v1 == 1 && v2 == 1) {
		posizioneCella = 4;
		return posizioneCella;
	}
	if (v1 == 1 && v2 == 2) {
		posizioneCella = 5;
		return posizioneCella;
	}
	if (v1 == 2 && v2 == 0) {
		posizioneCella = 6;
		return posizioneCella;
	}
	if (v1 == 2 && v2 == 1) {
		posizioneCella = 7;
		return posizioneCella;
	}
	if (v1 == 2 && v2 == 2) {
		posizioneCella = 8;
		return posizioneCella;
	}
}

function getRandomMove(grid) {
	let celleLibere = getEmptyCells(grid);

	let cellaCasuale =
		Math.floor(Math.random() * (celleLibere.length - 1 - 0 + 1)) + 0; //questa funzione mi restituisce l'indice che corrisponde
	//all'indice casuale che devo andare a riempire della griglia
	let valoreMossa1 = parseInt(celleLibere[cellaCasuale].substring(0, 1)); //coordinata x
	let valoreMossa2 = parseInt(celleLibere[cellaCasuale].substring(4)); //cordinata y
	//console.log(valoreMossa1, valoreMossa2);
	//console.log(typeof (valoreMossa1, valoreMossa2));
	grid[valoreMossa1][valoreMossa2] = "O";
	return trovaCella(valoreMossa1, valoreMossa2);
	//console.log(cellaCasuale)
}

let count = 0;

cellIsOccupied = true;
let v1, v2;

for (let i = 0; i < cells.length; i++) {
	cells[i].addEventListener("click", function (e) {
		//inizio event listener
		e.preventDefault();

		console.log(`valore della i --> ${i}`);
		console.log(`valore di player --> ${currentPlayer}`);

		cellIsOccupied =
			e.currentTarget.classList.contains("player2") ||
			e.currentTarget.classList.contains("player1");

		console.log(cellIsOccupied);
		if (!cellIsOccupied && !isGameFinish) {
			//implementare la condizione se la cella non è occupata e il gioco non è finito
			count++;
			v1 = cells[i].dataset.row;
			v2 = cells[i].dataset.cell;

			
				e.currentTarget.classList.toggle("player1");
				cells[i].classList.add("nes-icon");
				cells[i].classList.add("close");
				cells[i].classList.add("is-medium");
				grid[v1][v2] = "X";
			
				
			
		}

		//implementare qui la logica di gioco del computer

		let cellRandom = getRandomMove(grid);

		cells[cellRandom].classList.toggle("player2");
		cells[cellRandom].classList.add("nes-icon");
		cells[cellRandom].classList.add("coin");
		cells[cellRandom].classList.add("is-medium");
		//grid[v1][v2] = "O";

		let win = checkWinner(currentPlayer);

		if (win) {
			document.querySelector(
				".output"
			).innerHTML = `hai vinto player ${currentPlayer}`;
			document.querySelector(".output").classList.add("colorOutput");
			//document.querySelectorAll(".button").classList.add("noClick");
		} else if (count === 9 && !win) {
			document.querySelector(".output").innerHTML = `pareggio`;
			document.querySelector(".output").classList.add("colorOutput");
			//document.querySelectorAll(".button").classList.add("noClick");
		}

		//punto 6
		if (currentPlayer === "X") {
			currentPlayer = "O";
		} else {
			currentPlayer = "X";
		}
	});
}
