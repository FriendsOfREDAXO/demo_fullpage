<?php
$content = '';

// col1
if ("REX_MEDIA[1]" != '') {
    $media = rex_media::get("REX_MEDIA[1]");
    $mediatitle = str_replace(array("\r\n", "\n", "\r"), ' ', $media->getValue('title'));
    if (rex::isBackend()) {
        $content .= '<img class="full" src="index.php?rex_media_type=rex_mediapool_detail&rex_media_file=REX_MEDIA[1]" alt="' . $mediatitle . '" title="' . $mediatitle . '">';
    } else {
        $content .= '<img class="full" src="index.php?rex_media_type=full&rex_media_file=REX_MEDIA[1]" alt="" title="' . $mediatitle . '">';
    }
}

echo '<div class="row">';
echo $content;
echo '</div>' . "\n";
?>