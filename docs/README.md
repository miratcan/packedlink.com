# Docs Guide & Single Source of Truth

> **Note for AI Agents:** This is the complete documentation index. If you're new, start with `AGENTS.md` at the project root for the onboarding workflow. This file is your **reference guide** when you need to look up specific documentation during tasks.

This folder keeps a single canonical file for each topic; summaries don't repeat content, they only reference it.

## Canonical Files
- **Principles/Vision:** `docs/zen.md`
- **Story & Market:** `docs/vision.md`
- **Features:** `docs/product/features.md` (complete feature overview, Free vs Pro)
- **Personas:** `docs/product/personas.md`
- **Design/Style:** `docs/product/design-guide.md` (implementation note: `docs/development/css-guide.md`)
- **Tech Stack:** `docs/technical/tech-stack.md` (what we use and how)
- **Technical Decisions:** `docs/technical/technical-decisions.md` (strategic decisions)
- **Brand Voice:** `docs/marketing/brand-voice.md`
- **SEO/Blog:** `docs/marketing/seo-content-strategy.md`
- **Analytics/Event Mechanism:** `docs/marketing/analytics-strategy.md`
- **Project Structure:** `docs/project-structure.md`
- **Getting Started:** `docs/development/getting-started.md` (local development setup)
- **GitHub Workflow:** `docs/development/github-workflow.md`
- **Deployment:** `docs/deployment/guide.md`

## Current Phase Goals

Current phase and sprint goals are tracked in [GitHub Milestones](https://github.com/miratcan/packedlink.com/milestones).

Active milestones:
- **Milestone 1: Public Landing Live** - Initial landing page with waitlist
- **Milestone 2: Blog System Live** - Blog system with Notion integration

Check milestone descriptions for acceptance criteria and progress tracking.

## Rules

### 1. Single Source Principle
When adding new information, update the relevant canonical file first; if another document needs a summary, only link/pull data—never copy content.

**Why?** ZEN-SOLO-FIT and ZEN-ONE-JOB: For simplicity sustainable by one person, every topic has one source with no duplicate content.

### 2. Keep docs/ Minimal (Critical for AI Agents)

**docs/ is frequently read by AI agents; don’t bloat it.**

**docs/ is for:**
- Strategic decisions (Why Django? Why Notion?)
- Architectural choices (How does the blog system work?)
- Historical context (Why was X chosen?)
- Product vision and principles

**docs/ is NOT for:**
- Implementation details (How was the blog sync script written?)
- Code snippets (exact TypeScript code)
- Exact file paths (`/Users/mirat/...`)
- Problem-solving notes (Here’s how X error was fixed)

**Where to put those:**
- **Issue comments:** "Blog system was built with Notion + Django + Next.js. Rationale: [1] ZEN-EASIEST-PATH, [2] SSG needed for SEO"
- Technical decisions made during work → issue comment
- Problems encountered and solutions → issue comment

**Example:**
- ❌ Create `docs/technical/blog-system.md` and write implementation details
- ✅ Issue comment: "We used the Notion API because it's easiest for the content team"

---

## Maintenance & Review Process

### Why Regular Reviews?

docs/ will naturally accumulate outdated info, implementation details, and unnecessary files over time. Regular reviews keep it lean and maintainable for a solo founder (**ZEN-SOLO-FIT**).

### Review Triggers (When to Review)

**Milestone completion** - At the end of each major milestone:
1. Review all docs/ files modified during the milestone
2. Move implementation details to issue comments
3. Remove outdated information
4. Update canonical files if strategic decisions changed

**Quarterly cleanup** - Every 3 months:
1. Scan docs/ for files >200 lines (may need splitting or trimming)
2. Check for duplicate content across files
3. Verify all cross-references are valid
4. Remove deprecated documentation

**Before major releases** - Clean house before v1.0, v2.0, etc.

### Review Checklist

For each file in docs/, ask:

**Strategic value:**
- [ ] Does this contain strategic "why" decisions?
- [ ] Is this historical context that informs future decisions?
- [ ] Is this product vision/principles?

**Implementation details (REMOVE if yes):**
- [ ] Does this contain code snippets?
- [ ] Does this explain "how" something was built?
- [ ] Does this document specific file paths or exact implementations?
- [ ] Could this live in an issue comment instead?

**Maintenance:**
- [ ] Is this information still accurate?
- [ ] Are there broken references to deleted files?
- [ ] Is this duplicated elsewhere?

### Enforcement Tools

**Manual review:**
```bash
# Find large files (potential bloat)
find docs/ -name "*.md" -exec wc -l {} \; | sort -rn | head -10

# Find recently modified docs (review these first)
find docs/ -name "*.md" -mtime -30 -ls
```

**AI agent reminder:**
- AGENTS.md already emphasizes "Keep docs/ Minimal" rule
- Review this section during milestone-end handoff

**GitHub issue template:**
When closing milestone, create "docs/ Review" issue with this checklist

### Max File Size Guidelines

**Hard limits:**
- Core philosophy (zen.md): 150 lines max
- Technical decisions: 200 lines max (keep only strategic decisions)
- Product docs: 300 lines max (beyond this, split into focused files)

**If a file exceeds limits:**
1. Remove implementation details → issue comments
2. Split into focused sub-documents if truly necessary
3. Verify every line provides strategic value

### Red Flags (Immediate Action Required)

If you see these in docs/, move to issue comments immediately:
- Code snippets (except minimal DO/DON'T examples in tech-stack.md)
- Step-by-step "how I built X" narratives
- Debugging notes ("I fixed error Y by doing Z")
- Exact file paths from your local machine
- Screenshot explanations of UI flows
- Performance benchmarks or metrics

### Success Metrics

**Healthy docs/:**
- Total file count: <25 files
- Average file size: <150 lines
- No files >300 lines
- All cross-references valid
- No implementation details

**Review cadence:**
- Post-milestone: 100% compliance
- Quarterly: Zero broken references
- Annually: Full audit completed

---
