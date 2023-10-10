const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return null;
};

const checkDraw = () => {
    return !gameBoard.includes('');
};



const handleClick = (e) => {
    const cell = e.target;
    const cellIndex = [...cells].indexOf(cell);

    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cell.innerText = currentPlayer;
        cell.style.color = currentPlayer === 'X' ? 'blue' : 'red';
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            alert(`${winner} ganó`);
        } else if (checkDraw()) {
            gameActive = false;
            alert('Es un empate');
        }
    }
};

const restartGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach((cell) => {
        cell.innerText = '';
        cell.style.color = '';
    });
};

cells.forEach((cell) => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);
