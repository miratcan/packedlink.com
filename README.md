# PackedLink

Turn curated links into organized lists, share with a single link.

## Quick Reference

### Product & Strategy
- **Product principles:** `docs/zen.md`
- **Vision & market insights:** `docs/vision.md`
- **Features overview:** `docs/product/features.md`
- **Personas:** `docs/product/personas.md`
- **Competitive analysis:** `docs/product/competitive-analysis.md`

### Design & Technical
- **Design & style guide:** `docs/product/design-guide.md` + `docs/development/css-guide.md`
- **Tech stack:** `docs/technical/tech-stack.md`
- **Technical decisions:** `docs/technical/technical-decisions.md`
- **Project structure:** `docs/project-structure.md`

### Marketing & Analytics
- **SEO/Blog strategy:** `docs/marketing/seo-content-strategy.md`
- **Analytics/event rules:** `docs/marketing/analytics-strategy.md`

### Development & Deployment
- **Getting started:** `docs/development/getting-started.md`
- **GitHub workflow:** `docs/development/github-workflow.md`
- **Deployment guide:** `docs/deployment/guide.md`
- **Documentation management:** `docs/README.md`

## Development (Quick Start)

**Backend:** Django + uv
```bash
cd src/backend
uv sync
uv run python manage.py migrate
uv run python manage.py runserver
```

**Frontend:** Next.js 14 + TypeScript + CSS Modules + React Query + Zustand
```bash
cd src/frontend
npm install
npm run dev
```

**Environment files:** `src/backend/.env`, `src/frontend/.env.local`
**Design tokens:** `src/frontend/app/globals.css`

For detailed setup instructions, see `docs/development/getting-started.md`.

---

**Contributing?** Read `CONTRIBUTING.md` for guidelines.
**AI agents?** Start with `AGENTS.md` for the complete workflow.

---

This README is kept minimal. For changes, update the relevant document above.
