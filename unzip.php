<?php
// Simple, bulletproof PHP Zip Extractor
$zipFile = 'out-linux.zip';
$extractPath = __DIR__;

echo "<h2>Hostinger Emergency Extractor</h2>";

if (!file_exists($zipFile)) {
    die("<b style='color:red;'>ERROR: Cannot find {$zipFile} in this folder. Please upload it first.</b>");
}

$zip = new ZipArchive;
$res = $zip->open($zipFile);
if ($res === TRUE) {
    // Extract it to the current directory
    $zip->extractTo($extractPath);
    $zip->close();
    echo "<b style='color:green;'>SUCCESS: All files from {$zipFile} extracted perfectly!</b><br>";
    echo "Check your website, the images and pages are now live.";
} else {
    echo "<b style='color:red;'>FAILED: ZipArchive error code {$res}</b>";
}
?>
