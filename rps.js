// TODO convert this to use an 'enum' instead of strings
const moves = ["rock", "paper", "scissors"]
const winningScore = 5;
let playerScore = 0;
let botScore = 0;

const totalScoreDiv = document.querySelector("#total-score");
const messageDiv = document.querySelector("#message");
const playerMoveHistoryElement = document.querySelector("#player-move-history");
const botMoveHistoryElement = document.querySelector("#bot-move-history");

const playAgainButton = document.querySelector("#play-again");
const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");

addEventListeners();
startNewGame();

function addEventListeners() {
  playAgainButton.addEventListener("click", () => startNewGame(true));
  rockButton.addEventListener("click", () => makeMove(rockButton.id));
  paperButton.addEventListener("click", () => makeMove(paperButton.id));
  scissorsButton.addEventListener("click", () => makeMove(scissorsButton.id));
  document.addEventListener("keypress", e => {
    switch (e.key.toLowerCase()) {
      case "r":
        makeMove("rock");
        break;
      case "s":
        makeMove("scissors");
        break;
      case "p":
        makeMove("paper");
        break;
      case "a":
        startNewGame(true);
        break;
    }
  });
}

function startNewGame(waitForGameOver = false) {
  if (!isGameOver() && waitForGameOver) {
    return;
  }
  resetScores();
  setUpVisualsForNewGame();
  clearMoveHistories();
  populateSubtitleWithWinningScore();
  updateTotalScore();

  runGame();
}

// Let the event listeners do their thing until the game is over.
function runGame() {
  const gameOverMessage = checkForGameOver();
  if (gameOverMessage) {
    messageDiv.textContent = gameOverMessage;
  }
}

function setUpVisualsForNewGame() {
  playAgainButton.hidden = true;
  rockButton.hidden = false;
  paperButton.hidden = false;
  scissorsButton.hidden = false;
  messageDiv.textContent = "What's your move?";
}

function clearMoveHistories() {
  const playerMoves = playerMoveHistoryElement.querySelectorAll("p");
  if (playerMoves) {
    playerMoves.forEach(move => move.remove());
  }
  const botMoves = botMoveHistoryElement.querySelectorAll("p");
  if (botMoves) {
    botMoves.forEach(move => move.remove());
  }
}

function populateSubtitleWithWinningScore() {
  const subtitleElement = document.querySelector("#subtitle");
  subtitleElement.textContent = `First one to ${winningScore} wins`;
}

function updateTotalScore() {
  totalScoreDiv.textContent = `Score: Player ${playerScore}, Bot ${botScore}`;
}

function makeMove(move) {
  if (isGameOver()) {
    return;
  }
  const botMove = getRandomMove();

  const roundResult = calculateRoundResult(move, botMove);
  if (roundResult > 0) {
    playerScore++;
  } else if (roundResult < 0) {
    botScore++;
  }
  updateTotalScore();
  displayRoundResult(roundResult, move, botMove);
  runGame();
}

function displayRoundResult(roundResult, playerMove, botMove) {
  const newPlayerMoveElement = document.createElement("p");
  const newBotMoveElement = document.createElement("p");
  if (roundResult === 0) {
    newPlayerMoveElement.textContent = playerMove;
    newBotMoveElement.textContent = botMove;
  } else if (roundResult > 0) {
    newPlayerMoveElement.classList.add("winner");
    newPlayerMoveElement.textContent = playerMove + ` (${playerScore})`;
    newBotMoveElement.textContent = botMove;
  } else {
    newBotMoveElement.classList.add("winner");
    newBotMoveElement.textContent = botMove + ` (${botScore})`;
    newPlayerMoveElement.textContent = playerMove;
  }
  playerMoveHistoryElement.appendChild(newPlayerMoveElement);
  botMoveHistoryElement.appendChild(newBotMoveElement);
}

function getRandomMove() {
  let index = Math.floor(moves.length * Math.random());
  return moves[index];
}

function calculateRoundResult(playerMove, botMove) {
  switch (playerMove) {
    case "rock":
      if ("scissors" === botMove) {
        return 1;
      } else if ("paper" === botMove) {
        return -1;
      }
      return 0;
    case "scissors":
      if ("paper" === botMove) {
        return 1;
      } else if ("rock" === botMove) {
        return -1
      }
      return 0;
    case "paper": {
      if ("rock" === botMove) {
        return 1;
      } else if ("scissors" === botMove) {
        return -1;
      }
      return 0;
    }
  }
}

function checkForGameOver() {
  if (!isGameOver()) {
    return "";
  }

  playAgainButton.hidden = false;
  rockButton.hidden = true;
  paperButton.hidden = true;
  scissorsButton.hidden = true;

  if (playerScore >= winningScore) {
    return `You win, ${playerScore} to ${botScore}! ` + "\u{1f60e}";
  } else {
    return `You lose, ${playerScore} to ${botScore}! ` + "\u{1f62f}";
  }
}

function isGameOver() {
  return playerScore >= winningScore || botScore >= winningScore;
}

function resetScores() {
  playerScore = 0;
  botScore = 0;
}
