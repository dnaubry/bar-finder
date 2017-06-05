import BarFinder from '../App';
import Question from './Question';
import { createElement, removeElement } from './Elements';

const Results = {
  successHtml: '<p class="question__text">Here are your bar options. Go drink!</p>',
  failHtml: '<p class="question__text">You chose poorly. Try again.</p>',

  // Shows matched bars using Handlebars template
  showMatches(matches) {
    const results = document.querySelector('.results'),
      resultsTemplate = require('../templates/results.hbs');
    let context, barDetails;
    const html = matches.map(bar => {
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
      barDetails = resultsTemplate(context);
      return barDetails;
    }).join('');
    results.innerHTML = html;
  },

  // Displays Google Map with the matched bars marked
  initMap(matches) {
    const locations = matches.map(bar => {
      let loc = {};
      loc = {lat: bar.latitude, lng: bar.longitude};
      return loc;
    });
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
          <p><span><a href="${matches[i].website}" target="_blank">${matches[i].name}</a></span></p>
          <p><span>Address:</span> ${matches[i].address}</p>
          <p><a href="https://www.google.com/maps/dir/Current+Location/${matches[i].address}" target="_blank">Directions</a> (opens in Google Maps)
        </div>`
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(marker.content);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  },

  setupRestart() {
    // Create an element for the retart button inside .main-content
    createElement('main-content', 'restart');

    // Add the button to the restart element
    const restart = document.querySelector('.restart');
    restart.innerHTML = `<button id="restartBtn" class="button button--large">Restart</button>`;

    // Add event listener to restart button
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', function() {
      // Reinitiate the bar finder
      BarFinder.init();
      // Set question counter to 0
      Question.insert.count = 0;
    });
  },

  display(matches) {
    const question = document.querySelector('.question');
    if (matches.length > 0) {
      // Create elements to insert the matched bars and map into
      createElement('main-content', 'results');
      createElement('main-content', 'map');
      // Displays success message, matched bar results and map
      question.innerHTML = this.successHtml;
      this.showMatches(matches);
      this.initMap(matches);
    } else {
      // Displays no results message
      question.innerHTML = this.failHtml;
    }
    // Adds restart button to page
    this.setupRestart();
  },

  // Removes results when re-initilizing finder
  remove() {
    // If they exist, remove results, map, and restart elements
    if (document.querySelector('.results')) {
      removeElement('main-content', 'results');
    }
    if (document.querySelector('.map')) {
      removeElement('main-content', 'map');
    }
    if (document.querySelector('.restart')) {
      removeElement('main-content', 'restart');
    }
  }
}

export default Results;
