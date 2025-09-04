const board = document.getElementById("board");
const scoreDisplay = document.getElementById("score");
const movesDisplay = document.getElementById("moves");

const width = 9;
const candyTypes = ["❤️", "🧡", "💛", "💚", "💙", "💜"];
let score = 0;
let moves = 50;
let candies = [];

function getRandomCandy() {
  return candyTypes[Math.floor(Math.random() * candyTypes.length)];
}

function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("draggable", true);
    cell.setAttribute("data-id", i);
    cell.textContent = getRandomCandy();
    board.appendChild(cell);
    candies.push(cell);
  }
}

function dragEvents() {
  let dragged, replaced;

  candies.forEach(cell => {
    cell.addEventListener("dragstart", () => {
      dragged = cell;
    });

    cell.addEventListener("dragover", e => e.preventDefault());

    cell.addEventListener("drop", () => {
      replaced = cell;
      swapCandies(dragged, replaced);
      checkMatches();
    });
  });
}

function swapCandies(a, b) {
  const temp = a.textContent;
  a.textContent = b.textContent;
  b.textContent = temp;
  moves--;
  movesDisplay.textContent = moves;
}

function checkMatches() {
  for (let i = 0; i < candies.length - 2; i++) {
    let rowMatch = [i, i + 1, i + 2];
    let colMatch = [i, i + width, i + width * 2];

    if (rowMatch.every(idx => candies[idx] && candies[idx].textContent === candies[i].textContent)) {
      rowMatch.forEach(idx => candies[idx].textContent = getRandomCandy());
      score += 300;
    }

    if (colMatch.every(idx => candies[idx] && candies[idx].textContent === candies[i].textContent)) {
      colMatch.forEach(idx => candies[idx].textContent = getRandomCandy());
      score += 300;
    }
  }

  scoreDisplay.textContent = score;

  if (score >= 60000) {
    alert("🎉 You win!");
  } else if (moves <= 0) {
    alert("😢 Out of moves!");
  }
}

createBoard();
dragEvents();
