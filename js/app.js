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
    gridContainer.style.pointerEvents = `auto`;
    //uso .replaceChildren per svuotare gridContainer ogni volta che l'utente clicca sul bottone
    gridContainer.replaceChildren(); 

    //seleziono il container per la scritta del risultato
    const resultContainer = document.querySelector('.result');

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
        
        //aggiungo una classe per identificare le celle con le bombe
        if (bombs.includes(cellNum)){
            cellElement.classList.add('bomb');
        }

        //variabile per capire se la partita sia finita
        let gameEnd = false;
        //aggiungo event per il click sulla cell
        cellElement.addEventListener('click', function(){
            
            //e stamperà un messaggio in console con il num della cella cliccata
            console.log(cellNum);
            if (bombs.includes(cellNum)){
                //quando l'utente clicca su una cella, quest'ultima cambierà colore 
                cellElement.classList.add('cell_red');
                console.log('hai perso');
                resultContainer.innerHTML = '<h2>hai perso...</h2><span>celle senza bombe selezionate: </span>' + noBombCellCounter
                gameEnd = true
                console.log('celle senza bomba selezionate: ' + noBombCellCounter);
                gridContainer.style.pointerEvents = `none`;
            } else {
                cellElement.classList.add('cell_dark');
                //Se la casella cliccata non è una bomba, allora aumento il counter delle celle senza bomba di 1
                noBombCellCounter++;
                console.log(noBombCellCounter);
                cellElement.style.pointerEvents = `none`;
                //se seleziono tutte le cell senza bomba, allora vinco
                if (noBombCellCounter === gridTotalCellCount - bombs.length) {
                    console.log('hai vinto');
                    resultContainer.innerHTML = '<h2>hai vinto!</h2><span>celle senza bombe selezionate: </span>' + noBombCellCounter
                    gameEnd = true
                    console.log('celle senza bomba selezionate: ' + noBombCellCounter);
                    gridContainer.style.pointerEvents = `none`;
                } 
            }

            //quando la partita finisce, tutte le celle con la bomba si colorano di rosso
            if (gameEnd === true) {
                bombCells = document.querySelectorAll('.bomb');
                for (let j = 0; j < bombCells.length; j++) {
                    const element = bombCells[j];
                    element.classList.add('cell_red')
                }
            }
        })
    }
})










