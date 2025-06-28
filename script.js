let players = [];
let scores = {};
let answers = {};
let votes = {};
let currentRound = 1;
let maxRounds = 5;
let imposterIndex = -1;
let category = "general";
let questions = null;

function addPlayer() {
  const name = document.getElementById("player-name").value.trim();
  if (name && !players.includes(name)) {
    players.push(name);
    scores[name] = 0;
    document.getElementById("player-list").innerHTML += `<li>${name}</li>`;
    document.getElementById("player-name").value = "";
  }
}

function startGame() {
  if (players.length < 3) {
    alert("At least 3 players needed!");
    return;
  }
  category = document.getElementById("category-select").value;
     fetch (`${category}.json`)
    .then(res => res.json())
    .then(data => {
      questions = data;
      document.getElementById("player-setup").style.display = "none";
      document.getElementById("game-area").style.display = "block";
      nextRound();
    });
}
function nextRound() {
  document.getElementById("round-info").innerText = `Round ${currentRound} of ${maxRounds}`;
  answers = {};
  votes = {};

  const qIndex = Math.floor(Math.random() * questions.normal.length);
  const normalQuestion = questions.normal[qIndex];
  const imposterQuestion = questions.imposter[qIndex];

  imposterIndex = Math.floor(Math.random() * players.length);
  alert(`Ask questions secretly to each player. Do NOT show others.\n\nImposter is: ${players[imposterIndex]}`);

  let html = "";
  players.forEach((p, i) => {
    let q = (i === imposterIndex) ? imposterQ : normalQ;
    html += `
      <div>
        <h3>${p}'s turn</h3>
        <p>Question: ${q}</p>
        <input type="text" id="answer-${p}" placeholder="Type your answer" />
      </div>
    `;
  });

  html += `<button onclick="submitAnswers()">Submit All Answers</button>`;
  document.getElementById("question-area").innerHTML = html;
  document.getElementById("answer-area").innerHTML = "";
  document.getElementById("voting-area").innerHTML = "";
  document.getElementById("results-area").innerHTML = "";
}

function submitAnswers() {
  players.forEach(p => {
    answers[p] = document.getElementById(`answer-${p}`).value.trim();
  });

  let voteHTML = "<h3>Vote: Who was the imposter?</h3>";
  players.forEach(p => {
    voteHTML += `
      <div>
        <p>${p}, vote:</p>
        <select id="vote-${p}">
          ${players.map(op => op !== p ? `<option value="${op}">${op}</option>` : "").join('')}
        </select>
      </div>
    `;
  });
  voteHTML += `<button onclick="submitVotes()">Submit Votes</button>`;
  document.getElementById("question-area").innerHTML = "";
  document.getElementById("voting-area").innerHTML = voteHTML;
}
function submitVotes() {
  players.forEach(p => {
    votes[p] = document.getElementById(`vote-${p}`).value;
  });

  let tally = {};
  for (let v in votes) {
    tally[votes[v]] = (tally[votes[v]] || 0) + 1;
  }

  let maxVoted = Object.entries(tally).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  let html = `<h3>Results:</h3>`;

  players.forEach(p => {
    html += `<p>${p} answered: "${answers[p]}"</p>`;
  });

  if (maxVoted === players[imposterIndex]) {
    html += `<p><strong>Imposter was caught: ${maxVoted}</strong></p>`;
    for (let p in votes) {
      if (votes[p] === players[imposterIndex]) {
        scores[p] += 2;
      } else {
        scores[p] -= 1;
      }
    }
  } else {
    html += `<p><strong>Imposter escaped! It was: ${players[imposterIndex]}</strong></p>`;
    scores[players[imposterIndex]] += 3;
    for (let p in votes) {
      if (p !== players[imposterIndex]) {
        scores[p] -= 1;
      }
    }
  }

  html += `<h3>Scores:</h3>`;
  for (let p in scores) {
    html += `<p>${p}: ${scores[p]}</p>`;
  }

  document.getElementById("results-area").innerHTML = html;

  if (currentRound < maxRounds) {
    currentRound++;
    setTimeout(nextRound, 5000);
  } else {
    html += `<h2>Game Over!</h2>`;
    let maxScore = Math.max(...Object.values(scores));
    let winners = Object.entries(scores).filter(([_, score]) => score === maxScore).map(([name]) => name);
    html += `<p><strong>Winner(s): ${winners.join(", ")}</strong></p>`;
  }
}
