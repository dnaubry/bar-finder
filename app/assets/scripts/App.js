import keys from '../data/keys.json';
import { initFinder } from './modules/questions';

// Loads Google Maps script using API key stored in keys.json
function loadMapScript() {
  var script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${keys.keys[0].googleMaps}`;

  document.body.appendChild(script);
}

window.onload = function() {
  loadMapScript();
  initFinder();
}
