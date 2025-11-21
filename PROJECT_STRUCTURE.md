# Kaydet.link Project Structure

Bu repo sadece bir kod deposu değil, küçük bir şirket simülasyonu gibi çalışıyor.
Kod ile ilgili her şey `src/` altında, business ve dokümantasyon `docs/` altında.

```
kaydet.link/
├── src/                    # TÜM KOD BURADA
│   ├── backend/           # Django backend
│   │   ├── config/       # Django settings
│   │   ├── lists/        # Lists app
│   │   ├── templates/    # Django templates
│   │   ├── manage.py
│   │   └── pyproject.toml
│   │
│   ├── frontend/          # Next.js frontend
│   │   ├── app/          # App router
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities
│   │   ├── package.json
│   │   └── node_modules/ # Frontend dependencies
│   │
│   └── tests/             # Test kodları (kod olduğu için src altında!)
│       ├── e2e/          # E2E test senaryoları
│       ├── test_orchestrator.py  # Test orchestrator
│       └── playwright.config.ts   # Test config
│
├── docs/                  # BUSINESS & DOKÜMANTASYON
│   ├── marketing/        # Marketing stratejileri
│   ├── product/          # Product kararları
│   ├── tasks/            # Görev takibi
│   └── technical/        # Teknik kararlar
│
├── Justfile              # Proje komutları
├── README.md             # Ana dokümantasyon
└── .gitignore           # Git ignore

## Önemli Notlar:

1. **Root'ta package.json/node_modules OLMAMALI** - Bunlar sadece src/frontend'te olmalı
2. **Test kodları src/ altında** - Çünkü onlar da kod!
3. **Docs klasörü business için** - Teknik olmayan dökümanlar
4. **Tek kaynak: src/** - Tüm çalışan kod burada

## Temiz Tutma Kuralları:
- ❌ Root'a kod dosyası koyma
- ❌ Root'a node_modules koyma
- ✅ Kod → src/
- ✅ Döküman → docs/
- ✅ Config → root (Justfile, .gitignore)
```