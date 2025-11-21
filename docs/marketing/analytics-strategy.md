# Analytics & Measurement Strategy

Measurement at PackedLink follows the **ZEN-MEASURE-FIRST** rule in Zen: we decide with data, not feelings, but keep it simple for the solo-founder reality. This document covers the minimum setup needed to see whether the core flow works.

---

## 1. What Do We Measure? (Mechanism)

Flows tracked continuously:
1. **Activation:** Rate of signups creating their first public list
2. **Depth of use:** Links added per person over time
3. **Sharing:** List sharing action (copy link / social button)
4. **Performance:** Mobile LCP measurement

These signals show whether the core flow works; metric thresholds/targets are set separately based on periodic decisions.

---

## 2. Stack (Now and Near Future)

| Layer | Tool | Note |
|--------|------|-----|
| Event tracking | Supabase (Postgres) `product_events` table | Events written through the auth server |
| Product analytics | PostHog (cloud, 1M events free) | Funnel + retention dashboard |
| Traffic/perf | Vercel Analytics + Web Vitals script | Enough for <3s load goal |
| Error tracking | Sentry (free tier) | Optional, production errors only |

Self-hosting not required; start with PostHog cloud, export to Supabase later.

---

## 3. Event Schema

| Event | When? | Important Fields |
|-------|-----------|----------------|
| `user_signed_up` | When signup completes | `user_id`, `persona_guess`, `source` |
| `list_created` | When a list is saved | `list_id`, `is_public`, `link_count` |
| `link_added` | When a link is added | `list_id`, `has_metadata`, `entry_method` |
| `list_shared` | When share button is used or link is copied | `list_id`, `channel`, `link_count` |
| `session_device` | When a user session starts | `device`, `width`, `locale` |

All events are written to Supabase first, then forwarded to PostHog. This keeps data in our database.

---

## 4. Dashboard & Ritual

### Weekly (founder check-in)
- Signup → first public list conversion (trend)
- Average links per user (trend)
- Percentage of users who share (trend)
- Mobile LCP average (if Web Vitals data exists)

### Monthly
- Active curator count (trend)
- Persona source breakdowns (which channel/message works better?)
- Top 5 most shared lists (for learnings)

Dashboard lives in PostHog; write a short summary every Monday.

---

## 5. Consent & Privacy

- Do not put PII like email/name into events; use user_id only.
- If a user requests export, include events from Supabase.
- Cookie banner: Automated events are optional; if declined, measure only anonymous performance.

---

## 6. Notes for Future Phases

When moving into the Pro + example guide content phase:
- Additional events for click sources (affiliate)
- Performance measurement for landing/blog content
- Metabase/PostHog export for cohort reports

Thresholds/targets are set by periodic decision; this document only describes mechanisms.
