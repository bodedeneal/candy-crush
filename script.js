const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");

const width = 8;
const squares = [];
let score = 0;

const candyColors = [
  "url('https://i.imgur.com/3VesQhA.png')", // red
  "url('https://i.imgur.com/mt4U7Rw.png')", // yellow
  "url('https://i.imgur.com/cBTSH1V.png')", // green
  "url('https://i.imgur.com/46PYq8q.png')", // blue
  "url('https://i.imgur.com/HO8ErsQ.png')", // purple
  "url('https://i.imgur.com/CaYcIbU.png')"  // orange
];

// Create Board
function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.setAttribute("draggable", true);
    square.setAttribute("id", i);
    square.classList.add("square");
    let randomColor = Math.floor(Math.random() * candyColors.length);
    square.style.backgroundImage = candyColors[randomColor];
    grid.appendChild(square);
    squares.push(square);
  }
}
createBoard();

// Dragging
let colorBeingDragged;
let colorBeingReplaced;
let squareIdBeingDragged;
let squareIdBeingReplaced;

squares.forEach(square => square.addEventListener("dragstart", dragStart));
squares.forEach(square => square.addEventListener("dragend", dragEnd));
squares.forEach(square => square.addEventListener("dragover", e => e.preventDefault()));
squares.forEach(square => square.addEventListener("dragenter", e => e.preventDefault()));
squares.forEach(square => square.addEventListener("drop", dragDrop));

function dragStart() {
  colorBeingDragged = this.style.backgroundImage;
  squareIdBeingDragged = parseInt(this.id);
}

function dragDrop() {
  colorBeingReplaced = this.style.backgroundImage;
  squareIdBeingReplaced = parseInt(this.id);
  this.style.backgroundImage = colorBeingDragged;
  squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
}

function dragEnd() {
  const validMoves = [
    squareIdBeingDragged - 1,
    squareIdBeingDragged - width,
    squareIdBeingDragged + 1,
    squareIdBeingDragged + width
  ];

  if (squareIdBeingReplaced && validMoves.includes(squareIdBeingReplaced)) {
    squareIdBeingReplaced = null;
  } else {
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
  }
}

// Match Checking
function checkRowForThree() {
  for (let i = 0; i < 61; i++) {
    let rowOfThree = [i, i + 1, i + 2];
    let decidedColor = squares[i].style.backgroundImage;
    const notValid = [
      6, 7, 14, 15, 22, 23, 30, 31,
      38, 39, 46, 47, 54, 55, 62, 63
    ];
    if (notValid.includes(i)) continue;

    if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && decidedColor !== "")) {
      score += 3;
      rowOfThree.forEach(index => squares[index].style.backgroundImage = "");
    }
  }
}

function checkColumnForThree() {
  for (let i = 0; i < 47; i++) {
    let columnOfThree = [i, i + width, i + width * 2];
    let decidedColor = squares[i].style.backgroundImage;

    if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && decidedColor !== "")) {
      score += 3;
      columnOfThree.forEach(index => squares[index].style.backgroundImage = "");
    }
  }
}

function moveDown() {
  for (let i = 0; i < 56; i++) {
    if (squares[i + width].style.backgroundImage === "") {
      squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
      squares[i].style.backgroundImage = "";
    }
  }

  for (let i = 0; i < 8; i++) {
    if (squares[i].style.backgroundImage === "") {
      let randomColor = Math.floor(Math.random() * candyColors.length);
      squares[i].style.backgroundImage = candyColors[randomColor];
    }
  }
}

window.setInterval(function () {
  checkRowForThree();
  checkColumnForThree();
  moveDown();
  scoreDisplay.textContent = score;
}, 100);
