import barList from '../../data/bars.json';
import displayResults from './results';

// Array to hold matched bars as they are filtered
let matchedBars = [];

// Get list of all bars
const allBars = [...barList.bars],
  numOfBars = allBars.length;

// Loop through all bars and push drink and neighborhood options into an array
let drinks = [], neighborhoods = [];
for (let i = 0; i < numOfBars; i++) {
  drinks.push(allBars[i].drink);
  neighborhoods.push(allBars[i].neighborhood);
}
// Remove duplicates and sort alphabetically
drinks = (Array.from(new Set(drinks))).sort();
neighborhoods = (Array.from(new Set(neighborhoods))).sort();

// Array of objects containing the topics for the questions
const topics = [
  {
    name: 'drinks',
    options: drinks,
    template: require('../templates/drinks.hbs')
  },
  {
    name: 'neighborhoods',
    options: neighborhoods,
    template: require('../templates/neighborhoods.hbs')
  },
  {
    name: 'prices',
    options: ['low', 'mid', 'high'],
    template: require('../templates/prices.hbs')
  },
  {
    name: 'tvs',
    options: ['no', 'yes'],
    template: require('../templates/tvs.hbs')
  }
];

function initFinder() {
  // Set matchedBars to full list of bars
  matchedBars = [...barList.bars];

  // Insert text and start button
  const question = document.querySelector('.question');
  question.innerHTML = `
    <p class="question__text">Click start to answer a few questions about what kind of bar you'd like to visit!</p>
    <button id="startBtn" class="button button--large">Start</button>`;

  // Add event listener to start button
  const startBtn = document.getElementById('startBtn');
  startBtn.addEventListener('click', function() {
    // Insert question with the first question topic
    insertQuestion.call(topics[0]);
  });
}

// Filters bars by matching the criteria chosen
function filterBars(criteria) {
  matchedBars = [...matchedBars.filter(bar => {
    const regex = new RegExp(criteria, 'gi');
    return bar.drink.match(regex) ||
          bar.neighborhood.match(regex) ||
          bar.priceRange.match(regex) ||
          bar.tv.match(regex);
  })];
  return matchedBars;
}

// Set matchedBars array equal to the filtered bars so it can be filtered further by the next question
function findBars() {
  matchedBars = filterBars(this.value);
}

// Inserts question and options using Handlebars template and the topics array
// The counter is used to determine the index of which item from the topics array should be used when inserting a question
function insertQuestion(topic) {
  const question = document.querySelector('.question'),
    name = this.name,
    options = this.options,
    template = this.template,
    context = { options: options };

  question.innerHTML = template(context);

  // Keep track of how many times 'insertQuestion' is called
  insertQuestion.count++;

  // Add event listeners to question options
  function events(name) {
    const options = document.querySelectorAll(`.${name}`),
      numOfOptions = options.length,
      numOfTopics = topics.length;

    for (let i = 0; i < numOfOptions; i++) {
      options[i].addEventListener('change', function() {
        // Call findBars() using .call(this) so this is the selected option
        findBars.call(this);

        // Checks insertQuestion.count to see if the count is less than the number of itmes in the topics array
        if (insertQuestion.count < numOfTopics) {
          // If there are more topics, insert next question
          insertQuestion.call(topics[insertQuestion.count]);
        } else {
          // After the last question, display the results
          displayResults();
        }
      });
    }
  }
  events(name);
}

insertQuestion.count = 0;

export { matchedBars, initFinder, insertQuestion };
