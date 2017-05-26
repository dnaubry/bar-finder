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
    questionEl.innerHTML = '<p class="question__text">Here are your bar options. Go drink!</p>';
  } else {
    questionEl.innerHTML = '<p class="question__text">You chose poorly. Try again.</p>';
  }
}

export { createResultsContainer, removeResultsContainer, createResultsMessage };
