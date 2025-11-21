# PackedLink - Project Structure

## Overview

```
packedlink/
├── AGENTS.md                   # AI agent onboarding/workflow
├── docs/
│   ├── development/
│   ├── marketing/
│   │   └── brand-voice.md
│   ├── product/
│   │   ├── design-guide.md
│   │   ├── personas.md
│   │   └── features.md
│   ├── technical/
│   │   └── tech-stack.md
│   └── zen.md
│
├── src/
│   ├── backend/               # Django backend
│   │   ├── lists/             # Core app
│   │   ├── manage.py
│   │   └── ...
│   │
│   ├── frontend/              # Next.js frontend
│   │   ├── app/               # Next.js app router
│   │   │   ├── globals.css    # Design tokens + global styles
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/        # Design system components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Card/
│   │   │   ├── Hero/
│   │   │   └── LinkBar/
│   │   ├── lib/               # Utilities
│   │   ├── store/             # Zustand stores
│   │   └── package.json
│   │
│   └── tests/                 # Test suite
│       ├── features/          # BDD scenarios (Gherkin)
│       ├── step_defs/         # Step implementations
│       └── test_orchestrator.py
│
├── Justfile                   # Task runner
└── README.md
```

## Key Directories

### `AGENTS.md`
AI agent onboarding and workflow checklist.

### `docs/`
- `zen.md` - Product principles
- `product/design-guide.md` - Design system rules (single style source)
- `marketing/brand-voice.md` - Brand tone & voice
- `product/features.md` - Feature set (Free vs Pro)
- `technical/tech-stack.md` - Technologies we use and how

### `src/frontend/`
Next.js 14 app with CSS Modules + design tokens (utility yok).

**Components:**
- All components use CSS modules
- CSS variables/tokens from `globals.css`
- Minimal, no unnecessary variants

### `src/backend/`
Django 5.0 backend with PostgreSQL, API via **Django Ninja** (OpenAPI docs at `/api/v1/docs`).

### `src/tests/`
pytest-bdd + Playwright E2E tests.

## Quick Commands

```bash
# Backend
just run              # Django server
just migrate          # Run migrations
just test             # Backend tests

# Frontend
just dev              # Next.js dev server

# Tests
just test-all         # All tests
just test-e2e         # E2E tests only
just test-frontend    # Frontend tests
```

## Tech Stack

**Frontend:**
- Next.js 14.2 (App Router)
- React 18.3
- CSS Modules + design tokens (no utilities)
- Zustand (state)
- React Query (data)

**Backend:**
- Django 5.0 + Django Ninja (API, OpenAPI)
- PostgreSQL
- (No Django REST Framework)

**Testing:**
- pytest-bdd (BDD scenarios)
- Playwright (E2E)
- Jest (frontend unit)

**Tools:**
- Just (task runner)
- uv (Python package manager)
- npm (Node package manager)

## Design System

All components in `src/frontend/components/`:
- Button
- Card
- Hero
- LinkBar

**Rules:**
- ✅ CSS Modules for component-specific styles
- ✅ Design tokens (`globals.css`)
- ✅ Minimal (no unnecessary variants)

## Agent Workflow

See `AGENTS.md` for the current AI agent workflow and responsibilities.
