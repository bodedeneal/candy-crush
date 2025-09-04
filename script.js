const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const width = 8;
const squares = [];
let score = 0;

const candyTypes = [
  'red', 'yellow', 'green', 'blue', 'purple', 'orange'
];

// Map candy types to image URLs (replace these with your actual paths)
const candyImages = {
  red: 'images/red.png',
  yellow: 'images/yellow.png',
  green: 'images/green.png',
  blue: 'images/blue.png',
  purple: 'images/purple.png',
  orange: 'images/orange.png',
  striped: 'images/striped.png',
  wrapped: 'images/wrapped.png',
  colorBomb: 'images/colorbomb.png'
};

function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    square.setAttribute('draggable', true);
    square.setAttribute('id', i);
    square.classList.add('square');
    let color = candyTypes[Math.floor(Math.random() * candyTypes.length)];
    square.dataset.type = color;
    square.style.backgroundImage = `url('${candyImages[color]}')`;
    grid.appendChild(square);
    squares.push(square);
  }
}
createBoard();

// dragging logic (similar to before)...

function dragStart() { /* ... */ }
function dragDrop() { /* ... */ }
function dragEnd() { /* ... */ }

squares.forEach(s => {
  s.addEventListener('dragstart', dragStart);
  s.addEventListener('dragend', dragEnd);
  s.addEventListener('dragover', e => e.preventDefault());
  s.addEventListener('dragenter', e => e.preventDefault());
  s.addEventListener('drop', dragDrop);
});

// Checkers with booster logic
function checkForWrapped() {
  // Detect T or L shapes, replace central candy with 'wrapped'
}

function checkForStriped() {
  // Detect 4-in-row, assign striped candy
}

function checkForColorBomb() {
  // Detect 5-in-row, assign color bomb
}

function activateSpecial(sq) {
  const type = sq.dataset.type;
  if (type === 'wrapped') {
    // Explode 3x3 twice (clear candies visually)
  } else if (type === 'striped') {
    // Clear row or column depending on orientation
  } else if (type === 'colorBomb') {
    // Clear all of a random other color
  }
}

function specialCombos(sq1, sq2) {
  const t1 = sq1.dataset.type;
  const t2 = sq2.dataset.type;

  // Example special combos:
  // striped + wrapped → clear 3 rows & columns :contentReference[oaicite:1]{index=1}
  // striped + color bomb → all candies of striped's color become striped and activate :contentReference[oaicite:2]{index=2}
  // wrapped + wrapped → double 5×5 blasts :contentReference[oaicite:3]{index=3}
  // color bomb + wrapped → turns every candy of wrapped-type's color into wrapped candies then activate :contentReference[oaicite:4]{index=4}
  // color bomb + color bomb → clears the entire board :contentReference[oaicite:5]{index=5}
}

function moveDown() {
  // Make candies drop, refill top row
}

window.setInterval(() => {
  checkForWrapped();
  checkForStriped();
  checkForColorBomb();
  moveDown();
  scoreDisplay.textContent = score;
}, 100);
