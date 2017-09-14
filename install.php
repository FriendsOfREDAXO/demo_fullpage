<?php

// Defaultwerte Konfiguration setzen
if (!$this->hasConfig() or ($this->getConfig('theme') == '')) {
    $this->setConfig('theme', 'theme');
    $this->setConfig('showscrollbar', '1');
    $this->setConfig('scrollingspeed', '500');
    $this->setConfig('autoscrolling', '0');
    $this->setConfig('shownavigation', '0');
    $this->setConfig('shownavigationtooltip', '0');
    $this->setConfig('navigationposition', 'right');
    $this->setConfig('showslidearrows', '1');
    $this->setConfig('showslidenavigation', '0');
    $this->setConfig('slidenavigationposition', 'bottom');
    $this->setConfig('usesubcategories', '0');
}

// copy backup files
rex_dir::copy(
    $this->getPath('backups'),
    rex_addon::get('backup')->getDataPath()
);

// update config
// merge current config with additional config

// Background information:
// We need the demo to be installed first of all to fetch required packages and import data.
// To make this happen, we need to keep the config free of external dependencies and use an
// additional config which will be merged into the config when the demo is installed.
$config = array_replace_recursive(
    rex_file::getConfig($this->getPath('package.yml')),
    rex_file::getConfig($this->getPath('package.setup.yml'))
);

rex_file::putConfig($this->getPath('package.yml'), $config);
