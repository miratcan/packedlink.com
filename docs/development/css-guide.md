# PackedLink – CSS Implementation Notes

This file gives developers quick guidance; the single source for style is `docs/product/design-guide.md`.

- Style approach: **CSS Modules only + semantic class names**; no utilities, no inline styles.
- **Design tokens are mandatory:** Pull color/spacing/font-size/radius values from tokens; do not write hex/rgba/hsl in components.
- Token source: `src/frontend/app/globals.css`. If a new value is needed, add it to the design guide first.
- Enforcement: stylelint rules + `./scripts/validate-design-tokens.sh` prevent hardcoded colors.

Use the “Implementation Rules” section in the design guide for detailed examples and a checklist.
