# PackedLink – Design Guide

This document defines PackedLink’s visual design and implementation rules. All UI implementations must follow these rules; use this file as the single source.

---

## 1. Color Palette

**Main theme: Warm neutrals + terracotta accent** (values are defined as design tokens in `globals.css`; do not use direct hex/rgba in components)

### Primary Colors

* **Warm background:** `#FDFAF4` → token: `--color-bg-warm`
  * The base background for page surfaces.

* **Cream background:** `#F5F0E8` → token: `--color-cream` / `--color-background`
  * Alternative soft background to separate sections.

* **Surface color (card background):** `#FFFFFF` → token: `--color-surface`
  * Background for list cards, modal interiors, form areas.

* **Border:** `#E8DFD3` → token: `--color-border`
  * Thin lines, card edges, dividers.

### Secondary Colors

* **Terracotta accent:** `#C8734C` → token: `--color-accent` (hover/active variants: `--color-accent-hover`, `--color-accent-active`)
  * CTA buttons, key emphasis areas, link bars.

* **Sage (secondary accent):** `#7A8F6F` → token: `--color-sage`
  * Used sparingly for secondary emphasis areas.

### Text Colors

* **Primary text:** `#2C2419` → token: `--color-text-primary`.
* **Secondary text:** `#6B6159` → token: `--color-text-secondary`.
* **Heading support color:** `#8B7355` → token: `--color-brown` (for heading accent when needed; avoid overuse).

**Token reference (globals.css):**
`--color-bg-warm`, `--color-cream`/`--color-background`, `--color-surface`, `--color-border`, `--color-accent` (+hover/active), `--color-sage`, `--color-text-primary`, `--color-text-secondary`, `--color-brown`, `--color-text-on-dark-*`, `--color-border-on-dark*`.

**Note:** Old coral/electric blue notes are removed; brand feel is set by warm neutrals + terracotta accent. If a theme variant is added, update the token set.

---

## 2. Typography

### Font Family
System sans-serif.
Example: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

### Sizes (web)

* Main body text: 16px.
* Small helper text: 14px.
* Card titles: 18–20px.
* Page titles: 24–32px depending on breakpoint.

### Weights

* Body text: `font-normal` (400).
* Important emphasis: `font-medium` (500).
* Headings: `font-semibold` (600).
* Use `bold` (700) only in very limited cases (e.g., brutal button text).

### Style

* Use italics rarely.
* Underline only for real links.

---

## 3. Spacing and Layout

**Scale (globals.css):** `spacing-xxs`, `xs`, `sm`, `md`, `lg`, `xl` (nominal 4x layered scale). **Always write the spacing token in use; do not write raw px.**

- **Page and container:** `spacing-sm` or `spacing-md` on mobile; `spacing-lg` on desktop. Default container padding is `spacing-lg`.
- **Section spacing:** `spacing-lg`/`spacing-xl` between major blocks; `spacing-sm`/`spacing-md` for vertical stacks inside.
- **Cards:** Inner padding `spacing-sm`/`spacing-md`; grid gap between cards `spacing-sm`/`spacing-md`.
- **List rows:** Vertical padding `spacing-xs`/`spacing-sm`; don’t go below `spacing-xxs`.
- **Form controls:** Input/textarea padding horizontal `spacing-sm`, vertical `spacing-xs`; label bottom margin `spacing-xs`.
- **Buttons:** Vertical `spacing-xs`, horizontal `spacing-lg`; min-height is enforced by the button section standard.
- **General rule:** Keep the same spacing level within the same block; avoid off-scale (non-token) values for consistency.

---

## 4. Border Radius, Borders, and Shadows

### Border Radius

* Default radius: **4px**.
* Use 4px for almost everything, including avatars.
* Avoid fully rounded shapes (e.g., `rounded-full`) as much as possible.

### Borders

* Cards: 1px solid, typically `--color-border` or a tone close to the theme color.
* In-section dividers: thin borders or subtle separator lines (light grays via tokens).

### Shadows

* Light shadow is enough to lift cards from the background.
* Avoid heavy, blurry shadows.

---

## 5. Card and Button Rules

### Cards

Each card should have a clear hierarchy:

1. User avatar
2. Username + user handle
3. List logo + list title
4. Link rows
5. Small description + call-to-action at the bottom (e.g., "Copy link").

### Buttons

* **Radius:** 4px.
* **Height:** minimum 32–36px.
* **Text:** short, clear command sentence. Examples: "Copy link", "Share list".

#### Button Variants and Color Rules

**Primary Button (CTA):**
* **On light backgrounds (warm/white):** Use the terracotta accent token (`--color-accent` and hover/active variants).
  * Text: `--color-text-on-dark-primary` or another high-contrast light/dark text token for surfaces like `--color-surface`.
  * Rationale: Ensures CTA visibility on warm neutral backgrounds.

* **On dark backgrounds (brown/terracotta tones):** Text uses `--color-text-on-dark-*`; choose accent or another contrasting token for the background (e.g., light text on `--color-accent`).

**Ghost Button (Secondary action):**
* **On dark backgrounds:** Transparent + `--color-border-on-dark` + `--color-text-on-dark-*` tokens.
  * Hover: Increase border opacity, use a subtle overlay token.

* **On light backgrounds:** Border and text use primary tokens (`--color-border`, `--color-text-primary`).
  * Hover: Lighten the background with a token like `--color-surface-muted`.

**Critical Rule:**
Never set the button background the same as the page background. The button disappears and the CTA loses visibility.

### Link Rows

* Solid color bar 2–6px wide on the left (`--color-accent`).
* Top line is the title, bottom line is a short description.
* The entire row is a clickable area.

---

## 6. Component Checklist

When implementing each new UI component, verify:

- [ ] Is the color palette aligned? (tokens: warm background, cream, surface, accent terracotta)
- [ ] Are font sizes correct? (16px base, 14px small)
- [ ] Is spacing in multiples of 4? (via token or variable)
- [ ] Is border radius 4px?
- [ ] Is the shadow light?
- [ ] Is button height between 32-36px?
- [ ] Do link rows have a left bar? (accent token)
- [ ] Is the hierarchy inside cards clear?

---

## Implementation Rules (Developer)

- **Style approach:** Only CSS Modules + semantic class names. No utility classes, no inline styles.
- **Design tokens mandatory:** Pull color, spacing, font-size, radius values from tokens; do not write hex/rgba/hsl in components.
- **File structure:** Each component should have its own `.module.css` file; page-specific styles also use modules.
- **Naming:** Class names should describe the element’s role (`container`, `title`, `ctaButton`), not the style effect (`flex`, `gap16`).
- **Context awareness:** Use `--color-*-on-dark-*` tokens for dark backgrounds; `--color-text-*` etc. for light backgrounds.
- **Enforcement:** Hardcoded colors are forbidden by the stylelint/validate script; keep token definitions in `globals.css` up to date.
- **Reuse:** For shared layouts/pattern needs, use semantic classes and tokens instead of defining new utilities.

---

## 7. Usage Note

When adding new UI:

1. Check the color, font, and spacing rules in this document.
2. Take examples from existing components (for consistency).
3. Avoid unnecessary decoration or divergent styling.

This file is the reference point to maintain PackedLink’s visual consistency.
