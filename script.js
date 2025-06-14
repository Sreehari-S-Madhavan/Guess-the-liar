let players = [];
let scores = [];
let currentPlayer = 0;
let liarIndex;
let selectedPrompt = {};
let round = 1;
let timerInterval;

const promptPairs = [
  { normal: "What’s your favorite type of food?", liar: "What’s your favorite fruit?" },
  { normal: "What’s your ideal vacation destination?", liar: "What’s your favorite weekday?" },
  { normal: "What kind of music do you enjoy?", liar: "What is your favorite TV ad?" },
  { normal: "What’s your go-to movie genre?", liar: "What’s your favorite toothpaste brand?" },
  { normal: "Describe your perfect weekend.", liar: "How long can you hold your breath?" },
  { normal: "What’s your favorite hobby?", liar: "What’s your favorite triangle shape?" },
  { normal: "What job would you love to try?", liar: "What’s your favorite paper size?" },
];

function addPlayerInput() {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = `Player ${document.querySelectorAll('#nameInputs input').length + 1}`;
  document.getElementById('nameInputs').appendChild(input);
}

function startGame() {
  const inputs = document.querySelectorAll('#nameInputs input');
  players = Array.from(inputs).map(input => input.value.trim()).filter(name => name !== "");
  if (players.length < 3) {
    alert("Minimum 3 players required.");
    return;
  }
  scores = Array(players.length).fill(0);
  startRound();
}

function startRound() {
  currentPlayer = 0;
  liarIndex = Math.floor(Math.random() * players.length);
  selectedPrompt = promptPairs[Math.floor(Math.random() * promptPairs.length)];

  document.getElementById('setup').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  document.getElementById('guessSection').classList.add('hidden');
  document.getElementById('scoreboard').classList.add('hidden');
  document.getElementById('promptDisplay').classList.remove('show');
  document.getElementById('promptDisplay').classList.add('hidden');

  showTurn();
}

function showTurn() {
  document.getElementById('playerTurn').textContent = `${players[currentPlayer]}'s Turn - Keep it secret!`;
  document.getElementById('promptDisplay').classList.add('hidden');
  document.getElementById('promptDisplay').classList.remove('show');
  document.getElementById('hideBtn').classList.remove('hidden');
  document.getElementById('hideNowBtn').classList.add('hidden');
  document.getElementById('timer').classList.add('hidden');
}

function revealPrompt() {
  clearInterval(timerInterval);
  const promptText = currentPlayer === liarIndex ? selectedPrompt.liar : selectedPrompt.normal;
  const promptDiv = document.getElementById('promptDisplay');
  promptDiv.textContent = promptText;
  promptDiv.classList.remove('hidden');
  void promptDiv.offsetWidth;
  promptDiv.classList.add('show');

  document.getElementById('timer').classList.remove('hidden');
  document.getElementById('hideNowBtn').classList.remove('hidden');
  document.getElementById('hideBtn').classList.remove('hidden');

  let timeLeft = 10;
  document.getElementById('timer').textContent = `Hide in: ${timeLeft}s`;
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = `Hide in: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      hidePrompt();
    }
  }, 1000);
}

function hidePrompt() {
  clearInterval(timerInterval);
  const promptDiv = document.getElementById('promptDisplay');
  promptDiv.classList.remove('show');
  setTimeout(() => {
    promptDiv.classList.add('hidden');
    document.getElementById('hideBtn').classList.add('hidden');
    document.getElementById('hideNowBtn').classList.add('hidden');
    document.getElementById('timer').classList.add('hidden');

    currentPlayer++;
    if (currentPlayer >= players.length) {
      showGuessSection();
    } else {
      showTurn();
    }
  }, 500);
}

function showGuessSection() {
  document.getElementById('game').classList.add('hidden');
  document.getElementById('guessSection').classList.remove('hidden');
  const guessButtons = document.getElementById('guessButtons');
  guessButtons.innerHTML = '';
  players.forEach((player, index) => {
    const btn = document.createElement("button");
    btn.textContent = player;
    btn.onclick = () => guessLiar(index);
    guessButtons.appendChild(btn);
  });
}

function guessLiar(index) {
  const result = document.getElementById('result');
  if (index === liarIndex) {
    result.textContent = `Correct! ${players[index]} was the liar.`;
    result.style.color = 'green';
    scores[index]++;
  } else {
    result.textContent = `Wrong! ${players[liarIndex]} was actually the liar.`;
    result.style.color = 'red';
  }
  updateScoreboard();
}

function updateScoreboard() {
  document.getElementById('scoreboard').classList.remove('hidden');
  const scoreList = document.getElementById('scores');
  scoreList.innerHTML = '';
  players.forEach((player, i) => {
    const li = document.createElement('li');
    li.textContent = `${player}: ${scores[i]} point(s)`;
    scoreList.appendChild(li);
  });
}

function nextRound() {
  round++;
  startRound();
}

function resetGame() {
  players = [];
  scores = [];
  round = 1;
  currentPlayer = 0;
  liarIndex = null;

  document.getElementById('setup').classList.remove('hidden');
  document.getElementById('game').classList.add('hidden');
  document.getElementById('guessSection').classList.add('hidden');
  document.getElementById('scoreboard').classList.add('hidden');
  document.getElementById('nameInputs').innerHTML = '<input type="text" placeholder="Player 1" />';
  alert("Game has been reset.");
}

function quitRound() {
  document.getElementById('game').classList.add('hidden');
  document.getElementById('guessSection').classList.add('hidden');
  document.getElementById('scoreboard').classList.remove('hidden');
  updateScoreboard();
  alert("Round has been quit.");
}
