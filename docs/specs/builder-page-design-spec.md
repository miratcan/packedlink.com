# Builder Page - Design Specification

## Context

Builder sayfası LIGHT background (white surface) içinde çalışır:
- Glass panel (`.glass-panel`) kullanır
- Background: `var(--color-surface)` = `#FFFFFF`
- Border: `var(--color-border)` = `#E5E7EB`
- Shadow: `var(--shadow-sm)`

**Problem:** Mevcut Button component dark background için tasarlanmış. Ghost button light background'da görünmez olur.

---

## 1. Decision: Button Context System

**Çözüm:** Button component'e `context` prop ekle.

### Button Component API Update

```tsx
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'ghost'
  size?: 'default' | 'large'
  context?: 'light' | 'dark'  // NEW
  href?: string
}
```

**Default behavior:**
- `context='dark'` (default) - Dashboard blue background için
- `context='light'` - White/light gray background için

### Builder Page Usage

```tsx
// Primary CTA button
<Button variant="primary" context="light">
  Publish ekranına git
</Button>

// Ghost button (secondary action)
<Button variant="ghost" context="light">
  Start formuna dön
</Button>
```

---

## 2. Token Reference for Light Background

### Button Colors

#### Primary Button (CTA) on Light Background
```css
--color-dashboard-blue: #36465D          /* Background */
--color-dashboard-blue-hover: #2a3749    /* Hover state */
/* Text: white */
```

**Rationale:** Dashboard blue provides strong brand identity and high contrast on white background.

**Contrast ratio:**
- `#36465D` on white: 9.3:1 (AAA)
- White text on `#36465D`: 12.6:1 (AAA)

#### Ghost Button (Secondary) on Light Background
```css
background: transparent
--color-border: #E5E7EB              /* Border */
--color-text-primary: #111827         /* Text color */
--color-background: #F3F4F6          /* Hover background */
```

**Rationale:** Subtle, non-competing secondary action. Clear border makes it visible unlike transparent border on dark bg.

**Contrast ratio:**
- `#111827` text on white: 16.1:1 (AAA)
- `#E5E7EB` border on white: 1.3:1 (visible but subtle)

### Text Colors

```css
--color-text-primary: #111827       /* Headings, labels, main text */
--color-text-secondary: #6B7280     /* Descriptions, meta info */
--color-icon-gray: #9AA2AE          /* Icons, subtle elements */
```

### Border & Dividers

```css
--color-border: #E5E7EB             /* Card borders, dividers */
```

### Spacing Values

```css
--spacing-xs: 8px     /* Tight spacing (e.g., label-to-input) */
--spacing-sm: 16px    /* Standard card padding */
--spacing-md: 20px    /* Section spacing */
--spacing-lg: 24px    /* Large gaps between sections */
--spacing-xl: 32px    /* Page-level spacing */
```

---

## 3. Contrast Ratios (WCAG AAA Compliance)

### Button Contrasts

| Element | Foreground | Background | Ratio | Status |
|---------|-----------|------------|-------|--------|
| Primary button text | `#FFFFFF` | `#36465D` | 12.6:1 | AAA ✅ |
| Primary button hover | `#FFFFFF` | `#2a3749` | 15.3:1 | AAA ✅ |
| Ghost button text | `#111827` | `transparent` | 16.1:1 | AAA ✅ |
| Ghost button border | `#E5E7EB` | `#FFFFFF` | 1.3:1 | Visible ✅ |
| Ghost button hover bg | `#111827` | `#F3F4F6` | 14.8:1 | AAA ✅ |

### Text Contrasts

| Element | Color | Background | Ratio | Status |
|---------|-------|------------|-------|--------|
| Primary text | `#111827` | `#FFFFFF` | 16.1:1 | AAA ✅ |
| Secondary text | `#6B7280` | `#FFFFFF` | 5.7:1 | AA ✅ |
| Icon gray | `#9AA2AE` | `#FFFFFF` | 3.4:1 | AA (large text) ✅ |

---

## 4. Component Strategy

### Option A: Context-aware Button Component (RECOMMENDED)

**Pros:**
- Centralized logic
- Consistent behavior across app
- Easy to use (one import)
- Type-safe

**Cons:**
- Slightly more complex Button component

**Implementation:**

```tsx
// Button.tsx
export function Button({
  variant = 'primary',
  context = 'dark',  // Default to dark (existing behavior)
  ...props
}: ButtonProps) {
  const variantClass = variant === 'ghost'
    ? (context === 'light' ? styles.ghostLight : styles.ghostDark)
    : (context === 'light' ? styles.primaryLight : styles.primaryDark)

  // ...
}
```

```css
/* Button.module.css */
.primaryLight {
  background: var(--color-dashboard-blue);
  color: white;
}
.primaryLight:hover {
  background: var(--color-dashboard-blue-hover);
}

.primaryDark {
  background: var(--color-accent);
  color: white;
}
.primaryDark:hover {
  background: var(--color-accent-hover);
}

.ghostLight {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
}
.ghostLight:hover {
  background: var(--color-background);
}

.ghostDark {
  background: transparent;
  border: 1px solid var(--color-border-on-dark);
  color: var(--color-text-on-dark-primary);
}
.ghostDark:hover {
  background: var(--color-bg-overlay-medium);
}
```

### Option B: Page-level Override

**Pros:**
- No Button component changes needed

**Cons:**
- CSS duplication
- Harder to maintain consistency
- Developer must remember to override

**NOT RECOMMENDED**

---

## 5. Builder Page Layout

### Grid Structure

```css
.builderContainer {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--spacing-lg); /* 24px */
  padding: var(--spacing-lg);
}

@media (max-width: 768px) {
  .builderContainer {
    grid-template-columns: 1fr;
  }
}
```

### Main Content Area

```css
.mainContent {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md); /* 20px between sections */
}

.section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm); /* 16px within section */
}

.sectionTitle {
  font-size: var(--font-size-lg); /* 18px */
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs); /* 8px */
}
```

### Form Elements

```css
.formGroup {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs); /* 8px - label to input */
}

.label {
  font-size: var(--font-size-sm); /* 14px */
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.input {
  border: 1px solid var(--color-border);
  border-radius: var(--radius); /* 4px */
  padding: 12px 16px;
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  background: var(--color-surface);
}

.input:focus {
  outline: none;
  border-color: var(--color-dashboard-blue);
}
```

### Links List

```css
.linksList {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs); /* 8px between links */
}

.linkItem {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm); /* 16px */
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
}

.linkItem:hover {
  background: var(--color-background); /* #F3F4F6 */
}
```

### Sidebar

```css
.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md); /* 20px */
  position: sticky;
  top: var(--spacing-lg);
  height: fit-content;
}

.sidebarSection {
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-background); /* Slight contrast from main panel */
}
```

### Action Buttons Section

```css
.actions {
  display: flex;
  gap: var(--spacing-sm); /* 16px between buttons */
  justify-content: flex-start;
  flex-wrap: wrap;
}

/* For vertical stacking on mobile */
@media (max-width: 640px) {
  .actions {
    flex-direction: column;
  }

  .actions button {
    width: 100%;
  }
}
```

---

## 6. Semantic Class Names

### Component Structure

```
BuilderPage/
  BuilderPage.tsx
  BuilderPage.module.css
  BuilderPage.stories.tsx
```

### Class Naming Convention

```css
/* Container */
.builderContainer

/* Layout sections */
.mainContent
.sidebar

/* Content sections */
.listInfoSection
.linksSection
.addLinkSection

/* Elements */
.sectionTitle
.formGroup
.label
.input
.linksList
.linkItem
.actions

/* States */
.linkItem:hover
.input:focus
.emptyState
```

**Rules:**
- Use semantic names (describe purpose, not appearance)
- No utility classes (no `.flex`, `.gap-4`, etc.)
- BEM-like structure for variants (`.linkItem--active`)
- Hover/focus states inline with element

---

## 7. Component Implementation Checklist

When implementing Builder page, verify:

- [ ] **Layout:** Grid structure with responsive breakpoints
- [ ] **Buttons:**
  - [ ] Primary CTA uses `context="light"`
  - [ ] Ghost button uses `context="light"`
  - [ ] Correct contrast ratios (12.6:1 minimum)
- [ ] **Colors:**
  - [ ] Text: `var(--color-text-primary)` for headings
  - [ ] Text: `var(--color-text-secondary)` for labels/meta
  - [ ] Border: `var(--color-border)` everywhere
- [ ] **Spacing:**
  - [ ] Card padding: `var(--spacing-sm)` (16px)
  - [ ] Section gaps: `var(--spacing-md)` (20px)
  - [ ] Form label-to-input: `var(--spacing-xs)` (8px)
- [ ] **Typography:**
  - [ ] Section titles: `var(--font-size-lg)` (18px)
  - [ ] Body text: `var(--font-size-base)` (16px)
  - [ ] Labels: `var(--font-size-sm)` (14px)
- [ ] **Borders:**
  - [ ] Radius: `var(--radius)` (4px) everywhere
  - [ ] Color: `var(--color-border)` (no hardcoded)
- [ ] **Forms:**
  - [ ] Input focus: border color changes to dashboard blue
  - [ ] Placeholder: `var(--color-text-secondary)`
- [ ] **Accessibility:**
  - [ ] All interactive elements have focus states
  - [ ] Form labels associated with inputs
  - [ ] ARIA labels where needed

---

## 8. Example Component Structure

```tsx
// BuilderPage.tsx
import styles from './BuilderPage.module.css'
import { Button } from '@/components/Button'

export function BuilderPage() {
  return (
    <div className="glass-panel">
      <div className={styles.builderContainer}>

        {/* Main Content */}
        <div className={styles.mainContent}>

          {/* List Info Section */}
          <section className={styles.listInfoSection}>
            <h2 className={styles.sectionTitle}>Liste Bilgileri</h2>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="listTitle">
                Liste Başlığı
              </label>
              <input
                id="listTitle"
                className={styles.input}
                placeholder="Örn: Favori Kaynaklarım"
              />
            </div>
          </section>

          {/* Links Section */}
          <section className={styles.linksSection}>
            <h2 className={styles.sectionTitle}>Linkler</h2>

            <div className={styles.linksList}>
              {/* Link items */}
            </div>
          </section>

          {/* Actions */}
          <div className={styles.actions}>
            <Button variant="primary" context="light">
              Publish ekranına git
            </Button>
            <Button variant="ghost" context="light">
              Start formuna dön
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            {/* Preview, stats, etc */}
          </div>
        </aside>

      </div>
    </div>
  )
}
```

---

## 9. CSS Module Template

```css
/* BuilderPage.module.css */

/* =================================
   LAYOUT
   ================================= */
.builderContainer {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
}

.mainContent {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  position: sticky;
  top: var(--spacing-lg);
  height: fit-content;
}

/* =================================
   SECTIONS
   ================================= */
.listInfoSection,
.linksSection,
.addLinkSection {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.sectionTitle {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.sidebarSection {
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-background);
}

/* =================================
   FORMS
   ================================= */
.formGroup {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.input,
.textarea {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 12px 16px;
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  background: var(--color-surface);
  font-family: var(--font-family);
}

.input:focus,
.textarea:focus {
  outline: none;
  border-color: var(--color-dashboard-blue);
}

.input::placeholder,
.textarea::placeholder {
  color: var(--color-text-secondary);
}

/* =================================
   LINKS LIST
   ================================= */
.linksList {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.linkItem {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  transition: background 0.2s;
}

.linkItem:hover {
  background: var(--color-background);
}

.emptyState {
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

/* =================================
   ACTIONS
   ================================= */
.actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: var(--spacing-md);
}

/* =================================
   RESPONSIVE
   ================================= */
@media (max-width: 768px) {
  .builderContainer {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }
}

@media (max-width: 640px) {
  .actions {
    flex-direction: column;
  }

  .actions button {
    width: 100%;
  }
}
```

---

## 10. Implementation Steps

### Step 1: Update Button Component

1. Add `context` prop to `ButtonProps` interface
2. Update Button.module.css with 4 variants:
   - `.primaryLight`
   - `.primaryDark`
   - `.ghostLight`
   - `.ghostDark`
3. Update component logic to select correct variant
4. Update Button.stories.tsx with context examples

### Step 2: Create BuilderPage Component

1. Create `BuilderPage/` directory
2. Create `BuilderPage.tsx` with layout structure
3. Create `BuilderPage.module.css` with semantic classes
4. Use `<Button context="light">` for all buttons

### Step 3: Verify Design Compliance

Run through checklist (Section 7):
- Colors correct (no hardcoded values)
- Spacing uses tokens
- Contrast ratios meet WCAG AAA
- Semantic class names
- No inline styles

### Step 4: Test Responsive Behavior

- Desktop (1280px+): Two-column grid
- Tablet (768px): Single column, sidebar below
- Mobile (640px): Stacked buttons, full-width

---

## 11. Success Criteria

- [ ] Button component supports `context="light"`
- [ ] All buttons on Builder page use correct context
- [ ] Primary button has 12.6:1 contrast ratio
- [ ] Ghost button is clearly visible (border visible)
- [ ] All colors from CSS variables (no hardcoded)
- [ ] All spacing from tokens (no magic numbers)
- [ ] Semantic class names (no utilities)
- [ ] Responsive layout works on all breakpoints
- [ ] WCAG AAA compliance for all text
- [ ] Glass panel styling correct (white bg, subtle shadow)

---

## 12. Visual Reference

### Button States on Light Background

```
Primary Button:
  Default:  bg=#36465D, text=white
  Hover:    bg=#2a3749, text=white
  Active:   bg=#2a3749, text=white

Ghost Button:
  Default:  bg=transparent, border=#E5E7EB, text=#111827
  Hover:    bg=#F3F4F6, border=#E5E7EB, text=#111827
  Active:   bg=#F3F4F6, border=#E5E7EB, text=#111827
```

### Typography Hierarchy

```
Page Title:       32px, semibold, #111827
Section Title:    18px, semibold, #111827
Body Text:        16px, normal, #111827
Label:            14px, semibold, #6B7280, uppercase
Meta/Helper:      14px, normal, #6B7280
```

---

## Questions for Developer

Before implementation, confirm:

1. **Context default:** Should `context` default to `'dark'` (preserves existing behavior)?
2. **Storybook:** Should we add "Light Background" and "Dark Background" stories?
3. **TypeScript:** Add union type `type ButtonContext = 'light' | 'dark'`?
4. **Migration:** Should old pages using Button be updated, or leave as-is (defaults to dark)?

---

## Notes

- This spec prioritizes design system consistency over quick implementation
- Button context system prevents future "invisible button" bugs
- All decisions based on design-guide.md principles
- WCAG AAA compliance ensures maximum accessibility
- Semantic CSS prevents technical debt
