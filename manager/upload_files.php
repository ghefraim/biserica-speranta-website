<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Loop through each file in the request
    foreach ($_FILES as $key => $file) {
        $filename = $file['name'];
        $filepath = $_POST['folderPath' . substr($key, 4)] . '/' . $filename;
    
        // Get a list of all files in the folder
        $fileList = glob($_POST['folderPath' . substr($key, 4)] . '/*');
		
        // Iterate over the file list and delete each file
        if (strstr($filename, '.pdf')) {    
            foreach ($fileList as $filesPath) {
                if (is_file($filesPath)) {
                    unlink($filesPath);
                }
            }
        }

    	// Move the uploaded file to the target folder
        move_uploaded_file($file['tmp_name'], $filepath);
    }

    // Send a response indicating the success
    echo json_encode(['message' => 'Files uploaded successfully']);
} else {
    // Send a response indicating the failure
    echo json_encode(['message' => 'Invalid request']);
}
?>
