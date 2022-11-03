<?php

class fullpage_theme_compiler {

    public function compile(string $theme, bool $showfiles = false) : void {
        $addon = rex_addon::get('demo_fullpage');

        $compiler = new rex_scss_compiler();

        if (substr($theme, 0, 8) === 'project:') {
            $theme = str_replace('project:', '', $theme);
            $sourcePath = rex_addon::get('project')->getPath('fpthemes/' . $theme . '/css/');
        } else {
            $sourcePath = $addon->getPath('assets/themes/' . $theme . '/css/');
        }
        $destPath = $addon->getAssetsPath('themes/' . $theme . '/css/');
        rex_dir::create($destPath, true);

        if (!rex_dir::isWritable($sourcePath)) {
            echo rex_view::error('Directory not writeable! ' . $sourcePath);
            return;
        }
        if (!rex_dir::isWritable($destPath)) {
            echo rex_view::error('Directory not writeable! ' . $destPath);
            return;
        }

        echo '<strong>Theme-Source:</strong> ' . substr($sourcePath, (int) strpos($sourcePath, 'redaxo' . DIRECTORY_SEPARATOR . 'src')) . '<br>';
        echo '<strong>Theme-Destination:</strong> ' . substr($destPath, (int) strpos($destPath, 'assets' . DIRECTORY_SEPARATOR . 'addons')) . '<br><br>';

        $cssfiles = [];
        $filenames = (array)glob($sourcePath . '*.css');
        foreach ($filenames as $filename) {
            $filename = (string)$filename;
            if (substr(basename($filename), -8 ) !== '.min.css' && basename($filename) !== 'theme.css') {
                $cssfiles[] = pathinfo(basename($filename), PATHINFO_FILENAME);
            }
        }
        $cssfiles[] = 'theme';

        // handle error exit in compiler
        register_shutdown_function(function() {
            echo '<br><br>' .rex_view::error(rex_addon::get('demo_fullpage')->i18n('compile_error'));
        });

        // compile css-files
        foreach ($cssfiles as $filename) {
            $compiler->setRootDir($sourcePath);
            $compiler->setScssFile($sourcePath . $filename . '.css');
            $compiler->setCssFile($sourcePath . $filename . '.min.css');
            if ($showfiles) {
                echo 'Compiling <strong>' . $filename . '.css</strong> to <strong>' . $filename . '.min.css</strong><br>';
            }
            $compiler->compile();
        }

        if ($showfiles) {
            echo '<br>';
        }

        // copy theme-files to frontend-asset-directory
        $sourcePath = substr($sourcePath, 0, -4);
        $destPath = substr($destPath, 0, -4);
        rex_dir::copy($sourcePath, $destPath);
    }

}
