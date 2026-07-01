# WorkflowPulse

WorkflowPulse is a résumé-ready workflow app for small businesses: map repetitive bottlenecks, estimate the ROI of AI automation, and turn opportunities into a clear implementation roadmap.

## Why this belongs on a résumé

- **Product thinking:** connects pain points, owners, workflow stages, and business outcomes.
- **AI automation relevance:** models where AI assists the business process without pretending everything is magic.
- **Engineering fundamentals:** React + TypeScript components, typed domain models, tested ROI calculations, and responsive UI.

## Features

- Interactive workflow pipeline with stages: Discover, Design, Automate, Measure.
- ROI calculator for manual time, automated time, monthly volume, hourly rate, setup cost, and monthly tool cost.
- Portfolio-level dashboard: monthly savings, hours saved, annual impact, and readiness score.
- Editable workflow details for pain points and AI assist notes.
- Responsive kanban-style roadmap for demos and screenshots.

## Tech stack

- React 19
- TypeScript
- Vite
- Vitest for calculation tests
- Oxlint for static checks

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm run lint
npm test -- --run
npm run build
```

## Portfolio talking points

> “I built WorkflowPulse to help small businesses prioritize AI automation projects by ROI instead of hype. It converts workflow assumptions into measurable savings and a roadmap a business owner can understand.”

Future improvements:

- Save workflows to localStorage or Supabase.
- Export a PDF automation proposal.
- Add authentication for consultants and clients.
- Connect to CRM/calendar/email APIs for live workflow signals.
