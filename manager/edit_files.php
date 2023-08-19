<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Process the form data here
    $response = array();

    // Loop through the form data sent by JavaScript
    for ($index = 0; isset($_POST["initialOrder{$index}"]); $index++) {
        $initialOrder = $_POST["initialOrder{$index}"];
        $replaceOrder = $_POST["replaceOrder{$index}"];
        $idAndTypeOfFile = $_POST["idAndTypeOfFile{$index}"];
        $parentFolder = $_POST["parentFolder{$index}"];

        // Example: Perform file editing based on the provided data
        // You can replace this part with your own file editing logic
        $oldFilePath = "{$parentFolder}/{$initialOrder}-{$idAndTypeOfFile}";
        $newFilePath = "{$parentFolder}/{$replaceOrder}-{$idAndTypeOfFile}";

        try {
            $status = rename($oldFilePath, $newFilePath);
        }
        catch (Exception $e){
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
        if ($status) {
            $response[] = array(
                "initialOrder" => $initialOrder,
                "replaceOrder" => $replaceOrder,
                "idAndTypeOfFile" => $idAndTypeOfFile,
                "parentFolder" => $parentFolder,
                "status" => "success"
            );
        } else {
            $response[] = array(
                "initialOrder" => $initialOrder,
                "replaceOrder" => $replaceOrder,
                "idAndTypeOfFile" => $idAndTypeOfFile,
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
