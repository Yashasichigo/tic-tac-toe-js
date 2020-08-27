const gameStatus = document.querySelector(".game--status") ;

let gameActive = true ;

var currentPlayer = "X" ;

let gameState = [" "," "," "," "," "," "," "," "," "] ;

var score1 = 0;
var score2 = 0;

var strtbtn = document.getElementById("startButton");

var player1 = "X";
var player2 = "O";

const winningMsg = () => `${currentPlayer.fontsize(4).sub()} has won the game!` ;
const drawMsg = () => `The game ended up in a draw` ;
const currentPlayersTurn = () => `It"s ${currentPlayer}"s turn` ;

var input1 = document.getElementById("Player1");
var input2 = document.getElementById("Player2");

var firstPlayerScore = document.getElementById("fp");
var secondPlayerScore = document.getElementById("sp");

var firstPlayerName = document.getElementById("fpn");
var secondPlayerName = document.getElementById("spn");

gameStatus.innerHTML = currentPlayersTurn() ;


function initializeGame() { // the game only works once the start button is pressed

    strtbtn.style.display = "none";
    
    input1.style.display = "none";
    input2.style.display = "none";

// To check what the input name is and display player1 and player2 in case of no input
    if (input1.value === "") {
        firstPlayerScore.innerHTML = "Player 1";
    }
    else {
        firstPlayerScore.innerHTML = input1.value;
    }

    if(input2.value === "") {
        secondPlayerScore.innerHTML = "Player 2"
    }
    else {
        secondPlayerScore.innerHTML = input2.value;
    }

// To display the players name and their choice X or O
    firstPlayerName.innerHTML = firstPlayerScore.textContent+" : X";
    secondPlayerName.innerHTML = secondPlayerScore.textContent+" : O";

// To display the players variable on the cell clicked
    function handleCellPlayed (clickedCell, clickedCellIndex) {
        gameState [clickedCellIndex] = currentPlayer ;
        clickedCell.innerHTML = currentPlayer ;
    }
    
// To change players turn alternatively
    function handlePlayerChange () {
        currentPlayer = currentPlayer === "X" ? "O" : "X" ;
        gameStatus.innerHTML = currentPlayersTurn() ;
        return ;
    }
    
// Conditions for winning
    let winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ] ;
    
// To check whether the game is finished and dispay the the player who won or the game ended up in a draw
    function handleResultValidation () {
        let roundWon = false ;
        for ( i=0; i<=7; i++ ) {
            const winner = winningConditions[i] ;
            let a = gameState[winner[0]] ;
            let b = gameState[winner[1]] ;
            let c = gameState[winner[2]] ;
        
            if ( a === " " || b === " " || c === " ") {
                continue ;
            }
        
            if ( a === b && b=== c) {
                roundWon = true ;
                break ;
            }
        }
    
        if (roundWon) {
            gameActive = false ;
            var scores = `${currentPlayer}`
                if (scores === "X" && player1 == "X" || scores == "O" && player1 == "O") {
                    if (input1.value === "") {
                        gameStatus.innerHTML = "Player 1" + winningMsg() ;
                    }
                    else {
                        gameStatus.innerHTML = input1.value + winningMsg() ;
                    }
                    score1 = score1 + 1 ;
                    document.getElementById("score1").innerHTML = score1 ;
                }
                if (scores === "O" && player2 == "O" || scores == "X" && player2 == "X") {
                    if (input2.value === "") {
                        gameStatus.innerHTML = "Player 2" + winningMsg() ;
                    }
                    else {
                        gameStatus.innerHTML = input2.value + winningMsg() ;
                    }
                    score2 = score2 + 1 ;
                    document.getElementById("score2").innerHTML = score2 ;
                }
            return ;
        }
    
        let roundDraw = !gameState.includes(" ") ;
        if (roundDraw) {
            gameStatus.innerHTML = drawMsg() ;
            gameActive = false ;
            return ;
        }
    
        handlePlayerChange() ;
    
    }

// To check if the clicked cell is empty or if the game is completed
    function handleCellClick (clickedCellEvent) {
        const clickedCell = clickedCellEvent.target ;
        const clickedCellIndex = parseInt ( clickedCell.getAttribute ("data-cell-index") ) ;
    
        if (gameState[clickedCellIndex] !== " " || !gameActive) {
            return ;
        }
    
        handleCellPlayed (clickedCell,clickedCellIndex) ;
        handleResultValidation () ;
    }
    
// To restart the game
    function handleRestartGame () {
        gameActive = true ;
        currentPlayer = "X" ;
        gameState = [" "," "," "," "," "," "," "," "," "] ;
        gameStatus.innerHTML = currentPlayersTurn() ;
        document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = " ") ;
        player1 = player1 === "X" ? "O" : "X" ;
        player2 = player2 === "O" ? "X" : "O" ;
        if (player1 === "X") {
            firstPlayerName.innerHTML = input1.value+" : X";
        }
        else {
            firstPlayerName.innerHTML = input1.value+" : O";
        }
    
        if (player2 === "O") {
            secondPlayerName.innerHTML = input2.value+" : O";
        }
        else {
            secondPlayerName.innerHTML = input2.value+" : X";
        }
    }

// To set the score-board to zero
    function handleResetScoreBoard () {
        document.getElementById("score1").innerHTML = 0;
        document.getElementById("score2").innerHTML = 0;
        score1 = 0;
        score2 = 0;
        player1 = "X";
        player2 = "O"; 
    }


    document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click",handleCellClick)) ;
    document.querySelector(".game--restart").addEventListener("click",handleRestartGame) ;
    document.querySelector(".reset--sb").addEventListener("click",handleResetScoreBoard) ;

}

