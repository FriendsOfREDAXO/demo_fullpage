<?php

$addon = rex_addon::get('demo_fullpage');

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
