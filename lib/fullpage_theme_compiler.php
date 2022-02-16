<?php

class fullpage_theme_compiler {

    public function compile($theme) {
        $addon = rex_addon::get('demo_fullpage');

        $compiler = new rex_scss_compiler();

        $sourcePath = $addon->getPath('assets/themes/' . $theme . '/css/');
        $destPath = $addon->getAssetsPath('themes/' . $theme . '/css/');

        $cssfiles = [];
        foreach (glob($sourcePath . '*.css') as $filename) {
            if (substr(basename($filename), -8 ) != '.min.css' && basename($filename) != 'theme.css') {
                $cssfiles[] = pathinfo(basename($filename), PATHINFO_FILENAME);
            }
        }
        $cssfiles[] = 'theme';

        foreach ($cssfiles as $filename) {
            $compiler->setRootDir($sourcePath);
            $compiler->setScssFile($sourcePath . $filename . '.css');
            $compiler->setCssFile($sourcePath . $filename . '.min.css');
            $compiler->compile();
        }

        rex_dir::copy($sourcePath, $destPath);
    }

}
