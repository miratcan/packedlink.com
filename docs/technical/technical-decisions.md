# Technical Decisions - Kaydet.link

Bu doküman, Kaydet.link'in teknik kararlarını ve arkasındaki mantığı içerir.

## URL Schemas

### Temel URL Yapısı

Tüm listeler `shortuuid` tabanlı, tahmin edilemez kısa ID kullanır: `kaydet.link/l/{hash_id}` ve opsiyonel slug'lı `kaydet.link/l/{hash_id}/{optional_slug}`.

### URL Çözümleme Mantığı

1. **Backend sadece hash_id'ye bakar**
   - `7f4d2a9b` = liste ID'si
   - Slug kısmı tamamen dekoratif
   - `/l/7f4d2a9b` ve `/l/7f4d2a9b/istanbul-restoranlar` aynı listeyi gösterir

2. **Slug kontrolü**
   - Free kullanıcı + slug varsa → 404
   - Pro kullanıcı + slug varsa → Liste göster
   - Pro kullanıcı slug'ı değiştirebilir (eski slug'lar da çalışır)

### Örnekler

**Free Kullanıcı:**
- ✅ `kaydet.link/l/h7s9kd2m3p5q`
- ❌ `kaydet.link/l/h7s9kd2m3p5q/istanbul-restoranlar` (slug isteğe bağlı olmadığı için 404)

**Pro Kullanıcı:**
- ✅ `kaydet.link/l/h7s9kd2m3p5q`
- ✅ `kaydet.link/l/h7s9kd2m3p5q/istanbul-restoranlar`
- ✅ `kaydet.link/l/h7s9kd2m3p5q/best-restaurants-istanbul` (slug değiştirildiğinde)

### Neden Bu Model?

1. **Güvenlik:** shortuuid ID tahmin edilemez (unlisted listeler için kritik)
2. **SEO:** Pro kullanıcılar URL'e keyword ekleyebilir
3. **Tutarlılık:** URL hiç değişmez (public↔unlisted geçişlerde)
4. **Backward compatibility:** Slug değişse bile eski linkler çalışır
5. **Monetizasyon:** Clear Pro value proposition

### Liste Visibility Seviyeleri

- **Public:** Paylaşılabilir, Google'a indexlenebilir
- **Unlisted:** Sadece link bilenler görür, indexlenmez
- ~~Private~~ Yok (bookmark manager olmamak için)

### Language & Localization

**Liste seviyesinde dil:**
- Discover/directory fazı kaldırıldı; listelerde dil seçimi yok.
- Dil metadatası ihtiyaç olduğunda geri eklenir.
- Arayüz dil tercihleri kullanıcı profilinden ayrıdır, fakat bu özellik ileriki fazlara bırakıldı.

**UI Localization:**
- Şimdilik tek dil (TR/EN mix) yeterli; Discover planı yok.
- Gelecekte user preference + browser detection düşünülür.
- URL structure: Dil prefix yok (SEO karmaşası yaratmamak için).

**Global-first tasarım:**
- UTC timezone (local conversion UI'da)
- International date formats
- Multi-currency ready (Pro features için)
- RTL support consideration (Arabic, Hebrew)

### Draft Durumu

- `is_draft = true` olduğunda liste sadece sahibi tarafından görülür.
- `is_draft = false` olduktan sonra visibility (public/unlisted) ayarı devreye girer.
- Opsiyonel `custom_slug` yalnızca Pro kullanıcılarına açıktır.

---

## Database Schema (Planned)

### Core Tables

- **Users:** `id`, `email`, `username` (benzersiz), `is_pro`, `created_at`
- **Lists:** `id`, kısa `hash_id`, `user_id`, `title`, `description`, `visibility` (public/unlisted), `is_draft`, opsiyonel `custom_slug`, `theme`, zaman damgaları
- **Links:** `id`, `list_id`, `url`, `title`, `description`, `position`, zaman damgası; tag ve metadata alanları ayrı ilişki tablosuyla tutulur

### Indexes

- `lists.hash_id` - Primary lookup
- `lists.user_id` - User's lists
- `lists.visibility + lists.is_draft` - Basit listelemeler
- `lists.theme` - Filtering
- `links.list_id + links.position` - Ordered links

> **Not:** Uygulama şu an SQLite 3 üzerinde çalışır; PostgreSQL/Supabase geçişi Pro gereksinimleri ortaya çıktığında değerlendirilir.

---

## Tech Stack Decisions

> **Mobil gelecek gardı:** Backend’te alınan her kararın uzun vadede iOS/Android istemcileri besleyeceği varsayımıyla hareket ediyoruz. Django + Django Ninja seçimi, REST API’lerin clean şekilde büyümesini ve future mobile client’ların minimum yeniden yazımla bu API’leri tüketmesini sağlamak üzere yapıldı.

### Frontend
- **Next.js 14+** (App Router)
- **TypeScript** (type safety)
- **Tailwind CSS** (rapid styling)
- **React Query** (data fetching)
- **Zustand** (gerekirse hafif client-side state management)

Zustand sadece client tarafında komponentler arası UI state paylaşımı gerektiğinde devreye girer (ör. wizard adımları, filtre panelleri). Server Actions + React Query yeterli olduğu sürece ekstra state katmanı eklenmez.

### Backend
- **Django** (core framework)
- **Django Ninja** (REST API layer)
- **SQLite 3** (erken kullanım veri tabanı)
- **uv + pyproject.toml** (paket yönetimi, `requirements.txt` yok)
- **Django Admin** (operasyonel yönetim paneli)

### Infrastructure
- **Vercel** (frontend hosting)
- **Cloudflare** (CDN + DDoS protection)
- **Docker** sadece prod gerekirse; yerel geliştirme Docker'sız yürütülür

### Neden Bu Stack?

1. **Hız:** Hızlı development, hızlı deployment
2. **Django DX:** ORM, migration, admin panel, middleware avantajları
3. **Basit dev ortamı:** SQLite + uv → Docker kurulumu gerekmez
4. **Frontend özgürlüğü:** Next.js tarafı bağımsız gelişebilir
5. **Geleceğe hazırlık:** Prod için Docker eklenebilir ama günlük geliştirmede gerekmiyor

---

## Performance Decisions

### Link Ekleme Optimizasyonu

1. **URL metadata fetching:** Background job
2. **Optimistic UI:** Hemen göster, sonra validate
3. **Batch operations:** Birden fazla link paste edilebilir

### Liste Görüntüleme

1. **Static generation:** Public listeler ISR
2. **Edge caching:** Cloudflare CDN
3. **Lazy loading:** İlk 20 link, sonra scroll'da yükle

---

## Security & Compliance

### GDPR Basics (MVP Level)

**Gerekli olanlar:**
1. **Privacy Policy** - Ne data topluyoruz, neden
2. **Cookie Banner** - Sadece essential cookies için bile bilgilendirme
3. **Data Export** - User kendi verisini indirebilmeli (zaten ZEN'de var)
4. **Account Deletion** - Hesap silme = tüm data silme
5. **Email Consent** - Marketing email'leri için explicit opt-in

**MVP'de yapmayacağımız:**
- Cookie consent management platform
- Detailed audit logs
- Data Processing Agreements
- Automated GDPR request handling

**Basit implementation:** Minimal bir cookie banner, localStorage üzerinden kullanıcıdan onay alıp tekrar göstermeyecek kadar hafif tutulur.

## Security Decisions

### Unlisted Liste Güvenliği

1. **Hash ID:** 12 karakterlik shortuuid (ör. `kaydet.link/l/h7s9kd2m3p5q`)
2. **Brute force protection:** Rate limiting
3. **No directory listing:** Rastgele vitrin yok
4. **No user enumeration:** Username'den liste tahmin edilemez

### Authentication

1. **Email + Password** (temel akış)
2. **Magic link option** (ileride değerlendirilir)
3. **Social login** (uzun vadeli ihtiyaç)

---

## Monitoring & Analytics

### MVP Analytics (Backend only)

1. **Liste görüntülenme:** Simple counter
2. **Link tıklanma:** Redirect ile track
3. **User activity:** Last login, lists created
4. **Event forwarder:** `ListEvent.log` PostHog SDK'sına opsiyonel olarak event yollar (env ile aç/kapa)

### Pro Analytics (ileride)

1. **Detailed stats:** Daily/weekly views
2. **Link performance:** Click-through rate
3. **Referrer tracking:** Nereden geliyorlar

---

## Future Considerations

### API Design

- `GET /api/lists/{hash_id}/` → public veya unlisted listeyi döner
- `GET /api/users/{username}/` → kullanıcı profili + tüm public listeleri
- `POST /api/lists/` → yeni liste oluşturur (auth gerekli)
- `PUT /api/lists/{hash_id}/` → sahibin listeyi güncellemesi
- `POST /api/lists/{hash_id}/links/` → belirli listeye link ekler

### Browser Extension (Gelecek Planı)

- Quick save to list
- Right-click context menu
- Toolbar button

---

Last Updated: 2024-11-18
