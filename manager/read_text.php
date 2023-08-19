<?php
$filePath = '../assets/test/text/content.txt'; 

if (file_exists($filePath)) {
    $content = file_get_contents($filePath);
    echo $content;
} else {
    echo 'File not found.';
}
?>
