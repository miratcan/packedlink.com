# GitHub Workflow Guide

This guide defines how we create, format, label, and manage GitHub issues in the PackedLink project.

---

## Issue Title Format

**Rules:**
- **Imperative sentence** - Action-oriented command
- **Title Case** - Capitalize Each Word
- **NO taxonomy prefixes** - Never use `docs:`, `feat:`, `fix:`, etc. (use labels instead)

**Examples:**

✅ **Good:**
- "Optimize All Pages For Core Web Vitals Score"
- "Implement Waitlist Email Validation"
- "Document Development Standards And Best Practices"

❌ **Bad:**
- "docs: Update README" (has prefix, use labels)
- "Core Web Vitals Optimization" (not imperative)
- "update readme" (not Title Case)
- "Fix bug in list creation" (not Title Case, vague)

---

## Issue Body Structure

Every issue must follow this structure:

### 1. Why

**Purpose:** Problem statement, context, impact

Explain:
- What problem does this solve?
- Why is this important?
- What happens if we don't do this?
- What's the current pain point?

**Example:**
```markdown
## Why

Development standards are scattered or missing across the project. This causes:
- Testing inconsistency: No clear coverage targets
- Error handling chaos: No standard exception patterns
- Component implementation variance: No consistent CSS/TypeScript patterns

Without comprehensive standards, code quality degrades and onboarding is harder.
```

### 2. How

**Purpose:** Implementation approach, steps, technical details

Explain:
- What files will be created/modified?
- What specific sections/content to add?
- What decisions need to be made?
- What are the implementation steps?

**Example:**
```markdown
## How

Create `docs/development/testing-guide.md` with:

### Test Coverage
- Define target coverage percentage (e.g., >80% for critical paths)
- Create test requirement matrix

### Backend Testing
- Unit test structure and naming conventions
- Integration test approach
```

### 3. Acceptance Criteria

**Purpose:** Checklist for "done" definition

- Use checkboxes: `- [ ]`
- Be specific and measurable
- Each checkbox should be independently verifiable
- Include cross-references if needed

**Example:**
```markdown
## Acceptance Criteria

- [ ] `docs/development/testing-guide.md` exists
- [ ] Coverage targets defined
- [ ] Test requirement matrix clear
- [ ] Referenced from `docs/README.md`
```

### 4. Testing Strategy

**Purpose:** How to verify it works

For implementation issues:
- What tests to run?
- How to validate the change?
- What edge cases to check?

For documentation issues:
- Review process
- Validation steps
- Alignment checks

**Example:**
```markdown
## Testing Strategy

After documentation is complete:
- Review with human developer for completeness
- Test that AI agent can parse and follow conventions
- Create sample components following new standards
```

---

## Label Taxonomy

Labels are **required** and categorize work. Use relevant labels from each category:

### Area Labels (Required - Can Be Multiple)

At least one area label must be applied:

- `backend` - Backend/Django work
- `frontend` - Frontend/Next.js work
- `design` - UI/UX design work
- `copywriting` - Content/copy writing work
- `documentation` - Documentation work
- `seo` - SEO optimization
- `devops` - Infrastructure/deployment work

**Examples:**
- Blog system: `backend`, `frontend`
- Responsive breakpoints: `design`, `frontend`
- Testing guide: `documentation`

### Execution Labels (Required - Can Be Multiple)

Define who/what can implement:

- `ai` - Can be implemented by AI agent
- `human` - Requires human implementation

Both can be applied if collaboration is needed.

**Examples:**
- Documentation writing: `ai`
- Strategic decision (language strategy): `human`
- Complex feature implementation: `ai`, `human`

### Priority Labels (Optional)

- `quickwin` - Easy task, quick to complete

Use sparingly for genuinely quick wins (< 1 hour work).

---

## Issue Scope Rules

**Rule:** Issues should be **complete features or tasks**, not artificially split.

### ✅ Good Scope

**Single comprehensive issue:**
- "Implement Blog System"
  - Includes backend models, API, frontend routes, Notion sync
  - Labels: `backend`, `frontend`, `ai`

**Naturally separable work:**
- "Implement Waitlist Backend API"
- "Implement Waitlist Frontend Form" (if frontend depends on backend being done first)

### ❌ Bad Scope

**Artificially split:**
- "Blog Backend" (Issue #1)
- "Blog Frontend" (Issue #2)
- "Blog Notion Integration" (Issue #3)

These should be **one issue** unless there's a genuine dependency/separation reason.

---

## Milestone Assignment

**Rule:** Every issue **must** be assigned to a milestone.

### Current Milestones

- **Milestone 1: Public Landing Live**
  - Site accessible, landing page with waitlist, mobile responsive, Core Web Vitals > 90

- **Milestone 2: Blog System Live**
  - Blog routes functional, Notion integration working, SEO meta tags

### How to Assign

```bash
# When creating issue
gh issue create --milestone "Milestone 1: Public Landing Live" ...

# Update existing issue
gh issue edit 123 --milestone "Milestone 1: Public Landing Live"
```

**Never create issues without a milestone.** If unsure which milestone, ask before creating the issue.

---

## Creating New Labels

**Rule:** Only use labels from the defined taxonomy. If work doesn't fit existing labels:

1. **Stop** - Don't create the label yet
2. **Propose** - Suggest label name, color, description
3. **Get approval** - Wait for confirmation
4. **Create** - Only after approval

**Why?** Label proliferation makes issues hard to filter and organize.

---

## GitHub CLI Quick Reference

### Creating Issues

```bash
# Full example
gh issue create \
  --title "Implement Waitlist Email Validation" \
  --body "$(cat <<'EOF'
## Why
...

## How
...

## Acceptance Criteria
...

## Testing Strategy
...
EOF
)" \
  --label "backend,ai" \
  --milestone "Milestone 1: Public Landing Live"
```

### Listing Issues

```bash
# By milestone
gh issue list --milestone "Milestone 1: Public Landing Live"

# By area
gh issue list --label "backend"

# By execution
gh issue list --label "ai"

# By priority
gh issue list --label "quickwin"

# Multiple labels (AND)
gh issue list --label "backend,ai"
```

### Editing Issues

```bash
# Add labels
gh issue edit 123 --add-label "quickwin"

# Remove labels
gh issue edit 123 --remove-label "human"

# Change milestone
gh issue edit 123 --milestone "Milestone 2: Blog System Live"

# Assign to someone
gh issue edit 123 --add-assignee @me
```

### Closing Issues

```bash
# Close with comment
gh issue close 123 --comment "Completed and merged in PR #45"

# Reopen
gh issue reopen 123
```

---

## Workflow Summary

1. **Create Issue:**
   - Title: Imperative, Title Case, no prefixes
   - Body: Why, How, Acceptance Criteria, Testing Strategy
   - Labels: Area + Execution (+ optional Priority)
   - Milestone: Required

2. **Work on Issue:**
   - Assign to yourself: `gh issue edit 123 --add-assignee @me`
   - Create branch: `git checkout -b feature/issue-123-short-description`

3. **Create PR:**
   - Title: Same format as issue
   - Body: Reference issue with `Closes #123` or `Fixes #123`
   - Request review if needed

4. **Merge:**
   - Issue auto-closes when PR merges (if properly referenced)

---

## Examples

### Example 1: Documentation Issue

```bash
gh issue create \
  --title "Document GitHub Issue Creation And Labeling Standards" \
  --body "..." \
  --label "documentation,ai,quickwin" \
  --milestone "Milestone 1: Public Landing Live"
```

### Example 2: Backend Feature

```bash
gh issue create \
  --title "Implement Waitlist Email Validation And Duplicate Prevention" \
  --body "..." \
  --label "backend,ai" \
  --milestone "Milestone 1: Public Landing Live"
```

### Example 3: Full-Stack Feature

```bash
gh issue create \
  --title "Implement Blog System With Notion Integration" \
  --body "..." \
  --label "backend,frontend,ai" \
  --milestone "Milestone 2: Blog System Live"
```

### Example 4: Strategic Decision

```bash
gh issue create \
  --title "Clarify Multi-Language Strategy And Implementation Plan" \
  --body "..." \
  --label "documentation,copywriting,seo,human" \
  --milestone "Milestone 1: Public Landing Live"
```

---

## Common Mistakes to Avoid

❌ Using taxonomy prefixes in title: `docs: Update README`
✅ Use labels instead: Title "Update README Documentation", Labels: `documentation`

❌ Splitting related work: "Blog Backend" + "Blog Frontend"
✅ One complete issue: "Implement Blog System", Labels: `backend,frontend`

❌ No milestone assigned
✅ Every issue has milestone

❌ Vague acceptance criteria: "Blog works"
✅ Specific checkboxes: "Blog index shows posts", "Blog post renders markdown"

❌ Missing "Why" section
✅ Clear problem statement explaining impact

---

## Related Documentation

- **Project Structure:** `docs/project-structure.md`
- **AI Contribution Guide:** `docs/development/ai-katki-rehberi.md`
- **ZEN Principles:** `docs/zen.md` (especially ZEN-SOLO-FIT)
