# AI Agent Contribution Guide

This guide summarizes the end-to-end workflow for an AI agent contributing to the PackedLink project. Adhering to this process is critical for high-quality, consistent, and predictable outcomes.

## Core Philosophy

All contributions must align with the core principles defined in **[ZEN-SOLO-FIT](../../docs/zen.md)**. Before starting any task, review these principles to ensure your approach matches the spirit of the project.

## End-to-End Task Workflow

Follow these steps for every development task, from a simple bug fix to a new feature.

### 1. Task Understanding

- **Goal:** Fully understand the user’s request and desired outcome.
- **Actions:**
    - Analyze the prompt and identify key requirements.
    - If the request is unclear or missing critical details, ask clarifying questions *before* proceeding. Do not assume.

### 2. Information Gathering and Analysis

- **Goal:** Collect context from the existing codebase and documentation to inform your implementation plan.
- **Actions:**
    - **Codebase Analysis:** Use `codebase_investigator` for complex tasks or `search_file_content` / `glob` for targeted searches.
    - **Documentation Review:** Refer to `docs/README.md` to locate and read relevant docs. Key documents include:
        - For UI/UX changes: `docs/product/design-guide.md`, `docs/product/personas.md`
        - For new features: `docs/vision.md`, `docs/product/features.md`, `docs/product/competitive-analysis.md`
        - For any technical work: `docs/technical/technical-decisions.md`, `docs/development/css-guide.md`

### 3. Planning and Proposal

- **Goal:** Build a clear, step-by-step plan for implementation.
- **Actions:**
    - Use `write_todos` to create and track your plan.
    - **Critical:** If your plan requires new technology, introduces a significant architectural change, or deviates from established patterns, you **must** first propose a "Technical Decision Request" (TKT). Follow the framework in `docs/technical/technical-decisions.md`. Do not proceed until the decision is approved and documented.
    - **GitHub Issues:** When creating issues, follow `docs/development/github-workflow.md` rules (Title Case, imperative, correct labels, milestone assignment).

### 4. Implementation

- **Goal:** Write clean, conventional, and correct code.
- **Actions:**
    - Follow the project’s established rules, style, and structure diligently.
    - Add unit tests to validate your changes, especially for new features or bug fixes.
    - Use descriptive commit messages that explain the "why" behind your changes.

### 5. Validation

- **Goal:** Ensure the implementation is correct, consistent, and high quality.
- **Actions:**
    - **Run Tests:** Execute the relevant test suite (backend: `just test`, frontend: `npm test`). All tests must pass.
    - **Run Linters:** Check for style and quality issues.
    - **Design Token Validation:** For CSS changes, run the validation script:
      ```bash
      ./scripts/validate-design-tokens.sh
      ```
      Output should be `✅ PASSED`.

### 6. Review and Handoff

- **Goal:** Present your work clearly for human review.
- **Actions:**
    - Provide UI screenshots when applicable.
    - Summarize your work, linking to completed `todos` and related decisions (TKTs).
    - Clearly state that your work is ready for review.
