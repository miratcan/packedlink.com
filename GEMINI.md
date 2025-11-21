# Gemini Added Memories

## Project Overview

Kaydet.link is a web application designed to enable users to quickly save links, transform them into curated lists, and share them via a single link. It targets both hobby users and professionals (e.g., affiliate marketers, content creators, consultants) who need to organize and share valuable online resources.

The project follows a monorepo structure, separating the backend (Django) and frontend (Next.js 14) into distinct `src/backend` and `src/frontend` directories.

**Key Technologies:**
*   **Backend:** Django, Python 3.9+, uv (package management), just (command runner), pytest (testing).
*   **Frontend:** Next.js 14, Node.js 18+, npm/pnpm/yarn, TypeScript, Tailwind CSS, React Query, Zustand (state management).



## Building and Running

The project utilizes `just` as a command runner for backend operations and standard npm/pnpm/yarn commands for the frontend.

### Backend (Django)

1.  **Prerequisites:** Python 3.9+, [uv](https://docs.astral.sh/uv/), and [just](https://just.systems/).
2.  **Environment Setup:**
    ```bash
    cp src/backend/.env.example src/backend/.env
    # Edit src/backend/.env as needed
    ```
3.  **Install Dependencies:** `uv sync` (run from `src/backend` or the project root).
4.  **Key Commands (run from project root using `just`):**
    *   `just migrate`: Applies database schema migrations.
    *   `just run`: Starts the Django development server (typically at `http://127.0.0.1:8000`).
    *   `just test`: Executes backend tests using pytest.
    *   `just expire`: Manually triggers the list expiration command (cron-compatible).

### Frontend (Next.js 14)

1.  **Prerequisites:** Node.js 18+, npm/pnpm/yarn.
2.  **Environment Setup:**
    ```bash
    cp src/frontend/.env.local.example src/frontend/.env.local
    # Edit src/frontend/.env.local for Vercel-compatible public environment keys.
    ```
3.  **Install Dependencies & Start Development Server:**
    ```bash
    cd src/frontend
    npm install # or pnpm install / yarn install
    npm run dev
    ```

## Development Conventions

*   **Documentation Philosophy:** The project emphasizes a "minimal, readable, and actionable" documentation approach, guided by "ZEN-SOLO-FIT" and "ZEN-CORE-FIRST" principles. Key documentation can be found in the `docs/` directory.
*   **Backend Testing:** Pytest is used for backend testing, with specific tests for the publish flow and expiration command.
*   **Frontend Structure:** Utilizes Next.js App Router, TypeScript, Tailwind CSS, React Query, and Zustand for state management.
*   **Code Style:** `.stylelintrc.json` is present, suggesting adherence to specific CSS/styling conventions. ESLint is likely configured for TypeScript/JavaScript due to `.eslintrc.json` in the frontend.

## Documentation Usage Guide

To ensure consistency and efficiency, please refer to the following documentation files in the `docs/` directory as needed:

*   **`docs/zen.md`**: Principles and "how we work." **When to use:** Before planning any new feature or making significant architectural decisions, to align with core project philosophy.
*   **`docs/vision.md`**: Long-term vision, market insights, and persona framework. **When to use:** To understand the long-term goals and market context of the project, especially during product strategy discussions.
*   **`docs/project-structure.md`**: Overview of the project's codebase organization. **When to use:** To quickly understand where different parts of the project reside and how they are organized.
*   **`docs/marketing/analytics-strategy.md`**: Defines the strategy for collecting and using analytics data. **When to use:** When implementing new features that generate user data or when analyzing user behavior.
*   **`docs/marketing/brand-voice.md`**: Guidelines for the project's communication style and tone. **When to use:** When writing any user-facing text, marketing content, or preparing communications.
*   **`docs/marketing/seo-content-strategy.md`**: Strategy for optimizing content for search engines. **When to use:** When creating new content, especially public-facing lists or landing pages, to ensure SEO best practices are followed.
*   **`docs/product/competitive-analysis.md`**: Analysis of key competitors and market positioning. **When to use:** When evaluating new features or refining product strategy to understand the competitive landscape.
*   **`docs/product/design-guide.md`**: Comprehensive guide to the project's design system and principles. **When to use:** When designing new UI components, reviewing existing designs, or ensuring visual consistency.
*   **`docs/product/personas.md`**: Detailed descriptions of target user segments. **When to use:** To understand the users for whom features are being developed, especially during design and feature planning.
*   **`docs/technical/blog-system.md`**: Technical overview of the project's blog system. **When to use:** When making changes or additions to the blog functionality.
*   **`docs/technical/technical-decisions.md`**: Records fundamental technical and architectural decisions. **When to use:** To understand the reasoning behind key technical choices and ensure new implementations align with them.
*   **`docs/development/agent-system-improvements.md`**: Details the improved workflow and rules for interacting with AI agents. **When to use:** Constantly refer to this when working with agents to ensure proper delegation, design validation, and adherence to development rules.
*   **`docs/development/css-guide.md`**: Guidelines for CSS, including design token usage and enforcement. **When to use:** When writing or reviewing any CSS, to ensure adherence to styling conventions and proper use of design tokens.


The project's current focus and objectives will now be tracked via GitHub milestones.

## Design Token Compliance Guidelines

### 1. Design Token Compliance

- [ ] **0 hardcode renk:** Hiç `#hex` veya `rgba()` yok
- [ ] **100% token kullanımı:** Tüm renkler `var(--token-name)` formatında
- [ ] **Semantic naming:** Token isimleri semantik (örn: `--color-danger` not `--color-red`)

**Validation komutu:**
```bash
./scripts/validate-design-tokens.sh
```
