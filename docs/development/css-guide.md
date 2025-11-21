# PackedLink – CSS Implementation Notes

Bu dosya geliştiriciye kısa yönlendirme sağlar; stilin tek kaynağı `docs/product/design-guide.md`.

- Stil yaklaşımı: **yalnızca CSS Modules + semantik class isimleri**, utility yok, inline style yok.
- **Design tokens zorunlu:** Renk/spacing/font-size/radius değerleri token'lardan alınır; komponentlerde hex/rgba/hsl yazma.
- Token kaynağı: `src/frontend/app/globals.css`. Yeni değer gerekiyorsa önce design guide'a ekle.
- Enforcement: stylelint kuralları + `./scripts/validate-design-tokens.sh` hardcode renkleri engeller.

Detaylı örnek ve checklist için design guide içindeki “Implementation Kuralları” bölümünü kullan.
