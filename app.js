// app.js

const board = document.getElementById("board");
const cells = Array.from(document.querySelectorAll(".cell"));
const resetButton = document.getElementById("reset");
const playerXButton = document.getElementById("playerX");
const playerOButton = document.getElementById("playerO");

let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

// Player selection
playerXButton.addEventListener("click", () => {
  currentPlayer = "X";
  startGame();
});

playerOButton.addEventListener("click", () => {
  currentPlayer = "O";
  startGame();
});

// Start the game
function startGame() {
  gameActive = true;
  boardState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => cell.classList.remove("x", "o"));
}

// Handle cell clicks
board.addEventListener("click", (event) => {
  if (
    !gameActive ||
    !event.target.classList.contains("cell") ||
    event.target.classList.contains("x") ||
    event.target.classList.contains("o")
  ) {
    return;
  }

  const index = event.target.dataset.index;
  boardState[index] = currentPlayer;
  event.target.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    alert(`${currentPlayer} wins!`);
    gameActive = false;
  } else if (boardState.every((cell) => cell !== "")) {
    alert("It's a draw!");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    computerMove();
  }
});

// Computer's turn
function computerMove() {
  if (!gameActive) return;
  const emptyCells = boardState
    .map((state, index) => (state === "" ? index : null))
    .filter((index) => index !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  boardState[randomIndex] = "O";
  cells[randomIndex].classList.add("o");

  if (checkWin()) {
    alert("O wins!");
    gameActive = false;
  } else if (boardState.every((cell) => cell !== "")) {
    alert("It's a draw!");
    gameActive = false;
  }
}

// Check for a win
function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  return winPatterns.some((pattern) => {
    const [a, b, c] = pattern;
    return (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    );
  });
}

// Reset game
resetButton.addEventListener("click", startGame);

// Initialize game
startGame();
