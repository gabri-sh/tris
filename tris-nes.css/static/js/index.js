let cells = document.querySelectorAll(".button")

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function (e) {
        e.preventDefault()

        //confrontare cella se già occupata
        //se player = 0 -> un simbolo, se player = 1 -> altro simbolo --> questo nella griglia
    })
    
}
