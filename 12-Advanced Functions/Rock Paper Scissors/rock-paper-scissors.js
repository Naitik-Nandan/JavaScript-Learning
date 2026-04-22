let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
}

document.querySelector('.rock').addEventListener('click', () => playGame('rock'));
document.querySelector('.paper').addEventListener('click', () => playGame('paper'));
document.querySelector('.scissors').addEventListener('click', () => playGame('scissors'));
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r')
        playGame('rock');
    else if (event.key === 'p')
        playGame('paper');
    else if (event.key === 's')
        playGame('scissors');
    else if (event.key === 'a')
        autoPlay();
    else if (event.key === 'Backspace')
        reset();
})
let isAutoPlaying = false;
let intervalId;
function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = computerMover();
            playGame(playerMove);
            //console.log(intervalId);
        }, 1000);
        isAutoPlaying = true;
        document.querySelector('.auto-play').innerHTML = 'Stop Playing';
    }
    else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.auto-play').innerHTML = 'Auto Play';
    }
}

document.querySelector('.auto-play').addEventListener('click', autoPlay);

function computerMover() {
    let computerMove = Math.random();
    //console.log(computerMove);
    if (computerMove <= (0.3))
        computerMove = 'rock';
    else if (computerMove <= (0.6) && computerMove > (0.3))
        computerMove = 'paper';
    else if (computerMove > (0.6))
        computerMove = 'scissors';
    return computerMove;
}

function playGame(move) {

    let copyScore = {
        wins: score.wins,
        losses: score.losses,
        ties: score.ties
    };

    const computerMove = computerMover();
    if (move === 'paper') {
        if (computerMove === 'paper')
            score.ties += 1;
        else if (computerMove === 'rock')
            score.wins += 1;
        else
            score.losses += 1;
    }

    if (move === 'scissors') {
        if (computerMove === 'scissors')
            score.ties += 1;
        else if (computerMove === 'paper')
            score.wins += 1;
        else
            score.losses += 1;
    }

    if (move === 'rock') {
        if (computerMove === 'rock')
            score.ties += 1;
        else if (computerMove === 'scissors')
            score.wins += 1;
        else
            score.losses += 1;
    }

    let result = '';
    if (score.wins - copyScore.wins === 1)
        result = 'You Win!';
    else if (score.losses - copyScore.losses === 1)
        result = 'You Loose!';
    else if (score.ties - copyScore.ties === 1)
        result = 'TIE!';

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moveRemarks').innerHTML = `You: <img src="${move}.png" class="move">  Computer: <img src="${computerMove}.png" class="move">`;
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

    localStorage.setItem('score', JSON.stringify(score));

}

function resetConfirm() {
document.querySelector('.resetConfirmation').innerHTML = `Are you sure you want to reset the score? <button class="confirm-yes">Yes</button> <button class="confirm-no">No</button>`;
document.querySelector('.confirm-yes').addEventListener('click' , () => {
    reset();
    document.querySelector('.resetConfirmation').innerHTML = ``;
})

document.querySelector('.confirm-no').addEventListener('click' , () => {
    document.querySelector('.resetConfirmation').innerHTML = ``;
})
}

function reset() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

document.querySelector('.reset').addEventListener('click', resetConfirm);