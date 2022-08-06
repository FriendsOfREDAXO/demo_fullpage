# Fullpage-Demo für REDAXO 5

Die Fullpage-Demo für REDAXO demonstriert eine sogenannte **Onepage-Website** oder auch **Onepager** mit **fullPage.js**.

Alle Inhalte werden auf *einer* Webseite in *Fullpage-Slides* dargestellt und beim scrollen wird direkt zum nächsten *Slide* gescrollt.

Die Inhalte werden aus den Artikeln der Kategorien zu den einzelnen *Slides* der Website zusammengesetzt. Die Navigation wird automatisch generiert.

Diese Demo inklusive der Themes kann als Basis für eigene Projekte vewendet werden.

![Screenshot](https://raw.githubusercontent.com/FriendsOfREDAXO/demo_fullpage/assets/demo_fullpage.png "Screenshots")

<p align="center">
	<a href="https://fullpage.aesoft.de"><img src="https://img.shields.io/badge/Live-Demo-brightgreen.svg?style=for-the-badge" alt=""></a>&nbsp;
	<a href="https://github.com/FriendsOfREDAXO/demo_fullpage/releases"><img src="https://img.shields.io/github/release/FriendsOfREDAXO/demo_fullpage.svg?style=for-the-badge" alt=""></a>&nbsp;
	<a href="https://github.com/FriendsOfREDAXO/demo_fullpage/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg?longCache=true&style=for-the-badge" alt=""></a>&nbsp;
</p>

> **Hinweis:** Eine Online-Demo mit den verschiedenen Themes der Fullpage-Demo gibt es hier: [https://fullpage.aesoft.de/](https://fullpage.aesoft.de/)

Die Fullpage-Demo für REDAXO ist völlig frei verwendbar, sowohl für private als auch für kommerzielle Projekte!

Die Demo vermeidet ganz bewusst Abhängigkeiten zu weiteren Addons und ist so einfach wie möglich gehalten.
Da es in REDAXO viele unterschiedliche Wege und Vorlieben gibt um Webseiten zu erstellen kann einfach und nach belieben der gewünschte Editor, Addons usw. nachgerüstet, oder die Module und Templates entsprechend erweitert bzw. angepasst werden.

> **Hinweis:** Dieses Demo-Addon verwendet auschließlich Core-Features von REDAXO.

Die Fullpage-Demo bringt vier verschiedene Themes und einige Basis-Module für die Inhalte mit. Für jedes Theme gibt es auch Beispiele und vorbelegte CSS-Definitionen für das verwendete CSS-Framework **UIkit**. Die Themes können durch eine scss-Datei "leicht" abgeändert werden.
Weitere Informationen zu den **Themes** gibt es [hier](https://github.com/FriendsOfREDAXO/demo_fullpage/blob/master/THEMES.md).

Die mitgelieferten Themes, Templates, Module und Inhalte dienen nur als Beispiel!

## Addon-Einstellungen

![Screenshot](https://raw.githubusercontent.com/FriendsOfREDAXO/demo_fullpage/assets/demo_fullpage_options.png "Screenshot Addon-Einstellungen")

### Übersicht der Addon-Einstellungen

| **Einstellung** | **Beschreibung / Mögliche Werte**  |
| --- | --- |
| **Theme** | Hier kann ein vorhandenes Theme für die Webseite ausgewählt werden.<br>Die Themes sind im Verzeichnis `demo_fullpage/assets/themes/` zu finden.<br>Es ist auch möglich eigene Themes im project-Addon im Verzeichnis `project/fpthemes/` abzulegen.<br>Beim speichern der Einstellungen werden die CSS-Dateien des ausgewählten Themes mit dem SCSS-Compiler compiliert und die CSS-Dateien des Themes in das asset-Verzeichnis für das Frontend kopiert. |
| **Logo** | Logo für die Webseite.<br>Ist hier kein Logo ausgewählt wird ein evtl. vorhandenes Logo aus dem Theme verwendet.<br>(*themename/img/logo.svg* oder *themename/img/logo.png*)  |
| **Automatisch zur nächsten 'Seite' scrollen (Fullpage-Modus)** | Diese Einstellung aktiviert den fullPage-Modus.<br>Beim scrollen wird automatisch zum nächsten Slide gescrollt.<br>Inhalte die höher als der Viewport der Webseite sind werden abgeschnitten!|
| **Scrollbar im Fullpage-Modus anzeigen** | Standardmäßig wird im fullPage-Modus der Scrollbar ausgeblendet.<br>Über diese Einstellung kann der Scrollbar auch im fullPage-Modus angezeigt werden. |
| **Responsive Breite** | Ab einer Viewport-Breite *unter* diesem Wert wird in den Responsive-Mode gewechselt. (Default 1200) |
| **Responsive Höhe** | Ab einer Viewport-Höhe *unter* diesem Wert wird in den Responsive-Mode gewechselt. (Default 750) |
| **Scrolling-Speed in ms** | Geschwindigkeit in Millisekunden für den Scroll-Effekt bei Seitenübergängen. Hier sollte kein Wert unter 200 angegeben werden. (Default 800) |
| **Seiten-Navigation (dots) anzeigen** | Seiten-Navigation in Form von *Dots* anzeigen |
| **Tooltip für Seiten-Navigation (dots) anzeigen** | Hier kann eingestellt werden ob Tooltips für die Seiten-Navigation anzeigt werden. |
| **Position der Seiten-Navigation (dots)** | Die Seiten-Navigation kann links oder rechts von den Inhalten angezeigt werden. (Default rechts) |
| **Pfeile für horizontale Slides anzeigen** | Sind horizontale Slides vorhanden kann hier die Anzeige von Navigationselementen (Pfeile links/rechts) eingestellt werden. |
| **Slide-Navigation (dots) für horizontale Slides anzeigen** | Die Slide-Navigation (dots) für horizontale Slides kann über diese Einstellung eingeblendet werden. |
| **Position der Slide-Navigation (dots)** | Position der Slide-Navigation für horizontale Slides (oben/unten, Default unten) |
| **Unterkategorien als Slides verwenden** | Wenn aktiviert werden auch die Seiten der Unterkategorien als horizontele Slides ausgegeben.<br>Reihenfolge: zuerst alle Artikel der Kategorie, dann alle Artikel der Unterkategorien. |

Für eine optimale Darstellung der Webeite sollten die Inhalte der einzelnen Slides in etwa die gleiche Größe/Höhe haben.
Auch die Inhalte von horizontalen Slides sollten nach Möglichkeit die gleiche Größe/Höhe haben.

> **Hinweis:** Im Fullpage-Modus werden Inhalte die höher als der Viewport sind abgeschnitten!

## Kategorie und Artikel-Einstellungen

![Screenshot](https://raw.githubusercontent.com/FriendsOfREDAXO/demo_fullpage/assets/demo_fullpage_categorymeta.png "Screenshot Kategorie-Einstellungen")

Über die Metadaten der Kategorien können die folgenden Werte eingestellt werden ...

### Einstellungen für Kategorien

| **Einstellung** | **Beschreibung / Mögliche Werte**  |
| --- | --- |
| **Hintergrundfarbe** | Hier kann eine Hintergrundfarbe für den Slide ausgewählt werden.<br>z.B. `#fc0` oder `rgba(60, 60, 60, .5)`<br>Bei vorhandenen horizontalen Slides wird die ausgewählte Hintergrundfarbe für alle horizontalen Slides verwendet. |
| **Hintergrundbild** | Hier kann ein Hintergrundbild aus dem Medienpool für den Slide ausgewählt werden.<br>Bei vorhandenen horizontalen Slides wird das ausgewählte Hintergrundbild für alle horizontalen Slides verwendet. |
| **Hintergrundvideo** | Hier kann ein Hintergrundvideo aus dem Medienpool für den Slide ausgewählt werden.<br>Hintergrundvideos werden automatisch, ohne Ton und in Endlosschleife abgespielt. Beim verlassen des Slides wird das Video gestoppt, beim anzeigen des Slides wieder automatisch gestartet.<br>Bei vorhandenen horizontalen Slides wird das ausgewählte Hintergrundvideo für alle horizontale Slides verwendet.|
| **Höhe automatisch an den Inhalt anpassen** | Inhalte dieser Kategorie werden automatisch an die Höhe der Inhalte angepasst. (wird bei vorhandenen horizontalen Slides ignoriert) |
| **In der Haupt-Navigation ausblenden** | In der Hauptnavigation kann die Kategorie ausgeblendet werden. (CSS-Klasse hide-mainnav !) |

> **Hinweis:** Die Einstellungen der Kategorie werden automatisch auch auf alle horizontalen Slides angewendet. Für horizontale Slides können in den Artikel-Meta-Daten die Einstellungen zusätzlich geändert/überschrieben werden.

### Einstellungen für Artikel

Über die Metadaten der Artikel können die folgenden Werte eingestellt werden ...

| **Einstellung** | **Beschreibung / Mögliche Werte**  |
| --- | --- |
| **Hintergrundfarbe** | Hier kann eine Hintergrundfarbe für den Slide ausgewählt werden.<br>z.B. `#fc0` oder `rgba(60, 60, 60, .5)` |
| **Hintergrundbild** | Hier kann ein Hintergrundbild aus dem Medienpool für den Slide ausgewählt werden. |
| **Hintergrundvideo** | Hier kann ein Hintergrundvideo aus dem Medienpool für den Slide ausgewählt werden.<br>Hintergrundvideos werden automatisch, ohne Ton und in Endlosschleife abgespielt. Beim verlassen des Slides wird das Video gestoppt, beim anzeigen des Slides wieder automatisch gestartet. |

## Verwendete Software

* REDAXO - [https://redaxo.org/](https://redaxo.org/)
* jQuery - [https://jquery.com/](https://jquery.com/)
* fullPage.js - [https://alvarotrigo.com/fullPage/](https://alvarotrigo.com/fullPage/)
* UIkit - [http://getuikit.com/](http://getuikit.com/)
* Font Awesome 5 - [https://fontawesome.com/v5/docs](https://fontawesome.com/v5/docs)
* GLightbox - [https://biati-digital.github.io/glightbox/](https://biati-digital.github.io/glightbox/)
* plyr - [https://plyr.io/](https://plyr.io/)
* hamburgers - [https://jonsuh.com/hamburgers/](https://jonsuh.com/hamburgers/)

> **Hinweis:** Das Addon verwendet die letzte frei verfügbare Version des fullPage-Scripts. Ab Version 3 ist das Script kostenpflichtig.
[https://github.com/alvarotrigo/fullPage.js/releases/tag/2.9.7](https://github.com/alvarotrigo/fullPage.js/releases/tag/2.9.7)

## Hinweise für Entwickler

Die Fullpage-Demo wird von Zeit zu Zeit erweitert und Fehler werden korrigiert. Über Hinweise per [github-Issue](https://github.com/FriendsOfREDAXO/demo_fullpage/issues) sind wir dankbar!

Informationen zur Erstellung von eigenen **Themes** gibt es [hier](https://github.com/FriendsOfREDAXO/demo_fullpage/blob/master/THEMES.md).

> **Hinweis:** Bei einem Update von Inhalten (Templates, Module, Artikel und Medienpool) für eine neue Addon-Version müssen die Beispiel-Exporte neu erstellt werden!

**Dabei ist folgendes zu beachten!**

Die Beispiel-Exporte müssen im Verzeichnis **backups** des Addons unter folgenden Namen abgelegt werden.
Dateinamen: **demo_fullpage.sql** und **demo_fullpage.tar.gz**

**Datenbank-Backup:** (nur folgende Tabellen exportieren!)

* rex_article
* rex_article_slice
* rex_media
* rex_media_category
* rex_metainfo_field
* rex_metainfo_type
* rex_module
* rex_template

**Datei-Backup:** (nur folgende Ordner exportieren!)

* media

## Installation

1. Das AddOn-Verzeichnis muss den Namen `demo_fullpage` haben;<br>nach dem Auspacken in das AddOn-Verzeichnis kopieren: `redaxo/src/addons/`.
2. Das AddOn installieren.
3. Auf der Seite "Fullpage-Demo" auf den Button "Demo installieren" klicken.

## Autor & Credits

### Autor: Friends Of REDAXO

* [FriendsOfREDAXO](https://github.com/FriendsOfREDAXO)

### Projekt-Lead

* [@aberhard](https://github.com/aeberhard), [Andreas Eberhard / aesoft.de](http://aesoft.de)

### Credits

* [REDAXO](https://redaxo.org), Einfach - Flexibel - Sinnvoll
* [Friends Of REDAXO](https://github.com/FriendsOfREDAXO) – Gemeinsame REDAXO-Entwicklung!
* [fullPage.js](https://alvarotrigo.com/fullPage/) – fullPage Webseite
* [UIkit](http://getuikit.com/)- UIkit Webseite
* [GLightbox](https://biati-digital.github.io/glightbox/) - GLightbox Webseite
* [plyr](https://plyr.io/) - plyr Webseite
* Andreas Eberhard, [http://aesoft.de](http://aesoft.de)
* Jan Kristinus, Thomas Blum, Gregor Harlan, Peter Bickel, Dirk Schürjohann, FriendsOfREDAXO
