/**
 * Tic Tac Toe Logic
 * Manages game state, win conditions, and UI interactions.
 */

const boardElement = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');

// 1. Initial Game State
let currentPlayer = "X"; 
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

// 2. All 8 possible ways to win
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// 3. Handle User Clicks
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Ignore click if cell is already filled or game is over
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    validateResult();
}

// 4. Update the Board UI and Array
function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase()); // Adds 'x' or 'o' class for CSS colors
}

// 5. Check for Win, Draw, or Next Turn
function validateResult() {
    let roundWon = false;
    let winningLine = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        let a = gameState[condition[0]];
        let b = gameState[condition[1]];
        let c = gameState[condition[2]];

        if (a === '' || b === '' || c === '') continue;
        
        if (a === b && b === c) {
            roundWon = true;
            winningLine = condition;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `Player ${currentPlayer} Wins! 🎉`;
        highlightWinners(winningLine);
        gameActive = false;
        return;
    }

    // Check for Draw (if no empty strings are left in gameState)
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerText = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    // If game continues, swap players
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerText = `Player ${currentPlayer}'s Turn`;
}

// 6. Visual feedback for the winner
function highlightWinners(indices) {
    indices.forEach(index => {
        cells[index].classList.add('winner');
    });
}

// 7. Restart the Game
function resetGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerText = `Player X's Turn`;
    
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('x', 'o', 'winner');
    });
}

// 8. Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));