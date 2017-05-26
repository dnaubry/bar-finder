import barList from '../data/bars.json';
import keys from '../data/keys.json';
import { insertStartButton } from './modules/start';

let barSearch = [...barList.bars], matchedBars;

insertStartButton();

function findBars(criteria) {
  barSearch = [...barSearch.filter(bar => {
    const regex = new RegExp(criteria, 'gi');
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
      website: bar.website,
      address: bar.address.slice(0, (bar.address.indexOf(','))),
      neighborhood: bar.neighborhood,
      speciality: bar.speciality,
      price: bar.price,
      tv: bar.tv
    };
    displayResult = resultsTemplate(context);
    return displayResult;
  }).join('');
  results.innerHTML = html;
  createMapContainer();
  initMap();
}

function resetBarSearch() {
  barSearch = [...barList.bars];
}

function initMap() {
  let locations = [], loc;
  for (let i = 0; i < matchedBars.length; i++) {
    loc = {lat: matchedBars[i].latitude, lng: matchedBars[i].longitude};
    locations.push(loc);
  }
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

  let marker, i, content;
  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: locations[i],
      map: map,
      content: `
      <div class="infowindow-content">
        <p><span>${matchedBars[i].name}</span></p>
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

function createMapContainer() {
  const map = document.createElement('div'),
    position = document.querySelector('.main-content');

  map.classList.add('map');
  position.appendChild(map);
}

function removeMapContainer() {
  const map = document.querySelector('.map'),
    mainContent = document.querySelector('.main-content');

  mainContent.removeChild(map);
}

function loadScript() {
  var script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${keys.keys[0].googleMaps}`;

  document.body.appendChild(script);
}

window.onload = loadScript;

export { filterBars, displayBars, resetBarSearch, removeMapContainer };
