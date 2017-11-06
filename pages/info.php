<?php

$content = '';

$package = rex_package::get($this->getName());
$name = $package->getPackageId();

if (is_readable($package->getPath('INFO.md'))) {
    $fragment = new rex_fragment();
    $fragment->setVar('content', rex_markdown::factory()->parse(rex_file::get($package->getPath('INFO.md'))), false);
    $content .= $fragment->parse('core/page/docs.php');
}

if (!empty($content)) {
    $fragment = new rex_fragment();
    $fragment->setVar('title', $this->i18n('demo_fullpage_description_info_heading'), false);
    $fragment->setVar('body', $content, false);
    echo $fragment->parse('core/page/section.php');
}
