rootFolderFoaiaDeInformare = '../assets/test/foaia-de-informare';

let foaiaContainer = document.querySelector('#foaia-container');
let foaiaText = document.createElement('a');

foaiaText.textContent = 'Deschide foaia existenta';
foaiaText.href = '../foaia-de-informare/';
foaiaText.target = 'blank';
foaiaContainer.appendChild(foaiaText);
foaiaContainer.innerHTML += 
` <div class="upload-form-container">
<form class="upload-form">
    <p>Sterge foaia veche si incarca una noua:</p>
    <input accept="application/pdf,application/vnd.ms-excel" type='file' id="pdfInput" />
</form>
</div>

<div class="save-pdf">
<button class="save-pdf-btn">SAVE PDF</button>
</div>`;


let pdfFile;

pdfInput.onchange = evt => {
    const [file] = pdfInput.files;
    if(file) {
        const renamedFile = new File([file], 'foaia-de-informare.pdf');
        pdfFile = renamedFile;
    }
    else {
        alert("Ceva nu a functionat");
    }
}

savePdfBtn = document.querySelector('.save-pdf-btn').addEventListener('click', () => {
    const formData = new FormData();

    formData.append(`file0`, pdfFile);
    formData.append(`folderPath0`, rootFolderFoaiaDeInformare);

    // Send the FormData to the server for upload
    fetch(`upload_files.php`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Fisierul a fost incarcat cu succes!');
        location.reload();
    })
    .catch(error => console.log(error));
});