# Fullpage-Demo für REDAXO 5

Die Fullpage-Demo für REDAXO demonstriert eine sogenannte **Onepage-Website** oder auch **Onepager**.

Alle Inhalte werden auf *einer* Webseite in *Fullpage-Slides* dargestellt und beim scrollen wird direkt zum nächsten *Slide* gescrollt.

Die Inhalte werden aus den Artikeln der Kategorien zu den einzelnen *Slides* der Website zusammengesetzt. Die Navigation wird automatisch generiert.

![Screenshot](https://raw.githubusercontent.com/FriendsOfREDAXO/demo_fullpage/assets/demo_fullpage.png)

<p align="center">
	<a href="https://fullpage.aesoft.de"><img src="https://img.shields.io/badge/Live-Demo-brightgreen.svg?style=for-the-badge" alt=""></a>&nbsp;
	<a href="https://github.com/FriendsOfREDAXO/demo_fullpage/releases"><img src="https://img.shields.io/github/release/FriendsOfREDAXO/demo_fullpage.svg?style=for-the-badge" alt=""></a>&nbsp;
	<a href="https://github.com/FriendsOfREDAXO/demo_fullpage/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-green.svg?longCache=true&style=for-the-badge" alt=""></a>&nbsp;
</p>

> **Hinweis:**
Eine Online-Demo der Fullpage-Demo gibt es hier: [https://fullpage.aesoft.de/](https://fullpage.aesoft.de/)

Die Fullpage-Demo für REDAXO ist völlig frei verwendbar, sowohl für private als auch für kommerzielle Projekte!

Die Demo vermeidet ganz bewusst Abhängigkeiten von weiteren Addons und ist so einfach wie möglich gehalten.
Da es in REDAXO viele unterschiedliche Wege und Vorlieben gibt um Webseiten zu erstellen kann einfach und nach belieben der gewünschte Editor, Addons usw. nachgerüstet, oder die Module und Templates entsprechend erweitert bzw. angepasst werden.

Die Fullpage-Demo bringt 4 verschiedene Themes und einige Basis-Module für die Inhalte mit. Für jedes Theme gibt es auch Beispiele und vorbelegte CSS-Definitionen für UIkit. Die Themes können durch eine scss-Datei leicht abgeändert werden.
Weitere Informationen zu den Themes gibt es [hier](https://github.com/FriendsOfREDAXO/demo_fullpage/blob/master/INFO.md).

Die mitgelieferten Themes, Templates, Module und Inhalte dienen nur als Beispiel.

## Einstellungen

![Screenshot](https://raw.githubusercontent.com/FriendsOfREDAXO/demo_fullpage/assets/demo_fullpage_options.png)

### Übersicht der Einstellungen

| Option | Beschreibung / Mögliche Werte  |
| --- | --- |
| **Theme** | Hier kann ein vorhandenes Theme für die Webseite ausgewählt werden. |
| **Logo** | Logo für die Webseite.<br>Ist hier kein Logo ausgewählt wird ein evtl. vorhandenes Logo aus dem Theme verwendet (*themename/img/logo.svg* oder *themename/img/logo.png*)  |
| **Scrollbar im Fullpage-Modus anzeigen** | Standardmäßig wird im fullPage-Modus der Scrollbar ausgeblendet.<br>Über diese Einstellung kann der Scrollbar auch im fullPage-Modus angezeigt werden. |
| **Responsive Breite** | Ab einer Viewport-Breite unter diesem Wert wird in den Responsive-Mode gewechselt. (Default 1200) |
| **Responsive Höhe** | Ab einer Viewport-Höhe unter diesem Wert wird in den Responsive-Mode gewechselt. (Default 750) |
| **Scrolling-Speed in ms** | Geschwindigkeit in Millisekunden für den Scroll-Effekt bei Seitenübergängen. Hier sollte kein Wert unter 200 angegeben werden. (Default 800) |
| **Automatisch zur nächsten 'Seite' scrollen** | Diese Einstellung aktiviert den fullPage-Modus.<br>Beim scrollen wird automatisch zum nächsten Slide gescrollt.<br>Inhalte die höher als der Viewport der Webseite sind werden abgeschnitten!|
| **Seiten-Navigation (dots) anzeigen** | Seitennavigation in Form von *Dots* anzeigen |
| **Tooltip für Seiten-Navigation (dots) anzeigen** | Hier kann eingestellt werden ob Tooltips für die Seitennavigation anzeigt werden. |
| **Position der Seiten-Navigation (dots)** | Die Seitennavigation kann links/oder rechts von den Inhalten angezeigt werden. (Default rechts) |
| **Pfeile für horizontale Slides anzeigen** | Sind horizontale Slides vorhanden kann hier die Anzeige von Navigationselementen (links/rechts) eingestellt werden. |
| **Slide-Navigation (dots) für horizontale Slides anzeigen** | Die Slide-Navigation (dots) für horizontale Slides kann hier eingeblendet werden. |
| **Position der Slide-Navigation (dots)** | Position der Slide-Navigation für horizontale Slides (oben/unten, Default unten) |
| **Unterkategorien als Slides verwenden** | Wenn aktiviert werden auch die Seiten der Unterkategorien als horizontele Slides ausgegeben.<br>Reihenfolge: zuerst alle Artikel der Kategorie, dann alle Artikel der Unterkategorien. |

Für eine optimale Darstellung der Webeite sollten die Inhalte der einzelnen Slides in etwa die gleiche Größe haben.
Auch die Inhalte von horizontalen Slides sollten nach Möglichkeit die gleiche Größe/Höhe haben.

> **Hinweis:**
Im Fullpage-Modus werden Inhalte die höher als der Viewport sind abgeschnitten!

## Kategorie/Artikel-Einstellungen

![Screenshot](https://raw.githubusercontent.com/FriendsOfREDAXO/demo_fullpage/assets/demo_fullpage_categorymeta.png)

Über die Metadaten der Kategorien können die folgenden Werte eingestellt werden ...

### Einstellungen für Kategorien

| Parameter | Beschreibung / Mögliche Werte  |
| --- | --- |
| **Hintergrundfarbe** | Hier kann eine Hintergrundfarbe für den Slide ausgewählt werden.<br>z.B. `#fc0` oder `rgba(60, 60, 60, .5)` |
| **Hintergrundbild** | Hier kann aus dem Medienpool ein Hintergrundbild für den Slide ausgewählt werden. |
| **Hintergrundvideo** | Hier kann aus dem Medienpool ein Hintergrundvideo für den Slide ausgewählt werden.<br>Hintergrundvideos werden automatisch, ohne Ton und in Endlosschleife abgespielt. Beim verlassen des Slides wird das Video gestoppt, beim anzeigen des Slides wieder automatisch gestartet. |
| **Höhe automatisch an den Inhalt anpassen** | Inhalte dieser Kategorie werden automatisch an die Höhe der Inhalte angepasst. (wird bei vorhandenen horizontalen Slides ignoriert) |
| **In der Haupt-Navigation ausblenden** | In der Hauptnavigation kann die Kategorie ausgeblendet werden. |

> **Hinweis:**
Die Einstellungen der Kategorie werden automatisch auch auf alle horizontalen Slides angewendet. Für horizontale Slides können in den Artikel-Meta-Daten die Einstellungen zusätzlich geändert werden.

### Einstellungen für Artikel

Über die Metadaten der Artikel können die folgenden Werte eingestellt werden ...

| Parameter | Beschreibung / Mögliche Werte  |
| --- | --- |
| **Hintergrundfarbe** | Hier kann eine Hintergrundfarbe für Slide den ausgewählt werden.<br>z.B. #fc0 oder rgba(60, 60, 60, .5) |
| **Hintergrundbild** | Hier kann aus dem Medienpool ein Hintergrundbild für den Slide ausgewählt werden. |
| **Hintergrundvideo** | Hier kann aus dem Medienpool ein Hintergrundvideo für den Slide ausgewählt werden.<br>Hintergrundvideos werden automatisch, ohne Ton und in Endlosschleife abgespielt. Beim verlassen des Slides wird das Video gestoppt, beim anzeigen des Slides wieder automatisch gestartet. |

## Verwendete Software

* REDAXO - [https://redaxo.org/](https://redaxo.org/)
* jQuery - [https://jquery.com/](https://jquery.com/)
* fullPage.js - [https://alvarotrigo.com/fullPage/](https://alvarotrigo.com/fullPage/)
* UIkit - [http://getuikit.com/](http://getuikit.com/)
* Font Awesome - [http://fontawesome.io/](http://fontawesome.io/)
* GLightbox - [https://biati-digital.github.io/glightbox/](https://biati-digital.github.io/glightbox/)
* hamburgers - [https://jonsuh.com/hamburgers/](https://jonsuh.com/hamburgers/)

> **Hinweis:**
Das Addon verwendet die letzte frei verfügbare Version des fullPage-Scripts. Ab Version 3 ist das Script kostenpflichtig.
[https://github.com/alvarotrigo/fullPage.js/releases/tag/2.9.7](https://github.com/alvarotrigo/fullPage.js/releases/tag/2.9.7)

## Hinweise für Entwickler

Informationen zur Erstellung von eigenen **Themes** gibt es [hier](https://github.com/FriendsOfREDAXO/demo_fullpage/blob/master/INFO.md).

> **Hinweis:**
Bei einem Update von Inhalten (Templates, Module, Artikel und Medienpool) für eine neue Addon-Version müssen die Beispiel-Exporte neu erstellt werden!

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

---

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
* Andreas Eberhard, [http://aesoft.de](http://aesoft.de)
* Jan Kristinus, Thomas Blum, Gregor Harlan, Peter Bickel, Dirk Schürjohann, FriendsOfREDAXO
