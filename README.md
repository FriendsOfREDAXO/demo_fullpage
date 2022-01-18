# Fullpage-Demo für REDAXO 5

Die Fullpage-Demo für REDAXO demonstriert eine sogenannte "Onepage-Website".

Alle Inhalte werden auf einer Seite in "Fullpage-Blöcken" dargestellt und beim scrollen wird direkt zum nächsten "Block" gescrolled. Diese Technik ist eher für Webseiten mit "weniger" Inhalten geeignet.

Die Inhalte werden aus den Kategorien zu den einzelnen "Blöcken" der Website zusammengesetzt. Die Navigation wird automatisch generiert.

Eine Online-Demo der Fullpage-Demo gibt es hier: [https://rex5demo.aesoft.de/](https://rex5demo.aesoft.de/)

![Screenshot](https://raw.githubusercontent.com/FriendsOfREDAXO/demo_fullpage/assets/demo_fullpage.png)

Die Fullpage-Demo für REDAXO ist völlig frei verwendbar, sowohl für private als auch für kommerzielle Projekte!

Die Demo vermeidet ganz bewusst Abhängigkeiten von weiteren Addons und ist so einfach wie möglich gehalten.

## Verwendete Software

* REDAXO - [https://redaxo.org/](https://redaxo.org/)
* jQuery - [https://jquery.com/](https://jquery.com/)
* fullPage.js - [https://alvarotrigo.com/fullPage/](https://alvarotrigo.com/fullPage/)
* bootstrap - [http://getbootstrap.com/](http://getbootstrap.com/)
* Font Awesome - [http://fontawesome.io/](http://fontawesome.io/)
* glightbox - [https://biati-digital.github.io/glightbox/](https://biati-digital.github.io/glightbox/)
* hamburgers - [https://jonsuh.com/hamburgers/](https://jonsuh.com/hamburgers/)
* animate css - [https://daneden.github.io/animate.css/](https://daneden.github.io/animate.css/)

## Hinweise für Entwickler

Informationen zur Erstellung von eigenen Themes gibt es [hier](https://github.com/FriendsOfREDAXO/demo_fullpage/blob/master/INFO.md)

Bei einem Update von Inhalten (Templates, Module, Artikel und Medienpool) müssen die Beispiel-Exporte neu erstellt werden!

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
* [GLightbox](https://biati-digital.github.io/glightbox/) – GLightbox Webseite
* Andreas Eberhard, [http://aesoft.de](http://aesoft.de)
* Jan Kristinus, Thomas Blum, Gregor Harlan, Peter Bickel, Dirk Schürjohann, FriendsOfREDAXO
