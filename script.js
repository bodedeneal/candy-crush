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

let draggedCandy = null;
let replacedCandy = null;

function dragEvents() {
  candies.forEach(candy => {
    candy.addEventListener("dragstart", () => {
      draggedCandy = candy;
    });

    candy.addEventListener("dragover", e => e.preventDefault());

    candy.addEventListener("drop", () => {
      replacedCandy = candy;
    });

    candy.addEventListener("dragend", () => {
      const draggedId = parseInt(draggedCandy.getAttribute("data-id"));
      const replacedId = parseInt(replacedCandy.getAttribute("data-id"));

      const validMoves = [
        draggedId - 1,
        draggedId + 1,
        draggedId - width,
        draggedId + width
      ];

      if (validMoves.includes(replacedId)) {
        swapCandies(draggedCandy, replacedCandy);
        if (checkMatches()) {
          moves--;
          movesDisplay.textContent = moves;
        } else {
          swapCandies(draggedCandy, replacedCandy); // undo if no match
        }
      }
    });
  });
}

function swapCandies(a, b) {
  const temp = a.textContent;
  a.textContent = b.textContent;
  b.textContent = temp;
}

function checkMatches() {
  let matchFound = false;

  // Horizontal matches
  for (let i = 0; i < width * width; i++) {
    if (i % width > width - 3) continue;
    let row = [i, i + 1, i + 2];
    let candy = candies[i].textContent;
    if (row.every(idx => candies[idx].textContent === candy)) {
      row.forEach(idx => candies[idx].textContent = "");
      score += 300;
      matchFound = true;
    }
  }

  // Vertical matches
  for (let i = 0; i < width * (width - 2); i++) {
    let col = [i, i + width, i + width * 2];
    let candy = candies[i].textContent;
    if (col.every(idx => candies[idx].textContent === candy)) {
      col.forEach(idx => candies[idx].textContent = "");
      score += 300;
      matchFound = true;
    }
  }

  scoreDisplay.textContent = score;
  dropCandies();
  return matchFound;
}

function dropCandies() {
  for (let i = width * (width - 1) - 1; i >= 0; i--) {
    if (candies[i + width] && candies[i + width].textContent === "") {
      candies[i + width].textContent = candies[i].textContent;
      candies[i].textContent = "";
    }
  }

  for (let i = 0; i < width; i++) {
    if (candies[i].textContent === "") {
      candies[i].textContent = getRandomCandy();
    }
  }
}

createBoard();
dragEvents();
