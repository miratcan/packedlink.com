# Designer Validation Checklist

Bu checklist her implementation sonrası Designer tarafından kullanılır.

## Pre-Implementation (Spec Verirken)

- [ ] **Context belirtildi:** "Dark background (#36465D)" veya "Light background (#FFFFFF)"
- [ ] **Token listesi verildi:** Hangi token'ların kullanılacağı belirtildi
- [ ] **Contrast hesaplandı:** Text/background contrast ratios > 4.5:1
- [ ] **Component reuse belirlendi:** Existing component'ler listelendi

## Post-Implementation (Code Review)

### 1. Design Token Compliance

- [ ] **0 hardcode renk:** Hiç `#hex` veya `rgba()` yok
- [ ] **100% token kullanımı:** Tüm renkler `var(--token-name)` formatında
- [ ] **Semantic naming:** Token isimleri semantik (örn: `--color-danger` not `--color-red`)

**Validation komutu:**
```bash
./scripts/validate-design-tokens.sh
```

### 2. Context Awareness

- [ ] **Parent background kontrol edildi:** Developer parent component background'unu kontrol etti mi?
- [ ] **Doğru token seti:**
  - Dark bg → `--color-text-on-dark-*` ✅
  - Light bg → `--color-text-*` ✅

**Test:**
```
Eğer text Card içindeyse:
  → Card background: var(--color-surface) (#FFFFFF)
  → LIGHT background
  → color: var(--color-text-secondary) kullanılmalı
  → NOT var(--color-text-on-dark-*)
```

### 3. Visual Validation (Screenshot Gerekli)

- [ ] **Screenshot alındı:** Developer Chrome DevTools ile screenshot paylaştı
- [ ] **Text görünür:** Parent background'da text okunabilir
- [ ] **Contrast yeterli:** WCAG 4.5:1 minimum
- [ ] **Hover states çalışıyor:** Interactive element'lerin hover durumu doğru
- [ ] **Mobile'da bozuk değil:** Responsive breakpoint'lerde sorun yok

### 4. Component Compliance

- [ ] **Existing component kullanıldı:** Custom div yerine Card/Button/Hero vs.
- [ ] **Inline style yok:** `style={{}}` kullanımı yok
- [ ] **Module CSS:** `.module.css` dosyası kullanıldı
- [ ] **Semantic class names:** `.button` not `.btn`, `.container` not `.wrapper`

### 5. Accessibility

- [ ] **Semantic HTML:** `<button>` not `<div onClick>`, `<nav>` not `<div>`
- [ ] **ARIA labels:** Screen reader için gerekli label'lar var
- [ ] **Keyboard navigation:** Tab/Enter ile erişilebilir

### 6. Design Guide Compliance

- [ ] **Typography doğru:** Font sizes design guide'dan (`var(--font-size-*)`)
- [ ] **Spacing doğru:** Gaps/paddings design guide'dan (`var(--spacing-*)`)
- [ ] **Border radius:** `var(--radius)` (4px)
- [ ] **Colors:** Palette'ten (`--color-dashboard-blue`, `--color-accent`)

## Final Verdict

**Eğer tüm checkler ✅ ise:**
```
✅ APPROVED
Implementation design guide'a uygun.
Merge edilebilir.
```

**Eğer issue varsa:**
```
❌ CHANGES REQUESTED

Issues:
1. Line 45: color: #FFFFFF → var(--color-text-on-dark-primary) kullan
2. Line 67: Step descriptions Card içinde ama rgba() kullanılmış
3. Screenshot'ta text görünmüyor (beyaz text beyaz bg'de)

Fix'ler yapıldıktan sonra tekrar validate et.
```

## Post-Approval (Design Guide Update)

- [ ] **Yeni token eklendiyse:** `docs/product/design-guide.md` güncellendi
- [ ] **Yeni pattern varsa:** Design guide'a eklenip dokümante edildi
- [ ] **Storybook güncel:** Yeni component/variant için story yazıldı

## Weekly Audit (Her Hafta)

Designer her hafta bu komutu çalıştırmalı:

```bash
./scripts/validate-design-tokens.sh
```

Çıktı `✅ PASSED` değilse → HEMEN düzelt.

---

**Template Kullanımı:**

Her implementation için bu checklist'i kopyala ve markdown formatında yanıt ver:

```markdown
## Validation: [Feature Name]

### Pre-Implementation
- [x] Context: Dark background (#36465D)
- [x] Tokens: --color-text-on-dark-primary, --color-accent
- [x] Contrast: 15:1 (title), 7:1 (description) ✅
- [x] Components: Hero, Button (primary-on-dark, large)

### Post-Implementation
#### Token Compliance
- [x] 0 hardcode colors
- [x] 100% token usage
- [x] Semantic naming

#### Screenshot Review
- [x] Screenshot alındı
- [x] Text görünür (dark bg'de)
- [x] Contrast yeterli
- [x] Hover states OK

#### Code Review
- [ ] Line 23: color: rgba(255,255,255,0.9) → var(--color-text-on-dark-secondary)

### Verdict
❌ CHANGES REQUESTED (1 issue)

Fix sonrası re-validate.
```
