<?php

declare(strict_types=1);

$addon = rex_addon::get('demo_fullpage');

echo rex_view::title($addon->i18n('title'));
rex_be_controller::includeCurrentPageSubPath();
