# Leitfaden für neue Kapitel

Die HTML-Dateien in diesem Ordner stellen die einzelnen Lerneinheiten dar. Um ein neues Kapitel hinzuzufügen, kannst du dich an folgendem Grundgerüst orientieren:

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Kurze Beschreibung des Kapitels">
    <title>NUMMER Titel - Lernskript Mathe</title>
</head>
<body>
    <header class="page-header" role="banner">
        <a href="../index.html">Inhaltsverzeichnis</a>
        <span>Kapitel NUMMER: Titel</span>
        <div class="header-controls">
            <button id="dark-mode-toggle" aria-label="Dunkelmodus umschalten">🌙</button>
        </div>
    </header>

    <main class="content-wrapper">
        <h2 id="secNUM">NUMMER Titel</h2>
        <!-- Inhalt -->
    </main>
</body>
</html>
```

* Nutze `<h3>`, `<h4>` usw. für Unterüberschriften.
* Für Hinweise oder Definitionen kannst du `div`-Elemente mit den Klassen `info-box`, `tip` oder `warning` verwenden.
* Ergänze bei Bedarf ein Vor- und Zurück-Menü am Ende des Kapitels:

```html
<footer>
    <nav class="page-nav">
        <a href="vorgaenger.html">&laquo; Zurück</a>
        <a href="naechstes.html">Weiter &raquo;</a>
    </nav>
</footer>
```

Nach dem Hinzufügen eines neuen Kapitels sollte `npm run build` ausgeführt werden, damit Kopfbereich und Inhaltsverzeichnis aktualisiert werden.
