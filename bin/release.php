<?php
unset($ADDON_DIST);
$package = rex_package::get($this->getName());
$name = $package->getPackageId();
$version = $package->getVersion();

// ADDON-Name
$ADDON_DIST['addon_name'] = $name;
// ADDON-Version
$ADDON_DIST['addon_version'] = $version;
// ADDON-Pfad
$ADDON_DIST['addon_path'] = rex_path::addon($this->getName());

// Releasy-Type
$ADDON_DIST['type'] = 'dist';

// Verzeichnis für die Distribution-Version
$ADDON_DIST['release_path'] = rex_path::data();

// Addon-Dateien aus dem Root-Verzeichnis die nicht übernommen werden sollen
$ADDON_DIST['ignore_root_files'] = ['.gitignore', '.TODO', '.todo.txt'];
// Addon-Unterverzeichnisse die nicht übernommen werden sollen
$ADDON_DIST['ignore_folders'] = ['.git', 'bin', 'actions', 'modules', 'templates', 'vendor'];
// Addon-Dateien die nicht übernommen werden sollen
$ADDON_DIST['ignore_files'] = ['actions/*.rex_id', 'actions/*metadata.yml', 'modules/*.rex_id', 'modules/*metadata.yml', 'templates/*.rex_id', 'templates/*metadata.yml'];

// Pfad für die Exporte (Subdir von release_path)
$ADDON_DIST['export_path'] = 'backups/';
// Name für sql-Export (ohne .sql)
$ADDON_DIST['exportsql_name'] = 'demo_fullpage';
// Name für File-Export (ohne .tar.gz)
$ADDON_DIST['exportfiles_name'] = 'demo_fullpage';
// Ordner für den File-Export
$ADDON_DIST['export_folders'] = ['media'];

// NO_DIST-Blöcke aus Dateien entfernen
$ADDON_DIST['remove_no_dist'] = true;

// Addon-Settings aus Tabelle rex_config löschen
$ADDON_DIST['delete_addon_settings'] = true;

// Clear redaxo-cache
$ADDON_DIST['clear_cache'] = true;

// Create the distribution release
include(dirname(__FILE__).'/addon_release_class.php');
$release = new rex_addon_release($ADDON_DIST);
$msg = $release->create();

echo '
<div class="alert alert-info">'
.$msg.
'</div>
';
