import { resetBarSearch, removeMapContainer } from '../App';
import { removeResultsContainer } from './results';
import { insertStartButton } from './start';


function insertRetryButton() {
  const wrapperEl = document.querySelector('.wrapper'),
    retryEl = document.createElement('div');

  retryEl.classList.add('retry');
  retryEl.innerHTML = `
    <button id="retry">Start Over</button>`;
  wrapperEl.insertBefore(retryEl, null);

  addRetryEvent();

  function addRetryEvent() {
    const retryBtn = document.getElementById('retry');
    retryBtn.addEventListener('click', function() {
      removeResultsContainer();
      removeMapContainer();
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

export { insertRetryButton, removeRetryButton };

