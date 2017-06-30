import 'core-js/fn/array/from';
import keys from '../data/keys.json';
import barList from '../data/bars.json';
import Menu from './modules/Menu';
import Question from './modules/Question';
import Results from './modules/Results';

const BarFinder = {
  questionTopics: ['neighborhood', 'drink', 'price', 'tv'],
  topics: [],
  matches: [],

  init() {
    const html = `
      <p class="question__text">Click start to answer a few questions 
      about what kind of bar you'd like to visit!</p>
      <button id="startBtn" class="button button--large">Start</button>`,
      question = document.querySelector('.question');

    question.innerHTML = html;

     // Add event listener to start button
    const startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', function() {
      // Insert question with the first question topic
      Question.insert.call(BarFinder.topics[0]);
    });

    // Set matches to full list of bars
    this.matches = [...barList.bars];
    // Fill topics array with details from matches
    this.topics = BarFinder.generateTopicDetails(this.questionTopics);
    // Remove results elements (applies to restarts)
    Results.remove();
  },

  filterMatches(criteria, topic) {
    this.matches = [...this.matches.filter(bar => {
      // For the neighborhood question, match exact selection
      if (topic === 'neighborhood') {
        return bar[topic] === criteria;
        // For the drink question, include the otherDrinks property options in filter
      } else if (topic === 'drink') {
        return bar[topic] === criteria ||
          bar.otherDrinks.includes(criteria);
      } else {
        // Otherwise, return bars that include the criteria
        // For price and tv questions, Uses priceRange property and tvOptions property
        // to include all results based on selection
        return bar[topic].includes(criteria);
      }
    })];
    return this.matches;
  },

  updateMatches() {
    this.matches = BarFinder.filterMatches(this.value, this.name);
  },

  // Fill the topics array using the questionTopics and info from
  // matches array, which is filled from bars.json on init()
  generateTopicDetails() {
    const topicDetails = this.questionTopics.map(topic => {
      const name = topic,
        template = require(`./templates/${topic}.hbs`);
      let options = this.matches.map(bar => bar[topic]);
      // Remove duplicates and sort alphabetically
      options = (Array.from(new Set(options))).sort();
      const topicDetails = { name, options, template };
      return topicDetails;
    });
    return topicDetails;
  }
}

// Loads Google Maps script using API key stored in keys.json
function loadMapScript() {
  var script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${keys.keys[0].googleMaps}`;

  document.body.appendChild(script);
}

function loadFinder() {
  loadMapScript();
  BarFinder.init();
  Menu.init();
}

window.onload = loadFinder;

export default BarFinder;
