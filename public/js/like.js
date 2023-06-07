const likeButton = document.getElementById('likeButton');

likeButton.addEventListener('click', () => {
  // Send AJAX request to the server
  const recipeId = 'recipes'; // Get the recipe ID from the button data-attribute
  const request = new XMLHttpRequest();
  request.open('POST', '/like');
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = () => {
    if (request.status === 200) {
      console.log('Recipe liked!');
      // Update the button appearance or perform any other necessary action
    } else {
      console.error('Failed to like the recipe.');
    }
  };
  request.send(JSON.stringify({ recipeId }));
});
