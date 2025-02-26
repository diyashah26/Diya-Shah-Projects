const items = document.querySelectorAll('.item');
const dropzones = document.querySelectorAll('.dropzone');
let score = 0; // Initialize score
let attempts = 0; // Count the total number of attempts

// Handle dragstart event
items.forEach(item => {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.dataset.match);
    e.target.classList.add('dragging');
  });

  item.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
  });
});

// Handle dragover and drop events
dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('hovering');
  });

  dropzone.addEventListener('dragleave', (e) => {
    dropzone.classList.remove('hovering');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('hovering');

    const matchId = e.dataTransfer.getData('text/plain');
    const correct = dropzone.dataset.match === matchId;

    // Check if drop is correct
    if (correct) {
      score++;
      dropzone.classList.add('correct');
      dropzone.innerHTML = document.querySelector(`.item[data-match="${matchId}"]`).innerText;
      document.querySelector(`.item[data-match="${matchId}"]`).remove();
    } else {
      dropzone.classList.add('incorrect');
      setTimeout(() => dropzone.classList.remove('incorrect'), 1000);
    }

    attempts++;

    // Check if all items are dropped
    if (attempts === items.length) {
      showScore(); // Display the score after all attempts
    }
  });
});

// Show score function
function showScore() {
  const container = document.querySelector('.container');
  container.innerHTML = `
    <div style="text-align: center; font-size: 1.5rem; color: #4caf50;">
      <h2>Game Over!</h2>
      <p>Your Score: <strong>${score}</strong> out of 10</p>
      <button onclick="location.reload()" style="padding: 10px 20px; font-size: 1rem; background-color: #ff69b4; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Play Again
      </button>
    </div>
  `;
}