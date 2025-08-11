// TODO convert this to use an 'enum' instead of strings
const moves = ["rock", "paper", "scissors"]
const winningScore = 5;

let playerScore = 0;
let botScore = 0;
// make sure round results don't get overwritten by move prompt when player moves fast
let stackedMoves = 0;

const totalScoreDiv = document.querySelector("#total-score");
const messageDiv = document.querySelector("#message");
const playerMoveHistoryElement = document.querySelector("#player-move-history");
const botMoveHistoryElement = document.querySelector("#bot-move-history");

playGame();

function playGame() {
  populateSubtitleWithWinningScore();
  updateTotalScore();
  showMovePrompt();
  // add event listeners
  const rockButton = document.querySelector("#rock");
  const paperButton = document.querySelector("#paper");
  const scissorsButton = document.querySelector("#scissors");
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
    }
  });
}

function populateSubtitleWithWinningScore() {
  const subtitleElement = document.querySelector("#subtitle");
  subtitleElement.textContent = `First one to ${winningScore} wins`;
}

function updateTotalScore() {
  totalScoreDiv.textContent = `Score: Player ${playerScore}, Bot ${botScore}`;
}

function showMovePrompt() {
  const gameOverMessage = getGameOverMessage();
  if (gameOverMessage) {
    messageDiv.textContent = gameOverMessage;
    // TODO remove the listeners so the game ends and
    // TODO give the user a way to play again
  } else {
    if (stackedMoves < 2) {
      messageDiv.textContent = "What's your move?";
      stackedMoves = 0;
    } else {
      stackedMoves--;
    }
  }
}

function makeMove(move) {
  const botMove = getRandomMove();

  // add the player and bot moves to the history
  const newPlayerMoveElement = document.createElement("p");
  newPlayerMoveElement.textContent = move;
  playerMoveHistoryElement.appendChild(newPlayerMoveElement);
  const newBotMoveElement = document.createElement("p");
  newBotMoveElement.textContent = botMove;
  botMoveHistoryElement.appendChild(newBotMoveElement);

  const roundResult = calculateRoundResult(move, botMove);
  if (roundResult > 0) {
    playerScore++;
  } else if (roundResult < 0) {
    botScore++;
  }
  updateTotalScore();
  displayRoundResult(roundResult, move, botMove);
  stackedMoves++;
  setTimeout(() => showMovePrompt(), 1500);
}

function displayRoundResult(roundResult, playerMove, botMove) {
  let message;
  if (roundResult === 0) {
    message = "It's a tie!";
  } else if (roundResult > 0) {
    message = "You win this round!";
  } else {
    message = " You lose this round!";
  }
  messageDiv.textContent = message;
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

function getGameOverMessage() {
  if (playerScore >= winningScore) {
    return `You were the first to score ${winningScore}! You win! Refresh the page to play again.`;
  } else if (botScore >= winningScore) {
    return `The bot got to ${winningScore} before you! Better luck next time! Refresh the page to play again.`;
  }
  return "";
}

function resetScores() {
  playerScore = 0;
  botScore = 0;
}
