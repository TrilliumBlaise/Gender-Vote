const state = {
  sex: '',
  revealTime: { hours: 16, minutes: 30, seconds: 0 },
  name: '',
}

const boyElement = document.querySelector('.boy').firstElementChild
const girlElement = document.querySelector('.girl').firstElementChild

let savedVotes
document.addEventListener('DOMContentLoaded', e => {
  showResults()
})
document.addEventListener('click', e => {
  savedVotes = {
    boy: parseInt(boyElement.innerHTML),
    girl: parseInt(girlElement.innerHTML),
  }
  if (e.target.matches('.change-parameters')) {
    openParamterChangeWindow()
  }
  if (e.target.matches('[data-button = "yes"]') || e.target.matches('[data-button = "no"]')) {
    answerYesOrNo(e.target)
  }
  if (e.target.classList.contains('boy') || e.target.parentElement.classList.contains('boy')) {
    addVote('boy')
  }
  if (e.target.classList.contains('girl') || e.target.parentElement.classList.contains('girl')) {
    addVote('girl')
  }
})
document.addEventListener('keydown', e => {
  if (!document.activeElement.matches('input')) return
  if (e.key !== 'Enter') return
  const newTime = getValues()
  newTime.forEach(time => {
    if (time[0] !== '') {
      state.revealTime[time[1]] = parseInt(time[0])
    }
  })
  document.querySelector('.parameter-window').style.display = 'none'
})

function addVote(sex) {
  if (sex === 'boy') {
    savedVotes.boy += 1
  }
  if (sex === 'girl') {
    savedVotes.girl += 1
  }
  showResults(savedVotes)
}

function showResults(data) {
  if (data != undefined) {
    boyElement.innerHTML = `${data.boy}`
    girlElement.innerHTML = `${data.girl}`
    return
  }
  boyElement.innerHTML = 0
  girlElement.innerHTML = 0
}

function revealSex() {
  const date = new Date()
  if (
    date.getHours() === state.revealTime.hours &&
    date.getMinutes() === state.revealTime.minutes &&
    date.getSeconds() === state.revealTime.seconds
  ) {
    document.querySelector('.change-parameters').style.display = 'none'
    const container = document.querySelector('.container')
    container.innerHTML = ''
    const newMessage = document.createElement('h1')
    newMessage.style.fontSize = '233px'
    newMessage.innerHTML = `Congratulations!<br> It's a ${state.sex}!<br>${state.name}`
    container.append(newMessage)
    container.classList.add(`${state.sex.toLowerCase()}`)
    startConfetti()
  }
}

function openParamterChangeWindow() {
  document.querySelector('.parameter-window').style.display = 'flex'
}
function getValues() {
  const changeTime = document.querySelector('.change-time')
  const inputs = []
  changeTime.querySelectorAll('input').forEach(input => inputs.push(input.value))

  const [hours, minutes, seconds] = [...inputs]
  return [
    [hours, 'hours'],
    [minutes, 'minutes'],
    [seconds, 'seconds'],
  ]
}

function answerYesOrNo(target) {
  if (target.dataset.button === 'yes') {
    document.querySelector('.buttons').style.display = 'none'
    document
      .querySelector('.change-time')
      .querySelectorAll('input')
      .forEach(input => (input.style.display = 'block'))
  }
  if (target.dataset.button === 'no') {
    document.querySelector('.parameter-window').style.display = 'none'
  }
}

function changeParameters() {}
setInterval(() => {
  revealSex()
}, 250)
