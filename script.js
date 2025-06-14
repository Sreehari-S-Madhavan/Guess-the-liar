// script.js
let prompts = [
  "What's your favorite fruit?",
  "Name a movie you like.",
  "What sport do you enjoy watching?",
  "Name a color you like.",
  "What’s your dream vacation spot?"
];

let liarPrompt = "Give a vague or different answer.";
let players = [];
let scores = [];
let currentPlayer = 0;
let liarIndex;
let selectedPrompt = "";
let round = 1;

function startGame() {
  const count = parseInt(document.getElementById('playerCount').value);
  if (isNaN(count) || count < 3) {
    alert("Minimum 3 players required.");
    return;
  }

  players = Array.from({ length: count }, (_, i) => `Player ${i + 1}`);
  scores = Array(count).fill(0);
  startRound();
}

function startRound() {
  currentPlayer = 0;
  liarIndex = Math.floor(Math.random() * players.length);
  selectedPrompt = prompts[Math.floor(Math.random() * prompts.length)];

  document.getElementById('setup').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  document.getElementById('guessSection').classList.add('hidden');
  document.getElementById('scoreboard').classList.add('hidden');
  showTurn();
}

function showTurn() {
  document.getElementById('playerTurn').textContent = `${players[currentPlayer]}'s Turn - Don't Let Others See!`;
  document.getElementById('promptDisplay').classList.add('hidden');
  document.getElementById('hideBtn').classList.add('hidden');
}

function revealPrompt() {
  const promptText = currentPlayer === liarIndex ? liarPrompt : selectedPrompt;
  document.getElementById('promptDisplay').textContent = promptText;
  document.getElementById('promptDisplay').classList.remove('hidden');
  document.getElementById('hideBtn').classList.remove('hidden');
}

function hidePrompt() {
  currentPlayer++;
  if (currentPlayer >= players.length) {
    showGuessSection();
  } else {
    showTurn();
  }
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
