// Creates and adds a child div element with the specified className
function createElement(parent, className) {
  const parentEl = document.querySelector(`.${parent}`),
    childEl = document.createElement('div');

  parentEl.appendChild(childEl);
  childEl.classList.add(`${className}`);
}

// Removes a child element from a parent
function removeElement(parent, className) {
  const parentEl = document.querySelector(`.${parent}`),
    childEl = document.querySelector(`.${className}`);

  parentEl.removeChild(childEl);
}

export { createElement, removeElement };
