# Lernskript Mathematik 2

Dieses Repository enthält ein webbasiertes Lernskript. Die Kapitel liegen im Ordner `chapters/` und werden über `index.html` aufgerufen.

## Struktur
* `index.html` – Startseite mit Inhaltsverzeichnis
* `chapters/` – einzelne Kapitel
* `style.css (Grundlayout, importiert Dark-Mode)` – gemeinsames Layout
* `main.js` – Einstiegspunkt, lädt die Module für Dark Mode, Navigation usw.
* `modules/` – aufgeteilte JavaScript-Module
* `css/` – ausgelagerte Styles wie der Dark Mode
* `images/` – Platzhaltergrafiken
* `scripts/` – Hilfsskripte für den Build-Prozess
  * `update-head.js` – Kopfbereiche vereinheitlichen
  * `generate-toc.js` – Inhaltsverzeichnis erzeugen
  * `build.js` – führt alle Schritte aus
* `templates/head-fragment.html` – gemeinsamer HTML-Head

## Buildskript
Der Befehl `node scripts/build.js` aktualisiert alle Seiten. Dabei werden
der gemeinsame `<head>`-Abschnitt eingefügt und das Inhaltsverzeichnis der
Startseite automatisch aus den vorhandenen Kapiteln erzeugt.

### Voraussetzungen
* [Node.js](https://nodejs.org) ab Version 14

### Ablauf
1. Repository klonen
2. `node scripts/build.js` ausführen
3. `index.html` im Browser öffnen

## Verwendung

`index.html` im Browser öffnen. Auf der Startseite wird automatisch das aktuelle Datum angezeigt. In jedem Kapitel gibt es Vor/Zurück-Navigation und einen Button nach oben. Ein Klick auf das Mondsymbol aktiviert den Dark Mode.

## Mitmachen
Neue Kapitel liegen im Ordner `chapters/`. Pull Requests mit Verbesserungen oder zusätzlichen Aufgaben sind willkommen. Nach Änderungen sollte `node scripts/build.js` ausgeführt werden, damit Kopf und Inhaltsverzeichnis aktuell bleiben.
