<?php
$content = '';

if ("REX_MEDIALIST[1]" != '') {

    $imagelist = explode(',', "REX_MEDIALIST[1]");

    $content .= '<div class="row gallery-wrap">' . "\n";

    foreach ($imagelist as $file) {
        $media = rex_media::get($file);

        if ($media) {

            $mediatitle = $media->getValue('title');
            $mediadesc = str_replace(array("\r\n", "\n", "\r"), ' ', $media->getValue('med_description'));
            $medialink = $media->getUrl();

            $content .= '<div class="col-sm-4 gallery-item">' . "\n";
            $content .= '<a href="' . $medialink . '" class="gallery" data-rel="gallery:REX_SLICE_ID" title="' . $mediatitle . ' ">';
            $content .= '<img src="index.php?rex_media_type=content&rex_media_file=' . $file . '" alt="">' . "\n";
            $content .= '</a>';
            $content .= '</div>' . "\n";
        }
    }

    $content .= '</div>' . "\n";

}

echo $content;
?>