function createResultsContainer() {
  const results = document.createElement('div'),
    position = document.querySelector('.main-content');

  results.classList.add('results');
  position.appendChild(results);
}

function removeResultsContainer() {
  const results = document.querySelector('.results'),
    mainContent = document.querySelector('.main-content');

  mainContent.removeChild(results);
}

function createResultsMessage () {
  const questionEl = document.querySelector('.question'),
    results = document.querySelector('.results');

  if (results.firstChild) {
    questionEl.innerHTML = 'Here are your bar options. Go drink!';
  } else {
    questionEl.innerHTML = 'You chose poorly. Try again.';
  }
}

export { createResultsContainer, removeResultsContainer, createResultsMessage };
