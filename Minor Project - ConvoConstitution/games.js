// const dragItems = document.querySelectorAll('.drag-item');
// const dropZones = document.querySelectorAll('.drop-zone');

// dragItems.forEach(item => {
//     item.addEventListener('dragstart', () => {
//         item.classList.add('dragging');
//     });

//     item.addEventListener('dragend', () => {
//         item.classList.remove('dragging');
//     });
// });

// dropZones.forEach(zone => {
//     zone.addEventListener('dragover', (event) => {
//         event.preventDefault(); // Allow drop
//         zone.classList.add('hovered');
//     });

//     zone.addEventListener('dragleave', () => {
//         zone.classList.remove('hovered');
//     });

//     zone.addEventListener('drop', () => {
//         const draggingItem = document.querySelector('.dragging');
//         if (draggingItem) {
//             const category = zone.getAttribute('data-category');
//             const itemId = draggingItem.id;
            
//             if (
//                 (category === 'freedom' && itemId === 'right-to-freedom') ||
//                 (category === 'equality' && itemId === 'right-to-equality') ||
//                 (category === 'exploitation' && itemId === 'right-against-exploitation')
//             ) {
//                 zone.appendChild(draggingItem);
//                 zone.classList.remove('hovered');
//                 alert('Correct match!');
//             } else {
//                 alert('Incorrect match, try again!');
//             }
//         }
//     });
// });

const items = document.querySelectorAll('.item');
const dropzones = document.querySelectorAll('.dropzone');


items.forEach(item => {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.dataset.match);
    e.target.classList.add('dragging');
  });

  item.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
  });
});


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
    const matchId = e.dataTransfer.getData('text/plain');
    dropzone.classList.remove('hovering');

    if (dropzone.dataset.match === matchId) {
      dropzone.classList.add('correct');
      dropzone.innerHTML = document.querySelector(`.item[data-match="${matchId}"]`).innerText;
      document.querySelector(`.item[data-match="${matchId}"]`).remove();
    } else {
      dropzone.classList.add('incorrect');
      setTimeout(() => dropzone.classList.remove('incorrect'), 1000);
    }
  });
});
