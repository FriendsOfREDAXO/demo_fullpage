<?php

$addon = rex_addon::get('demo_fullpage');

// add success message after add-on install
$addon->setProperty('successmsg', rex_i18n::rawMsg('demo_fullpage_success_message', '<a href="' . rex_url::backendPage('demo_fullpage') . '">' . $addon->i18n('demo_fullpage_title') . '</a>'));

// Defaultwerte Konfiguration setzen
if (!$addon->hasConfig() || ('' === $addon->getConfig('theme'))) {
    $addon->setConfig('theme', 'coffee');
    $addon->setConfig('logo', '');
    $addon->setConfig('autoscrolling', '1');
    $addon->setConfig('showscrollbar', '');
    $addon->setConfig('responsivewidth', '1200');
    $addon->setConfig('responsiveheight', '750');
    $addon->setConfig('scrollingspeed', '800');
    $addon->setConfig('shownavigation', '1');
    $addon->setConfig('shownavigationtooltip', '1');
    $addon->setConfig('navigationposition', 'right');
    $addon->setConfig('showslidearrows', '1');
    $addon->setConfig('showslidenavigation', '1');
    $addon->setConfig('slidenavigationposition', 'bottom');
    $addon->setConfig('usesubcategories', '1');
}

// copy backup files
rex_dir::copy(
    $addon->getPath('backups'),
    rex_addon::get('backup')->getDataPath(),
);

// update config
// merge current config with additional config

// Background information:
// We need the demo to be installed first of all to fetch required packages and import data.
// To make this happen, we need to keep the config free of external dependencies and use an
// additional config which will be merged into the config when the demo is installed.
$config = array_replace_recursive(
    rex_file::getConfig($addon->getPath('package.yml')),
    rex_file::getConfig($addon->getPath('package.setup.yml')),
);

rex_file::putConfig($addon->getPath('package.yml'), $config);
