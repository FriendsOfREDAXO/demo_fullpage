<?php
$grid_content1 = '';
$grid_content2 = '';
$grid_content3 = '';

if (!function_exists('_url_convert')){
    function _url_convert($input) {
        $pattern = '@(http(s)?://)?(([a-zA-Z])([-\w]+\.)+([^\s\.]+[^\s]*)+[^,.\s])@';
        return $output = preg_replace($pattern, '<a href="http$2://$3">$0</a>', $input);
    }
}

// col1
if ("REX_MEDIA[1]" != '') {
    $media = rex_media::get("REX_MEDIA[1]");
    $mediatitle = $media->getValue('title');
    $mediadesc = str_replace(array("\r\n", "\n", "\r"), ' ', $media->getValue('med_description'));
    $medialink = $media->getUrl();
    $grid_content1 .= '<a href="' . $medialink . '" class="gallery" data-rel="gallery:REX_SLICE_ID" title="' . $mediatitle . '">';
    $grid_content1 .= '<img class="content" src="index.php?rex_media_type=content&rex_media_file=REX_MEDIA[1]" alt="">';
    $grid_content1 .= '</a>';
}
if ('REX_VALUE[id=1 isset=1]') {
    if (class_exists('markitup')) {
        $grid_content1 .= markitup::parseOutput('textile', 'REX_VALUE[id=1 output="html"]');
    } else {
        $grid_content1 .= nl2br(_url_convert('REX_VALUE[id=1 output="html"]'));
    }
}

// col2
if ("REX_MEDIA[2]" != '') {
    $media = rex_media::get("REX_MEDIA[2]");
    $mediatitle = $media->getValue('title');
    $mediadesc = str_replace(array("\r\n", "\n", "\r"), ' ', $media->getValue('med_description'));
    $medialink = $media->getUrl();
    $grid_content2 .= '<a href="' . $medialink . '" class="gallery" data-rel="gallery:REX_SLICE_ID" title="' . $mediatitle . '">';
    $grid_content2 .= '<img class="content" src="index.php?rex_media_type=content&rex_media_file=REX_MEDIA[2]" alt="">';
    $grid_content2 .= '</a>';
}
if ('REX_VALUE[id=2 isset=1]') {
    if (class_exists('markitup')) {
        $grid_content2 .= markitup::parseOutput('textile', 'REX_VALUE[id=2 output="html"]');
    } else {
        $grid_content2 .= nl2br(_url_convert('REX_VALUE[id=2 output="html"]'));
    }
}

// col3
if ("REX_MEDIA[3]" != '') {
    $media = rex_media::get("REX_MEDIA[3]");
    $mediatitle = $media->getValue('title');
    $mediadesc = str_replace(array("\r\n", "\n", "\r"), ' ', $media->getValue('med_description'));
    $medialink = $media->getUrl();
    $grid_content3 .= '<a href="' . $medialink . '" class="gallery" data-rel="gallery:REX_SLICE_ID" title="' . $mediatitle . '">';
    $grid_content3 .= '<img class="content" src="index.php?rex_media_type=content&rex_media_file=REX_MEDIA[3]" alt="">';
    $grid_content3 .= '</a>';
}
if ('REX_VALUE[id=3 isset=1]') {
    if (class_exists('markitup')) {	
        $grid_content3 .= markitup::parseOutput('textile', 'REX_VALUE[id=3 output="html"]');
    } else {
        $grid_content3 .= nl2br(_url_convert('REX_VALUE[id=3 output="html"]'));
    }
}

if ("REX_VALUE[10]" != '') {
    echo '<div class="row"><REX_VALUE[11]>REX_VALUE[10]</REX_VALUE[11]></div>' . "\n";
}
if ($grid_content1 <> '' or $grid_content2 <> '' or $grid_content3 <> '')
{
    echo '<div class="row pictext">' . "\n";

    // 2cols
    if ("REX_VALUE[9]" == '2')  {
        echo '<div class="col-sm-6">' . "\n";
        echo $grid_content1 . "\n";
        echo '</div>' . "\n";
        echo '<div class="col-sm-6">' . "\n";
        echo $grid_content2 . "\n";
        echo '</div>' . "\n";
    // 3cols
    } elseif ("REX_VALUE[9]" == '3') {
        echo '<div class="col-sm-4">' . "\n";
        echo $grid_content1 . "\n";
        echo '</div>' . "\n";
        echo '<div class="col-sm-4">' . "\n";
        echo $grid_content2 . "\n";
        echo '</div>' . "\n";
        echo '<div class="col-sm-4">' . "\n";
        echo $grid_content3 . "\n";
        echo '</div>' . "\n";
    // 1col
    } else {
        echo $grid_content1 . "\n";
    }

    echo '</div>' . "\n";
}
?>