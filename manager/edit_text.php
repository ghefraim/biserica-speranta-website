<?php
$filePath = '../assets/test/text/content.txt'; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $newContent = $_GET['textContent'];

    if (file_put_contents($filePath, $newContent)) {
        echo json_encode(array('status' => 'success'));
    } else {
        echo json_encode(array('status' => 'error'));
    }
} else {
    echo json_encode(array('status' => 'error'));
}
?>
