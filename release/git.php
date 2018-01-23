<?php
include(dirname(__FILE__).'/addon_release.php');

$package = rex_package::get($this->getName());
$name = $package->getPackageId();
$version = $package->getVersion();

$relparams = new rex_addon_release_parameter();

// ADDON-Name
$relparams->addon_name = $name;
// ADDON-Version
$relparams->addon_version = $version;
// ADDON-Pfad
$relparams->addon_path = rex_path::addon($this->getName());

// Releasy-Type
$relparams->type = 'git';

// Verzeichnis für die Distribution-Version
$relparams->release_path = rex_path::data();

// Addon-Dateien aus dem Root-Verzeichnis die nicht übernommen werden sollen
$relparams->ignore_root_files = ['.TODO'];
// Addon-Unterverzeichnisse die nicht übernommen werden sollen
$relparams->ignore_folders = ['vendor'];
// Addon-Dateien die nicht übernommen werden sollen
$relparams->ignore_files = ['actions/*.rex_id', 'actions/*metadata.yml', 'modules/*.rex_id', 'modules/*metadata.yml', 'templates/*.rex_id', 'templates/*metadata.yml'];

// Pfad für die Exporte (Subdir von release_path)
$relparams->export_path = 'backups/';
// Name für sql-Export (ohne .sql)
$relparams->exportsql_name = 'demo_fullpage';
// Name für File-Export (ohne .tar.gz)
$relparams->exportfiles_name = 'demo_fullpage';
// Ordner für den File-Export
$relparams->export_folders = ['media'];

// NO_DIST-Blöcke aus Dateien entfernen
$relparams->remove_no_dist = false;

// Addon-Settings aus Tabelle rex_config löschen
$relparams->delete_addon_settings = true;

// Clear redaxo-cache
$relparams->clear_cache = true;

// Create the distribution release
$release = new rex_addon_release($relparams);
$msg = $release->create();

echo '
<div class="alert alert-info">'
.$msg.
'</div>
';
