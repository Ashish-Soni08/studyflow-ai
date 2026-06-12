const assets = {
  calendar: "assets/materials/mq3zhq9n-clipboard.png",
  slide: "assets/materials/mq3zhqat-clipboard.png",
  notes: "assets/materials/mq3zhqbu-clipboard.png",
  evidence: "assets/materials/mq3zhqdk-clipboard.png",
  recent: [
    "assets/materials/mq3zhqe0-clipboard.png",
    "assets/materials/mq3zhqe3-clipboard.png",
    "assets/materials/mq3zhqea-clipboard.png",
    "assets/materials/mq3zhqeg-clipboard.png"
  ]
};

const routes = ["overview", "uploads", "canvas", "calendar", "learning-plan", "gaps", "flashcards", "quiz", "reminders"];
const app = document.querySelector("#app");
const navList = document.querySelector("#navList");
const toast = document.querySelector("#toast");

const pageHead = (title, subtitle, actions = "") => `
  <header class="page-head">
    <div><h1>${title}</h1><p>${subtitle}</p></div>
    <div class="head-actions">${actions}</div>
  </header>`;

const panel = (title, body, extra = "", className = "") => `
  <section class="panel ${className}">
    <div class="panel-head"><h2>${title}</h2>${extra || '<span class="more">...</span>'}</div>
    ${body}
  </section>`;

function overviewPage() {
  const agenda = [
    ["09:00", "Mehrsprachigkeitsdidaktik", "Seminar im Hörsaal 3 · Sprachbewusstsein & Transferstrategien", "book-open", "green"],
    ["11:30", "Englischdidaktik", "Übung · Classroom Interaction & Feedback", "globe", "blue"],
    ["13:00", "Mittagspause", "Zeit für gutes Essen und einen kurzen Spaziergang am Rhein", "fork-knife", "rose"],
    ["15:00", "Lernblock Bildungspsychologie", "Kapitel 4: Motivation & Selbstregulation · Karteikarten erstellen", "brain", "aubergine"],
    ["17:30", "Familie & Freunde", "Abendessen bei Mama & Papa", "users-three", "gold"]
  ].map(([time, title, sub, icon, tone]) => `
    <button class="day-entry ${tone}" data-route="${time === "15:00" ? "canvas" : "calendar"}">
      <time>${time}</time>
      <span class="day-icon"><i class="ph ph-${icon}"></i></span>
      <span><strong>${title}</strong><small>${sub}</small></span>
      <i class="ph ph-caret-right entry-arrow"></i>
    </button>`).join("");

  return `
    <div class="josephine-home">
      <section class="josephine-hero">
        <img src="assets/hero/josephine-mainz-morning.png" alt="Josephine lernt an einem sonnigen Morgen in Mainz, umgeben von Erinnerungen an Familie, Freunde und ihr Lieblingspferd.">
        <div class="weather-line">Dienstag, 7. Juni <span>·</span> Mainz <span>·</span> 18° <i class="ph ph-sun"></i></div>
        <div class="hero-copy">
          <h1>Josephine<br>Wendland</h1>
          <p class="hero-motto">Lehren. Verstehen. Verbinden.</p>
          <h2>Guten Morgen, Josephine</h2>
          <p>Heute ist ein guter Tag, etwas zu lernen,<br>zu wachsen und Menschen zu inspirieren.</p>
        </div>
      </section>

      <section class="daily-journal">
        <div class="journal-agenda">
          <header><i class="ph ph-calendar-blank"></i><h2>Mein Tag</h2><span>7. Juni</span></header>
          <div class="day-list">${agenda}</div>
        </div>
        <aside class="today-important">
          <header><i class="ph ph-star"></i><h2>Heute wichtig</h2></header>
          <button class="important-row deadline" data-route="calendar">
            <span class="important-icon"><i class="ph ph-calendar-dots"></i></span>
            <span><small>Deadline</small><strong>Reflexionsbericht Mehrsprachigkeit</strong><em>Abgabe: Freitag, 10. Juni</em></span>
            <i class="ph ph-caret-right"></i>
          </button>
          <button class="important-row gap" data-route="gaps">
            <span class="important-icon"><i class="ph ph-target"></i></span>
            <span><small>Wissenslücke</small><strong>Selbstwirksamkeit verstehen</strong><em>Wiederholen · Karte 24–27</em></span>
            <i class="ph ph-caret-right"></i>
          </button>
          <button class="important-row next" data-route="canvas">
            <span class="important-icon"><i class="ph ph-book-open"></i></span>
            <span><small>Nächster Schritt</small><strong>Lernen fortsetzen</strong><em>Bildungspsychologie · Kapitel 4</em></span>
            <i class="ph ph-caret-right"></i>
          </button>
          <p class="journal-note">Kleine Schritte jeden Tag<br>führen zu großen Veränderungen.</p>
        </aside>
      </section>
    </div>`;
}

function uploadsPage() {
  const extracted = `Sprachbewusstheit fördern (VL 07)

Begriff: Fähigkeit, Sprache(n) als System(e) wahrzunehmen und über Sprache(n) nachzudenken.

Ziele:
- Sensibilisierung für sprachliche Strukturen und Variation
- Vergleich von Sprachen als Ressourcen nutzen
- Transferstrategien entwickeln

Vergleich DE - FR
DE: Ich gehe in die Schule.
FR: Je vais à l'école.

Gemeinsamkeiten: Subjekt - Verb - Objekt
Unterschiede: Artikel, Präpositionen, Akkordanz

Didaktische Prinzipien:
1) Sprachenvergleich
2) Bewusstmachung
3) Funktionaler Einsatz im Fachunterricht`;

  return pageHead("Materialien", "Notizen, Folien und Kalender an einem ruhigen Ort.", `
    <button class="button secondary" id="addFiles">Dateien hinzufügen</button>
    <button class="button primary" data-route="canvas">In Arbeitsfläche öffnen</button>
  `) + `
  <div class="uploads-grid">
    ${panel("Upload-Queue (3)", `<div class="queue-list">
      <div class="queue-item selected"><div class="queue-title"><strong>Mehrsprachigkeitsdidaktik_VL07.pdf</strong><span class="badge green">100%</span></div><div class="progress"><span style="width:100%"></span></div><small>OCR abgeschlossen · 32 Seiten</small></div>
      <div class="queue-item"><div class="queue-title"><strong>Englischdidaktik_Orthografie.pdf</strong><span class="badge blue">76%</span></div><div class="progress"><span style="width:76%;background:var(--blue)"></span></div><small>OCR läuft · Seite 3 von 11</small></div>
      <div class="queue-item"><div class="queue-title"><strong>Bildungspsychologie_Notizen.jpg</strong><span class="badge">0%</span></div><div class="progress"><span style="width:0%"></span></div><small>Wartet in der Queue</small></div>
      <div class="dropzone" id="dropzone"><strong>Dateien hier ablegen</strong><br><small>PDF, JPG oder PNG · Verarbeitung bleibt lokal</small></div>
    </div>`, '<span class="badge green">Lokal</span>', "upload-queue")}
    ${panel("Mehrsprachigkeitsdidaktik_VL07.pdf", `<div class="doc-review">
      <div class="doc-pane"><div class="doc-toolbar"><button class="icon-button">‹</button><span>4 / 32</span><button class="icon-button">›</button><span>100%</span><button class="icon-button">↗</button></div><div class="document-page"><img src="${assets.slide}" alt="Vorlesungsfolie zu Scaffolding im mehrsprachigen Unterricht"></div></div>
      <div class="note-pane"><img src="${assets.notes}" alt="Handschriftliche Notizen zu Scaffolding im mehrsprachigen Unterricht"></div>
    </div>`, '<span class="badge blue">Seite 4 verknüpft</span>')}
    ${panel("OCR-Extraktion", `<div class="panel-body ocr-panel">
      <div class="language-tabs"><button class="badge green">Deutsch 99%</button><button class="badge blue">Französisch 82%</button><button class="badge">Englisch 12%</button></div>
      <div class="confidence">Konfidenz der Seite: <strong>93%</strong> · 7 Markierungen prüfen</div>
      <label class="field"><span class="label">Extrahierter Text</span><textarea id="ocrText">${extracted}</textarea></label>
      <div class="row" style="justify-content:space-between"><span class="badge amber">Niedrige Konfidenz: Akkordanz</span><button class="button secondary" id="reviewAll">Alle prüfen</button></div>
      <div class="ocr-actions"><button class="button secondary">Verwerfen</button><button class="button primary" id="saveOcr">Übernehmen &amp; speichern</button></div>
      <div class="trust-inline">Speichern in: Mehrsprachigkeitsdidaktik · nur lokal</div>
    </div>`, '<span class="badge green">Abgeschlossen</span>')}
  </div>`;
}

function canvasPage() {
  const thumbs = [assets.recent[0], assets.recent[1], assets.slide, assets.recent[2], assets.recent[3]]
    .map((src, i) => `<button class="slide-thumb ${i === 2 ? "active" : ""}" data-slide="${i}"><img src="${src}" alt="Materialvorschau ${i + 1}"></button>`).join("");
  return `<div class="canvas-page">
    <header class="canvas-head">
      <h1>Smart Study Canvas <span>Mehrsprachigkeitsdidaktik / Woche 7</span></h1>
      <div class="head-actions"><button class="button secondary">Verknüpfungen</button><button class="button secondary">Notiz hinzufügen</button><button class="button secondary">Exportieren</button></div>
    </header>
    <div class="canvas-grid">
      ${panel("Vorlesungsfolien", `<div class="slide-workspace"><div class="slide-thumbs">${thumbs}</div><div class="slide-main"><img id="mainSlide" src="${assets.slide}" alt="Vorlesungsfolie Scaffolding"></div></div>`)}
      ${panel("Handschriftliche Notizen", `<div class="notes-main"><img src="${assets.notes}" alt="Maya Hoffmanns handschriftliche Scaffolding-Notizen"></div>`, '<span class="badge blue">4 semantische Links</span>')}
      ${panel("AI-Copilot", `<div class="chat"><div class="messages" id="messages">
        <div class="message user">Wie hängen Translanguaging und Scaffolding zusammen?</div>
        <div class="message ai"><strong>Maya</strong><br>Scaffolding schafft temporäre sprachliche und kognitive Stützen. Translanguaging erlaubt Lernenden, ihr gesamtes sprachliches Repertoire für Bedeutungsbildung zu nutzen. Zusammen fördern sie fachliche Teilhabe, ohne die Zielsprache auszublenden.<div class="language-tabs"><span class="badge green">Folie 14</span><span class="badge blue">Notiz S. 1</span></div></div>
        <div class="alert-card"><strong>Fehlendes Konzept erkannt: Interlanguage</strong>Die Unterscheidung zur Interlanguage fehlt in deinen verknüpften Notizen.<div class="language-tabs"><button class="badge">Konzept erklären</button><button class="badge">Quelle suchen</button><button class="badge">Karte erstellen</button></div></div>
      </div><form class="chat-compose" id="chatForm"><input id="chatInput" placeholder="Stelle eine Frage zu deinen Materialien..." required><button class="button primary" aria-label="Senden">➤</button></form></div>`, '<span class="badge green">Lokal · Quellengebunden</span>')}
    </div>
  </div>`;
}

function calendarPage() {
  const cells = Array.from({length: 35}, () => "<div></div>").join("");
  const roadmapRows = [
    ["Mehrsprachigkeitsdidaktik","on,on,on,,blue,blue,,"],
    ["Englischdidaktik","blue,blue,,on,on,,,"],
    ["Französischdidaktik",",amber,amber,,on,on,,"],
    ["Bildungspsychologie","on,,blue,blue,,on,on,on"]
  ].map(([name, states]) => `<b>${name}</b>${states.split(",").map(s => `<span class="${s}"></span>`).join("")}`).join("");
  return pageHead("Kalender & Lernplan", "Geprüfte Termine, realistische Lernblöcke und dein 8-Tage-Fokus.", `
    <button class="button secondary" id="reviewExtractions">Extraktionen prüfen · 3</button>
    <button class="button primary" id="planBlock">Lernblock planen</button>
  `) + `
  <div class="calendar-grid">
    ${panel("Wochenplan · 7.-11. Juni", `<div class="week-grid">
      <div></div>${["Di 7.","Mi 8.","Do 9.","Fr 10.","Sa 11."].map(d=>`<div class="day">${d}</div>`).join("")}
      ${["09:00","10:00","11:00","12:00","13:00","14:00","15:00"].map(t=>`<div class="time">${t}</div>`).join("")}${cells}
      <div class="event" style="grid-column:2;grid-row:2/4"><strong>09:00</strong><br>Mehrsprachigkeitsdidaktik<br>Seminar</div>
      <div class="event amber" style="grid-column:3;grid-row:3/5"><strong>10:00</strong><br>Hausarbeit<br>Quellenarbeit</div>
      <div class="event blue" style="grid-column:4;grid-row:4/6"><strong>11:00</strong><br>Französischdidaktik<br>Séance 5</div>
      <div class="event" style="grid-column:5;grid-row:2/5"><strong>09:00</strong><br>Fachdidaktik Deutsch<br>Portfolio</div>
      <div class="event blue" style="grid-column:6;grid-row:3/5"><strong>10:00</strong><br>Lerngruppe<br>Bibliothek</div>
    </div><div class="roadmap"><h3>8-Tage-Prüfungsroadmap</h3><div class="roadmap-grid"><b></b>${["Di 7","Mi 8","Do 9","Fr 10","Sa 11","So 12","Mo 13","Di 14"].map(d=>`<b>${d}</b>`).join("")}${roadmapRows}</div><p class="muted" style="font-size:10px">Fokus: Hausarbeit abschließen → Französischdidaktik wiederholen → Prüfungssimulation</p></div>`, '<span class="badge green">72% geplant</span>', "week-calendar")}
    <div class="stack">
      ${panel("Heute · 5 Std. 30 Min.", `<div class="panel-body"><div class="today-block"><strong>09:00-10:30 · Seminarfolien</strong><small>Translanguaging und Scaffolding verknüpfen</small></div><div class="today-block"><strong>11:30-13:00 · Reading response</strong><small>Englischdidaktik · Kapitel 4</small></div><div class="today-block"><strong>15:00-16:30 · Retrieval Practice</strong><small>Bildungspsychologie · Lernkarten 31-54</small></div></div>`, '<span class="badge green">Im Plan</span>')}
      ${panel("Geprüfte Extraktionen", `<div class="panel-body"><div class="extraction-row"><span>10. Juni</span><strong>Hausarbeit abgeben</strong><span class="badge amber">Bestätigt</span></div><div class="extraction-row"><span>14. Juni</span><strong>Französischdidaktik Prüfung</strong><span class="badge blue">Kalender</span></div><div class="extraction-row"><span>19. Juni</span><strong>Portfolio Deutsch</strong><span class="badge green">Bestätigt</span></div><img class="calendar-asset" src="${assets.calendar}" alt="Handschriftlicher Kalender Juni 2025"></div>`, '<span class="badge">3 aus PDF</span>')}
    </div>
  </div>`;
}

function flashcardsPage() {
  const decks = [
    ["Mehrsprachigkeitsdidaktik",48,"18 fällig · zuletzt heute",72],
    ["Englischdidaktik",36,"Nächste Wiederholung morgen",58],
    ["Französischdidaktik",42,"Nächste Wiederholung morgen",44],
    ["Bildungspsychologie",61,"Nächste Wiederholung morgen",81],
    ["Fachdidaktik Deutsch",27,"Nächste Wiederholung morgen",36]
  ].map(([name,count,sub,pct],i)=>`<div class="deck-row ${i===0?"selected":""}" data-deck="${name}"><strong>${name} · ${count} Karten</strong><small>${sub}</small><div class="progress"><span style="width:${pct}%"></span></div></div>`).join("");
  return pageHead("Karteikarten", "Quellengebundene Karten bearbeiten, lernen und exportieren.", `
    <button class="button secondary" id="generateCards">Aus Quellen generieren</button>
    <button class="button primary" id="learnCards">12 Karten lernen</button>
  `) + `
  <div class="cards-grid">
    ${panel("Meine Decks", `<div>${decks}</div>`)}
    ${panel("Karte bearbeiten · 12 von 48", `<div class="panel-body">
      <div class="field question"><label for="cardQuestion">Frage</label><textarea id="cardQuestion">Wie unterscheidet sich Translanguaging vom klassischen Code-Switching?</textarea></div>
      <div class="field answer"><label for="cardAnswer">Antwort</label><textarea id="cardAnswer">Translanguaging beschreibt die flexible Nutzung des gesamten sprachlichen Repertoires zur Bedeutungsbildung. Code-Switching bezeichnet dagegen meist den situativen Wechsel zwischen getrennt gedachten Sprachen.</textarea></div>
      <div class="field"><label>Quellen</label><div class="source-box">▣ Mehrsprachigkeitsdidaktik_Woche_7.pdf · Folie 14<br>▤ Notizen_Scaffolding_03-06.jpg · Seite 1</div><div class="evidence-strip"><img src="${assets.evidence}" alt="Quellenausschnitt aus einer Notiz"><img src="${assets.notes}" alt="Handschriftliche Evidenz zu Scaffolding"></div></div>
      <div class="language-tabs"><span class="badge green">Translanguaging</span><span class="badge blue">Code-Switching</span><span class="badge">Woche 7</span></div>
      <div class="row" style="justify-content:space-between"><button class="button danger" id="deleteCard">Karte löschen</button><button class="button primary" id="saveCard">Änderungen speichern</button></div>
    </div>`)}
    ${panel("Vorschau & Export", `<div class="panel-body stack"><div class="card-preview" id="cardPreview"><div class="front"><small>Vorderseite</small><strong>Wie unterscheidet sich Translanguaging vom klassischen Code-Switching?</strong><span class="muted">Klicken zum Umdrehen</span></div><div class="back"><small>Rückseite</small><p>Translanguaging nutzt das gesamte sprachliche Repertoire flexibel. Code-Switching beschreibt den situativen Wechsel zwischen getrennt gedachten Sprachen.</p></div></div><div class="divider"></div><h3 style="font-family:var(--serif);margin:2px 0">Deck exportieren</h3><span class="muted" style="font-size:11px">48 Karten · Quellen enthalten · DE</span><div class="export-list"><button class="button" data-export="Anki">Anki (.apkg)</button><button class="button" data-export="CSV">CSV</button><button class="button" data-export="PDF">PDF zum Drucken</button></div><small class="muted">Letzte Generierung: heute, 10:42 · vollständig lokal</small></div>`)}
  </div>`;
}

function quizPage() {
  return pageHead("Quizmodus", "Prüfungssimulation · Mehrsprachigkeitsdidaktik", `<button class="button secondary" id="endQuiz">Simulation beenden</button>`) + `
  <div class="quiz-grid">
    ${panel("Frage 7 von 12", `<div class="quiz-content">
      <div class="quiz-meta"><span class="muted">Fortschritt · <span id="quizProgressText">58%</span></span><span class="badge amber">Schwierigkeit: Anspruchsvoll</span></div>
      <div class="progress"><span id="quizProgress" style="width:58%"></span></div>
      <h2 class="quiz-question">Welche Aussage beschreibt den didaktischen Nutzen von Translanguaging am präzisesten?</h2>
      <div class="answers" id="answers">
        <button class="answer-option" data-answer="A"><span class="answer-letter">A</span><span>Es verhindert den Wechsel zwischen Unterrichtssprachen vollständig.</span></button>
        <button class="answer-option" data-answer="B"><span class="answer-letter">B</span><span><strong>Es aktiviert das gesamte sprachliche Repertoire zur Bedeutungsbildung und fachlichen Teilhabe.</strong></span></button>
        <button class="answer-option" data-answer="C"><span class="answer-letter">C</span><span>Es ersetzt fachsprachliche Lernziele durch alltagssprachliche Kommunikation.</span></button>
        <button class="answer-option" data-answer="D"><span class="answer-letter">D</span><span>Es ist ausschließlich für den Fremdsprachenunterricht geeignet.</span></button>
      </div>
      <div class="explanation" id="quizExplanation" hidden><h3 id="answerState">Richtig beantwortet</h3><p>Translanguaging nutzt vorhandene sprachliche Ressourcen gezielt als Brücke zum fachlichen Verstehen. Die Zielsprache bleibt wichtig, wird aber nicht als isoliertes System behandelt.</p><div class="source-citation">Quelle: Mehrsprachigkeitsdidaktik_Woche_7.pdf · Folie 14<br>„Dynamische Nutzung des gesamten sprachlichen Repertoires zur Bedeutungskonstruktion.“</div><div class="row" style="justify-content:space-between;margin-top:14px"><small class="muted" id="chosenAnswer"></small><button class="button primary" id="nextQuestion">Nächste Frage →</button></div></div>
    </div>`, '<span class="more">...</span>', "quiz-card")}
    <div class="stack">
      ${panel("Simulationsstatus", `<div class="panel-body"><div class="stats-grid"><div class="stat"><strong id="correctCount">5</strong><small>richtig</small></div><div class="stat"><strong id="wrongCount">1</strong><small>falsch</small></div><div class="stat"><strong id="hitRate">82%</strong><small>Trefferquote</small></div><div class="stat"><strong id="timer">06:42</strong><small>verbleibend</small></div></div></div>`)}
      ${panel("Schwierigkeit", `<div class="panel-body"><div class="difficulty"><button data-level="Adaptiv">Adaptiv</button><button data-level="Mittel">Mittel</button><button class="active" data-level="Anspruchsvoll">Anspruchsvoll</button></div><p class="muted" style="font-size:11px">Die nächsten Fragen gewichten deine Wissenslücken stärker.</p></div>`)}
      ${panel("Prüfungsfokus", `<div class="panel-body"><div class="focus-list"><div><span class="badge red">Lücke</span> Interlanguage</div><div><span class="badge amber">Prüfen</span> Scaffolding</div><div><span class="badge green">Sicher</span> Translanguaging</div></div><div class="divider" style="margin:14px 0"></div><small class="muted">12 Fragen · 15 Minuten<br>Nur aus 3 ausgewählten lokalen Quellen</small></div>`)}
    </div>
  </div>`;
}

function learningPlanPage() {
  return pageHead("Mein Lernplan", "Ein realistischer Plan, der zu Josephines Woche passt.", `
    <button class="button secondary" data-route="calendar">Kalender ansehen</button>
    <button class="button primary" data-route="canvas">Lernblock starten</button>
  `) + `
  <div class="quiet-page">
    <section class="plan-intro">
      <span class="eyebrow">Prüfung in 8 Tagen</span>
      <h2>Diese Woche zählt Beständigkeit,<br>nicht Perfektion.</h2>
      <p>StudyFlow verbindet deine Termine, Materialien und offenen Themen zu kleinen, machbaren Schritten.</p>
    </section>
    <div class="plan-days">
      <button data-route="canvas"><time>Heute</time><strong>Grundlagen wiederholen</strong><span>Mehrsprachigkeitsdidaktik · 75 Min.</span></button>
      <button data-route="flashcards"><time>Morgen</time><strong>Scaffolding vertiefen</strong><span>Folien, Notizen und 12 Karten · 60 Min.</span></button>
      <button data-route="quiz"><time>Donnerstag</time><strong>Formative Bewertung üben</strong><span>Quiz und Reflexion · 45 Min.</span></button>
      <button data-route="gaps"><time>Freitag</time><strong>Wissenslücken schließen</strong><span>Selbstwirksamkeit und Interlanguage · 60 Min.</span></button>
    </div>
  </div>`;
}

function gapsPage() {
  return pageHead("Wissenslücken", "Was noch unsicher ist, wird hier verständlich und machbar.", `
    <button class="button primary" data-route="quiz">Kurzes Quiz starten</button>
  `) + `
  <div class="quiet-page two-column">
    <section class="focus-story">
      <span class="eyebrow">Heute empfohlen</span>
      <h2>Selbstwirksamkeit verstehen</h2>
      <p>In deinen Notizen fehlt noch die Verbindung zwischen Selbstwirksamkeit, Motivation und Lernerfolg.</p>
      <button class="button primary" data-route="canvas">Mit Quellen erklären</button>
    </section>
    <section class="calm-list">
      <button data-route="canvas"><span class="signal red"></span><span><strong>Interlanguage</strong><small>Nur indirekt in drei Quellen erklärt</small></span><em>Hoch</em></button>
      <button data-route="flashcards"><span class="signal amber"></span><span><strong>Scaffolding</strong><small>Zwei unsichere Karten</small></span><em>Mittel</em></button>
      <button data-route="canvas"><span class="signal green"></span><span><strong>Translanguaging</strong><small>Quellenlage vollständig</small></span><em>Sicher</em></button>
    </section>
  </div>`;
}

function remindersPage() {
  return pageHead("Erinnerungen", "Freundliche Hinweise, damit Wichtiges nicht im Alltag untergeht.", `
    <button class="button primary" id="newReminder">Erinnerung hinzufügen</button>
  `) + `
  <div class="quiet-page reminders-page">
    <section class="reminder-date"><span>Heute</span><strong>7. Juni</strong><p>Du hast einen ruhigen Abend ohne Studienfrist.</p></section>
    <section class="calm-list">
      <button data-route="calendar"><span class="important-icon"><i class="ph ph-file-text"></i></span><span><strong>Reflexionsbericht Mehrsprachigkeit</strong><small>Freitag, 10. Juni · 23:59</small></span><em>In 3 Tagen</em></button>
      <button data-route="calendar"><span class="important-icon"><i class="ph ph-presentation-chart"></i></span><span><strong>Französische Präsentation</strong><small>Montag, 13. Juni · 10:00</small></span><em>In 6 Tagen</em></button>
      <button data-route="learning-plan"><span class="important-icon"><i class="ph ph-book-open"></i></span><span><strong>Bildungspsychologie wiederholen</strong><small>Morgen · 15:00</small></span><em>Geplant</em></button>
    </section>
  </div>`;
}

const renderers = {
  overview: overviewPage,
  uploads: uploadsPage,
  canvas: canvasPage,
  calendar: calendarPage,
  "learning-plan": learningPlanPage,
  gaps: gapsPage,
  flashcards: flashcardsPage,
  quiz: quizPage,
  reminders: remindersPage
};

function normalizeRoute() {
  const route = location.hash.replace("#/", "").replace("#", "");
  return routes.includes(route) ? route : "overview";
}

function navigate(route) {
  if (!routes.includes(route)) return;
  if (location.hash !== `#/${route}`) location.hash = `#/${route}`;
  else render();
}

function render() {
  const route = normalizeRoute();
  app.innerHTML = renderers[route]();
  navList.querySelectorAll("[data-route]").forEach(btn => btn.classList.toggle("active", btn.dataset.route === route));
  document.title = `${route === "overview" ? "Heute" : app.querySelector("h1")?.textContent || "StudyFlow"} · StudyFlow AI`;
  closeMenu();
  app.focus({ preventScroll: true });
  bindPage(route);
}

function bindPage(route) {
  app.querySelectorAll("[data-route]").forEach(el => el.addEventListener("click", () => navigate(el.dataset.route)));
  if (route === "uploads") bindUploads();
  if (route === "canvas") bindCanvas();
  if (route === "calendar") bindCalendar();
  if (route === "flashcards") bindFlashcards();
  if (route === "quiz") bindQuiz();
  if (route === "reminders") {
    document.querySelector("#newReminder")?.addEventListener("click", () => showToast("Neue Erinnerung wird lokal angelegt."));
  }
  app.querySelector("[data-action='open-plan']")?.addEventListener("click", () => navigate("calendar"));
}

function bindUploads() {
  const dropzone = document.querySelector("#dropzone");
  ["dragenter", "dragover"].forEach(type => dropzone.addEventListener(type, event => { event.preventDefault(); dropzone.classList.add("drag"); }));
  ["dragleave", "drop"].forEach(type => dropzone.addEventListener(type, event => { event.preventDefault(); dropzone.classList.remove("drag"); }));
  dropzone.addEventListener("drop", () => showToast("Datei zur lokalen Queue hinzugefügt."));
  document.querySelector("#addFiles").addEventListener("click", () => showToast("Dateiauswahl geöffnet. Demo bleibt lokal."));
  document.querySelector("#reviewAll").addEventListener("click", () => {
    document.querySelector("#ocrText").focus();
    showToast("7 unsichere Stellen sind zur Prüfung markiert.");
  });
  document.querySelector("#saveOcr").addEventListener("click", () => showToast("OCR-Text lokal gespeichert und verknüpft."));
}

function bindCanvas() {
  const mainSlide = document.querySelector("#mainSlide");
  const slideAssets = [assets.recent[0], assets.recent[1], assets.slide, assets.recent[2], assets.recent[3]];
  document.querySelectorAll(".slide-thumb").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll(".slide-thumb").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    mainSlide.src = slideAssets[Number(button.dataset.slide)];
  }));
  document.querySelector("#chatForm").addEventListener("submit", event => {
    event.preventDefault();
    const input = document.querySelector("#chatInput");
    const text = input.value.trim();
    if (!text) return;
    const messages = document.querySelector("#messages");
    messages.insertAdjacentHTML("beforeend", `<div class="message user">${escapeHtml(text)}</div><div class="message ai"><strong>Maya</strong><br>Ich prüfe diese Frage gegen die lokal verknüpften Folien und Notizen. Die relevanten Stellen liegen auf Folie 14 und in deiner Scaffolding-Notiz.</div>`);
    input.value = "";
    messages.scrollTop = messages.scrollHeight;
  });
}

function bindCalendar() {
  document.querySelector("#planBlock").addEventListener("click", () => showToast("Neuer Lernblock für 17:15 vorgeschlagen."));
  document.querySelector("#reviewExtractions").addEventListener("click", () => showToast("Drei bestätigte Termine aus lokalen Quellen."));
}

function bindFlashcards() {
  const preview = document.querySelector("#cardPreview");
  preview.addEventListener("click", () => preview.classList.toggle("flipped"));
  document.querySelector("#saveCard").addEventListener("click", () => showToast("Karte lokal gespeichert."));
  document.querySelector("#deleteCard").addEventListener("click", () => showToast("Karte zur Löschung vorgemerkt."));
  document.querySelector("#generateCards").addEventListener("click", () => showToast("6 Kartenvorschläge aus zwei Quellen erzeugt."));
  document.querySelector("#learnCards").addEventListener("click", () => showToast("Lernsession mit 12 fälligen Karten gestartet."));
  document.querySelectorAll("[data-export]").forEach(button => button.addEventListener("click", () => showToast(`${button.dataset.export}-Export lokal vorbereitet.`)));
  document.querySelectorAll(".deck-row").forEach(row => row.addEventListener("click", () => {
    document.querySelectorAll(".deck-row").forEach(item => item.classList.remove("selected"));
    row.classList.add("selected");
    showToast(`${row.dataset.deck} ausgewählt.`);
  }));
}

function bindQuiz() {
  const options = [...document.querySelectorAll(".answer-option")];
  const explanation = document.querySelector("#quizExplanation");
  options.forEach(option => option.addEventListener("click", () => {
    options.forEach(item => item.classList.remove("selected", "wrong"));
    const correct = option.dataset.answer === "B";
    option.classList.add(correct ? "selected" : "wrong");
    explanation.hidden = false;
    document.querySelector("#answerState").textContent = correct ? "Richtig beantwortet" : "Noch nicht richtig";
    document.querySelector("#answerState").style.color = correct ? "var(--emerald-dark)" : "var(--red)";
    document.querySelector("#chosenAnswer").textContent = `Antwort gewählt · ${option.dataset.answer}`;
  }));
  document.querySelectorAll("[data-level]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-level]").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    showToast(`Schwierigkeit auf ${button.dataset.level} gesetzt.`);
  }));
  document.querySelector("#nextQuestion")?.addEventListener("click", () => {
    document.querySelector(".panel-head h2").textContent = "Frage 8 von 12";
    document.querySelector("#quizProgress").style.width = "67%";
    document.querySelector("#quizProgressText").textContent = "67%";
    showToast("Nächste Frage geladen.");
  });
  document.querySelector("#endQuiz").addEventListener("click", () => showToast("Simulation pausiert. Dein Stand bleibt lokal gespeichert."));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

const sidebar = document.querySelector("#sidebar");
const scrim = document.querySelector("#scrim");
const menuButton = document.querySelector("#menuButton");
function closeMenu() {
  sidebar.classList.remove("open");
  scrim.classList.remove("show");
  menuButton.setAttribute("aria-expanded", "false");
}
menuButton.addEventListener("click", () => {
  const open = sidebar.classList.toggle("open");
  scrim.classList.toggle("show", open);
  menuButton.setAttribute("aria-expanded", String(open));
});
scrim.addEventListener("click", closeMenu);
navList.addEventListener("click", event => {
  const button = event.target.closest("[data-route]");
  if (button) navigate(button.dataset.route);
});

document.querySelector("#askButton").addEventListener("click", () => document.querySelector("#aiDialog").showModal());
document.querySelector("#aiSubmit").addEventListener("click", () => {
  const prompt = document.querySelector("#aiPrompt").value.trim();
  showToast(prompt ? "Lokale Antwort wird aus 12 Materialien erzeugt." : "Bitte gib zuerst eine Frage ein.");
});
document.querySelector("#globalSearch").addEventListener("keydown", event => {
  if (event.key === "Enter" && event.currentTarget.value.trim()) showToast(`Lokale Suche nach „${event.currentTarget.value.trim()}“`);
});
document.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.querySelector("#globalSearch").focus();
  }
  if (event.key === "Escape") closeMenu();
});
window.addEventListener("hashchange", render);
render();
