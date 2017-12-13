<?php
/**
 * REDAXO Addon distribution class
 *
 * Diese Klasse erstellt aus dem Entwickler-Addon eine
 * Version zum veröffentlichen auf REDAXO.org
 *
 * @author  Andreas Eberhard
 *
 * @package redaxo\demo_fullpage
 * @internal
 */

class rex_addon_release_parameter
{
    // ADDON-Name
    public $addon_name = '';
    // ADDON-Version
    public $addon_version = '';
    // ADDON-Pfad
    public $addon_path = '';

    // Releas-Type
    public $type = '';

    // Verzeichnis für die Distribution-Version
    public $release_path = '';

    // Addon-Dateien aus dem Root-Verzeichnis die nicht übernommen werden sollen
    public $ignore_root_files = [];

    // Addon-Unterverzeichnisse die nicht übernommen werden sollen
    public $ignore_folders = [];
    // Addon-Dateien die nicht übernommen werden sollen
    public $ignore_files = [];

    // Pfad für die Exporte (Subdir von release_path)
    public $export_path = 'backups/';

    // Name für sql-Export (ohne .sql)
    public $exportsql_name = '';

    // Name für File-Export (ohne .tar.gz)
    public $exportfiles_name = '';

    // Ordner für den File-Export
    public $export_folders = [];

    // NO_DIST-Blöcke aus Dateien entfernen
    public $remove_no_dist = false;

    // Addon-Settings aus Tabelle rex_config löschen
    public $delete_addon_settings = false;

    // Clear redaxo-cache
    public $clear_cache = false;
}

class rex_addon_release
{
    private $params;
    private $error = false;

    public function __construct(rex_addon_release_parameter $params)
    {
        $this->params = $params;
        $this->result = '';
    }

    public function create()
    {
        $params = $this->params;
        $result = array();
        $errors = array();

        $addon = $params->addon_name;
        $version = $params->addon_version;
        $addonname = $params->addon_name . '_' . $params->addon_version;
        $addonpath = $params->addon_path;
        $dirname = $params->release_path . $params->type . '_' . $addonname . DIRECTORY_SEPARATOR;

        $result[] = 'Addon: ' . $addon;
        $result[] = 'Version: ' . $version;
        $result[] = 'Type: ' . $params->type;
        $result[] = 'Addon-Verzeichnis: ' . $addonpath;
        $result[] = 'Ausgabe-Verzeichnis: ' . $dirname;
        $result[] = 'Ausgabe ZIP-Archiv: ' . $params->release_path . $addonname . '.zip';
        $result[] = '';

        if (!file_exists($addonpath)) {
            $this->error = true;
            $errors[] = 'Addon-Verzeichnis wurde nicht gefunden! ' . $addonpath;
        }

        if (!$this->error && file_exists($dirname)) {
            rex_dir::delete($dirname, true);
        }

        if (!$this->error) {
            if (!rex_dir::create($dirname)) {
                $this->error = true;
                $errors[] = 'Ausgabe-Verzeichnis konnte nicht erstellt werden! ' . $dirname;
            }
        }

        if (!$this->error) {
            if (!$this->copyDir($addonpath, $dirname)) {
                $this->error = true;
                $errors[] = 'Addon-Verzeichnis konnte nicht kopiert werden!';
            }
        }

        if (!$this->error && isset($params->clear_cache) && $params->clear_cache) {
            rex_delete_cache();
            $result[] = 'Cache wurde gelöscht';
        }

        if (!$this->error && isset($params->delete_addon_settings) && $params->delete_addon_settings) {
            $this->removeAddonSettings($addon);
            $result[] = 'Addon-Settings wurden gelöscht';
        }

        if (!$this->error) {
            foreach ($params->ignore_root_files as $file) {
                if (file_exists($dirname . $file) && rex_file::delete($dirname . $file)) {
                    $result[] = 'Datei gelöscht: ' .$file;
                }
            }
        }

        if (!$this->error) {
            foreach ($params->ignore_folders as $dir) {
                if (file_exists($dirname . $dir)) {
                    rex_dir::delete($dirname . $dir, true);
                    $result[] = 'Unterverzeichnis gelöscht: ' . $dir;
                }
            }
        }

        if (!$this->error) {
            foreach ($params->ignore_files as $mask) {
                foreach ($this->globRecursive($dirname . $mask, GLOB_BRACE) as $filename) {
                    rex_file::delete($filename);
                    $result[] = 'Datei gelöscht: ' . str_replace($dirname, '', $filename);
                }
            }
        }

        if (!$this->error && isset($params->remove_no_dist) && $params->remove_no_dist) {
            foreach ($this->globRecursive($dirname . '*', GLOB_BRACE) as $filename) {
                if ($this->removeNodistCode($filename)) {
                    $result[] = 'Datei angepasst (NO_DIST): ' . str_replace($dirname, '', $filename);
                }
            }
        }

        if (!$this->error && isset($params->exportsql_name) && $params->exportsql_name) {
            $filename = $params->export_path . $params->exportsql_name . '.sql';
            $rc = $this->exportSql($dirname . $filename);
            if ($rc) {
                $result[] = 'SQL-Export wurde erstellt: ' . $filename;
            } else {
                $this->error = true;
                $errors[] = 'Fehler beim erstellen des SQL-Exports! ' . $filename;
            }
        }

        if (!$this->error && isset($params->exportfiles_name) && $params->exportfiles_name) {
            $filename = $params->export_path . $params->exportfiles_name . '.tar.gz';
            $folders = $params->export_folders;
            $rc = $this->exportFiles($dirname . $filename, $folders);
            if ($rc) {
                $result[] = 'File-Export wurde erstellt: ' . $filename;
            } else {
                $this->error = true;
                $errors[] = 'Fehler beim erstellen des File-Exports! ' . $filename;
            }
        }

        if (!$this->error) {
            $filename = $params->release_path . $addonname . '.zip';
            if (!$this->createZip($dirname, $filename)) {
                $this->error = true;
                $errors[] = 'Fehler beim erstellen des ZIP-Archives! ' . $filename;
            } else {
                $result[] = 'ZIP-Archiv wurde erstellt: ' . $filename;
            }
        }

        $this->result = implode('<br>', $result);
        if (count($errors) > 0) {
            $this->result .= '<br><br><strong>ABBRUCH! Es sind Fehler aufgetreten!</strong><br>';
            $this->result .= implode('<br>', $errors);
        }

        return $this->result;
    }

    function copyDir($source, $dest)
    {
        //return rex_dir::copy($source, $dest); // kopiert nicht alle Dateien werden aber evtl. benötigt!
        $state = true;
        foreach ($iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source, RecursiveDirectoryIterator::SKIP_DOTS), RecursiveIteratorIterator::SELF_FIRST) as $item) {
            if ($item->isDir()) {
                $state = mkdir($dest . DIRECTORY_SEPARATOR . $iterator->getSubPathName());
            } else {
                $state =  copy($item, $dest . DIRECTORY_SEPARATOR . $iterator->getSubPathName());
            }
        }
        return $state;
    }

    function removeAddonSettings($addon)
    {
        $table = rex::getTable('config');

        $sql = rex_sql::factory();

        $sql->setTable($table)
            ->setWhere(['namespace' => $addon])
            ->delete();
    }

    function globRecursive($pattern, $flags = 0)
    {
        $files = glob($pattern, $flags);
        foreach (glob(dirname($pattern) . DIRECTORY_SEPARATOR . '*', GLOB_ONLYDIR|GLOB_NOSORT) as $dir)
            {
            $files = array_merge($files, $this->globRecursive($dir . DIRECTORY_SEPARATOR . basename($pattern), $flags));
        }
        return $files;
    }

    function removeNodistCode($path)
    {
        if (!is_dir($path)) {
            if ($fcontent = file_get_contents($path))
            {
                if (strstr($fcontent, '// --- NO_DIST')) {
                    $content = '';
                    $fcontent = preg_replace("@(\/\/.---.NO_DIST.*\/\/.---.\/NO_DIST)@s", $content, $fcontent);
                    return file_put_contents($path, $fcontent);
                }
            }
        }
        return false;
    }

    function exportSql($filename)
    {
        return rex_backup::exportDb($filename);
    }

    function exportFiles($filename, $folders)
    {
        $content = rex_backup::exportFiles($folders);
        return rex_file::put($filename, $content);
    }

    function createZip($source, $filename)
    {
        $state = true;

        $zip = new ZipArchive();
        $zip->open($filename, ZipArchive::CREATE);
        if (!$zip->status == ZIPARCHIVE::ER_OK) {
            $state = false;
        }

        if ($state) {
            $files = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($source),
                RecursiveIteratorIterator::LEAVES_ONLY
            );

            foreach ($files as $name => $file)
            {
                // Skip directories (they would be added automatically)
                if (!$file->isDir())
                {
                    // Get real and relative path for current file
                    $filePath = $file->getRealPath();
                    $relativePath = substr($filePath, strlen($source));
                    // Add current file to archive
                    $zip->addFile($filePath, $relativePath);
                    if (!$zip->status == ZIPARCHIVE::ER_OK) {
                        $state = false;
                    }
                }
            }

            $zip->close();
        }

        return $state;
    }
}
