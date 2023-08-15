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

function handleDeletedFiles(event) {
    const folderName = "noutati-imagini";
    var fileName;
    try {
        fileNameContainer = event.target.parentElement.parentElement.querySelector('.file-name-container');
        fileName = fileNameContainer.querySelector('input').value;
        fileName += fileNameContainer.querySelector('p').innerHTML;
        // console.log(fileName);
    } catch (ex) {
        fileName = 'random';
        return;
    }
    const filePath = `${rootFolder}${folderName}/${fileName}`;
    console.log(filePath);
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
    
    // location.reload();
}

async function editFiles() {
    filesContainers = document.querySelectorAll('.file-name-container');

    filesContainers.forEach(f => {
        initialName = f.id.split('.')[0];
        replaceName = f.querySelector('input').value;
        typeOfFile = f.querySelector('p').innerHTML;
        parentFolder = rootFolder + 'noutati-imagini'

        if (initialName != replaceName){
            filesToEdit.push({ 
                initialName,
                replaceName, 
                typeOfFile,
                parentFolder,
            });
        }
    });

    // console.log(filesToEdit);
    const formData = new FormData();
    filesToEdit.forEach((fileInput, index) => {
        const { initialName, replaceName, typeOfFile, parentFolder } = fileInput;
        formData.append(`initialName${index}`, initialName);
        formData.append(`replaceName${index}`, replaceName);
        formData.append(`typeOfFile${index}`, typeOfFile);
        formData.append(`parentFolder${index}`, parentFolder);
    });

    fetch(`edit_files.php`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        filesToEdit = [];
    })
    .catch(error => console.log(error));

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