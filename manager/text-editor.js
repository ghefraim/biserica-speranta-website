

const saveTextBtn = document.querySelector('.save-text-btn');

saveTextBtn.addEventListener('click', () => {
    var textContent = document.querySelector('#editor').innerHTML;
    
    fetch('edit_text.php', {
        method: 'POST',
        body: new URLSearchParams({ textContent })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('File content updated successfully.');
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