# REDAXO Fullpage-Demo - Changelog

## Version 2.1.0 - 19.07.2025

### Features

* Ermöglicht die Nutzung mit PHP 8.3+

## Version 2.0.10 – 10.11.2023

### Features

* Update UIkit 3.17.8
* rexfactor lib/fullpage_theme_compiler.php

### Bugfixes

* Ordner `media` bei Deinstallation leeren

## Version 2.0.9 – 06.06.2023

### Features

* Update UIkit 3.16.19

### Bugfixes

* Dateien im Backup-Order werden nach Deinstallation nicht gelöscht https://github.com/FriendsOfREDAXO/demo_fullpage/issues/32

## Version 2.0.8 – 26.04.2023

### Features

* Update UIkit 3.16.15
* Code-Quality - AddOn-Code Templates + Module überarbeitet mit REDAXO-Coding Standards (2.1.2) + rexstan (1.0.111) + rexfactor (0.1.7)
* added declare(strict_types=1);
* Verzeichnis der Console-Commands umbenannt, console -> command
* PHP-Version in package.yml hinzugefügt '>=7.4, <8.3'
* lang-Datei für perm angepasst
* Lineendings CRLF -> LF
* Update demo_fullpage.sql

### Bugfixes

* demo_fullpage.sql, Artikel waren zusätzulich in Sprache 2 im Dump enthalten #30

## Version 2.0.7 – 09.04.2023

### Features

* Update UIkit 3.16.14
* AddOn-Code, Templates + Module überarbeitet mit REDAXO-Coding Standards (2.1.1) + rexstan (1.0.108)
* Content - Impressum angepasst
* Console-Command demo_fullpage:install, Texte angepasst
* Neuer Console-Command demo_fullpage:dump_tables, Tabellen in backups/demo_fullpage.sql dumpen
* Neuer Console-Command demo_fullpage:dump_files, Medien in backups/demo_fullpage.tar.gz dumpen
* README angepasst
* Update demo_fullpage.sql

### Bugfixes

* keine

## Version 2.0.6 – 31.03.2023

### Features

* Update UIkit 3.16.13
* AddOn-Code, Templates + Module überarbeitet mit REDAXO-Coding Standards (2.1.1) + rexstan
* Content Impressum + Datenschutz hinzugefügt
  * assets/css/styleswitch.css angepasst
  * Links zu Impressum + Datenschutz unten neben dem REX-Dino, Themes angepasst (js)
* Update demo_fullpage.sql

### Bugfixes

* glightbox.min.css upgedated, war im Original-Download fehlerhaft

## Version 2.0.5 – 18.03.2023

### Features

* Update UIkit 3.16.9

### Bugfixes

* **update.php** - `$addon->getPath()` durch `__DIR__` ersetzt da sich beim Update das Addon noch in einem Temp-Ordner befindet
  * dadurch wurden die aktuellen Backups nicht kopiert
  * package.setup.yml wurde nicht korrekt in die package.yml übernommen
* Update template `10. PHP Header` rex_url bei file_exist ersetzt durch rex_path, Logo wurde nicht angezeigt

## Version 2.0.4 – 17.03.2023

### Features

* Update UIkit 3.16.7
* Bei Update aus dem Installer die Demo-Backups in den Ordner des Backup-AddOns für Setup kopieren
* AddOn-Code, Templates + Module überarbeitet mit REDAXO-Coding Standards + rexstan
* Tooltip-Titel für horizontale Slides (Navi-Dots)
  * Bei der Einstellung **Tooltip für Seiten-Navigation (dots) anzeigen** jetzt auch Tooltips für die horizontalen Navi-Dots
* Update demo_fullpage.sql

## Version 2.0.3 – 08.03.2023

### Features

* Update UIkit 3.16.4
* AddOn-Code, Templates + Module überarbeitet mit REDAXO-Coding Standards + rexstan
* Consent bei den Video-Buttons (Sonstige Beispiele) basierend auf consent_manager 5.x, PHP+JavaScript angepasst
* Update demo_fullpage.sql
* removed .php-cs-fixer.dist.php

## Version 2.0.2 – 22.01.2023

### Features

* Update UIkit 3.15.22
* Update jQuery Version 3.6.3
* Removed SourceMapping-Urls jquery.fullpage.min.css + jquery.fullpage.min.js
* added .php-cs-fixer.dist.php, AddOn-Code, Templates + Module überarbeitet mit Coding Standards
* Code-Quality Level 9 (rexstan) Extensions: REDAXO SuperGlobals, Bleeding-Edge, Strict-Mode, Deprecation Warnings, PHPUnit, phpstan-dba, report mixed, dead code
  * AddOn-Code überarbeitet
  * Templates + Module überarbeitet
* Testseite mit allen Modulen im Content hinzugefügt
* Consent bei den Video-Buttons (Sonstige Beispiele) basierend auf consent_manager 4.1.x

### Bugfixes

* Aufgrund der Code-Quality-Anpassungen haben sich Fehler in der Version 2.0.1 (hauptsächlich Modul-Inputs) eingeschlichen. Diese sind jetzt korrigiert.

## Version 2.0.1 – 20.12.2022

### Features

* Update UIkit 3.15.19
* Update jQuery Version 3.6.2
* removed pages/themes.php und pages/changelog.php, MD-Dateien werden jetzt direkt über die package.yml eingebunden
* Code-Quality (rexstan) Extensions: REDAXO SuperGlobals, Bleeding-Edge, Strict-Mode, Deprecation Warnings, phpstan-dba, code complexity, dead code
  * Addon-Code überarbeitet
  * Templates + Module überarbeitet

### Bugfixes

* keine

## Version 2.0.0 – 07.08.2022

### Breaking changes

* CSS-Framework bootstrap wurde durch UIkit ersetzt
* Themes, Templates, Module, Medien und Inhalte geändert

### Features

* Dieses Demo-Addon verwendet auschließlich Core-Features von REDAXO
* keine Abhängigkeit zu anderen Addons
* Die Fullpage-Demo wurde komplett inhaltlich und technisch überarbeitet
* Templates, Module und Inhalte angepasst
* Mehr Inhaltsmodule, Markdown wird bei Textfeldern unterstützt
* Unterstützung für Hintergrundvideos
* Themes überarbeitet, SCSS-Variablen
* SCSS für Themes möglich
* Eigene Themes im project-Addon möglich (Verzeichnis `fpthemes` im project-Addon)
* Installation analog der anderen REDAXO-Demos
* Console-Command 'demo_fullpage:install': rex_command_demo_fullpage_install
* Verwendung der neuen Mediatypen, die mit REDAXO 5.13 eingeführt wurden (z. B. `rex_media_medium`)
* jQuery Version 3.6.0
* fullpage.js Version 2.9.7
* UIkit 3.14.3
* FontAwesome 5.15.4
* GLightbox 3.2.0

### Bugfixes

* keine

## Version 1.1.0beta – 11.11.2017

Komplett überarbeitete Version der fullpage-Demo.

Installation der Demo-Datenbank per Button Dank @schuer
