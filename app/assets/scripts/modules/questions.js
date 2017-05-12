import { filterBars, displayBars } from '../App';
import bars from './bars';
import { createResultsContainer, createResultsMessage } from './results';
import { insertRetryButton } from './buttons';


function insertDrinkQuestion() {
  const questionEl = document.querySelector('.question'),
    drinks = ['beer', 'cider', 'wine', 'cocktails'],
    drinksTemplate = require('../templates/drinks.hbs'),
    context = {
      drinks: drinks
    },
    drinkOptions = drinksTemplate(context);

  questionEl.innerHTML = drinkOptions;
  addDrinkEvents();

  function addDrinkEvents() {
    const drinks = document.querySelectorAll('[name="speciality"]'),
      drinksLength = drinks.length;

    for (let i = 0; i < drinksLength; i++) {
      drinks[i].addEventListener('click', function() {
        filterBars.call(this);
        insertNeighborhoodQuestion();
      });
    }
  }
}

function insertNeighborhoodQuestion() {
  const questionEl = document.querySelector('.question'),
    barsLength = bars.length,
    neighborhoodsTemplate = require('../templates/neighborhoods.hbs');
  let allNeighborhoods = [];

  for (let i = 0; i < barsLength; i++) {
    allNeighborhoods.push(bars[i].neighborhood);
  }
  allNeighborhoods = Array.from(new Set(allNeighborhoods));

  const context = {
      neighborhoods: allNeighborhoods
    },
    neighborhoodOptions = neighborhoodsTemplate(context);

  questionEl.innerHTML = neighborhoodOptions;

  addNeighborhoodsEvent();

  function addNeighborhoodsEvent() {
    const neighborhoods = document.getElementById('neighborhoods');

    neighborhoods.addEventListener('change', function() {
      filterBars.call(this);
      insertPriceQuestion();
    });
  }
}

function insertPriceQuestion() {
  const questionEl = document.querySelector('.question'),
    priceTemplate = require('../templates/price.hbs'),
    context = {
      low: 'low',
      mid: 'mid',
      high: 'high'
    },
    priceOptions = priceTemplate(context);

  questionEl.innerHTML = priceOptions;

  addPricesEvent();

  function addPricesEvent() {
    const prices = document.querySelectorAll('[name="price"]'),
      radioLength = prices.length;

    for (let i = 0; i < radioLength; i++) {
      prices[i].addEventListener('click', function() {
        filterBars.call(this);
        insertTVQuestion();
      });
    }
  }
}

function insertTVQuestion() {
  const questionEl = document.querySelector('.question'),
    tvs = ['no', 'yes'],
    tvsTemplate = require('../templates/tvs.hbs'),
    context = {
      tvs: tvs
    },
    tvOptions = tvsTemplate(context);

  questionEl.innerHTML = tvOptions;

  addTVEvent();

  function addTVEvent() {
    const tv = document.querySelectorAll('[name="tv"]'),
      tvLength = tv.length;

    for (let i = 0; i < tvLength; i++) {
      tv[i].addEventListener('click', function() {
        createResultsContainer();
        displayBars();
        createResultsMessage();
        insertRetryButton();
      });
    }
  }
}

export { insertDrinkQuestion, insertNeighborhoodQuestion, insertPriceQuestion, insertTVQuestion };
