<?php

class rex_demo_fullpage
{
    /**
     * @return array<string>
     */
    public static function install(): array
    {
        $addon = rex_addon::get('demo_fullpage');
        $packagesFromInstaller = [];

        // in some cases rex_addon has the old package.yml in cache. But we need our new merged package.yml
        $addon->loadProperties(); /** @phpstan-ignore-line */

        $errors = [];

        if (null === $addon->getProperty('setup')) {
            $errors[] = $addon->i18n('setup_not_available');
            return $errors;
        }

        $setupconfig = (array) $addon->getProperty('setup');

        // step 1: select missing packages we need to download
        $missingPackages = [];
        $packages = [];
        if (isset($setupconfig['packages'])) {
            $packages = (array) $setupconfig['packages'];
        }

        if (count($packages) > 0) {
            // fetch list of available packages from to redaxo webservice
            try {
                $packagesFromInstaller = rex_install_packages::getAddPackages();
            } catch (rex_functional_exception $e) {
                $errors[] = $e->getMessage();
                rex_logger::logException($e);
            }

            if (0 === count($errors)) {
                foreach ($packages as $id => $fileId) {
                    $localPackage = rex_package::get($id);
                    if ($localPackage->isSystemPackage()) {
                        continue; // skip system packages, they don’t need to be downloaded
                    }

                    $installerPackage = $packagesFromInstaller[$id]['files'][$fileId] ?? false;
                    if (false === $installerPackage) {
                        $errors[] = $addon->i18n('package_not_available', $id);
                    }

                    if (false !== $installerPackage && $localPackage->getVersion() !== $installerPackage['version']) {
                        $missingPackages[$id] = $fileId; // add to download list if package is not yet installed
                    }
                }
            }
        }

        // step 2: download required packages
        if (count($missingPackages) > 0 && 0 === count($errors)) {
            foreach ($missingPackages as $id => $fileId) {
                $installerPackage = $packagesFromInstaller[$id]['files'][$fileId];

                // fetch package
                try {
                    $archivefile = rex_install_webservice::getArchive($installerPackage['path']);
                } catch (rex_functional_exception $e) {
                    rex_logger::logException($e);
                    $errors[] = $addon->i18n('package_failed_to_download', $id);
                    break;
                }

                // validate checksum
                if ($installerPackage['checksum'] !== md5_file($archivefile)) {
                    $errors[] = $addon->i18n('package_failed_to_validate', $id);
                    break;
                }

                // extract package (overrides local package if existent)
                if (!rex_install_archive::extract($archivefile, rex_path::addon($id), $id)) {
                    rex_dir::delete(rex_path::addon($id));
                    $errors[] = $addon->i18n('package_failed_to_extract', $id);
                    break;
                }

                rex_package_manager::synchronizeWithFileSystem();
            }
        }

        // step 3: install and activate packages based on install sequence from config
        if (isset($setupconfig['installSequence']) && count($setupconfig['installSequence']) > 0 && 0 === count($errors)) {
            foreach ($setupconfig['installSequence'] as $id) {
                $package = rex_package::get($id);
                if ($package instanceof rex_null_package) {
                    $errors[] = $addon->i18n('package_not_exists', $id);
                    break;
                }
                $manager = rex_package_manager::factory($package); /** @phpstan-ignore-line */

                try {
                    $manager->install();
                } catch (rex_functional_exception $e) {
                    rex_logger::logException($e);
                    $errors[] = $addon->i18n('package_failed_to_install', $id);
                    break;
                }

                try {
                    $manager->activate();
                } catch (rex_functional_exception $e) {
                    rex_logger::logException($e);
                    $errors[] = $addon->i18n('package_failed_to_activate', $id);
                    break;
                }
            }
        }

        // step 4: import database
        if (isset($setupconfig['dbimport']) && count($setupconfig['dbimport']) > 0 && 0 === count($errors)) {
            foreach ($setupconfig['dbimport'] as $import) {
                $file = rex_backup::getDir() . '/' . $import;
                $success = rex_backup::importDb($file);
                if (!$success['state']) {
                    $errors[] = $addon->i18n('package_failed_to_import', $import);
                }
            }
        }

        // step 5: import files
        if (isset($setupconfig['fileimport']) && count($setupconfig['fileimport']) > 0 && 0 === count($errors)) {
            foreach ($setupconfig['fileimport'] as $import) {
                $file = rex_backup::getDir() . '/' . $import;
                $success = rex_backup::importFiles($file);
                if (!$success['state']) {
                    $errors[] = $addon->i18n('package_failed_to_import', $import);
                }
            }
        }

        // step 6: make yrewrite copy its htaccess file
        if (class_exists('rex_yrewrite')) {
            rex_yrewrite::copyHtaccess();
        }

        // step 7: clear developer addon data
        if (rex_addon::get('developer')->isAvailable()) {
            rex_dir::delete(rex_addon::get('developer')->getDataPath());
        }

        return $errors;
    }
}
