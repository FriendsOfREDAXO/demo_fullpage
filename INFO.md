# Themes für das Addon Fullpage-Demo

Das Addon `demo_fullpage` kommt automatisch mit 4 verschiedenen Themes die als Basis für ein eigenes Theme verwendet werden können.

In den Themes sind so gut wie möglich alle Einstellungen und Funktionen umgesetzt und zum größten Teil auch kommentiert. Hier lohnt sich auf jeden Fall ein Blick auf die beiden Dateien **theme.js** und **theme.css** des jeweiligen Themes.

Die beste Basis für ein eigenes Theme ist das Theme **minimal**. Hier sind alle notwendigen CSS und JavaScript-Definitionen für eine minimal gestylte Fullpage-Webseite vorhanden.

Für die Themes wird SCSS unterstützt. Für das Frontend wird auf jeden Fall die **theme.css** in **theme.min.css** compiliert. Egal ob SCSS verwendet wird oder nicht.

Variablen können direkt in der theme.css definiert werden oder mittels import z.B. `@import "theme"` eingefügt werden. Die Datei mit den Variablen muss im Theme-Verzeichnis dann entsprechend als **_theme.scss** abgespeichert werden.

## Einbindung CSS/JavaScript im Frontend

Die notwendigen Stylesheets und Javascripte für eine "Fullpage-Webseite" werden automatisch im Template **11. HTML-Header** und im Template **20. Footer** im Frontend eingebunden.

**Notwendige Stylesheets** (Template 11. HTML-Header)

```
<link rel="stylesheet" href="./assets/addons/demo_fullpage/css/uikit.min.css">
<link rel="stylesheet" href="./assets/addons/demo_fullpage/css/jquery.fullpage.min.css">

<link rel="stylesheet" href="./assets/addons/demo_fullpage/themes/#####/css/theme.min.css">

```

**Notwendige Javascripte** (Template 20. Footer)

```
<script src="./assets/addons/demo_fullpage/js/jquery.min.js"></script>
<script src="./assets/addons/demo_fullpage/js/jquery.fullpage.min.js"></script>
<script src="./assets/addons/demo_fullpage/js/uikit.min.js"></script>
<script src="./assets/addons/demo_fullpage/js/uikit-icons.min.js"></script>

<script src="./assets/addons/demo_fullpage/themes/#####/js/theme.js"></script>

```

## Verzeichnisstruktur assets

Das Addon-Verzeichnis **assets** enthält die CCS und JavaScript-Dateien die bei der Installation/Reinstall automatisch
in das Verzeichnis `assets/addons/demo-fullpage` kopiert werden.

* **css**
	animate.min.css
	font-awesome.min.css
	jquery.fullpage.css
	jquery.fullpage.min.css
	jquery.fullpage.min.css.map
	uikit.css
	uikit.min.css
	uikit-rtl.css
	uikit-rtl.min.css
* **fonts**
	FontAwesome.otf
	...
* **js**
	jquery.fullpage.extensions.min.js
	jquery.fullpage.js
	jquery.fullpage.min.js
	jquery.fullpage.min.js.map
	jquery.min.js
	scrolloverflow.min.js
	uikit.js
	uikit.min.js
	uikit-icons.js
	uikit-icons.min.js
* **themes**
  * **bike** (Theme Bike)
  * **coffee** (Theme Coffee - DEFAULT)
  * **minimal** (Theme Minimal)
  * **road** (Theme Road)

---

## Theme Verzeichnis-Struktur

Die einzelnen Themes haben eine fest vorgegebene Verzeichnis-Struktur.
Absolut notwendig ist die CSS-Datei **theme.css**, optional zusätzliche Dateien.

* **css**
	theme.css
    _theme.scss (optional)
* **img**
	logo.svg
* **js**
	theme.js

## Theme css - Stylesheets

Das Stylesheet **css/theme.css** des Themes wird automatisch im Frontend eingebunden (Template **11. HTML-Header**).
Zusätzliche Stylesheets können über @import eingebunden werden.

z.B.

```
@import url('../../../css/font-awesome.min.css');
```

Für eigene Themes muss ein eigenes Unterverzeichnis im Ordner **themes** angelegt werden.
In der Datei **meintheme/css/theme.css** müssen die ersten 4 Zeilen wie folgt aussehen ...

```
/*
Demonstriert eine Onepage-Website auf Basis von REDAXO 5, UIkit und fullPage.js
Theme Coffee - Einfache Demo, horizontale Navigation
*/
```

Der Text in Zeile 3 wird bei den Addoneinstellungen für die Auswahl des Themes verwendet!

## Theme js - JavaScript

Das Script **js/theme.js** wird automatisch im Frontend eingebunden (Template **20. Footer**).
Für zusätzliche eigene JavaScripte die jQuery-Funktion **getScript** verwenden
z.B.

```javascript
    // Initiate glightbox - https://biati-digital.github.io/glightbox/
    $.getScript('./assets/addons/demo_fullpage/themes/coffee/js/glightbox.min.js', function () {
        const lightbox = GLightbox({
            selector: '.gallery',
            openEffect: 'fade',
            closeEffect: 'fade',
            loop: true
        });
        lightbox.on('open', function () {
            if ($('.hamburger').hasClass('is-active') === true) {
                $('.hamburger').trigger('click');
            }
        });
    });
```

## Theme img - Images

Wenn im Verzeichnis **img** des Themes eine Datei **logo.svg** oder **logo.png** vorhanden ist wird diese automatisch als Logo ausgegeben.
Über die Addon-Einstellungen kann ein eigenes Logo aus dem Medienpool eingestellt werden.

Im Template **11. HTML-Header** sind auch die Favicons **favicon.ico**, **favicon-16x16.png** und **favicon-32x32.png**
bereits als Default eingestellt.

## Sonstige Hinweise

Die einzelnen Sections der Webseite bokommen automatisch die Klasse "section-x" z.B. section-1 für Die Kategorie 1.
Die horizontalen Slides bekommen automatisch die Klasse "slide-x-y" z.B slide-5-9 für die Kategorie 5 und Artikel 9.
Damit können einzelne Sections/Slides per CSS angepasst werden.

Über den URL-Parameter **theme=???** kann das Theme gewechselt werden.
z.B. [http://fullpage.aesoft.de.de/?theme=bike](http://fullpage.aesoft.de/?theme=bike) oder [http://fullpage.aesoft.de/?theme=coffee](http://fullpage.aesoft.de/?theme=coffee)
