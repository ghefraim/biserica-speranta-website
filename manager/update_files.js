// Array to store the file inputs
const filesToUpload = [];
const filesToDelete = [];
var filesToEdit = [];

// Function to handle file input change event

function handleUploadedFiles(event) {
    const fileToUpload = event.target.files[0];
    const folderName = event.target.parentElement.parentElement.querySelector('td').innerHTML;
    const folderPath = `${rootFolder}${folderName}/`;

    filesToUpload.push({ 
        input: event.target,
        file: fileToUpload,
        folderPath, 
    });
    // console.log(filesToUpload);
    //ui:
    event.target.parentElement.parentElement.style.backgroundColor = '#92c2d8';
    document.querySelector('.save-btn').style.backgroundColor = '#92c2d8';
     
    if (/\.(jpe?g|png)$/i.test(fileToUpload)) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageToChange = event.target.parentElement.parentElement.querySelector('.preview-image');
            imageToChange.src = e.target.result;
        };
        reader.readAsDataURL(fileToUpload);
    }
}

imgInput.onchange = evt => {
    const [file] = imgInput.files
    if (file) {
        const renamedFile = new File([file], getNewFileName(file.name));

        const table = document.querySelector('#news-images');
        const row = table.insertRow();

        row.classList.add('uploaded-row');
        row.insertCell();
        row.insertCell();

        const previewCell = row.insertCell();
        const previewImage = document.createElement('img');

        previewImage.src = URL.createObjectURL(renamedFile);
        previewImage.classList.add('preview-image');
        previewCell.appendChild(previewImage);
        previewCell.classList.add('preview-image-wrapper');

        row.insertCell();

        const folderPath = `${rootFolder}noutati-imagini/`;
        filesToUpload.push({ 
            input: "idk",
            file: renamedFile,
            folderPath, 
        });
    }
}

function getNewFileName(initialName){
    let keepTrying = true;
    let uid = 999;
    while (keepTrying) {
        uid = getRandomInteger(101, 998);
        newsImages[0].files.forEach(f => {
            if (!f.includes(uid.toString())) {
                keepTrying = false;
            }
        });
    }
    nextOrderNumber = document.querySelector('#news-images > tbody').childElementCount;
    let newName = `${nextOrderNumber}-${uid}.${initialName.split('.')[1]}`;
    return newName;
}
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function handleDeletedFiles(event) {
    const folderName = "noutati-imagini";
    var fileName;
    try {
        fileNameContainer = event.target.parentElement.parentElement.querySelector('.file-name-container');
        fileName = fileNameContainer.id;
        // fileName = fileNameContainer.querySelector('input').value;
        // fileName += fileNameContainer.querySelector('p').innerHTML;
    } catch (ex) {
        fileName = 'random';
        return;
    }
    const filePath = `${rootFolder}${folderName}/${fileName}`;
    // console.log(filePath);

    if (event.target.checked) {    
        filesToDelete.push({ 
            filePath, 
        });

        event.target.parentElement.parentElement.style.backgroundColor = 'rgb(191 160 163)';
        document.querySelector('.save-btn').style.backgroundColor = '#92c2d8';
    }
    else {
        const index = filesToDelete.findIndex(file => file.filePath === filePath);
        if (index !== -1) {
            filesToDelete.splice(index, 1);
        }
        event.target.parentElement.parentElement.style.backgroundColor = '#c0beb9';
        document.querySelector('.save-btn').style.backgroundColor = '#fff';
    }
    // console.log(filesToDelete);
}

// Add event listener for save button click event
const saveButton = document.querySelector('.save-btn');
saveButton.addEventListener('click', saveFiles);

async function saveFiles() {
    const editPromise = editFiles();
    const uploadPromise = filesToUpload.length > 0 ? uploadFiles() : Promise.resolve();
    const deletePromise = filesToDelete.length > 0 ? deleteFiles() : Promise.resolve();

    await Promise.all([editPromise, deletePromise, uploadPromise]);

    await new Promise(resolve => setTimeout(resolve, 200));
    
    location.reload();
}

async function editFiles() {
    filesContainers = document.querySelectorAll('.file-name-container');

    filesContainers.forEach(f => {
        initialOrder = f.id.split('-')[0];
        replaceOrder = f.querySelector('input').value;
        if(replaceOrder === "") {
            return ;
        }
        idAndTypeOfFile = f.parentElement.parentElement.children.item(1).innerHTML;
        parentFolder = rootFolder + 'noutati-imagini';

        if (initialOrder != replaceOrder){
            filesToEdit.push({ 
                initialOrder,
                replaceOrder, 
                idAndTypeOfFile,
                parentFolder,
            });
        }
    });

    // console.log(filesToEdit);
    const formData = new FormData();
    filesToEdit.forEach((fileInput, index) => {
        const { initialOrder, replaceOrder, idAndTypeOfFile, parentFolder } = fileInput;
        formData.append(`initialOrder${index}`, initialOrder);
        formData.append(`replaceOrder${index}`, replaceOrder);
        formData.append(`idAndTypeOfFile${index}`, idAndTypeOfFile);
        formData.append(`parentFolder${index}`, parentFolder);
    });

    fetch(`edit_files.php`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        filesToEdit = [];
        // console.log(data);
    })
    .catch(error => alert(error));

}

async function uploadFiles() {
    const formData = new FormData();

    // Append each file to the FormData object
    filesToUpload.forEach((fileInput, index) => {
        const { input, file, folderPath } = fileInput;
        formData.append(`file${index}`, file);
        formData.append(`folderPath${index}`, folderPath);
    });

    // Send the FormData to the server for upload
    fetch(`upload_files.php`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data); // Handle the server response
        filesToUpload.length = 0; // Clear the file inputs array 
    })
    .catch(error => console.log(error));
}

async function deleteFiles() {
    const formData = new FormData();

    // Append each file to the FormData object
    filesToDelete.forEach((fileInput, index) => {
        const { filePath } = fileInput;
        formData.append(`filePath${index}`, filePath);
    });
    console.log(filesToDelete);
    // Send the FormData to the server for upload
    fetch(`delete_files.php`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data); // Handle the server response
        filesToDelete.length = 0; // Clear the file inputs array 
    })
    .catch(error => console.log(error));
}