# PackedLink

Seçili linkleri rehber listelere dönüştür, tek linkle paylaş.

## Hızlı Bakış (referanslar)
- Ürün ruhu ve prensipler: `docs/zen.md`
- Hikâye, persona özeti, pazar içgörüleri: `docs/vision.md`
- Tasarım ve stil tek kaynağı: `docs/product/design-guide.md` + `docs/development/css-guide.md`
- Persona detayı: `docs/product/personas.md`
- Rekabet özetleri: `docs/product/competitive-analysis.md`
- Teknik kararlar: `docs/technical/technical-decisions.md`
- Blog/SEO yaklaşımı: `docs/marketing/seo-content-strategy.md`
- Analitik/event kuralları: `docs/marketing/analytics-strategy.md`
- Proje yapısı: `docs/project-structure.md`
- Doküman yönetimi & single-source kuralı: `docs/README.md`

## Geliştirme (özet)
- Backend: Django + uv; `just migrate | run | test | expire`
- Frontend: Next.js 14 + TypeScript + CSS Modules (design tokens) + React Query + Zustand
- Ortam dosyaları: `src/backend/.env`, `src/frontend/.env.local`
- Stil tokenları: `src/frontend/app/globals.css`

Detaylar yukarıdaki dokümanlarda. README minimal tutulur; değişiklik gerektiğinde ilgili dokümanı güncelle.
