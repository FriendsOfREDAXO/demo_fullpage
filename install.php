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

// Backups kopieren
rex_dir::copy(
    $this->getPath('backups'),
    rex_addon::get('backup')->getDataPath()
);
