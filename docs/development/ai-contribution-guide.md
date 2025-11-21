# AI Agent Contribution Guide

This guide outlines the end-to-end workflow for an AI agent contributing to the kaydet.link project. Adherence to this process is critical for ensuring high-quality, consistent, and predictable outcomes.

## Core Philosophy

All contributions must align with the project's core principles, as defined in **[ZEN-SOLO-FIT](https://github.com/miratcan/packedlink.com/blob/main/docs/zen.md)**. Before starting any task, review these principles to ensure your approach is aligned with the project's spirit.

## End-to-End Task Workflow

Follow these steps for any development task, from a simple bug fix to a new feature.

### 1. Task Comprehension

- **Objective:** Fully understand the user's request and the desired outcome.
- **Action:**
    - Analyze the prompt and identify the core requirements.
    - If the request is ambiguous or lacks critical details, ask clarifying questions *before* proceeding. Do not make assumptions.

### 2. Information Gathering & Analysis

- **Objective:** Gather context from the existing codebase and documentation to inform your implementation plan.
- **Action:**
    - **Codebase Analysis:** Use `codebase_investigator` for complex tasks or `search_file_content` / `glob` for targeted searches.
    - **Documentation Review:** Consult the **[Documentation Usage Guide](../../GEMINI.md)** to identify and read relevant documents. Key documents include:
        - For UI/UX changes: `docs/product/design-guide.md`, `docs/product/personas.md`
        - For new features: `docs/vision.md`, `docs/product/competitive-analysis.md`
        - For any technical work: `docs/technical/technical-decisions.md`, `docs/development/css-guide.md`

### 3. Planning & Proposal

- **Objective:** Create a clear, step-by-step plan for implementation.
- **Action:**
    - Use `write_todos` to create and track your plan.
    - **Critical:** If your plan requires a new technology, a significant change to the architecture, or a deviation from established patterns, you **must** first propose a "Request for Technical Decision" (RTD). Follow the framework in `docs/technical/technical-decisions.md`. Do not proceed until the decision is approved and documented.

### 4. Implementation

- **Objective:** Write clean, conventional, and correct code.
- **Action:**
    - Rigorously follow the project's existing conventions, style, and structure.
    - Add unit tests to verify your changes, especially for new features or bug fixes.
    - Use descriptive commit messages that explain the "why" behind your changes.

### 5. Validation

- **Objective:** Ensure the implementation is correct, compliant, and high-quality.
- **Action:**
    - **Run Tests:** Execute the relevant testing suite (`just test` for backend, `npm test` for frontend). All tests must pass.
    - **Run Linters:** Check for style and quality issues.
    - **Design Token Validation:** For any CSS changes, run the validation script:
      ```bash
      ./scripts/validate-design-tokens.sh
      ```
      The output must be `✅ PASSED`.

### 6. Review & Handoff

- **Objective:** Present your work clearly for human review.
- **Action:**
    - If applicable, provide screenshots of UI changes.
    - Summarize your work, linking to the completed `todos` and any relevant decisions (RTDs).
    - Clearly state that your work is ready for review.
