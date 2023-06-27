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
  console.log("XD");
  clearTimeout(slideshowTimer);
});

slideshowContainer.addEventListener("mouseout", function() {
  slideshowTimer = setTimeout(showSlides, 2000);
});

