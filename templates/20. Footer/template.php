<!-- Fullpage-Options -->
<script>
var fps_options = {
<?php
$opts = array();
if (rex_addon::get('demo_fullpage')->getConfig('showscrollbar')) {
    $opts[] = 'scrollBar: true';
}
$opts[] = 'scrollingSpeed: ' . rex_addon::get('demo_fullpage')->getConfig('scrollingspeed');
if (rex_addon::get('demo_fullpage')->getConfig('autoscrolling')) {
    $opts[] = 'autoScrolling: true';
    $opts[] = 'fitToSection: true';
}
if (rex_addon::get('demo_fullpage')->getConfig('shownavigation')) {
    $opts[] = 'navigation: true';
    $opts[] = 'navigationPosition: \'' . rex_addon::get('demo_fullpage')->getConfig('navigationposition') . '\'';
}
if (rex_addon::get('demo_fullpage')->getConfig('showslidearrows')) {
    $opts[] = 'controlArrows: true';
}
if (rex_addon::get('demo_fullpage')->getConfig('showslidenavigation')) {
    $opts[] = 'slidesNavigation: true';
    $opts[] = 'slidesNavPosition: \'' . rex_addon::get('demo_fullpage')->getConfig('slidenavigationposition') . '\'';
}
echo implode(",\n", $opts) . "\n";
?>
};
</script>

<!-- Javascripts -->
<script src="<?php echo rex_url::base('assets/addons/demo_fullpage/js/jquery.min.js') ?>"></script>
<script src="<?php echo rex_url::base('assets/addons/demo_fullpage/js/fullPage.min.js') ?>"></script>
<script src="<?php echo rex_url::base('assets/addons/demo_fullpage/js/bootstrap.min.js') ?>"></script>

<script src="<?php echo rex_url::base('assets/addons/demo_fullpage/themes/' . $fullpagedemo['theme'] . '/js/theme.js') ?>"></script>

<div style="display:none;">REDAXO 5 really rocks!</div>
<div class="for" title="FriendsOfREDAXO - TREX - Gojira"><a href="https://friendsofredaxo.github.io/" class="newwindow"></a></div>

<ul class="styleswitch" title="Theme Switch">
<li><a class="coffee" href="<?php echo rex::getServer(); ?>?theme=coffee" title="Theme coffee"></a></li>
<li><a class="bike" href="<?php echo rex::getServer(); ?>?theme=bike" title="Theme bike"></a></li>
<li><a class="road" href="<?php echo rex::getServer(); ?>?theme=road" title="Theme road"></a></li>
<li><a class="minimal" href="<?php echo rex::getServer(); ?>?theme=minimal" title="Theme minimal"></a></li>
</ul>

</body>
</html>