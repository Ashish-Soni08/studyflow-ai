---
title: StudyFlow AI
emoji: 📚
colorFrom: green
colorTo: purple
sdk: static
app_file: index.html
pinned: false
license: mit
short_description: A private, personalized AI study copilot.
---

# StudyFlow AI

StudyFlow AI is a private study copilot built around the materials students
already use: handwritten notes, lecture slides, PDFs, calendars, flashcards,
and reminders.

The current release is an interactive frontend prototype centered on
Josephine Wendland, a multilingual teaching student from Mainz. Backend,
OCR, local model, and retrieval integrations will be added next.

## Current Experience

- Personal daily briefing and schedule
- Material upload and OCR review interface
- Connected slide, note, and AI study canvas
- Calendar and personalized learning plan
- Knowledge-gap review
- Flashcard editing and export flows
- Quiz simulation and reminders
- Local-first privacy messaging

## Run Locally

No build step is required.

```powershell
node server.js
```

Then open [http://localhost:4173](http://localhost:4173).

Python can also serve the static prototype:

```powershell
python -m http.server 4173
```

## Repository Layout

```text
assets/
  hero/          Generated Josephine illustration
  materials/     Sample note, slide, and calendar imagery
docs/design/     Reference concepts, QA, reviews, and design history
tools/           Local design and review utilities
app.js           Application views and interactions
index.html       Static Space entry point
styles.css       Responsive visual system
server.js        Tiny local development server
```

## Publication

The same Git history is pushed to:

- GitHub: source repository and development history
- Hugging Face Spaces: live static prototype

Commits created with Codex include an explicit Codex co-author trailer.

## Next Phase

The frontend will later be migrated to a Gradio/FastAPI-backed application
with OCR, document linking, local retrieval, study-plan generation, and
notification workflows.

