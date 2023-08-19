<?php
$folder = '../assets/test';
$regex = '/' . $_GET['regex'] . '/';

// Function to recursively scan folders and files
function scanFolder($folder, $regex) {
    $result = array();

    // Get the list of files and folders
    $list = array_diff(scandir($folder), array('.', '..'));
    
    // Iterate through each item
    foreach ($list as $subfolder) {
        // fails here when $folder name changes
        $subfolderList = array_diff(scandir($folder . '/' .$subfolder), array('.', '..'));
        if (preg_match($regex, $subfolder)) {
            $files = array();
            foreach ($subfolderList as $file) { 
                $files[] = $file;
            }

            $result[] = array(
                'folderName' => $subfolder,
                'files' => $files
            );
        }
    }

    return $result;
}

// Scan the root folder
$result = scanFolder($folder, $regex);

// Send the result as JSON response
header('Content-Type: application/json');
echo json_encode($result);
?>
