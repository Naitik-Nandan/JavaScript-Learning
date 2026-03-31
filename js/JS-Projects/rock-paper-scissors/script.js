// Load previous score or start new one
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
let result = '';
updateScoreElement();
/*if (!score)
{
score =
{
  wins: 0,
  losses: 0,
  ties: 0
}
}*/
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You Lose.';
      score.losses++;
    } else if (computerMove === 'Paper') {
      result = 'You Win.';
      score.wins++;
    } else {
      result = 'Tie.';
      score.ties++;
    }
  }

  if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You Win.';
      score.wins++;
    } else if (computerMove === 'Paper') {
      result = 'Tie.';
      score.ties++;
    } else {
      result = 'You Lose.';
      score.losses++;
    }
  }

  if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie.';
      score.ties++;
    } else if (computerMove === 'Paper') {
      result = 'You Lose.';
      score.losses++;
    } else {
      result = 'You Win.';
      score.wins++;
    }
  }

  // Save updated score
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();

  updateScoreElement();

  //alert(`You chose ${playerMove}. Computer picked ${computerMove}. ${result} Wins: ${score.wins}, Losses: ${score.  losses}, Ties: ${score.ties}`);

  updateResult();
  updateGame(playerMove, computerMove);
}

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) return 'Rock';
  else if (randomNumber < 2 / 3 && randomNumber > 1 / 3) return 'Paper';
  else return 'Scissors';
}

function reset() {
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.removeItem('score');
  alert("Score Reset");
  updateScoreElement();
  document.querySelector('.js-game').innerHTML = ``;
  document.querySelector('.js-result').innerHTML = ``;
}
function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
function updateResult() {
  document.querySelector('.js-result').innerHTML = `${result}`;
}
function updateGame(playerMove, computerMove) {
  document.querySelector('.js-game').innerHTML = `You chose <img src="${playerMove}-emoji.png" class="move-icon"> Computer picked <img src="${computerMove}-emoji.png" class="move-icon">`;
}
