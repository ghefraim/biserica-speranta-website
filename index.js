let slideIndex = 0;
let slideshowTimer;

showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("news-slides");

  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("show");
    // slides[i].style.display = "none";  
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].classList.add("show");
  // slides[slideIndex - 1].style.display = "block";

  // Clear the previous timer
  clearTimeout(slideshowTimer);

  // Start a new timer
  slideshowTimer = setTimeout(showSlides, 4000);
}

// Add event listeners to reset the timer when the mouse is over the slides
let slideshowContainer = document.querySelector(".slideshow-container");

slideshowContainer.addEventListener("mouseover", function() {
  clearTimeout(slideshowTimer);
});

slideshowContainer.addEventListener("mouseout", function() {
  slideshowTimer = setTimeout(showSlides, 2000);
});




// for the 2 pieces of text on hero image
document.addEventListener("DOMContentLoaded", function() {
  const textRows = document.querySelectorAll(".hero-text > h2");

  // Start the loop after 6 seconds
  setTimeout(startTextLoop, 1000);

  function startTextLoop() {
    // Show the first text row and animate it
    textRows.forEach(function(row) {
      row.style.display = "none";
    });

    const firstRow = document.querySelectorAll(".hero-text-1");
    firstRow.forEach(function(row) {
      row.style.display = "block";
    });

    // Set a timeout to switch to the second text row after 6 seconds
    setTimeout(function() {
      // Show the second text row and animate it
      textRows.forEach(function(row) {
        row.style.display = "none";
      });

      const secondRow = document.querySelectorAll(".hero-text-2");
      secondRow.forEach(function(row) {
        row.style.display = "block";
      });

      // Set a timeout to switch back to the first text row after 6 seconds
      setTimeout(startTextLoop, 6000);
    }, 6000);
  }
});


