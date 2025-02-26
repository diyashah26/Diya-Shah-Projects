const words = document.querySelectorAll('.word');
const blanks = document.querySelectorAll('.blank');

// Define correct answers for each blank
const correctAnswers = {
  blank1: "Parliament",
  blank2: "26th November 1949",
  blank3: "highest",
  blank4: "President",
  blank5: "state",
  blank6: "Equality before law",
  blank7: "Article 21",
  blank8: "Judicial review",
  blank9: "independent",
  blank10: "Constitution",
};

let score = 0; // Initialize the score
let filledBlanks = 0; // Track how many blanks are filled

words.forEach(word => {
  word.addEventListener('dragstart', () => {
    word.classList.add('dragging');
    word.setAttribute('data-word', word.id);
  });

  word.addEventListener('dragend', () => {
    word.classList.remove('dragging');
  });
});

blanks.forEach(blank => {
  blank.addEventListener('dragover', e => {
    e.preventDefault();
    blank.style.backgroundColor = '#f0f0f0';
  });

  blank.addEventListener('dragleave', () => {
    blank.style.backgroundColor = '';
  });

  blank.addEventListener('drop', e => {
    e.preventDefault();
    const wordId = e.dataTransfer.getData('text');
    const draggedWord = document.getElementById(wordId);

    if (draggedWord) {
      const droppedWord = draggedWord.textContent;
      const blankId = blank.id;

      // Prevent overwriting blanks
      if (blank.textContent !== "") return;

      // Check if the dropped word is correct
      if (droppedWord === correctAnswers[blankId]) {
        blank.textContent = droppedWord;
        blank.style.backgroundColor = '#c8e6c9'; // Green for correct
        blank.style.borderColor = '#4caf50';
        draggedWord.remove();
        score++; // Increment score for correct answer
      } else {
        blank.style.backgroundColor = '#ffcccc'; // Red for incorrect
        blank.style.borderColor = '#e53935';
        setTimeout(() => {
          blank.style.backgroundColor = ''; // Reset after 1 second
          blank.style.borderColor = '#ffc107';
        }, 1000);
      }

      filledBlanks++; // Increment filled blanks
      checkGameEnd(); // Check if the game has ended
    }
  });

  blank.addEventListener('dragenter', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    blank.style.backgroundColor = '#d0d0d0';
  });
});

words.forEach(word => {
  word.addEventListener('dragstart', event => {
    event.dataTransfer.setData('text', event.target.id);
  });
});

// Check if all blanks are filled and display the score
function checkGameEnd() {
  if (filledBlanks === Object.keys(correctAnswers).length) {
    setTimeout(() => {
      alert(`Game Over! Your score is ${score} out of ${Object.keys(correctAnswers).length}.`);
    }, 500);
  }
}

// Get all draggable items and dropzones