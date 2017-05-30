function about() {
  function show() {
    const about = document.querySelector('.about'),
      close = document.getElementById('close');

    about.classList.add('about--is-visible');
    close.addEventListener('click', hide);
  }

  function hide() {
    const about = document.querySelector('.about');

    about.classList.remove('about--is-visible');
  }

  const aboutBtn = document.getElementById('aboutBtn');
  aboutBtn.addEventListener('click', show);
}

export default about;
