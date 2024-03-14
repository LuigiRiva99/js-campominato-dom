//l'utente clicca sul bottone play che genererà la griglia del gioco
    //genero ciclo for per aggiungere la griglia nell'html
//ogni cella ha un numero progressivo da 1 a 100



//seleziono il button dal dom
const playButton = document.getElementById('playbtn')


//aggiungo event per il click del btn
playButton.addEventListener('click', function(){
    //genero ciclo for per aggiungere la griglia nell'html
    
    //seleziono il container nel quale aggiungo la griglia
    const gridContainer = document.querySelector('.grid');
    //uso .replaceChildren per svuotare gridContainer ogni volta che l'utente clicca sul bottone
    gridContainer.replaceChildren(); 

    //seleziono il select dal dom
    const difficultySelect = document.getElementById('difficulty');

    const difficultyOption = difficultySelect.value;

    //numero di celle in una riga
    let cellRowCount
    //numero di celle in una colonna
    let cellColumnCount

    //cambio i valori della griglia (altezza e larghezza in base alla difficoltà)
    if (difficultyOption === 'difficile') {
        cellRowCount= 10;
        cellColumnCount= 10;
    } else if (difficultyOption === 'normale') {
        cellRowCount= 9;
        cellColumnCount= 9;
    } else {
        cellRowCount= 7;
        cellColumnCount= 7;
    }

    //constante per determinare il numero di celle totali
    const gridTotalCellCount= cellRowCount * cellColumnCount;

    //creare un array che genera numeri casuali da 1 a num max di celle
    //NO doppioni, l'array deve essere riempito di numeri finchè non ce ne sono 16
    const bombs= []; //array
    while (bombs.length < 16) {
        const bombNum = Math.floor(Math.random() * gridTotalCellCount) + 1; 
        
        if (bombs.includes(bombNum)) {
        } else {
            bombs.push(bombNum);
        }
    }
    console.log(bombs);

    //creare contatore per contare celle senza bombe
    noBombCellCounter = 0;

    //genero ciclo for
    for (let i = 0; i < gridTotalCellCount; i++) {
        //creo il div della cell con .createElement
        const cellElement = document.createElement('div');
        //aggiungo la classe al div
        cellElement.className = 'cell';

        //cambio la larghezza delle celle in base alla grandezza della griglia
        if (gridTotalCellCount === 100) {
            cellElement.classList.add('cell-100');
        } else if (gridTotalCellCount == 81){
            cellElement.classList.add('cell-81');
        } else {
            cellElement.classList.add('cell-49');
        }
        
        //uso .append per mettere la cell nell'apposito container
        gridContainer.append(cellElement)
        
        //inserisco il numero all'interno della cell
        const cellNum = i + 1
        cellElement.innerHTML =+ cellNum
    
        //aggiungo event per il click sulla cell
        cellElement.addEventListener('click', function(){
             
            //e stamperà un messaggio in console con il num della cella cliccata
            console.log(cellNum);
            if (bombs.includes(cellNum)){
                //quando l'utente clicca su una cella, quest'ultima cambierà colore 
                cellElement.classList.add('cell_red');
                console.log('hai perso');
            } else {
                cellElement.classList.add('cell_dark');
                //Se la casella cliccata non è una bomba, allora aumento il counter delle celle senza bomba di 1
                noBombCellCounter++;
                console.log(noBombCellCounter);

                //se seleziono tutte le cell senza bomba, allora vinco
                if (noBombCellCounter === gridTotalCellCount - bombs.length) {
                    console.log('hai vinto');
                } 
            }
        })
    }
})




//quando bombs.includes(cellNum) allora la partita termina, l'utente non può più cliccare su neesun'altra cella
//quando gridtotalcellcount === gridtotalcellcount - 16 allora la partita termina (vittoria) e l'utente non può più cliccare 
//quando finisce la partita bisogna comunicare il punteggio : punteggio= numero di celle con classe cell_dark
    







