let slideIndex = 0;
let slideshowTimer;

let i;
let slides = document.getElementsByClassName("news-slides");

function showSlides() {
  goToSlide(1);
}

// Add event listeners to reset the timer when the mouse is over the slides
let slideshowContainer = document.querySelector(".slideshow-container");

slideshowContainer.addEventListener("mouseover", function() {
  clearTimeout(slideshowTimer);
});

slideshowContainer.addEventListener("mouseout", function() {
  slideshowTimer = setTimeout(showSlides, 2000);
});

document.querySelector(".right-arrow-slide").addEventListener("click", () => {
  goToSlide(1);
});

document.querySelector(".left-arrow-slide").addEventListener("click", () => {
  goToSlide(-1);
});

function goToSlide(pos) {
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("show");
  }

  slideIndex = slideIndex + pos;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (slideIndex < 1) {
    slideIndex =  slides.length;
  }

  slides[slideIndex - 1].classList.add("show");


  clearTimeout(slideshowTimer);
  slideshowTimer = setTimeout(showSlides, 5000);
}

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



// images from folders:
rootFolder = './assets/test/';
const apiFolder = 'manager/'

// Fetches the list of files and folders recursively
function fetchNewsImages() {
    fetch(`file_list.php?regex=noutati-imagini`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        processItems(data, '');
		showSlides();
    })
    .catch(error => alert(error));
}

function processItems(items, parentFolder) {
  if (items.length === 0) { // Process empty folder
  } else {
      items.forEach(item => {
          if (typeof item === 'string') {
              // Process file
              var imageURL = `${rootFolder}${parentFolder}/${item}`;

              var image = document.createElement('img');
              image.src = imageURL;

              var imageContainer = document.createElement('div');
              imageContainer.classList.add('news-slides');
              imageContainer.appendChild(image);

              document.querySelector('.slideshow-container').appendChild(imageContainer);
          } 
          else if (typeof item === 'object') {
              // Process subfolder
              const folderName = item.folderName;
              const files = item.files;

              processItems(files, folderName);
          }
      });
  }
}

fetchNewsImages();


fetch('read_text.php')
    .then(response => response.text())
    .then(textContent => {
      console.log(textContent);
      document.querySelector('.updatable-text').innerHTML = textContent;
    })
    .catch(error => console.log(error));