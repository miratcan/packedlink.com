# Contributing to PackedLink

Thank you for your interest in contributing to PackedLink! This guide will help you get started.

---

## Getting Started

1. **Read the documentation**
   - Start with [`docs/README.md`](docs/README.md) - Complete documentation index
   - Review [`docs/zen.md`](docs/zen.md) - Core principles (24+ principles)
   - Check [`docs/vision.md`](docs/vision.md) - Product definition
   - Understand [`docs/product/features.md`](docs/product/features.md) - What we build and DON'T build

2. **Set up your development environment**
   - Follow [`docs/development/getting-started.md`](docs/development/getting-started.md)
   - Verify everything works before making changes

3. **Check current goals**
   - Review [GitHub Milestones](https://github.com/miratcan/packedlink.com/milestones)
   - Look for open issues with `good-first-issue` or `help-wanted` labels

---

## How to Contribute

### Reporting Bugs

1. **Search first** - Check if the issue already exists
2. **Create an issue** following [`docs/development/github-workflow.md`](docs/development/github-workflow.md):
   - Use imperative Title Case (e.g., "Fix List Creation Error")
   - Include **Why** (problem statement), **How** (reproduction steps), **Acceptance Criteria**
   - Add labels: `bug`, `backend`/`frontend`, `human`
   - Assign to appropriate milestone

### Suggesting Features

1. **Check ZEN principles** - Read [`docs/zen.md`](docs/zen.md)
   - Does it align with `ZEN-ONE-JOB`? (We do one thing well: organize links)
   - Does it complicate the product? (Violates `ZEN-INSTANT`)
   - Is it a social network feature? (`ZEN-NOT-SOCIAL`)

2. **Create an issue** with:
   - Clear use case and problem statement
   - How it aligns with ZEN principles
   - Why existing features don't solve this

3. **Wait for feedback** before implementing
   - Features must align with vision
   - Maintainers will evaluate against ZEN principles

### Code Contributions

#### 1. Fork and Clone

```bash
git clone https://github.com/YOUR-USERNAME/packedlink.com.git
cd packedlink.com
```

#### 2. Create a Branch

```bash
git checkout -b feature/issue-123-short-description
```

**Branch naming:**
- `feature/issue-123-description` - New features
- `fix/issue-123-description` - Bug fixes
- `docs/issue-123-description` - Documentation only

#### 3. Make Your Changes

**Follow the tech stack** ([`docs/technical/tech-stack.md`](docs/technical/tech-stack.md)):
- Backend: Django + Django Ninja (NOT JsonResponse views)
- Frontend: Next.js App Router (NOT Pages Router)
- Styling: CSS Modules + design tokens (NOT Tailwind)
- State: React Query + Zustand (minimal)

**Code style:**
- **Backend:** Follow PEP 8, use `ruff` for linting
- **Frontend:** Follow project ESLint config
- **Design tokens:** Use CSS variables from `globals.css`, NO hardcoded colors/spacing

**Write tests:**
- Backend: `pytest` for unit tests
- Frontend: Jest for component tests
- E2E: Playwright for critical flows

#### 4. Run Tests and Linters

```bash
# Backend
cd src/backend
uv run pytest
uv run ruff check .

# Frontend
cd src/frontend
npm test
npm run lint

# Design tokens
./scripts/validate-design-tokens.sh
```

All tests must pass before submitting.

#### 5. Commit Your Changes

**Commit message format:**
- Use imperative mood: "Add feature" not "Added feature"
- Be descriptive: "Fix list creation validation error"
- Reference issue: "Closes #123" or "Fixes #123"

```bash
git add .
git commit -m "Fix list creation validation error

- Add email validation to list creation form
- Handle duplicate list titles gracefully
- Add unit tests for validation logic

Closes #123"
```

#### 6. Push and Create Pull Request

```bash
git push origin feature/issue-123-short-description
```

**PR requirements:**
- Title: Same format as commit message (imperative, Title Case)
- Description: Reference issue with `Closes #123`
- All tests passing
- No merge conflicts
- Screenshots for UI changes

---

## Development Guidelines

### Do's ✅

- **Read docs first** - Especially `zen.md`, `tech-stack.md`, `github-workflow.md`
- **Follow established patterns** - Check existing code for examples
- **Write tests** - For new features and bug fixes
- **Use design tokens** - From `globals.css`
- **Keep it simple** - Follow `ZEN-EASIEST-PATH`
- **Ask questions** - If unsure, create an issue or comment

### Don'ts ❌

- **Don't add dependencies** without discussion (see `tech-stack.md`)
- **Don't use Tailwind/utility CSS** - We use CSS Modules
- **Don't skip tests** - Tests are required
- **Don't commit without running linters**
- **Don't ignore ZEN principles** - They guide all decisions
- **Don't add social features** - We're `ZEN-NOT-SOCIAL`
- **Don't bloat docs/** - Implementation details go in issue comments

---

## Code Review Process

1. **Automated checks** - Tests, linters must pass
2. **Maintainer review** - May request changes
3. **Approval** - Once approved, PR will be merged
4. **Issue closes automatically** - When PR references `Closes #123`

---

## Project Structure

```
packedlink/
├── docs/                 # Documentation (read first!)
├── src/
│   ├── backend/          # Django backend
│   ├── frontend/         # Next.js frontend
│   └── tests/            # E2E tests
├── scripts/              # Utility scripts
├── AGENTS.md             # AI agent guide
└── CONTRIBUTING.md       # This file
```

---

## Community Guidelines

- **Be respectful** - Professional, constructive feedback
- **Be patient** - Maintainers review in their spare time
- **Be open** - Accept feedback and iterate
- **Stay focused** - Stick to `ZEN-ONE-JOB` - organize links into lists

---

## Questions?

- **Documentation:** Check [`docs/README.md`](docs/README.md)
- **Issues:** Search or create on GitHub
- **Milestones:** [Current goals](https://github.com/miratcan/packedlink.com/milestones)

---

**Thank you for contributing to PackedLink!** 🎉
