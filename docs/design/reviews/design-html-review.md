# Design HTML Finalization

Date: 2026-06-06
Mode: evolve existing standalone mockup
Screen: StudyFlow AI Lehramt Arbeitszentrale
Framework: vanilla HTML, CSS, JavaScript

## Implementation Spec

- Layout: responsive dashboard with fixed desktop sidebar, collapsed icon rail at tablet width, stacked mobile workspace.
- Typography: Fraunces display headings, IBM Plex Sans interface text, Material Symbols Rounded icons.
- Palette: warm paper background, green primary action/state, blue informational accents, amber/red priority states, dark-mode token overrides.
- Components: navigation rail, local-processing trust panel, upload status strip, material-linking workspace, AI action list, extraction review table, daily focus, knowledge gaps, roadmap, subject progress.

## Design HTML Pass

- Added explicit theme metadata and dark-mode CSS token overrides.
- Added named breakpoint refinements for 1440px, 1024px, 768px, and 375px.
- Made the primary headline and subheading editable for demo iteration.
- Added a small ResizeObserver and MutationObserver pass for editable copy overflow.
- Kept the existing live app as the source of truth instead of generating a separate detached artifact.

## Verification

- UI checker: passed via `uv run python ui_ux_check.py`.
- Desktop screenshot: `studyflow-design-html-desktop.png`
- Mobile screenshot: `studyflow-design-html-mobile.png`
- Narrow screenshot: `studyflow-design-html-375.png`
