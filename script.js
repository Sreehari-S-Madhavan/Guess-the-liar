let promptPairs = [
  { normal: "What’s your favorite type of food?", liar: "What’s your favorite fruit?" },
  { normal: "Name a movie you love.", liar: "Name a cartoon you used to watch." },
  { normal: "What's your dream vacation spot?", liar: "What's your favorite nearby place?" },
  { normal: "Which sport do you enjoy watching?", liar: "Which board game do you like?" },
  { normal: "What’s your favorite subject in school?", liar: "Which subject do you find difficult?" },
  { normal: "Name an animal you like.", liar: "Name an insect you dislike." }
];

let players = [];
let scores = [];
let currentPlayer = 0;
let liarIndex;
let selectedPrompt = {};
let round = 1;
let timerInterval;

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
  showTurn();
}

function showTurn() {
  document.getElementById('playerTurn').textContent = `${players[currentPlayer]}'s Turn - Don't Let Others See!`;
  document.getElementById('promptDisplay').classList.add('hidden');
  document.getElementById('hideBtn').classList.add('hidden');
  document.getElementById('timer').classList.add('hidden');
}

function revealPrompt() {
  const promptText = currentPlayer === liarIndex ? selectedPrompt.liar : selectedPrompt.normal;
  const promptDiv = document.getElementById('promptDisplay');
  promptDiv.textContent = promptText;
  promptDiv.classList.remove('hidden');
  setTimeout(() => promptDiv.classList.add('show'), 10);

  document.getElementById('timer').classList.remove('hidden');
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
  document.getElementById('promptDisplay').classList.remove('show');
  setTimeout(() => {
    document.getElementById('promptDisplay').classList.add('hidden');
    document.getElementById('hideBtn').classList.add('hidden');
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
  guessButtons.innerHTML = "";
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
