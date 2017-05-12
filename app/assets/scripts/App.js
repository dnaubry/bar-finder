import bars from './modules/bars';
import { insertStartButton } from './modules/buttons';

let barSearch = [...bars], matchedBars;

insertStartButton();

function findBars(criteria) {
  barSearch = [...barSearch.filter(bar => {
    const regex = new RegExp(criteria, 'gi');
    console.log(regex);
    return bar.speciality.match(regex) ||
          bar.neighborhood.match(regex) ||
          bar.priceRange.match(regex) ||
          bar.tv.match(regex);
  })];
  return barSearch;
}

function filterBars() {
  matchedBars = findBars(this.value);
}

function displayBars() {
  const results = document.querySelector('.results'),
    resultsTemplate = require('./templates/results.hbs');
  let context, displayResult;
  const html = matchedBars.map(bar => {
    context = {
      name: bar.name,
      neighborhood: bar.neighborhood,
      speciality: bar.speciality,
      price: bar.price,
      tv: bar.tv
    };
    displayResult = resultsTemplate(context);
    return displayResult;
  }).join('');
  results.innerHTML = html;
}

function resetBarSearch() {
  barSearch = [...bars];
}

export { filterBars, displayBars, resetBarSearch };
