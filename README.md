# Lernskript Mathematik 2

Dieses Repository enthält ein webbasiertes Lernskript. Die Kapitel liegen im Ordner `chapters/` und werden über `index.html` aufgerufen.

## Struktur

- `index.html` – Startseite mit Inhaltsverzeichnis
- `chapters/` – einzelne Kapitel
- `style.css (Grundlayout, importiert Dark-Mode)` – gemeinsames Layout
- `main.js` – Einstiegspunkt, lädt die Module für Dark Mode, Navigation usw.
- `modules/` – aufgeteilte JavaScript-Module
- `css/` – ausgelagerte Styles wie der Dark Mode
- `images/` – Platzhaltergrafiken
- `scripts/` – Hilfsskripte für den Build-Prozess
  - `update-head.js` – Kopfbereiche vereinheitlichen
  - `generate-toc.js` – Inhaltsverzeichnis erzeugen
  - `build.js` – führt alle Schritte aus
- `templates/head-fragment.html` – gemeinsamer HTML-Head

## Buildskript

Das Repository enthält ein Build-Skript, das die Kopfbereiche vereinheitlicht
und das Inhaltsverzeichnis generiert. Führe es bequem über `npm run build` aus.

### Voraussetzungen

- [Node.js](https://nodejs.org) ab Version 14

### Ablauf

1. Repository klonen
2. `npm install` (einmalig)
3. `npm run build` ausführen
4. `index.html` im Browser öffnen

Optional kannst du mit `npm run check-pdfs` prüfen, ob alle PDF-Dateien aus dem
Ordner `material/` korrekt verlinkt sind.

### Automatische Überwachung

Mit `npm run watch` startest du einen einfachen Watcher, der Änderungen an den
Kapiteln erkennt und automatisch `npm run build` ausführt.

### Offline-Nutzung

Beim ersten Laden wird ein Service Worker installiert, der die wichtigsten
Dateien im Browser-Cache speichert. Danach kannst du das Lernskript auch ohne
Internetverbindung aufrufen.

## Verwendung

`index.html` im Browser öffnen. Auf der Startseite wird automatisch das aktuelle Datum angezeigt. Ein Suchfeld über dem Inhaltsverzeichnis filtert die Kapitel nach Stichworten. Beim Scrollen zeigt eine kleine Fortschrittsleiste am oberen Rand, wie weit du im Dokument bist. In jedem Kapitel gibt es Vor/Zurück-Navigation und einen Button nach oben. Ein Klick auf das Mondsymbol aktiviert den Dark Mode.

## Mitmachen

Neue Kapitel liegen im Ordner `chapters/`. Einen kurzen Leitfaden findest du in `chapters/README.md`. Pull Requests mit Verbesserungen oder zusätzlichen Aufgaben sind willkommen. Nach Änderungen sollte `npm run build` ausgeführt werden, damit Kopf und Inhaltsverzeichnis aktuell bleiben.

## Lizenz

Dieses Projekt steht unter der [MIT-Lizenz](LICENSE).

## Automatisierte Tests

Über GitHub Actions werden bei jeder Änderung `npm run build` und
`npm run check-pdfs` ausgeführt.
