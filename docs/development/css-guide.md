# CSS & Styling Guide

Bu doküman Kaydet.link projesinde CSS ve styling kurallarını tanımlar.

---

## Temel Prensipler

### 1. Semantik Class İsimleri - ZORUNLU

**KURAL:** Tüm class isimleri semantik olmalı. Utility class yaklaşımı yasaktır.

❌ **YANLIŞ:**
```tsx
<div className="flex gap-xl p-lg">
<h1 className="text-3xl font-semibold text-primary">
```

✅ **DOĞRU:**
```tsx
<div className={styles.container}>
<h1 className={styles.title}>
```

**Neden?**
- Utility classes stilin ne yaptığını söyler (flex, gap, padding)
- Semantic classes elementin ne olduğunu söyler (container, title, card)
- Semantic isimlendirme maintainability artırır
- Design değişikliklerinde HTML'e dokunmadan CSS'i değiştirebilirsin

---

## CSS Modules Kullanımı

### Her Component Kendi CSS Module'üne Sahip

```
components/
  Button/
    Button.tsx
    Button.module.css  ← Component-specific styles
  Card/
    Card.tsx
    Card.module.css
```

### Örnek: Button Component

**Button.tsx:**
```tsx
import styles from './Button.module.css'

export function Button({ children, type = 'button' }: ButtonProps) {
  return (
    <button className={styles.button} type={type}>
      {children}
    </button>
  )
}
```

**Button.module.css:**
```css
.button {
  padding: 12px 24px;
  border-radius: var(--radius);
  background: var(--color-dashboard-blue);
  color: white;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  min-height: 36px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.button:hover {
  opacity: 0.9;
}
```

---

## Global Styles (globals.css)

### İzin Verilen Global Stiller:

1. **CSS Variables (Design Tokens)**
```css
:root {
  --color-dashboard-blue: #36465D;
  --spacing-xl: 32px;
  --font-size-base: 16px;
}
```

2. **Base Element Resets**
```css
* { box-sizing: border-box; }
body { font-family: var(--font-family); }
```

3. **Reusable Component Classes** (layout patterns)
```css
.container {
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.glass-panel {
  border-radius: var(--radius);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}
```

### YASAK: Utility Classes

❌ globals.css'de bunlar OLMAMALI:
```css
/* YANLIŞ - Utility classes yasak */
.flex { display: flex; }
.gap-xl { gap: 32px; }
.text-primary { color: #111827; }
.p-lg { padding: 24px; }
```

Bunun yerine component CSS module'lerinde semantik isimlerle kullan.

---

## Sayfalar (Pages)

Page component'leri de CSS modules kullanır:

```
app/
  design-system/
    page.tsx
    page.module.css  ← Page-specific styles
```

**page.tsx:**
```tsx
import styles from './page.module.css'

export default function DesignSystemPage() {
  return (
    <div className={styles.showcase}>
      <header className={styles.header}>
        <h1 className={styles.title}>Design System</h1>
      </header>
      <section className={styles.section}>
        {/* ... */}
      </section>
    </div>
  )
}
```

---

## Kompozisyon

### Birden Fazla Class

```tsx
// clsx kullan
import clsx from 'clsx'

<div className={clsx(styles.card, isActive && styles.active)}>
```

### Variant Pattern

```css
/* Card.module.css */
.card {
  /* base styles */
}

.card.highlighted {
  border-color: var(--color-accent);
}
```

```tsx
<div className={clsx(styles.card, highlighted && styles.highlighted)}>
```

---

## Design Tokens

Tüm değerler CSS variables üzerinden alınmalı:

✅ **DOĞRU:**
```css
.title {
  font-size: var(--font-size-3xl);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
}
```

❌ **YANLIŞ:**
```css
.title {
  font-size: 32px;  /* Hard-coded değer */
  color: #111827;   /* Hard-coded renk */
  margin-bottom: 24px; /* Hard-coded spacing */
}
```

---

## RENK KULLANIMI - KRİTİK KURAL

### ❌ TAMAMEN YASAK

Hardcode renk kullanımı **kesinlikle yasaktır**:

```css
/* YANLIŞ - Hardcode hex renkler */
.title {
  color: #FFFFFF;
  background: #36465D;
}

/* YANLIŞ - Hardcode rgba */
.description {
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* YANLIŞ - Hardcode rgb, hsl */
.card {
  background: rgb(54, 70, 93);
  color: hsl(0, 0%, 100%);
}
```

### ✅ ZORUNLU: Semantic Design Tokens

**Tüm renkler globals.css'de tanımlı semantic token olmalı:**

```css
/* DOĞRU - Design token kullanımı */
.title {
  color: var(--color-text-on-dark-primary);
}

.description {
  color: var(--color-text-on-dark-secondary);
}

.button {
  border: 1px solid var(--color-border-on-dark);
}

.overlay {
  background: var(--color-bg-overlay-subtle);
}
```

### Semantic İsimlendirme Kuralları

1. **Context-aware tokenlar kullan:**
   - `--color-text-on-dark-primary` (✅) vs `--color-white-95` (❌)
   - `--color-border-on-dark` (✅) vs `--color-white-30` (❌)
   - `--color-bg-overlay-subtle` (✅) vs `--color-rgba-8` (❌)

2. **Semantic hiyerarşi:**
   ```css
   /* Text - Dark backgrounds */
   --color-text-on-dark-primary: rgba(255, 255, 255, 0.95);    /* Ana başlıklar */
   --color-text-on-dark-secondary: rgba(255, 255, 255, 0.75);  /* Alt başlıklar */
   --color-text-on-dark-tertiary: rgba(255, 255, 255, 0.7);    /* Açıklamalar */
   --color-text-on-dark-muted: rgba(255, 255, 255, 0.6);       /* Muted text */
   --color-text-on-dark-subtle: rgba(255, 255, 255, 0.5);      /* En soluk */

   /* Borders - Dark backgrounds */
   --color-border-on-dark: rgba(255, 255, 255, 0.3);
   --color-border-on-dark-hover: rgba(255, 255, 255, 0.5);

   /* Backgrounds - Overlays */
   --color-bg-overlay-subtle: rgba(255, 255, 255, 0.08);
   --color-bg-overlay-medium: rgba(255, 255, 255, 0.1);
   --color-bg-overlay-strong: rgba(255, 255, 255, 0.15);
   ```

3. **İnteraktif state'ler için:**
   ```css
   --color-accent: #56BC8A;
   --color-accent-hover: #4AAC7A;
   --color-accent-active: #3E9A6E;
   ```

### Token Ekleme Süreci

Yeni bir renk değerine ihtiyacın varsa:

1. **Designer sorumluluğu:**
   - Rengi `globals.css`'e semantic isimle ekle
   - Design guide'da dokümante et
   - Semantic isimlendirme kullan (context + purpose)

2. **Developer sorumluluğu:**
   - Asla hardcode renk yazma
   - Token yoksa designer'a bildir
   - Temporary olarak da hardcode yapma

### Designer Audit Sorumluluğu

Designer tüm CSS dosyalarında token dışı renk kullanımını **sürekli audit etmelidir**:

```bash
# Hardcode renk kontrolü
grep -r "rgba\|#[0-9A-Fa-f]\{3,6\}" src/frontend/**/*.module.css
```

Hardcode renk bulunursa **derhal düzeltilmelidir**.

### Enforcement (Zorunlu)

#### 1. Stylelint Rules

`src/frontend/.stylelintrc.json` dosyası aktif olarak hardcode renkleri engeller:

```json
{
  "rules": {
    "color-no-hex": true,
    "function-disallowed-list": ["rgba", "rgb", "hsl", "hsla"],
    "declaration-property-value-disallowed-list": {
      "/^(color|background|background-color|border|border-color)$/": [
        "/^#/",
        "/^rgba/",
        "/^rgb/",
        "/^hsl/",
        "/^hsla/"
      ]
    },
    "color-named": "never"
  }
}
```

#### 2. Validation Script (Her commit öncesi çalıştır)

```bash
# Tüm CSS dosyalarında hardcode renk kontrolü
./scripts/validate-design-tokens.sh
```

**Çıktı:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 Design Token Validation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Checking for hex colors...
✅ No hex colors found

Checking for rgba() functions...
✅ No rgba() functions found

Checking for rgb() functions...
✅ No rgb() functions found

Checking for hsl/hsla() functions...
✅ No hsl/hsla() functions found

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ PASSED: All colors use design tokens!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Eğer hardcode renk bulunursa script hata verir ve commit yapılamaz.

#### 3. Designer Validation Checklist

Her implementation sonrası Designer şu checklist'i kullanmalı:


Pre-implementation spec'ten post-implementation validation'a kadar tüm adımları içerir.

---

## Checklist

### Developer (Implementation sırasında):

- [ ] Component kendi `.module.css` dosyasına sahip mi?
- [ ] Tüm class isimleri semantik mi? (utility class yok mu?)
- [ ] CSS variables kullanılıyor mu? (hard-coded değer yok mu?)
- [ ] **Hardcode renk YOK mu?** (rgba, hex, rgb, hsl tamamen yasak)
- [ ] **Tüm renkler design token mu?** (var(--color-*))
- [ ] **Parent background kontrol edildi mi?** (Dark bg → `--color-*-on-dark-*`)
- [ ] Design guide'a uygun mu? (4px radius, spacing katları, etc.)
- [ ] Inline style kullanılmamış mı?
- [ ] **Screenshot alındı mı?** (Designer validation için)

### Designer (Spec verirken):

- [ ] **Context belirtildi mi?** ("Dark background (#36465D)" veya "Light background")
- [ ] **Token listesi verildi mi?** (Hangi token'lar kullanılacak?)
- [ ] **Contrast hesaplandı mı?** (4.5:1 minimum)
- [ ] **Component reuse belirlendi mi?** (Existing component'ler listelendi)

### Designer (Post-implementation validation):

- [ ] **Validation script çalıştırıldı:** `./scripts/validate-design-tokens.sh` ✅
- [ ] **Screenshot review yapıldı:** Text görünür mü? Contrast yeterli mi?
- [ ] **Code review yapıldı:** 0 hardcode renk, 100% token usage


---

## Özet

**YAPILACAK:**
- ✅ Semantic class isimleri (`styles.container`, `styles.title`)
- ✅ CSS Modules (`Component.module.css`)
- ✅ CSS Variables (`var(--spacing-xl)`)
- ✅ Design tokens (`var(--color-text-on-dark-primary)`)
- ✅ Component-specific styles

**YAPILMAYACAK:**
- ❌ Utility classes (`flex`, `gap-xl`, `text-primary`)
- ❌ Inline styles
- ❌ Hard-coded değerler (renkler, spacing, font sizes)
- ❌ **Hardcode renkler** (rgba, hex, rgb, hsl - KESINLIKLE YASAK)
- ❌ Global utility class'lar
