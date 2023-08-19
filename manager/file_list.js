rootFolder = '../assets/test/';

let newsImages;

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
        row.insertCell().textContent = "Ordine";
        row.insertCell().textContent = "ID";
        row.insertCell().textContent = "Preview";
        // row.insertCell().textContent = "Schimba fisier";
        row.insertCell().textContent = "Delete";
        // Process each item recursively
        processItems(data, '', table, rowCounter);

        newsImages = data;
    })
    .catch(error => alert(error));
}

// Recursive function to process items (files and folders)
function processItems(items, parentFolder, table, rowCounter) {
    if (items.length === 0) { // Process empty folder
        // const row = table.insertRow();
        // row.insertCell().textContent = parentFolder;
        // row.insertCell().textContent = '-'; // Empty column for image name
        // row.insertCell().textContent = ''; // Empty column for preview
        // row.insertCell().appendChild(createInput('upload'));
        // row.insertCell().appendChild(createInput('delete'));

    } else {
        items.forEach(item => {
            if (typeof item === 'string') {
                // Process file
                const row = table.insertRow();

                var imageURL = `${rootFolder}${parentFolder}/${item}`;
                row.insertCell().appendChild(createInput('order', item, imageURL));

                row.insertCell().textContent = item.split('-')[1];

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

function createInput(type, name='', url = '') {
    if (type == "upload") {
        var inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.name = "file";
        inputElement.classList.add("file-input");
        inputElement.addEventListener("change", handleUploadedFiles, false);

        return inputElement;
    } 
    else if (type == "order") {
        var fileNameContainer = document.createElement('div');
        fileNameContainer.classList.add('file-name-container');
        fileNameContainer.id = name;
        
        var inputElement = document.createElement('input');
        inputElement.type = "text"; //could be number?
        inputElement.value = name.split('-')[0];

        fileNameContainer.appendChild(inputElement);

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
