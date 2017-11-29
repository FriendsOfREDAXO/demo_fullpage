<?php
if ("REX_VALUE[2]" != '') {
    echo '<div class="row"><REX_VALUE[3]>REX_VALUE[2]</REX_VALUE[3]></div>' . "\n";
}

if ("REX_MEDIALIST[1]" != '') {
    echo '<div class="row pictext">' . "\n";

    // Find out file size
    if (!function_exists('datei_groesse')) {
        function datei_groesse($URL) {

            $groesse = filesize($URL);
            if($groesse<1000) {
                return number_format($groesse, 0, ",", ".")." Bytes";
            }
            elseif($groesse<1000000) {
                return number_format($groesse/1024, 0, ",", ".")." kB";
            } else {
                return number_format($groesse/1048576, 0, ",", ".")." MB";
            }
        }
    }

    // Find out icon
    if (!function_exists('parse_icon')) {
        function parse_icon($ext) {
            switch (strtolower($ext)) {
                case 'doc': return '<i class="fa fa-file-word-o"></i>';
                case 'pdf': return '<i class="fa fa-file-pdf-o"></i>';
                case 'zip': return '<i class="fa fa-file-archive-o"></i>';
                // please add your own settings, e.g. with icons of Font-Awesome
                default:
                    return '';
            }
        }
    }

    $arr = explode(",","REX_MEDIALIST[1]");
    foreach ($arr as $value) {

        $extension = substr(strrchr($value, '.'), 1);
        $parsed_icon = parse_icon($extension);
        $media = rex_media::get($value);
        $file_desc = $media->getValue('med_description');

        echo '<div class="col-sm-4"><p><a href="'.rex_getUrl(8, $this->clang, array ('file' => $value) ).'">'.$parsed_icon;

        // Description as linktext, if there is one. Otherwise filename
        if ($file_desc != "") {
            echo $file_desc;
        } else {
            echo $value;
        }

        echo ' ('.datei_groesse(rex_path::media($value)).')</a></p></div>'."\n";

    }

    echo '</div>'."\n";
}
?>