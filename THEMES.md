# Themes für das Addon Fullpage-Demo

Das Addon `demo_fullpage` kommt automatisch mit vier verschiedenen Themes die als Basis für ein eigenes Theme verwendet werden können.

In den Themes sind so gut wie möglich alle Einstellungen und Funktionen umgesetzt und zum größten Teil auch kommentiert. Hier lohnt sich auf jeden Fall ein Blick auf die Dateien **theme.js**, **theme.css** und **_theme.scss** des jeweiligen Themes.

Für die Themes wird SCSS unterstützt. Für das Frontend wird auf jeden Fall die **theme.css** in **theme.min.css** compiliert. Egal ob SCSS verwendet wird oder nicht.

Variablen können direkt in der theme.css definiert werden oder mittels import z.B. `@import "theme"` eingefügt werden. Die Datei mit den Variablen muss im Theme-Verzeichnis dann entsprechend als **_theme.scss** abgespeichert werden.

Bei allen Themes ist die Verwendung von Hintergrundbildern und Hintergrundvideos für Slides bereits integriert.

> **Hinweis:**
Alle .css-Dateien im Theme-Verzeichnis werden minimiert in [filename].min.css!

Die beste Basis für ein eigenes Theme ist das Theme **minimal**. Hier sind alle notwendigen Standard CSS und JavaScript-Definitionen für eine minimal gestylte Fullpage-Webseite vorhanden.

## Mitgelieferte Themes

### Theme Coffee

![Screenshot Theme coffee](https://raw.githubusercontent.com/FriendsOfREDAXO/demo_fullpage/assets/theme_coffee.png "Screenshot Theme coffee")

**Eigenschaften Theme "coffee"**

- horizontale Naviation
- Fixed-Background-Images (CSS3 muss deaktiviert sein, css3: false)
- Hintergrundbilder fest im CSS definiert
- GLightbox für Bilder, Videos, interner Content, externer Content
- Glightbox mit Zoom-Effekt
- Continuous Scrolling bei horizontalen Slides
- Logo/Hamburger blendet im Responsive-Mode beim scrollen aus/ein
- fixe horizontale Arrows bei horizontalen Slides
- horizontale Dot-Navigation im Responsive-Modus immer oben

### Theme Bike

![Screenshot Theme bike](https://raw.githubusercontent.com/FriendsOfREDAXO/demo_fullpage/assets/theme_bike.png "Screenshot Theme bike")

**Eigenschaften Theme "bike"**

- horizontale Navitaion
- Easing-Effekt beim scrollen (nur im Fullpage-Modus ohne Scrollbar)
- Hintergrundbilder fest im CSS definiert
- Wechsel hell/dunkel der Hintergrundbilder und Content (odd/even)
- GLightbox für Bilder, Videos, interner Content, externer Content
- Glightbox mit Fade-Effekt
- Continuous Scrolling bei horizontalen Slides
- Logo/Hamburger fix im Responsive-Mode
- fixe horizontale Arrows bei horizontalen Slides
- horizontale Dot-Navigation im Responsive-Modus immer oben

### Theme Road

![Screenshot Theme road](https://raw.githubusercontent.com/FriendsOfREDAXO/demo_fullpage/assets/theme_road.png "Screenshot Theme road")

**Eigenschaften Theme "road"**

- vertikale Navigation
- Hintergrundbilder fest im CSS definiert
- Blurry Backgrounds
- GLightbox für Bilder, Videos, interner Content, externer Content
- Glightbox mit Zoom-Effekt
- Continuous Scrolling vertikal
- Continuous Scrolling bei horizontalen Slides
- Logo/Hamburger fix im Responsive-Mode
- fixe horizontale Arrows bei horizontalen Slides
- horizontale Dot-Navigation im Responsive-Modus immer oben

### Theme Minimal

![Screenshot Theme minimal](https://raw.githubusercontent.com/FriendsOfREDAXO/demo_fullpage/assets/theme_minimal.png "Screenshot Theme minimal")

**Eigenschaften Theme "minimal"**

- keine Hintergrundbilder im CSS definiert
- minimale CSS und JavaScript-Definitonen
- Standard-CSS fullPage.js
- Standard-CSS uikit
- kein Lightbox-Script vorbereitet

## Einbindung CSS/JavaScript im Frontend

Die notwendigen Stylesheets und Javascripte für eine "Fullpage-Webseite" werden automatisch im Template **11. HTML-Header** und im Template **20. Footer** im Frontend eingebunden.

**Notwendige Stylesheets** (Template 11. HTML-Header)

```
<link rel="stylesheet" href="./assets/addons/demo_fullpage/css/uikit.min.css">
<link rel="stylesheet" href="./assets/addons/demo_fullpage/css/jquery.fullpage.min.css">

<link rel="stylesheet" href="./assets/addons/demo_fullpage/themes/[themename]/css/theme.min.css">
```

**Notwendige Javascripte** (Template 20. Footer)

```
<script src="./assets/addons/demo_fullpage/js/jquery.min.js"></script>
<script src="./assets/addons/demo_fullpage/js/jquery.fullpage.min.js"></script>
<script src="./assets/addons/demo_fullpage/js/uikit.min.js"></script>
<script src="./assets/addons/demo_fullpage/js/uikit-icons.min.js"></script>

<script src="./assets/addons/demo_fullpage/themes/[themename]/js/theme.js"></script>
```

## Verzeichnisstruktur assets

Das Addon-Verzeichnis **assets** enthält die CCS und JavaScript-Dateien die bei der Installation/Reinstall automatisch
in das Verzeichnis `assets/addons/demo_fullpage` kopiert werden.

- **css**
- **img**
- **js**
- **themes**
  - **bike** (Theme Bike)
  - **coffee** (Theme Coffee - DEFAULT)
  - **minimal** (Theme Minimal)
  - **road** (Theme Road)
- **webfonts**

## Theme Verzeichnis-Struktur

Die einzelnen Themes haben eine fest vorgegebene Verzeichnis-Struktur.
Absolut notwendig ist die CSS-Datei **theme.css**, optional sind zusätzliche Dateien.

- **css**
  - theme.css
  - _theme.scss (optional)
- **img**
  - logo.svg
- **js**
  - theme.js

## Theme css - Stylesheets

Das Stylesheet **css/thememin..css** des Themes wird automatisch im Frontend eingebunden (Template **11. HTML-Header**).
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
