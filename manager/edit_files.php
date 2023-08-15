<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Process the form data here
    $response = array();

    // Loop through the form data sent by JavaScript
    for ($index = 0; isset($_POST["initialName{$index}"]); $index++) {
        $initialName = $_POST["initialName{$index}"];
        $replaceName = $_POST["replaceName{$index}"];
        $typeOfFile = $_POST["typeOfFile{$index}"];
        $parentFolder = $_POST["parentFolder{$index}"];

        // Example: Perform file editing based on the provided data
        // You can replace this part with your own file editing logic
        $oldFilePath = "{$parentFolder}/{$initialName}{$typeOfFile}";
        $newFilePath = "{$parentFolder}/{$replaceName}{$typeOfFile}";

        //echo $oldFilePath;
        //echo $newFilePath;
        try {
            $status = rename($oldFilePath, $newFilePath);
        }
        catch (Exception $e){
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
        echo $status;
        if ($status) {
            $response[] = array(
                "initialName" => $initialName,
                "replaceName" => $replaceName,
                "typeOfFile" => $typeOfFile,
                "parentFolder" => $parentFolder,
                "status" => "success"
            );
        } else {
            $response[] = array(
                "initialName" => $initialName,
                "replaceName" => $replaceName,
                "typeOfFile" => $typeOfFile,
                "parentFolder" => $parentFolder,
                
                "errorMessage" => error_get_last(),
                
                "status" => "error"
            );
        }
    }

    // Return the response as JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    echo "Invalid request method";
}
?>
