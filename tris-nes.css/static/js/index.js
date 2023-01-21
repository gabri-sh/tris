//il controllo della vittoria, verrà fatto in base al player che cambierà ogni turno
let cells = document.querySelectorAll(".button");
let resetBtn = document.querySelector(".resetBtn");

function checkWinner(player) {
	if (grid[0][0] === player && grid[1][1] === player && grid[2][2] === player) {
		return true;
	} else if (
		grid[0][2] === player &&
		grid[1][1] === player &&
		grid[2][0] === player
	) {
		return true;
	} else if (
		grid[0][0] === player &&
		grid[1][0] === player &&
		grid[2][0] === player
	) {
		return true;
	} else if (
		grid[0][1] === player &&
		grid[1][1] === player &&
		grid[2][1] === player
	) {
		return true;
	} else if (
		grid[0][2] === player &&
		grid[1][2] === player &&
		grid[2][2] === player
	) {
		return true;
	} else if (
		grid[0][0] === player &&
		grid[0][1] === player &&
		grid[0][2] === player
	) {
		return true;
	} else if (
		grid[1][0] === player &&
		grid[1][1] === player &&
		grid[1][2] === player
	) {
		return true;
	} else if (
		grid[2][0] === player &&
		grid[2][1] === player &&
		grid[2][2] === player
	) {
		return true;
	} else {
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

//il reset button e la funzione che verifica il vincitore funzionano
//resta da implementare la parte che quando spingi una casella esce l'icona del personaggio su quella casella
//per decrertare il vincitore, fare div con all'interno uno span di output che dirà il giocatore vincitore

let currentPlayer = "X";
let grid = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

let count = 0;

cellIsOccupied = true;
let v1, v2;

for (let i = 0; i < cells.length; i++) {
	cells[i].addEventListener("click", function (e) {
		e.preventDefault();

		console.log(`valore della i --> ${i}`);
		console.log(`valore di player --> ${currentPlayer}`);

		cellIsOccupied =
			e.currentTarget.classList.contains("player2") ||
			e.currentTarget.classList.contains("player1");

		console.log(cellIsOccupied);
		if (!cellIsOccupied) {
			count++;
			v1 = cells[i].dataset.row;
			v2 = cells[i].dataset.cell;

			if (currentPlayer === "X") {
				e.currentTarget.classList.toggle("player1");
				cells[i].classList.add("nes-icon");
				cells[i].classList.add("close");
				cells[i].classList.add("is-medium");
				grid[v1][v2] = "X";
			} else {
				e.currentTarget.classList.toggle("player2");
				cells[i].classList.add("nes-icon");
				cells[i].classList.add("coin");
				cells[i].classList.add("is-medium");
				grid[v1][v2] = "O";
			}
		}

		let win = checkWinner(currentPlayer);

		if (win) {
			document.querySelector(
				".output"
			).innerHTML = `hai vinto player ${currentPlayer}`;
			document.querySelector(".output").classList.add("colorOutput");
			document.querySelectorAll(".button").classList.add("noClick")
		} else if (count === 9 && !win) {
			document.querySelector(".output").innerHTML = `pareggio`;
			document.querySelector(".output").classList.add("colorOutput");
			document.querySelectorAll(".button").classList.add("noClick")
		}

		//punto 6
		if (currentPlayer === "X") {
			currentPlayer = "O";
		} else {
			currentPlayer = "X";
		}
	});
}