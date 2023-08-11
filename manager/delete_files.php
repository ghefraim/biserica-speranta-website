<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the file paths from the request
    $filePaths = [];
    foreach ($_POST as $key => $value) {
        if (strpos($key, 'filePath') === 0) {
            $filePaths[] = $value;
        }
    }

    // Perform file deletion
    $deletedFiles = [];
    $failedFiles = [];
    foreach ($filePaths as $filePath) {
        if (file_exists($filePath) && is_file($filePath)) {
            if (unlink($filePath)) {
                $deletedFiles[] = $filePath;
            } else {
                $failedFiles[] = $filePath;
            }
        }
    }

    // Prepare the response data
    $response = [
        'message' => 'Files deleted successfully',
        'deletedFiles' => $deletedFiles,
        'failedFiles' => $failedFiles
    ];

    // Send the JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    // Send a JSON response indicating the failure
    $response = ['message' => 'Invalid request'];
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
