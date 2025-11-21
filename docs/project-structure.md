# PackedLink - Project Structure

## Overview

```
packedlink/
├── .claude/                    # Agent definitions
│   └── agents/
│       ├── designer.md
│       ├── fullstack-developer.md
│       ├── icerik-yazari.md
│       ├── qa-master.md
│       ├── zen-bekcisi.md
│       ├── feedback-analizi.md
│       └── workflow-orchestrator.md
│
├── docs/
│   ├── development/
│   ├── marketing/
│   │   └── brand-voice.md
│   ├── product/
│   │   ├── design-guide.md
│   │   └── personas.md
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

### `.claude/agents/`
Agent definitions for workflow automation.

### `docs/`
- `zen.md` - Product principles
- `product/design-guide.md` - Design system rules (tek stil kaynağı)
- `marketing/brand-voice.md` - Brand tone & voice

### `src/frontend/`
Next.js 14 app with CSS Modules + design tokens (utility yok).

**Components:**
- All components use CSS modules
- CSS variables/tokens from `globals.css`
- Minimal, no unnecessary variants

### `src/backend/`
Django 5.0 backend with PostgreSQL.

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
- Django 5.0
- PostgreSQL
- Django REST Framework

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

Feature development workflow:
1. **zen-bekcisi** - Validates feature against ZEN principles
2. **fullstack-developer** - Plans & estimates
3. **designer + icerik-yazari** - Prepare components & copy (parallel)
4. **qa-master** - Writes BDD scenarios
5. **fullstack-developer** - Implements feature
6. **qa-master** - Runs tests
7. Done ✅

See: `.claude/agents/workflow-orchestrator.md`
