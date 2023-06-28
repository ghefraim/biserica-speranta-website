// Replace YOUR_API_KEY with your actual API key obtained from the Google Developers Console
const youtubeApiKey = 'AIzaSyBXNpC4vAqsKBp_47nOn_iBk2pSIYV4MGk';

// Replace CHANNEL_ID with the ID of the YouTube channel you want to retrieve videos from
const channelId = 'UCm1ODx0H6FOXB6llT1_Fx0Q';

// Get the current date
const currentDate = new Date();
document.querySelector("#month").value = currentDate.getMonth()+1;
document.querySelector("#year").value = currentDate.getFullYear();

// Calculate the date for one month ago
const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

// Format the dates in the required API format (ISO 8601)
const formattedCurrentDate = currentDate.toISOString();
const formattedOneMonthAgo = oneMonthAgo.toISOString();

getVideosFromYoutube(formattedOneMonthAgo, formattedCurrentDate);

// Function to play the video
function playVideo(event) {
  event.preventDefault();
  const videoId = this.getAttribute('data-video-id');
  const videoPlayerContainer = document.getElementById('video-player');

  videoPlayerContainer.innerHTML = `
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0"  allowfullscreen></iframe>
    <button onclick="closeVideo()">Close</button>
  `;

  videoPlayerContainer.classList.add('active');
}

// Function to close the video
function closeVideo() {
  const videoPlayerContainer = document.getElementById('video-player');
  videoPlayerContainer.innerHTML = '';

  videoPlayerContainer.classList.remove('active');
}

const search_button = document.querySelector('.search-button').addEventListener("click", function(event) {
   var month = document.querySelector("#month").value;
   var year = document.querySelector("#year").value;

  const selectionStartDate = new Date(year, month-1, 1);
  const selectionEndDate = new Date(year, month, 1);

  if (year != 'old') {
    getVideosFromYoutube(selectionStartDate.toISOString(), selectionEndDate.toISOString());    
  } 
  else {
    getVideosFromOldArchive();
  }
});

function getVideosFromYoutube(startDate, endDate){
  document.getElementById('videos').innerHTML = '';
  // Create the API request URL
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&channelId=${channelId}&part=snippet,id&order=date&publishedAfter=${startDate}&publishedBefore=${endDate}&maxResults=75`;

  // Fetch the videos from the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const videosContainer = document.getElementById('videos');
      // Iterate through the videos and create a thumbnail for each video
      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const videoTitle = decodeHTMLEntities(item.snippet.title);
        const videoThumbnail = item.snippet.thumbnails.medium.url;

        const videoLink = document.createElement('a');
        videoLink.href = `https://www.youtube.com/watch?v=${videoId}`;
        videoLink.setAttribute('data-video-id', videoId);
        videoLink.addEventListener('click', playVideo);

        const thumbnailImage = document.createElement('img');
        thumbnailImage.src = videoThumbnail;
        thumbnailImage.classList.add('thumbnail-image');

        const videoTitleElement = document.createElement('h3');
        videoTitleElement.textContent = videoTitle;
        videoTitleElement.classList.add('video-title');

        videoLink.appendChild(thumbnailImage);
        videoLink.appendChild(videoTitleElement);

        videosContainer.appendChild(videoLink);
      });
    })
    .catch(error => {
      console.error('Eroare:', error);
    });
}

//for video titles
function decodeHTMLEntities(text) {
  const parser = new DOMParser();
  const decodedText = parser.parseFromString(`<!doctype html><body>${text}`, 'text/html').body.textContent;
  return decodedText;
}

function getVideosFromOldArchive() {
  document.getElementById('videos').innerHTML = '';
  const arhivaOldContainer = document.getElementById('arhiva-old');
  arhivaOldContainer.innerHTML= `<iframe scrolling="auto" frameborder="0"
            src="http://archives.bisericilive.com/gallery?cid=sperantaoradearo&c=4&bgc=fff&gc=555&esc=ddd&esch=ccc"
            allowtransparency="false"></iframe>`;
}

/*
ideea if i do not get answer. It's still better than ours
https://www.cezareea.ro/transmisie-live/arhiva-video-cezareea-ro/
*/