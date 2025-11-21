# Content & SEO Strategy (Continuous Production)

PackedLink’s growth does not start by relying on SEO; the primary distribution channel is real stories from Elif and Ali. Still, to keep content production disciplined, we follow a continuity-focused plan.

---

## 1. Purpose

- Make sharing easier with persona-based landings and content.
- Build an “example list” archive to reference the first 20 active users.
- Plant seeds for long-term SEO (clean URL + structured data) without setting traffic targets for now.

---

## 2. Content Pillars

| Pillar | For whom? | Content Type | Note |
|------|-----------|-------------|-----|
| **Use-case landings** | Elif, Ali, Resource curator | `/affiliate`, `/mekan`, `/kaynak` pages | Hero message + example lists + CTA |
| **Example lists** | New visitor | “Baby Shopping Guide”, “Kadıköy coffee tour” | Shows the product output, shareable |
| **Mini guides / blog** | Searching user | “How to end DM chaos?”, “Preparing a guide for WhatsApp” | 600-800 words, solves a persona problem |
| **Documentation content** | SEO’s future | Clean sitemap, structured data, metadata | Reminder for the technical team |

Every content piece should tie back to the theme of “not answering the same question twice.”

---

## 3. Keyword Approach

- **Low-volume, high-intent Turkish queries:** “link listesi oluştur”, “kaynakları tek linkte paylaş”, “dm sorularına tek link”.
- **Persona terms:** “affiliate linkleri düzenleme”, “arkadaşlara mekan rehberi yollama”, “öğrenci kaynak listesi”.
- Tooling: Manual SERP review + Search Console data is sufficient instead of Ahrefs/LowFruits.
- Target: Publish 5–10 pieces initially to see indexing; then maintain weekly/monthly steady production.

---

## 4. Technical SEO Minimum

1. **Clean URL structure**  
   - `/l/{slug}` for list, `/u/{username}` for profile. Title + description meta auto-generated.

2. **Structured Data (ItemList)**  
   - JSON-LD on public list pages so search engines understand lists.

3. **Open Graph / Twitter Cards**  
   - Default visuals/text when any list is shared; user can update (linked to question 3 in the Focus doc).

4. **Simple sitemap + robots**  
   - `site.com/sitemap.xml` and `robots.txt` automated with Next.js defaults/config.

---

## 5. Publishing Cadence and Backlog

- **Cadence:** At least 1 landing or example list + 1 mini guide/blog every week; increase if capacity allows but aim for sustainable pace.
- **Initial backlog:**
  - `/affiliate` and `/mekan` landings (persona problems + CTA)
  - Example list: “Baby Shopping Guide” (screenshot + real links)
  - Blog: “How many times have you answered the same question in DMs?” (shareable, social content)
  - `/kaynak` landing + teacher example list
- **From live usage:** Pilot user lists gathered in the “In Progress” blog section, published as they are completed.

---

## 6. Distribution

- **Instagram/TikTok DMs:** Persona-based landing URLs.
- **Twitter/LinkedIn:** Example list screenshot + “I made this list with PackedLink” copy.
- **Newsletter/WhatsApp:** Short copy + single link (platform tests).
- **SEO:** For now, Search Console + manual backlinks (personal blog, Medium) are enough.

---

## 7. Success Measurement

- Minimum 50 visits per content piece (social or direct).
- Landing → signup conversion ≥ 5% (event: `landing_signup_click`).
- Usage count of the “copy list” button from example lists.
- Number of indexed pages in Search Console (baseline > 0).

Each time new content is published, review the event plan in the analytics doc; if extra events are needed, note them here before adding.
