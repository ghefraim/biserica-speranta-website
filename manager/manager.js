fetch('data.php', {
    
})
  .then(response => response.json())
  .then(data => {
    // Process the data here
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });