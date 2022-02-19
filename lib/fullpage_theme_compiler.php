<?php

class fullpage_theme_compiler {

    public function compile($theme) {
        $addon = rex_addon::get('demo_fullpage');

        $compiler = new rex_scss_compiler();

        if (substr($theme, 0, 8) == 'project:') {
            $theme = str_replace('project:', '', $theme);
            $sourcePath = rex_addon::get('project')->getPath('fpthemes/' . $theme . '/css/');
        } else {
            $sourcePath = $addon->getPath('assets/themes/' . $theme . '/css/');
        }
        $destPath = $addon->getAssetsPath('themes/' . $theme . '/css/');

        if (!rex_dir::isWritable($sourcePath)) {
            echo rex_view::error('Directory not writeable! ' . $sourcePath);
            return;
        }

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

        $sourcePath = substr($sourcePath, 0, -4);
        $destPath = substr($destPath, 0, -4);
        rex_dir::copy($sourcePath, $destPath);
    }

}
