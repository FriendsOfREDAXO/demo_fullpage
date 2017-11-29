<?php
$file_name = strtolower(preg_replace("/[^a-zA-Z0-9.\-\$\+]/","_", rex_request('file', 'string')));
$file_type = "application/octetstream";
$file_path = rex_path::media($file_name);

if ($file_name != '' && $fp = @fopen($file_path, 'r')) {
    header("Expires: Mon, 01 Jan 2000 01:01:01 GMT"); // Date in the past
    header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");// always modified
    header("Cache-Control: no-store, no-cache, must-revalidate");// HTTP/1.1
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Cache-Control: private");
    header("Pragma: no-cache");
    header("Content-Type: $file_type; name=\"$file_name\"");
    header("Content-Disposition: attachment; filename=\"$file_name\"");
    rex_response::cleanOutputBuffers();
    fpassthru ($fp);
    fclose($fp);
    exit;
}
else
{
    echo '<div class="warning"">Download failed</div>';
}
?>