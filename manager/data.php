<?php

// Specify the path to the folder whose contents you want to retrieve
$folderPath = './';

// Get the contents of the folder
$folderContents = scandir($folderPath);

// Remove . and .. from the array of folder contents
$folderContents = array_diff($folderContents, array('.', '..'));

// Set the response header to JSON
header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
// header('Access-Control-Allow-Headers: Origin, Content-Type');

// Return the folder contents as JSON
echo json_encode($folderContents);
?>
