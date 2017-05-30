import { matchedBars, initFinder, insertQuestion } from './questions';
import { createElement } from './elements';

// Add all bars button event listener
const allBarsBtn = document.getElementById('allBarsBtn');
allBarsBtn.addEventListener('click', function() {
  initFinder();
  displayResults();
});

// Displays the details of the matched bars using a Handlebars template
function displayBars() {
  const results = document.querySelector('.results'),
    resultsTemplate = require('../templates/results.hbs');
  let context, displayResult;
  const html = matchedBars.map(bar => {
    context = {
      name: bar.name,
      website: bar.website,
      address: bar.address.slice(0, (bar.address.indexOf(','))),
      neighborhood: bar.neighborhood,
      speciality: bar.drink,
      other: bar.otherDrinks,
      price: bar.price,
      tv: bar.tv
    };
    displayResult = resultsTemplate(context);
    return displayResult;
  }).join('');
  results.innerHTML = html;
}

// Adds the locations (latitude and longitude) of the matched bars to an array so they can be inserted into the map
function getBarLocations(bars) {
  let locations = [], loc;
  for (let i = 0; i < bars.length; i++) {
    loc = {lat: bars[i].latitude, lng: bars[i].longitude};
    locations.push(loc);
  }
  return locations;
}

// Displays Google Map with the matched bars marked
function initMap() {
  let locations = getBarLocations(matchedBars);
  var map = new google.maps.Map(document.querySelector('.map'), {
    zoom: 14,
    center: locations[0],
    styles: [
      {
        'featureType': 'administrative',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'administrative.country',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'landscape',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'simplified'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'labels',
        'stylers': [
          {
            'visibility': 'simplified'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'road.local',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'on'
          }
        ]
      },
      {
        'featureType': 'transit',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'transit.line',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#3f518c'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'simplified'
          },
          {
            'color': '#84afa3'
          },
          {
            'lightness': 52
          }
        ]
      }
    ]
  });

  let infowindow = new google.maps.InfoWindow();

  let marker, i;
  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: locations[i],
      map: map,
      content: `
      <div class="infowindow-content">
        <p><span><a href="${matchedBars[i].website}" target="_blank">${matchedBars[i].name}</a></span></p>
        <p><span>Address:</span> ${matchedBars[i].address}</p>
        <p><a href="https://www.google.com/maps/dir/Current+Location/${matchedBars[i].address}" target="_blank">Directions</a> (opens in Google Maps)
      </div>`
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(marker.content);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}

// Add a restart button after the results, which will restart the finder when clicked
function insertRestartButton() {
  // Create an element for the retart button inside .main-content
  createElement('main-content', 'restart');

  // Add the button to the restart element
  const restart = document.querySelector('.restart');
  restart.innerHTML = `<button id="restartBtn" class="button button--large">Restart</button>`;

  // Add event listener to restart button
  const restartBtn = document.getElementById('restartBtn');
  restartBtn.addEventListener('click', function() {
    // Reinitiate the bar finder
    initFinder();
    // Set counter to 0
    insertQuestion.count = 0;
  });
}

// Displays the matched bar results
function displayResults() {
  const question = document.querySelector('.question');
  // If there are matched bars
  if (matchedBars.length > 0) {
    // Create a div element to insert the matched bars into
    createElement('main-content', 'results');
    // Create a div element to insert the map into
    createElement('main-content', 'map');
    question.innerHTML = '<p class="question__text">Here are your bar options. Go drink!</p>';
    displayBars();
    initMap();
  } else {
    question.innerHTML = '<p class="question__text">You chose poorly. Try again.</p>';
  }
  insertRestartButton();
}

export default displayResults;
