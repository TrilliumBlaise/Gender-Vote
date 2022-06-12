const SEX = 'girl';
const REVEAL_TIME = { hours: 11, minutes: 49, seconds: 0 };

const boyElement = document.querySelector('.boy').firstElementChild;
const girlElement = document.querySelector('.girl').firstElementChild;

let savedVotes;
document.addEventListener('DOMContentLoaded', e => {
  showResults();
});
document.addEventListener('click', e => {
  savedVotes = {
    boy: parseInt(boyElement.innerHTML),
    girl: parseInt(girlElement.innerHTML),
  };
  if (e.target.classList.contains('boy') || e.target.parentElement.classList.contains('boy')) {
    addVote('boy');
  }
  if (e.target.classList.contains('girl') || e.target.parentElement.classList.contains('girl')) {
    addVote('girl');
  }
});

function addVote(sex) {
  if (sex === 'boy') {
    savedVotes.boy += 1;
  }
  if (sex === 'girl') {
    savedVotes.girl += 1;
  }
  showResults(savedVotes);
}

function showResults(data) {
  if (data != undefined) {
    boyElement.innerHTML = `${data.boy}`;
    girlElement.innerHTML = `${data.girl}`;
    return;
  }
  boyElement.innerHTML = 0;
  girlElement.innerHTML = 0;
}

function revealSex() {
  const date = new Date();
  if (date.getHours() === REVEAL_TIME.hours && date.getMinutes() === REVEAL_TIME.minutes && date.getSeconds() === REVEAL_TIME.seconds) {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    container.classList.add(`${SEX.toLowerCase()}`);
    const newMessage = document.createElement('h1');
    newMessage.style.fontSize = '233px';
    newMessage.innerHTML = `Congratulations!<br> It's a ${SEX}!`;
    container.append(newMessage);
    startConfetti();
  }
}

setInterval(() => {
  revealSex();
}, 250);
