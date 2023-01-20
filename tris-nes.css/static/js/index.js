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

for (let i = 0; i < cells.length; i++) {
	cells[i].addEventListener("click", function (e) {
		e.preventDefault();

		console.log(`valore della i --> ${i}`);
		console.log(`valore di player --> ${currentPlayer}`);
		
		if (currentPlayer === "X") {
			cells[i].innerHTML = "X"
		} else {
			cells[i].innerHTML = "O"
		}
				
		let win = checkWinner(currentPlayer)
		
		//punto 6
		if (currentPlayer === "X") {
			currentPlayer = "O"
		}else{
			currentPlayer = "X"
		}
	});
}


/*
1. Inizializzo grigia di gioco vuota (tutti elementi = null)
2. Creo una variabile currentPlayer
3. Event listener sulle celle della griglia - per associare le celle all'elemento della grid in js usare data attribute oppure id=1,2,3...
4. Disegnare X o O nella cella cliccata solo se non è già occupata 
5. Controllare dopo ogni mossa se il currentPlayer ha vinto 
6. Cambiare il currentPlayer
*/