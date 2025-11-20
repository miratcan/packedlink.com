# Button Color Decision: Dark Background Problem

## Problem

Homepage'de primary button görünmüyordu:
- Body background: Dashboard blue (#36465D)
- Button background: Dashboard blue (#36465D)
- Sonuç: Button kaynaşıyordu, CTA görünmüyordu

Kullanıcı feedback'i:
> "hemen bir liste hazirla butonu ile background ayni renkte oldugu icin button gibi görünmüyor"

## Analiz

### Seçenekler

1. **Accent Green (#56BC8A)** - Mevcut vurgu rengi
2. **White button (#FFFFFF)** - Dark text ile
3. **Outlined button** - Border only
4. **Lighter blue** - Dashboard blue'nun açık tonu

### Karar: Accent Green (#56BC8A)

#### Gerekçe

**1. Design Guide ile Tutarlılık**
- Accent green zaten design guide'da "vurgu rengi" olarak tanımlı
- Link barlarında kullanılıyor (#56BC8A)
- Yeni renk eklemiyor, mevcut paleti kullanıyor

**2. Kontrast ve Görünürlük**
- Dashboard blue (#36465D) üzerinde mükemmel kontrast
- WCAG AA accessibility standartlarını karşılıyor
- CTA button açıkça görünür, kaybolmuyor

**3. Semantic Anlam**
- Yeşil = positive action, ileri gitmek
- CTA button'lar için psikolojik olarak uygun
- "Hemen bir liste hazırla" aksiyonu için doğal

**4. Brand Tutarlılığı**
- Kaydet.link'in neutral/Ali temasına uygun
- Yeşil accent color zaten marka rengi
- Başka sayfalarda da tutarlı kullanılabilir

**5. Diğer Seçeneklerin Eksikleri**
- **White button:** Çok dominant, agresif görünür
- **Outlined:** Primary CTA için yeterince güçlü değil
- **Lighter blue:** Yeni renk ekler, paleti karmaşıklaştırır

## Implementation

### Primary Button Rules

**Dark Background (dashboard blue):**
```css
background: var(--color-accent); /* #56BC8A */
color: white;

hover: #4AAC7A
active: #3E9A6E
```

**Light Background (white/light gray):**
```css
background: var(--color-dashboard-blue); /* #36465D */
color: white;

hover: #2A3749
```

### Ghost Button Rules

**Dark Background:**
```css
background: transparent;
border: 1px solid rgba(255, 255, 255, 0.3);
color: rgba(255, 255, 255, 0.9);

hover: border opacity 0.5, background rgba(255, 255, 255, 0.1)
```

**Light Background:**
```css
background: transparent;
border: 1px solid #E5E7EB;
color: #111827;

hover: background #F3F4F6
```

## Kritik Kural

**Button background ASLA page background ile aynı renk olmamalı.**

Button kaybolur ve CTA görünmez olur. Her zaman background'a göre contrast kontrol et.

## Mevcut Durum

Button.module.css zaten doğru implement edilmiş:
- Line 15: `background: var(--color-accent)`
- Line 42: Ghost button beyaz border + text
- Hover/active states doğru

Design guide güncellendi (section 5).
globals.css güncellendi (legacy classes).

## Test Checklist

- [ ] Homepage'de primary button açıkça görünüyor
- [ ] Ghost button readable
- [ ] Hover states net
- [ ] Mobile'da görünürlük OK
- [ ] Accessibility (WCAG AA contrast ratio)
- [ ] Dark/light mode tutarlılığı

## Future Considerations

Eğer gelecekte theme switcher eklenirse:
- Light mode: Dashboard blue buttons
- Dark mode: Accent green buttons
- Dynamic CSS variables kullan
