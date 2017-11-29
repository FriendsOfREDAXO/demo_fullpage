REX_TEMPLATE[2]
REX_TEMPLATE[3]
<?php
$_mainnav = '';
$_content = '';

$rootCategories = rex_category::getRootCategories(true);

if (!empty($rootCategories)) {

    $_navtooltip = rex_addon::get('demo_fullpage')->getConfig('shownavigationtooltip');
    $_use_subcats = rex_addon::get('demo_fullpage')->getConfig('usesubcategories');

    $_mainnav = '	<nav>' . "\n";
    $_mainnav .= '	<button class="hamburger" type="button"><span class="hamburger-box"><span class="hamburger-inner"></span></span></button>' . "\n";
    $_mainnav .= '	<ul class="mainnav">' . "\n";
    $_content = '';
    $even = true;

    foreach ($rootCategories as $cat) {
        if ($cat->isOnline(true)) {
            $href = rex_string::normalize(htmlspecialchars($cat->getName()));
            $name = htmlspecialchars($cat->getName());

            // Main navigation
            if ($cat->getValue('cat_nomenu') <> '|true|') {
                $_mainnav .= '		<li data-menuanchor="' . $href . '" class="mainnaventry-' . $cat->getId() . '"><a href="#' . $href . '">' . $name . '</a></li>' . "\n";
            }

            // Section tooltip
            if ($_navtooltip) {
                $tooltip = ' data-tooltip="' . $name . '"';
            } else {
                $tooltip = '';
            }

            // Section background-color and background-image
            $_style = array();
            if ($cat->getValue('cat_bgcolor')) {
                $_style['bgcolor'] = 'background-color:' . $cat->getValue('cat_bgcolor') . ';';
            }
            if ($cat->getValue('cat_bgimage')) {
                $_style['bgimage'] = 'background-image:url(' . rex_url::media($cat->getValue('cat_bgimage')) . ');';
            }
            $style = ' style="' . implode(' ', $_style) . '"';
            if ($style == ' style=""') $style = '';

            // Section class, autoheight ?
            $_class = array();
            $_class[] = 'section';
            $_class[] = 'section-' . $cat->getId();
            $_class[] = ($even == true) ? 'section-even' : 'section-odd';
            if ($cat->getValue('cat_autoheight') == '|true|') {
                $_class[] = 'fp-auto-height';
            }
            $class = implode(' ', $_class);

            // Section
            $_content .= '	<section class="' . $class . '" id="section' . $cat->getId() . '" data-anchor="' . $href . '"' . $tooltip . $style . '>' . "\n";

            $_slides = array();
            $_pagecontent = '';

            if (!empty($_articles = $cat->getArticles(true))) {
                foreach ($_articles as $_art) {
                    $_slides[] = $_art->getId();
                }
            }
            if ($_use_subcats) {
                if (!empty($_categories = $cat->getChildren(true))) {
                    foreach ($_categories as $_cat) {
                        $_slides[] =  $_cat->getId();
                    }
                }
            }

            if (count($_slides) == 1) {
                foreach ($_slides as $_artid) {
                    $_art = new rex_article_content($_artid);
                    $_pagecontent .= '		<div class="container clearfix">' . "\n";
                    $_pagecontent .= $_art->getArticle();
                    $_pagecontent .= '		</div>' . "\n";
                }
            }

            if (count($_slides) > 1) {
                foreach ($_slides as $_artid) {
                    $_art = new rex_article_content($_artid);
                    $href = rex_string::normalize(htmlspecialchars($_art->getValue('name')));
                    $_style = array();
                    if ($_art->getValue('art_bgcolor')) {
                        $_style['bgcolor'] = 'background-color:' . $_art->getValue('art_bgcolor') . ';';
                    }
                    if ($_art->getValue('art_bgimage')) {
                        $_style['bgimage'] = 'background-image:url(' . rex_url::media($_art->getValue('art_bgimage')) . ');';
                    }
                    $style = ' style="' . implode(' ', $_style) . '"';
                    $_pagecontent .= '		<div class="slide slide-' . $cat->getId() . '-' . $_art->getValue('id') . '" id="slide' . $_art->getValue('id') . '" data-anchor="' . $href . '"' . $style . '>' . "\n";
                    $_pagecontent .= '		<div class="container clearfix">' . "\n";
                    $_pagecontent .= $_art->getArticle();
                    $_pagecontent .= '		</div>' . "\n";
                    $_pagecontent .= '		</div>' . "\n";
                }
            }

            $_content .= $_pagecontent;

            $_content .= '	</section>' . "\n\n";
            $even = !$even;
        }
    }

    $_mainnav .= '	</ul>' . "\n";
    $_mainnav .= '	</nav>' . "\n";

}
?>

<div class="pagewrapper">

    <div class="pagelogo"><img src="<?php echo $fullpagedemo['logo']; ?>" alt="<?php echo $fullpagedemo['logotitle']; ?>" title="<?php echo $fullpagedemo['logotitle']; ?>"></div>

<?php echo $_mainnav; ?>

    <div class="fullpage">

<?php echo $_content; ?>
    </div>

</div>

REX_TEMPLATE[4]