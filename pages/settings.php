<?php

$content = '';
$buttons = '';

$func = rex_request('func', 'string');

// Defaultwerte Konfiguration setzen
if (!$this->hasConfig() or ($this->getConfig('theme') == '')) {
    $this->setConfig('theme', 'coffee');
    $this->setConfig('logo', '');
    $this->setConfig('showscrollbar', '0');
    $this->setConfig('scrollingspeed', '600');
    $this->setConfig('autoscrolling', '1');
    $this->setConfig('shownavigation', '0');
    $this->setConfig('shownavigationtooltip', '0');
    $this->setConfig('navigationposition', 'right');
    $this->setConfig('showslidearrows', '1');
    $this->setConfig('showslidenavigation', '0');
    $this->setConfig('slidenavigationposition', 'bottom');
    $this->setConfig('usesubcategories', '0');
}

// Konfiguration speichern
if ($func == 'update') {

    $this->setConfig(rex_post('settings', [
        ['theme', 'string'],
        ['logo', 'string'],
        ['showscrollbar', 'string'],
        ['scrollingspeed', 'string'],
        ['autoscrolling', 'string'],
        ['shownavigation', 'string'],
        ['shownavigationtooltip', 'string'],
        ['navigationposition', 'string'],
        ['showslidearrows', 'string'],
        ['showslidenavigation', 'string'],
        ['slidenavigationposition', 'string'],
        ['usesubcategories', 'string']
    ]));

    echo rex_view::success($this->i18n('config_saved'));
}

// Config-Werte bereitstellen
$Values = array();
$Values['theme'] = $this->getConfig('theme');
$Values['logo'] = $this->getConfig('logo');
$Values['showscrollbar'] = $this->getConfig('showscrollbar');
$Values['scrollingspeed'] = $this->getConfig('scrollingspeed');
$Values['autoscrolling'] = $this->getConfig('autoscrolling');
$Values['shownavigation'] = $this->getConfig('shownavigation');
$Values['shownavigationtooltip'] = $this->getConfig('shownavigationtooltip');
$Values['navigationposition'] = $this->getConfig('navigationposition');
$Values['showslidearrows'] = $this->getConfig('showslidearrows');
$Values['showslidenavigation'] = $this->getConfig('showslidenavigation');
$Values['slidenavigationposition'] = $this->getConfig('slidenavigationposition');
$Values['usesubcategories'] = $this->getConfig('usesubcategories');

// Theme
$formElements = [];
$n = [];
$n['label'] = '<label for="theme">' . htmlspecialchars_decode($this->i18n('config_theme')) . '</label>';

$sel_dirs = new rex_select();
$sel_dirs->setId('theme');
$sel_dirs->setName('settings[theme]');
$sel_dirs->setSelected($Values['theme']);
$sel_dirs->setStyle('class="form-control"');

// get themes
$myPath = rex_url::base('redaxo/src/addons/demo_fullpage/assets/themes/');
$directories = glob($myPath . '/*' , GLOB_ONLYDIR);
foreach ($directories as $dir) {
    $dir = basename($dir);
    if ($ff = file($myPath  .$dir . '/css/theme.css')) {
        if (isset($ff[0]) and trim($ff[0]) == '/*' and isset($ff[3]) and trim($ff[3]) == '*/' and isset($ff[2])) {
            $sel_dirs->addOption($ff[2], $dir);
        }
    }
}

$n['field'] = $sel_dirs->get();

$formElements[] = $n;

$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/container.php');

// Logo
$formElements = [];

$n = [];
$n['label'] = '<label for="REX_MEDIA_1">' . htmlspecialchars_decode($this->i18n('config_logo')) . '</label>';

$n['field'] = '
<div class="rex-js-widget rex-js-widget-media">
    <div class="input-group">
        <input class="form-control" type="text" name="settings[logo]" value="' . $Values['logo'] . '" id="REX_MEDIA_1" readonly="">
        <span class="input-group-btn">
        <a href="#" class="btn btn-popup" onclick="openREXMedia(1);return false;" title="' . $this->i18n('config_selectmedia') . '">
            <i class="rex-icon rex-icon-open-mediapool"></i>
        </a>
        <a href="#" class="btn btn-popup" onclick="addREXMedia(1);return false;" title="' . $this->i18n('config_addmedia') . '">
            <i class="rex-icon rex-icon-add-media"></i>
        </a>
        <a href="#" class="btn btn-popup" onclick="deleteREXMedia(1);return false;" title="' . $this->i18n('config_deletemedia') . '">
            <i class="rex-icon rex-icon-delete-media"></i>
        </a>
        <a href="#" class="btn btn-popup" onclick="viewREXMedia(1);return false;" title="' . $this->i18n('config_showmedia') . '">
            <i class="rex-icon rex-icon-view-media"></i>
        </a>
    </div>
 </div>
';

$formElements[] = $n;

$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/container.php');

// Scrollbar anzeigen
$formElements = [];
$n = [];
$n['label'] = '<label for="showscrollbar">' . htmlspecialchars_decode($this->i18n('config_showscrollbar')) . '</label>';
$n['field'] = '<input type="checkbox" id="showscrollbar" name="settings[showscrollbar]"' . (!empty($Values['showscrollbar']) && $Values['showscrollbar'] == '1' ? ' checked="checked"' : '') . ' value="1" />';
$formElements[] = $n;

$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/checkbox.php');

// Scrolling Speed
$formElements = [];
$n = [];
$n['label'] = '<label for="scrollingspeed">' . htmlspecialchars_decode($this->i18n('config_scrollingspeed')) . '</label>';
$n['field'] = '<input class="form-control" type="text" id="scrollingspeed" name="settings[scrollingspeed]" value="' . $Values['scrollingspeed'] . '" />';
$formElements[] = $n;

$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/container.php');

// Autoscrolling
$formElements = [];
$n = [];
$n['label'] = '<label for="autoscrolling">' . htmlspecialchars_decode($this->i18n('config_autoscrolling')) . '</label>';
$n['field'] = '<input type="checkbox" id="autoscrolling" name="settings[autoscrolling]"' . (!empty($Values['autoscrolling']) && $Values['autoscrolling'] == '1' ? ' checked="checked"' : '') . ' value="1" />';
$formElements[] = $n;

$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/checkbox.php');

// Show navigation
$formElements = [];
$n = [];
$n['label'] = '<label for="shownavigation">' . htmlspecialchars_decode($this->i18n('config_shownavigation')) . '</label>';
$n['field'] = '<input type="checkbox" id="shownavigation" name="settings[shownavigation]"' . (!empty($Values['shownavigation']) && $Values['shownavigation'] == '1' ? ' checked="checked"' : '') . ' value="1" />';
$formElements[] = $n;

$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/checkbox.php');

// Show navigation tooltip
$formElements = [];
$n = [];
$n['label'] = '<label for="shownavigationtooltip">' . htmlspecialchars_decode($this->i18n('config_shownavigationtooltip')) . '</label>';
$n['field'] = '<input type="checkbox" id="shownavigationtooltip" name="settings[shownavigationtooltip]"' . (!empty($Values['shownavigationtooltip']) && $Values['shownavigationtooltip'] == '1' ? ' checked="checked"' : '') . ' value="1" />';
$formElements[] = $n;

$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/checkbox.php');

// Navigation position
$formElements = [];
$n = [];
$n['label'] = '<label for="navigationposition">' . htmlspecialchars_decode($this->i18n('config_navigationposition')) . '</label>';

$sel_dirs = new rex_select();
$sel_dirs->setId('navigationposition');
$sel_dirs->setName('settings[navigationposition]');
$sel_dirs->setSelected($Values['navigationposition']);
$sel_dirs->setStyle('class="form-control"');

$sel_dirs->addOption('linke Seite', 'left');
$sel_dirs->addOption('rechte Seite', 'right');
$n['field'] = $sel_dirs->get();

$formElements[] = $n;

$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/container.php');

// Show slide arrows
$formElements = [];
$n = [];
$n['label'] = '<label for="showslidearrows">' . htmlspecialchars_decode($this->i18n('config_showslidearrows')) . '</label>';
$n['field'] = '<input type="checkbox" id="showslidearrows" name="settings[showslidearrows]"' . (!empty($Values['showslidearrows']) && $Values['showslidearrows'] == '1' ? ' checked="checked"' : '') . ' value="1" />';
$formElements[] = $n;

$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/checkbox.php');

// Show slide navigation
$formElements = [];
$n = [];
$n['label'] = '<label for="showslidenavigation">' . htmlspecialchars_decode($this->i18n('config_showslidenavigation')) . '</label>';
$n['field'] = '<input type="checkbox" id="showslidenavigation" name="settings[showslidenavigation]"' . (!empty($Values['showslidenavigation']) && $Values['showslidenavigation'] == '1' ? ' checked="checked"' : '') . ' value="1" />';
$formElements[] = $n;

$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/checkbox.php');

// Slide Navigation position
$formElements = [];
$n = [];
$n['label'] = '<label for="slidenavigationposition">' . htmlspecialchars_decode($this->i18n('config_slidenavigationposition')) . '</label>';

$sel_dirs = new rex_select();
$sel_dirs->setId('slidenavigationposition');
$sel_dirs->setName('settings[slidenavigationposition]');
$sel_dirs->setSelected($Values['slidenavigationposition']);
$sel_dirs->setStyle('class="form-control"');

$sel_dirs->addOption('unterhalb des Slides', 'bottom');
$sel_dirs->addOption('oberhalb des Slildes', 'top');
$n['field'] = $sel_dirs->get();

$formElements[] = $n;

$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/container.php');

// Use subcategories for slides
$formElements = [];
$n = [];
$n['label'] = '<label for="usesubcategories">' . htmlspecialchars_decode($this->i18n('config_usesubcategories')) . '</label>';
$n['field'] = '<input type="checkbox" id="usesubcategories" name="settings[usesubcategories]"' . (!empty($Values['usesubcategories']) && $Values['usesubcategories'] == '1' ? ' checked="checked"' : '') . ' value="1" />';
$formElements[] = $n;

$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$content .= $fragment->parse('core/form/checkbox.php');

// Save-Button
$formElements = [];
$n = [];
$n['field'] = '<button class="btn btn-save rex-form-aligned" type="submit" name="save" value="' . $this->i18n('save') . '">' . $this->i18n('save') . '</button>';
$formElements[] = $n;

$fragment = new rex_fragment();
$fragment->setVar('elements', $formElements, false);
$buttons = $fragment->parse('core/form/submit.php');

// Ausgabe Section
$fragment = new rex_fragment();
$fragment->setVar('title', $this->i18n('title_config'), false);
$fragment->setVar('class', 'edit', false);
$fragment->setVar('body', $content, false);
$fragment->setVar('buttons', $buttons, false);
$content = $fragment->parse('core/page/section.php');

$content = '
<form action="' . rex_url::currentBackendPage() . '" method="post">
<input type="hidden" name="func" value="update" />
    ' . $content . '
</form>
';

echo $content;
