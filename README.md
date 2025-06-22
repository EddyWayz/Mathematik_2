# Lernskript Mathematik 2

Dieses Repository enthält ein webbasiertes Lernskript. Die Kapitel liegen im Ordner `chapters/` und werden über `index.html` aufgerufen.

## Struktur
* `index.html` – Startseite mit Inhaltsverzeichnis
* `chapters/` – einzelne Kapitel
* `style.css` – gemeinsames Layout
* `main.js` – Skript für Dark Mode, Navigation und Zurück-zum-Anfang
* `images/` – Platzhaltergrafiken
* `scripts/update-head.js` – kleines Buildskript
* `templates/head-fragment.html` – gemeinsamer HTML-Head

## Buildskript
Mit `node scripts/update-head.js` wird der gemeinsame Teil des `<head>`-Bereichs aller Kapitel anhand von `templates/head-fragment.html` aktualisiert.

## Verwendung
`index.html` im Browser öffnen. Auf der Startseite wird automatisch das aktuelle Datum angezeigt. In jedem Kapitel gibt es Vor/Zurück-Navigation und einen Button nach oben. Ein Klick auf das Mondsymbol aktiviert den Dark Mode.
