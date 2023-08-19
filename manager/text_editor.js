


document.querySelector('#text-form').addEventListener('submit', (event) => {
    var textContent = document.querySelector('#editor').value;
    event.preventDefault();

    fetch(`edit_text.php?textContent=${encodeURIComponent(textContent)}`, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Textul a fost updatat cu succes.');
            location.reload();
        } else {
            alert('Error updating file content.');
        }
    })
    .catch(error => console.log(error));

});


fetch('read_text.php')
    .then(response => response.text())
    .then(textContent => {
        document.getElementById('editor').value = textContent;
    })
    .catch(error => console.log(error));