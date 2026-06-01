// ── GAME STATE ──
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0, Draw: 0 };

// ── WIN CONDITIONS ──
// ప్రతి array — winning combination (indices)
const WIN_CONDITIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6], // anti-diagonal
];

// ── DOM ELEMENTS ──
const cells    = document.querySelectorAll('.cell');
const status   = document.getElementById('status');
const scoreX   = document.getElementById('scoreX');
const scoreO   = document.getElementById('scoreO');
const scoreDraw = document.getElementById('scoreDraw');

// ── HANDLE CLICK ──
function handleClick(index) {
  // Already filled or game over అయితే return
  if (board[index] !== '' || !gameActive) return;

  // Board update
  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer.toLowerCase(), 'taken');

  // Win check
  if (checkWin()) {
    highlightWinner();
    status.textContent = `Player ${currentPlayer} wins! 🎉`;
    status.className = 'status winner';
    scores[currentPlayer]++;
    updateScores();
    gameActive = false;
    return;
  }

  // Draw check
  if (board.every(cell => cell !== '')) {
    status.textContent = "It's a Draw! 🤝";
    status.className = 'status draw';
    scores.Draw++;
    updateScores();
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
  status.className = `status ${currentPlayer.toLowerCase()}-turn`;
}

// ── CHECK WIN ──
function checkWin() {
  return WIN_CONDITIONS.some(combo => {
    return combo.every(index => board[index] === currentPlayer);
  });
}

// ── HIGHLIGHT WINNER CELLS ──
function highlightWinner() {
  WIN_CONDITIONS.forEach(combo => {
    if (combo.every(index => board[index] === currentPlayer)) {
      combo.forEach(index => cells[index].classList.add('win'));
    }
  });
}

// ── UPDATE SCORES ──
function updateScores() {
  scoreX.textContent    = scores.X;
  scoreO.textContent    = scores.O;
  scoreDraw.textContent = scores.Draw;
}

// ── RESTART GAME (score keep cheyyi) ──
function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
  });

  status.textContent = "Player X's turn";
  status.className = 'status x-turn';
}

// ── RESET SCORE ──
function resetScore() {
  scores = { X: 0, O: 0, Draw: 0 };
  updateScores();
  restartGame();
}
