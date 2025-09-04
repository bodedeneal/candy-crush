const board = document.getElementById("board");
const scoreDisplay = document.getElementById("score");
const movesDisplay = document.getElementById("moves");

const candyTypes = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🎯"];
let score = 0;
let moves = 50;

// Create board
function createBoard() {
  for (let i = 0; i < 81; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-id", i);
    cell.textContent = getRandomCandy();
    board.appendChild(cell);
  }
}

// Random candy
function getRandomCandy() {
  return candyTypes[Math.floor(Math.random() * candyTypes.length)];
}

// Basic match logic (placeholder)
board.addEventListener("click", (e) => {
  if (moves <= 0) return;
  const cell = e.target;
  cell.textContent = getRandomCandy(); // simulate a move
  score += 100;
  moves -= 1;
  scoreDisplay.textContent = score;
  movesDisplay.textContent = moves;
});

createBoard();
