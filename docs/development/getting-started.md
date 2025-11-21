# Getting Started - Local Development

This guide walks you through setting up PackedLink for local development.

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required

- **Python 3.10+** - Backend (Django)
- **Node.js 18+** - Frontend (Next.js)
- **uv** - Python package manager
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

### Optional

- **Git** - Version control
- **PostgreSQL** - Production database (SQLite used for local dev)

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/miratcan/packedlink.com.git
cd packedlink.com
```

### 2. Backend Setup (Django)

```bash
# Navigate to backend directory
cd src/backend

# Create virtual environment and install dependencies
uv sync

# Copy environment file
cp .env.example .env

# Run migrations
uv run python manage.py migrate

# Create superuser (optional, for admin access)
uv run python manage.py createsuperuser

# Start development server
uv run python manage.py runserver
```

Backend runs at: **http://localhost:8000**

**Smoke test:**
```bash
curl http://localhost:8000/api/health/
# Should return: {"status": "healthy"}
```

### 3. Frontend Setup (Next.js)

Open a new terminal:

```bash
# Navigate to frontend directory
cd src/frontend

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Update .env.local with backend URL
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8000" > .env.local

# Start development server
npm run dev
```

Frontend runs at: **http://localhost:3000**

---

## Verify Installation

### Backend Health Check

```bash
# API health endpoint
curl http://localhost:8000/api/health/

# Django admin (if superuser created)
open http://localhost:8000/admin/
```

### Frontend Check

```bash
# Open in browser
open http://localhost:3000

# Should see landing page with "Pack your links. Share anywhere."
```

---

## Development Workflow

### Running Tests

**Backend tests:**
```bash
cd src/backend
uv run pytest
```

**Frontend tests:**
```bash
cd src/frontend
npm test
```

**E2E tests:**
```bash
cd src/tests
uv sync
uv run pytest
```

### Code Quality

**Backend linting:**
```bash
cd src/backend
uv run ruff check .
```

**Frontend linting:**
```bash
cd src/frontend
npm run lint
```

**Design token validation:**
```bash
./scripts/validate-design-tokens.sh
```

---

## Common Issues

### Issue: `uv: command not found`

**Solution:** Install uv package manager:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Issue: Backend migrations fail

**Solution:** Delete db.sqlite3 and re-run migrations:
```bash
cd src/backend
rm db.sqlite3
uv run python manage.py migrate
```

### Issue: Frontend can't connect to backend

**Solution:** Check `NEXT_PUBLIC_API_BASE_URL` in `.env.local`:
```bash
# Should point to running backend
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### Issue: Port already in use

**Backend (8000):**
```bash
lsof -ti:8000 | xargs kill -9
```

**Frontend (3000):**
```bash
lsof -ti:3000 | xargs kill -9
```

---

## Project Structure

```
packedlink/
├── src/
│   ├── backend/          # Django backend
│   │   ├── manage.py
│   │   ├── config/       # Django settings
│   │   └── lists/        # Main app
│   ├── frontend/         # Next.js frontend
│   │   ├── app/          # App Router
│   │   ├── components/   # React components
│   │   └── lib/          # Utilities
│   └── tests/            # E2E tests
├── docs/                 # Documentation
└── scripts/              # Utility scripts
```

---

## Next Steps

- **Read the docs:** Start with `docs/README.md`
- **Check ZEN principles:** `docs/zen.md`
- **Review tech stack:** `docs/technical/tech-stack.md`
- **Understand workflow:** `docs/development/ai-katki-rehberi.md`
- **GitHub workflow:** `docs/development/github-workflow.md`

---

## Getting Help

- **Documentation:** Check `docs/README.md` for all canonical files
- **Issues:** Search or create issues on GitHub
- **Current goals:** Check [GitHub Milestones](https://github.com/miratcan/packedlink.com/milestones)

---

**Ready to contribute?** Read `CONTRIBUTING.md` (coming soon) for guidelines.
