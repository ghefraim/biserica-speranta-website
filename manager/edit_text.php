<?php
$filePath = '../assets/test/text/content.txt'; 

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['textContent'])) {
    $newContent = $_POST['textContent'];

    if (file_put_contents($filePath, $newContent)) {
        echo json_encode(array('status' => 'success'));
    } else {
        echo json_encode(array('status' => 'error'));
    }
} else {
    echo json_encode(array('status' => 'error'));
}
?>
