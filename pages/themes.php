<?php

$addon = rex_addon::get('demo_fullpage');

$content = '';

$package = rex_package::get($addon->getName());
$name = $package->getPackageId();

if (is_readable($package->getPath('THEMES.'. rex_i18n::getLanguage() .'.md'))) {
    [$readmeToc, $readmeContent] = rex_markdown::factory()->parseWithToc(rex_file::require($package->getPath('THEMES.'. rex_i18n::getLanguage() .'.md')), 2, 3, [
        rex_markdown::SOFT_LINE_BREAKS => false,
        rex_markdown::HIGHLIGHT_PHP => true,
    ]);
    $fragment = new rex_fragment();
    $fragment->setVar('content', $readmeContent, false);
    $fragment->setVar('toc', $readmeToc, false);
    $content .= $fragment->parse('core/page/docs.php');
} elseif (is_readable($package->getPath('THEMES.md'))) {
    [$readmeToc, $readmeContent] = rex_markdown::factory()->parseWithToc(rex_file::require($package->getPath('THEMES.md')), 2, 3, [
        rex_markdown::SOFT_LINE_BREAKS => false,
        rex_markdown::HIGHLIGHT_PHP => true,
    ]);
    $fragment = new rex_fragment();
    $fragment->setVar('content', $readmeContent, false);
    $fragment->setVar('toc', $readmeToc, false);
    $content .= $fragment->parse('core/page/docs.php');
} else {
    $content .= rex_view::info(rex_i18n::msg('package_no_help_file'));
}

if ($content !== '') {
    $fragment = new rex_fragment();
    $fragment->setVar('title', $addon->i18n('demo_fullpage_description_themes_heading'), false);
    $fragment->setVar('body', $content, false);
    echo $fragment->parse('core/page/section.php');
}
