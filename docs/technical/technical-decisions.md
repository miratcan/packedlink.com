# Technical Decisions

This document contains strategic technical decisions and their rationale. For current tech stack, see `tech-stack.md`.

---

## URL Schema

### Structure

All lists use `shortuuid`-based unpredictable short IDs:
- Base: `packedlink.com/l/{hash_id}`
- With optional slug: `packedlink.com/l/{hash_id}/{optional_slug}`

### Resolution Logic

**Backend only looks at hash_id:**
- `7f4d2a9b` = list ID
- Slug is purely decorative
- `/l/7f4d2a9b` and `/l/7f4d2a9b/istanbul-restoranlar` show same list

**Slug access rules:**
- Free user + slug present → 404
- Pro user + slug present → Show list
- Pro users can change slug (old slugs still work)

### Examples

**Free User:**
- ✅ `packedlink.com/l/h7s9kd2m3p5q`
- ❌ `packedlink.com/l/h7s9kd2m3p5q/istanbul-restoranlar` (404)

**Pro User:**
- ✅ `packedlink.com/l/h7s9kd2m3p5q`
- ✅ `packedlink.com/l/h7s9kd2m3p5q/istanbul-restoranlar`
- ✅ `packedlink.com/l/h7s9kd2m3p5q/best-restaurants` (after slug change)

### Rationale

1. **Security:** shortuuid is unpredictable (critical for unlisted)
2. **SEO:** Pro users can add keywords to URL
3. **Consistency:** URL never changes (public↔unlisted transitions)
4. **Backward compatibility:** Old slugs keep working
5. **Monetization:** Clear Pro value proposition

---

## List Visibility

- **Public:** Shareable, Google-indexable
- **Unlisted:** Only those with link can see, not indexed
- ~~Private~~ No (we're not a bookmark manager)

---

## Language & Localization

### Current Phase

- **UI:** Single language (to be decided in Issue #12)
- **List-level language:** No language selection (Discover phase removed)
- **URL structure:** No language prefix (avoid SEO complexity)

### Global-First Design

- UTC timezone (local conversion in UI)
- International date formats
- Multi-currency ready (for Pro features)
- RTL support consideration (Arabic, Hebrew)

---

## Security

### Unlisted List Security

1. **Hash ID:** 12-character shortuuid (e.g., `h7s9kd2m3p5q`)
2. **Brute force protection:** Rate limiting
3. **No directory listing:** No random discovery
4. **No user enumeration:** Can't guess lists from username

### Authentication

- **Current:** Email + Password
- **Future consideration:** Magic link
- **Long-term:** Social login

---

## GDPR Basics (MVP Level)

### Required

1. **Privacy Policy** - What data we collect and why
2. **Cookie Banner** - Inform even for essential cookies
3. **Data Export** - Users can download their data (per ZEN-DATA-FREEDOM)
4. **Account Deletion** - Delete account = delete all data
5. **Email Consent** - Explicit opt-in for marketing

### NOT in MVP

- Cookie consent management platform
- Detailed audit logs
- Data Processing Agreements
- Automated GDPR request handling

### Implementation

Minimal cookie banner using localStorage, simple and non-intrusive.

---

## Draft State

- `is_draft = true` → Only owner can see
- `is_draft = false` → Visibility (public/unlisted) applies
- Optional `custom_slug` only for Pro users

---

**See also:**
- Tech Stack: `tech-stack.md`
- Analytics Strategy: `docs/marketing/analytics-strategy.md`
- Design Guidelines: `docs/product/design-guide.md`
