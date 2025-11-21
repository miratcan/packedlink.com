# Kaydet.link

> Seçme linklerini hızlıca kaydet, listelere dönüştür, istersen tek linkle paylaş.

## Ne?

Kaydet.link, seçtiğin linkleri başkalarına rehber olacak listelere dönüştüren bir web ürünü.

**Örnekler:**
- "Sevdiğim Türk Sanat Müziği Eserleri"
- "Bionluk'ta çalıştığım başarılı tasarımcılar"
- "Mutlaka izlemeniz gereken YouTube filmleri"
- "Ucuz ama iyi iş çıkaran creator'lar"

## Neden?

İnternette bulduğun değerli linkleri düzenli bir rehber haline getirip, tek linkle paylaşabilmen için.

## Kim İçin?

### Herkes için (Free)
- Hobi kullanıcıları
- Bilgi paylaşmak isteyenler
- "Benim TSM listem", "benim film listem" diyenler

### İş için kullananlar (Pro)
- Affiliate link paylaşanlar
- İçerik üreticiler (YouTube, Instagram, newsletter)
- Danışmanlar, eğitmenler, freelancer'lar

## Faz 1 Özellikleri

`docs/focus.md` kapsamındaki P1 akışı uçtan uca hazır:

- 🔒 **Anonim açılış formu:** Django start view'i login olmadan liste taslağı başlatır, session bazlı erişim verilir.
- 🧱 **Builder deneyimi:** Link ekleme / silme formu, liste meta alanları ve publish butonu tek ekranda tutuldu.
- 🕰️ **Ömür mantığı:** `List.publish()` varsayılan 30 günlük yaşam süresi ayarlar; `lists.management.commands.expire_lists` Cron/Just ile tetiklenir.
- 🔐 **Tek seferlik yönetim linki:** Publish sonrası gösterilen `?auth=` parametreli link, yeni cihazın builder'a erişmesini sağlar ve session'a kaydedilir.
- 📡 **Event + analytics:** `ListEvent.log` DB'ye yazar, `lists.posthog.capture_list_event` PostHog'a opsiyonel gönderir; event isimleri `docs/marketing/analytics_strategy.md` ile uyumlu.
- 🧪 **Pytest altyapısı:** `uv run pytest` publish akışı + expire komutunu doğrular; Justfile `test` tarifi pytest'e yönlendirildi.

## Quick Start

### Backend (Django)

1. Ön koşullar: Python 3.9+, [uv](https://docs.astral.sh/uv/) ve [just](https://just.systems/).
2. Ortam ayarlarını kopyala ve düzenle:

```bash
cp src/backend/.env.example src/backend/.env
```

3. Bağımlılıkları `uv sync` ile kur (CI için `uv lock` üret).
4. Kök dizinden `just` komutlarını kullan:

```bash
just migrate        # veritabanı şeması
just run            # development server (http://127.0.0.1:8000)
just test           # pytest tabanlı backend testleri
just expire         # Listeleri manuel expire et (cron uyumlu)
```

Session başlatıldıktan sonra builder → publish → success sayfaları template tabanlıdır; public URL'ler `/l/<hash>` formatındadır.

### Frontend (Next.js 14)

1. Gerekliler: Node 18+, npm/pnpm/yarn.
2. Ortam dosyasını kopyala: `cp src/frontend/.env.local.example src/frontend/.env.local` (Vercel uyumlu public env anahtarları).
3. Paketleri yükle ve geliştirici sunucusunu aç:

```bash
cd src/frontend
npm install
npm run dev
```

App Router + TypeScript + Tailwind + React Query + Zustand yapılandırması hazır; builder/publish/success sayfaları mock state ile backend API'sine bağlanmayı bekler.

### Faz 1 Akışı
1. `/` üzerindeki start formu ile taslak liste oluştur (login yok).
2. Builder ekranında liste meta alanlarını ve linkleri güncelle.
3. Publish ekranında son kontrolü yapıp `List.publish()` metodunu tetikle.
4. Success ekranında tek seferlik yönetim linki + public link gösterilir.
5. Public URL `http://localhost:8000/l/<hash>` formatında; expire job'ı tetiklendiğinde status `expired` olur.

## Proje Yapısı

```
kaydet.link/
├── README.md
├── Justfile                 # uv tabanlı backend komutları
├── docs/                    # Ürün, teknik, pazarlama dokümanları
└── src/
    ├── backend/
    │   ├── manage.py
    │   ├── pyproject.toml   # uv + pytest ayarları
    │   ├── config/          # Django settings/urls
    │   ├── lists/           # Modeller, formlar, views, mgmt commands
    │   └── templates/       # Start/builder/publish/public sayfaları
    └── frontend/
        ├── app/             # Next.js App Router (landing, builder, publish, success, public)
        ├── components/      # Landing hero, link kartı, publish özetleri
        ├── store/           # Zustand builder state + publish payload
        ├── lib/             # Mock API + env yardımcıları
        └── tailwind.config.ts vb. build dosyaları
```

## Dokümantasyon Felsefesi

Solo kurucu olarak her kararın hafif, okunabilir ve uygulanabilir kalması gerekiyor.
Bu yüzden iş planı bilinçli şekilde minimal tutuluyor; daha fazla belge değil, daha iyi odak tercih ediyoruz.
Zen'deki **ZEN-SOLO-FIT** ve **ZEN-CORE-FIRST** kuralları bu yaklaşımı zorunlu kılıyor.

### Nereden Başlamalı?
- [`docs/zen.md`](docs/zen.md) → Ruh, prensipler, “nasıl çalışırız?”
- [`docs/vision.md`](docs/vision.md) → Uzun vadeli hikâye, pazar içgörüleri, persona çerçevesi.
- [`docs/focus.md`](docs/focus.md) → Şu anki faz (P1) için hedefler, kapsam ve metrikler.

Destekleyici notlar:
- [`docs/product/personas.md`](docs/product/personas.md) → Güncel persona seti ve öncelikleri.
- [`docs/product/competitive_analysis.md`](docs/product/competitive_analysis.md) → Mikro rakipler ve fark noktaları.
- `docs/product/phases/` → Gelecek faz arşivi.
- `docs/marketing/analytics_strategy.md` ve `docs/marketing/seo_content_strategy.md` → Ölçüm & içerik planı.
- `docs/technical/technical_decisions.md` → Teknik tercihler.

## Lisans

[Lisans türü eklenecek]

## İletişim

[İletişim bilgileri eklenecek]
