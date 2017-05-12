import { resetBarSearch } from '../App';
import { insertDrinkQuestion } from './questions';
import { removeResultsContainer } from './results';

function insertStartButton() {
  const questionEl = document.querySelector('.question');

  questionEl.innerHTML = `
    <p>Select options to the questions to find a bar to visit.</p>

    <button id="start">Start</button>`;

  addStartEvent();

  function addStartEvent() {
    const startBtn = document.getElementById('start');
    startBtn.addEventListener('click', insertDrinkQuestion);
  }
}

function insertRetryButton() {
  const wrapperEl = document.querySelector('.wrapper'),
    retryEl = document.createElement('div');

  retryEl.classList.add('retry');
  retryEl.innerHTML = `
    <button id="retry">Retry</button>`;
  wrapperEl.insertBefore(retryEl, null);

  addRetryEvent();

  function addRetryEvent() {
    const retryBtn = document.getElementById('retry');
    retryBtn.addEventListener('click', function() {
      removeResultsContainer();
      removeRetryButton();
      insertStartButton();
      resetBarSearch();
    });
  }
}

function removeRetryButton() {
  const retryEl = document.querySelector('.retry'),
    wrapperEl = document.querySelector('.wrapper');

  wrapperEl.removeChild(retryEl);
}

export { insertStartButton, insertRetryButton, removeRetryButton };

