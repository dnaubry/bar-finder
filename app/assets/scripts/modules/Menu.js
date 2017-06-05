import BarFinder from '../App';
import Results from './Results';

const Menu = {
  hideAbout() {
    const about = document.querySelector('.about');
    about.classList.remove('about--is-visible');
  },

  showAbout() {
    const about = document.querySelector('.about'),
      close = document.getElementById('close');
    about.classList.add('about--is-visible');
    close.addEventListener('click', Menu.hideAbout);
  },

  init() {
    const aboutBtn = document.getElementById('aboutBtn'),
      allBarsBtn = document.getElementById('allBarsBtn');
    aboutBtn.addEventListener('click', Menu.showAbout);
    allBarsBtn.addEventListener('click', function() {
      BarFinder.init();
      Results.display(BarFinder.matches);
    });
  }
}

export default Menu;
