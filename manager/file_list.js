rootFolder = '../assets/test/';

// Fetches the list of files and folders recursively
function fetchFileNoutatiList() {
    // fetch(`file_list.php?regex=${encodeURIComponent('noutati-img-\d')}`)
    fetch(`file_list.php?regex=noutati-imagini`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        // Clear previous file list
        const table = document.getElementById('news-images');
        table.innerHTML = '';

        // Initialize row counter
        let rowCounter = 1;

        const row = table.insertRow();
        row.insertCell().textContent = "File";
        row.insertCell().textContent = "Preview";
        // row.insertCell().textContent = "Schimba fisier";
        row.insertCell().textContent = "Delete";
        // Process each item recursively
        processItems(data, '', table, rowCounter);
    })
    .catch(error => alert(error));
}

// Recursive function to process items (files and folders)
function processItems(items, parentFolder, table, rowCounter) {
    if (items.length === 0) { // Process empty folder
        const row = table.insertRow();
        row.insertCell().textContent = parentFolder;
        row.insertCell().textContent = '-'; // Empty column for image name
        row.insertCell().textContent = ''; // Empty column for preview
        row.insertCell().appendChild(createInput('upload'));
        row.insertCell().appendChild(createInput('delete'));

    } else {
        items.forEach(item => {
            if (typeof item === 'string') {
                // Process file
                const row = table.insertRow();
                
                var imageURL = `${rootFolder}${parentFolder}/${item}`;
                row.insertCell().appendChild(createInput('file', item, imageURL));

                // console.log(parentFolder);
                // create the preview of the image:
                if (/\.(jpe?g|png)$/i.test(item)) {
                    const previewCell = row.insertCell();
                    const previewImage = document.createElement('img');

                    previewImage.src = imageURL;
                    previewImage.classList.add('preview-image');
                    previewCell.appendChild(previewImage);
                    previewCell.classList.add('preview-image-wrapper');
                } else {
                    row.insertCell();
                }

                // create the upload and delete buttons
                // row.insertCell().appendChild(createInput('upload'));
                row.insertCell().appendChild(createInput('delete'));
            } 
            else if (typeof item === 'object') {
                // Process subfolder
                const folderName = item.folderName;
                const files = item.files;

                processItems(files, folderName, table, rowCounter);
            }
        });
    }
}

function createFoaiaDeInformareTable(parentFolder, item) {
    const foaiaTable = document.getElementById('foaia-de-informare');
    foaiaTable.innerHTML = '';
    const row1 = foaiaTable.insertRow();
    row1.insertCell().textContent = "Folder";
    row1.insertCell().textContent = "File link";
    row1.insertCell().textContent = "Schimbă fisier";
    row1.insertCell().textContent = "Sterge";

    const row2 = foaiaTable.insertRow();
    row2.insertCell().textContent = parentFolder;
    var url = `${rootFolder}${parentFolder}/${item}`;
    if(item = '-'){
        row2.insertCell().textContent = '-';
        foaiaTable.style.color = "#9d5353";
    }
    else{
        row2.insertCell().appendChild(createInput('file', item, url));
    }
    row2.insertCell().appendChild(createInput('upload'));
    row2.insertCell().appendChild(createInput('delete'));
}

function createInput(type, name='', url = '') {
    if (type == "upload") {
        var inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.name = "file";
        inputElement.classList.add("file-input");
        inputElement.addEventListener("change", handleUploadedFiles, false);

        return inputElement;
    } 
    else if (type == "file") {
        var fileNameContainer = document.createElement('div');
        fileNameContainer.classList.add('file-name-container');
        fileNameContainer.id = name;
        
        var inputElement = document.createElement('input');
        inputElement.type = "text";
        inputElement.value = name.split('.')[0];

        var fileExtension = document.createElement('p');
        fileExtension.textContent = '.' + name.split('.')[1];

        fileNameContainer.appendChild(inputElement);
        fileNameContainer.appendChild(fileExtension);

        return fileNameContainer;
    }
    else if (type == "delete") {
        var inputElement = document.createElement("input");
        inputElement.type = "checkbox";
        inputElement.name = "checkbox";
        inputElement.classList.add("delete-file");
        inputElement.addEventListener("change", handleDeletedFiles, false);

        return inputElement;
    }
}

// Initial fetch to populate the file list
fetchFileNoutatiList();
