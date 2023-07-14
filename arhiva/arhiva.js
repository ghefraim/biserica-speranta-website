
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
  var bodyWidth = window.innerWidth;
  var columnsNumber;
  if (bodyWidth > 1000) {
    columnsNumber = 5;
  } else if (bodyWidth > 800) {
    columnsNumber = 4;
  } else if (bodyWidth > 600) {
    columnsNumber = 3;
  } else {
    columnsNumber = 2;
  }

  var archiveContainer = document.querySelector("#archive-container");
  archiveContainer.innerHTML = 
  `<iframe scrolling="auto" frameborder="1"
    src="https://archives.bisericilive.com/gallery?cid=sperantaoradearo`+
    `&bgc=a2a2a2`+
    `&c=${columnsNumber}`+
    `&gc=000`+
    `&esc=fff`+
    `&f=${year}/${month}"
    allowtransparency="false"></iframe>`;
}


/*
// Old iframe:
<iframe scrolling="auto" frameborder="0" 
src="http://archives.bisericilive.com/gallery?cid=sperantaoradearo&amp;c=4&amp;bgc=fff&amp;gc=555&amp;esc=ddd&amp;esch=ccc" 
allowtransparency="false"></iframe>
*/