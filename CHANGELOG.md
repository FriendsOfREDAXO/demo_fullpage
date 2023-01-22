# REDAXO Fullpage-Demo - Changelog

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
