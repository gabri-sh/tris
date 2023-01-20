//il controllo della vittoria, verrà fatto in base al player che cambierà ogni turno

function checkWinner(player) {
	if (grid[0][0] === player && grid[1][1] === player && grid[2][2] === player) {
		return true;
	}
	if (grid[0][2] === player && grid[1][1] === player && grid[2][0] === player) {
		return true;
	}
}

let cells = document.querySelectorAll(".button");

for (let i = 0; i < cells.length; i++) {
	cells[i].addEventListener("click", function (e) {
		e.preventDefault();

		let player;
		let grid = [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		];
	});
}

/*
let array = [] //in Javascript non serve dichiarare la dimensione all'inizio 

array.push(1) //push aggiunge un elemento nell'array
array.push(2)
array.push(3)
array.push(4)
array.push(5)

console.log(array[0])

let lastEl = array.pop() //pop rimuove l'ultimo elemento
console.log(array) // 1, 2, 3, 4

for(let i = 0; i<array.length; i++){
    console.log(array[i])
}

//array bidimensionali: array = elenco di valori, array bidimensionale: ogni elemento è un array

let grid = [
    ["X", "O", "X"],
    ["O", null, "X"],
    [null, null, null], //il giocatore dovrebbe mettere il cerchio in basso a destra, quindi:
]

grid[2][2] = "O"

console.log(grid)

for(let i = 0; i < grid.length; i++){
    let row = grid[i]
    for(let j = 0; i < row.length; i++){
        console.log(`Posizione ${i}, ${j} -> ${row[j]}`)
    }
}

let player

function checkMainDiag(player){ //player può essere o "X" o "O"
    if(grid[0][0] === player && grid[1][1] === player && grid[2][2] === player){
        return true
    }else{
        return false
    }
}

checkMainDiag(player)

function checkWinner(player){
    if(fare il controllo della diagonale 1){
        return true;
    }else if(controllo della diagonale 2){
        return true;
    }else if(controllo delle altre 3 rige e poi fare lo stesso per le colonne){
        conbinazioni quelle sia in verticale che in orizzontale
        return true;
    }else{
        return false
    }
}



1. Inizializzo grigia di gioco vuota (tutti elementi = null)
2. Creo una variabile currentPlayer
3. Event listener sulle celle della griglia - per associare le celle all'elemento della grid in js usare data attribute oppure id=1,2,3...
4. Disegnare X o O nella cella cliccata solo se non è già occupata 
5. Controllare dopo ogni mossa se il currentPlayer ha vinto 
6. Cambiare il currentPlayer

*/
