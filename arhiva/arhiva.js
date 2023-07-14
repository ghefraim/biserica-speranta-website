
const currentDate = new Date();
const currentMonth = currentDate.getMonth()+1;
const currentYear = currentDate.getFullYear();

document.querySelector("#month").value = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
document.querySelector("#year").value = currentYear;

getArchive();
const search_button = document.querySelector('.search-button').addEventListener("click", getArchive);

function getArchive() {
  var month = document.querySelector("#month").value ;
  var year = document.querySelector("#year").value;

  var archiveContainer = document.querySelector("#archive-container");
  archiveContainer.innerHTML = 
  `<iframe scrolling="auto" frameborder="1"
    src="http://archives.bisericilive.com/gallery?cid=sperantaoradearo&f=${year}/${month}"
    allowtransparency="false"></iframe>`;
    
}