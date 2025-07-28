// TODO convert this to use an 'enum' instead of strings
const moves = ["rock", "paper", "scissors"]
let humanScore = 0;
let computerScore = 0;
playGame();

function getComputerChoice() {
  return getRandomMove();
}

function getRandomMove() {
  let index = Math.floor(moves.length * Math.random());
  return moves[index];
}

function getHumanChoice() {
  return prompt("Rock, paper, or scissors?");
  // TODO validate input
}

function playRound(roundNumber, humanChoice, computerChoice) {
  let message = `Round ${roundNumber}: Human plays ${humanChoice}, computer plays ${computerChoice}.`;
  const result = calculateWinner(humanChoice, computerChoice);
  if (result > 0) {
    humanScore++;
    message += " Human wins!";
  } else if (result < 0) {
    computerScore++;
    message += " Computer wins!";
  } else {
    message += " It's a tie!";
  }
  message += ` The score is now: Human ${humanScore}, Computer ${computerScore}.`;
  console.log(message);
}

function calculateWinner(humanChoice, computerChoice) {
  switch (String(humanChoice).toLowerCase()) {
    case "rock":
      if ("scissors" === computerChoice) {
        return 1;
      } else if ("paper" === computerChoice) {
        return -1;
      }
      return 0;
    case "scissors":
      if ("paper" === computerChoice) {
        return 1;
      } else if ("Rock" === computerChoice) {
        return -1
      }
      return 0;
    case "paper": {
      if ("Rock" === computerChoice) {
        return 1;
      } else if ("Scissors" === computerChoice) {
        return -1;
      }
      return 0;
    }
  }
}

function playGame() {
  for (let i = 1; i < 6; i++) {
    playRound(i, getHumanChoice(), getComputerChoice());
  }
  if (humanScore > computerScore) {
    console.log(`By a score of ${humanScore} to ${computerScore}, the human player wins! Score one for humanity!`);
  } else if (computerScore > humanScore) {
    console.log(`By a score of ${computerScore} to ${humanScore}, the bot wins! Better luck next time, meatbag!`);
  } else {
    console.log(`All the striving ended in a draw, ${humanScore} all.`)
  }
}
