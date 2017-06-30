import BarFinder from '../App';
import Results from './Results';

const Question = {
  // Inserts question using Handlebars template based on the current topic (determined by count)
  insert(topic) {
    const question = document.querySelector('.question'),
      name = this.name,
      options = this.options,
      template = this.template,
      context = { options: options };

    question.innerHTML = template(context);
    Question.events(name);
    Question.insert.count++;
  },

  // Compares the number of times insert() has been called to the number of topics
  checkInsertCount() {
    const numOfTopics = BarFinder.topics.length;
    if (Question.insert.count < numOfTopics) {
      return true;
    } else {
      return false;
    }
  },

  // Adds event listeners for question options
  events(name) {
    const options = Array.from(document.querySelectorAll(`.${name}`));
    options.forEach(function(option) {
      option.addEventListener('change', function() {
        // Update matches based on selected option
        BarFinder.updateMatches.call(this);
        if (Question.checkInsertCount()) {
          // If there are more topics, insert next question
          Question.insert.call(BarFinder.topics[Question.insert.count]);
        } else {
          // After the last question, display the matched bars
          Results.display(BarFinder.matches);
        }
      });
    });
  }
}

// Set initial count to 0
Question.insert.count = 0;

export default Question;
