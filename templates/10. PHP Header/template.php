<?php
// Error report should only be active during development. Deavtivate (0) on a live website
// error_reporting(0);
error_reporting(E_ALL);

// Is User not logged in?
if (!rex_backend_login::hasSession()) {
    // Is current article offline?
    if ($this->getValue('status') == 0) {
        // redirect to 404 page
        header('HTTP/1.1 301 Moved Permanently');
        header('Location: ' . rex_getUrl(rex_article::getNotFoundArticleId(), rex_clang::getCurrentId()));
        die();
    }
}

// set charset to utf8
header('Content-Type: text/html; charset=utf-8');

// setLocale is a language meta field, set your individual locale informations per language
setlocale(LC_ALL, rex_clang::getCurrent()->getValue('clang_setlocale'));

// Use article title as title-Tag, unless a custom title-tag is set
if ($this->getValue('art_title') != '') {
    $title = htmlspecialchars($this->getValue('art_title'));
} else {
    $title = htmlspecialchars($this->getValue('name'));
}

// Keywords and description
// If current article does not have keywords and description, take them from start article
if ($this->getValue('art_keywords') != '') {
    $keywords = htmlspecialchars($this->getValue('art_keywords'));
} else {
    $home = new rex_article_content(rex_article::getSiteStartArticleId());
    $keywords = htmlspecialchars($home->getValue('art_keywords'));
}

if ($this->getValue('art_description') != '') {
    $description = htmlspecialchars($this->getValue('art_description'));
} else {
    $home = new rex_article_content(rex_article::getSiteStartArticleId());
    $description = htmlspecialchars($home->getValue('art_description'));
}

// Theme aus Addon-Einstellungen (addon demo_fullpage)
$fullpagedemo['theme'] = rex_addon::get('demo_fullpage')->getConfig('theme');
if ($fullpagedemo['theme'] == '') {
    // Defaultwerte setzen wenn noch nicht vorhanden
    $demo = rex_addon::get('demo_fullpage');
    if (!$demo->hasConfig() or ($demo->getConfig('theme') == '')) {
        $demo->setConfig('theme', 'coffee');
        $demo->setConfig('logo', '');
        $demo->setConfig('showscrollbar', '0');
        $demo->setConfig('scrollingspeed', '600');
        $demo->setConfig('autoscrolling', '1');
        $demo->setConfig('shownavigation', '0');
        $demo->setConfig('shownavigationtooltip', '0');
        $demo->setConfig('navigationposition', 'right');
        $demo->setConfig('showslidearrows', '1');
        $demo->setConfig('showslidenavigation', '0');
        $demo->setConfig('slidenavigationposition', 'bottom');
        $demo->setConfig('usesubcategories', '0');
    } 
    $fullpagedemo['theme'] = 'theme';
}
$xtheme = rex_request('theme', 'string', '');
if ($xtheme <> '' and file_exists('assets/addons/demo_fullpage/themes/' . $xtheme)) {
    $fullpagedemo['theme'] = $xtheme;
}

// Logo aus Addon-Einstellungen (addon demo_fullpage)
$fullpagedemo['logo'] = rex_addon::get('demo_fullpage')->getConfig('logo');
if ($fullpagedemo['logo'] == '') {
    if (file_exists(rex_url::base('assets/addons/demo_fullpage/themes/' . $fullpagedemo['theme'] . '/img/' . 'logo.svg'))) {
        $fullpagedemo['logo'] = rex_url::base('assets/addons/demo_fullpage/themes/' . $fullpagedemo['theme'] . '/img/' . 'logo.svg');
    } else {
        $fullpagedemo['logo'] = rex_url::base('assets/addons/demo_fullpage/themes/' . $fullpagedemo['theme'] . '/img/' . 'logo.png');
    }
} else {
    $fullpagedemo['logo'] = rex_url::base('media/' . $fullpagedemo['logo']);
}
$fullpagedemo['logotitle'] = trim(rex::getServerName());
if ($fullpagedemo['logotitle'] == '') {
    $fullpagedemo['logotitle'] = 'Fullpage-Demo für das REDAXO CMS';
}
?><!DOCTYPE html>