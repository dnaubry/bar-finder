import { insertDrinkQuestion } from './questions';

function insertStartButton() {
  const questionEl = document.querySelector('.question');

  questionEl.innerHTML = `
    <p class="question__text">Select options to the questions to find a bar to visit.</p>

    <button id="start">Start</button>`;

  addStartEvent();

  function addStartEvent() {
    const startBtn = document.getElementById('start');
    startBtn.addEventListener('click', insertDrinkQuestion);
  }
}

export { insertStartButton };
