# PackedLink – Design Guide

Bu doküman PackedLink'in görsel tasarım ve uygulama kurallarını tanımlar. Tüm UI implementasyonları bu kurallara uymalıdır; tek kaynak olarak bu dosyayı kullan.

---

## 1. Renk paleti

**Ana tema: Sıcak nötr + terracotta aksan** (değerler design token'lar olarak `globals.css`'de tanımlı; component'lerde doğrudan hex/rgba kullanılmaz)

### Primary Colors

* **Warm background:** `#FDFAF4` → token: `--color-bg-warm`
  * Sayfa zemini için temel arka plan.

* **Cream background:** `#F5F0E8` → token: `--color-cream` / `--color-background`
  * Alternatif yumuşak zemin, bölümler arası ayrım.

* **Yüzey rengi (kart arka planı):** `#FFFFFF` → token: `--color-surface`
  * Liste kartları, modal içleri, form alanlarının arka planı.

* **Border:** `#E8DFD3` → token: `--color-border`
  * İnce çizgiler, kart kenarları, ayraçlar.

### Secondary Colors

* **Terracotta accent:** `#C8734C` → token: `--color-accent` (hover/active varyantları: `--color-accent-hover`, `--color-accent-active`)
  * CTA butonları, önemli vurgu alanları, link barları.

* **Sage (ikincil accent):** `#7A8F6F` → token: `--color-sage`
  * İkincil vurgu alanlarında temkinli kullanılır.

### Text Colors

* **Ana metin:** `#2C2419` → token: `--color-text-primary`.
* **İkincil metin:** `#6B6159` → token: `--color-text-secondary`.
* **Başlık destek rengi:** `#8B7355` → token: `--color-brown` (başlık aksanı gerektiğinde; aşırı kullanılmaz).

**Token referansı (globals.css):**
`--color-bg-warm`, `--color-cream`/`--color-background`, `--color-surface`, `--color-border`, `--color-accent` (+hover/active), `--color-sage`, `--color-text-primary`, `--color-text-secondary`, `--color-brown`, `--color-text-on-dark-*`, `--color-border-on-dark*`.

**Not:** Coral/electric blue eski notları kaldırıldı; marka hissi sıcak nötr + terracotta aksanı ile tanımlıdır. Tema varyantı eklenirse token seti güncellenmelidir.

---

## 2. Tipografi

### Font ailesi
Sistem sans-serif.
Örnek: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

### Boyutlar (web)

* Ana gövde metni: 16px.
* Küçük açıklama metni: 14px.
* Kart başlıkları: 18–20px.
* Sayfa başlıkları: 24–32px, breakpoint'e göre.

### Kalınlıklar

* Gövde metni: `font-normal` (400).
* Önemli vurgular: `font-medium` (500).
* Başlıklar: `font-semibold` (600).
* `bold` (700) sadece çok sınırlı yerlerde (örneğin brutal buton metninde) kullanılmalı.

### Stil

* İtalik nadiren kullanılmalı.
* Altı çizili metin sadece gerçek link için.

---

## 3. Spacing ve layout

**Scale (globals.css):** `spacing-xxs`, `xs`, `sm`, `md`, `lg`, `xl` (nominal 4x katmanlı ölçek). **Kullanımda her zaman spacing token'ı yaz, px yazma.**

- **Sayfa ve container:** Mobile'da `spacing-sm` veya `spacing-md`; desktop'ta `spacing-lg`. Container padding varsayılan `spacing-lg`.
- **Bölüm aralığı:** Ana bloklar arası `spacing-lg`/`spacing-xl`; içerideki dikey stack'lerde `spacing-sm`/`spacing-md`.
- **Kartlar:** İç padding `spacing-sm`/`spacing-md`; kartlar arası grid gap `spacing-sm`/`spacing-md`.
- **Liste satırları:** Dikey padding `spacing-xs`/`spacing-sm`; `spacing-xxs` altına düşme.
- **Form kontrolleri:** Input/textarea padding yatay `spacing-sm`, dikey `spacing-xs`; label alt boşluğu `spacing-xs`.
- **Butonlar:** Dikey `spacing-xs`, yatay `spacing-lg`; min-height buton bölümündeki standartla sağlanır.
- **Genel kural:** Aynı blok içinde aynı spacing seviyesini koru; tutarlılık için ölçek dışı (token olmayan) değer kullanma.

---

## 4. Kenar yuvarlama, border ve gölgeler

### Kenar yuvarlama (border-radius)

* Varsayılan radius: **4px**.
* Avatarlar dahil neredeyse her şeyde 4px kullanılır.
* Tam yuvarlak formlar (örneğin `rounded-full`) mümkün olduğunca kullanılmaz.

### Border

* Kartlar: 1px solid, genelde `--color-border` veya tema rengine yakın bir ton.
* Bölüm içi ayraçlar: ince border veya hafif ayırıcı çizgiler (açık gri tonlarla, token üzerinden).

### Gölge (shadow)

* Hafif shadow kartları zeminden ayırmak için yeterli.
* Ağır, bulanık gölgeler kullanılmaz.

---

## 5. Kart ve buton kuralları

### Kartlar

Her kartın içinde net bir hiyerarşi olmalı:

1. Kullanıcı avatarı
2. Kullanıcı adı + kullanıcı adı handle'ı
3. Liste logosu + liste başlığı
4. Link satırları
5. En altta küçük açıklama + call-to-action (örneğin "Linki kopyala").

### Butonlar

* **Radius:** 4px.
* **Yükseklik:** minimum 32–36px.
* **Metin:** kısa, net komut cümlesi. Örnek: "Linki kopyala", "Listeyi paylaş".

#### Buton varyantları ve renk kuralları

**Primary Button (CTA):**
* **Açık background üzerinde (warm/white):** Terracotta accent token (`--color-accent` ve hover/active varyantları) kullanılır.
  * Metin: `--color-surface` üzeri için `--color-text-on-dark-primary` veya net kontrast sağlayan açık/dark text token'ı.
  * Gerekçe: Sıcak nötr zeminde CTA görünürlüğü sağlar.

* **Koyu background üzerinde (brown/terracotta tonları):** Metin `--color-text-on-dark-*`, arka plan için accent veya kontrast sağlayan token seçilir (örn. `--color-accent` üzerinde açık metin).

**Ghost Button (İkincil aksiyon):**
* **Koyu background üzerinde:** Transparent + `--color-border-on-dark` + `--color-text-on-dark-*` token'ları.
  * Hover: Border opacity artırılır, hafif overlay token'ı kullanılır.

* **Açık background üzerinde:** Border ve text primary token'lar (`--color-border`, `--color-text-primary`).
  * Hover: `--color-surface-muted` benzeri token ile arka plan açılır.

**Kritik Kural:**
Button background'ı ASLA page background ile aynı renk olmamalı. Button kaybolur ve CTA görünmez olur.

### Link satırları

* Sol tarafta 2–6px genişliğinde düz renk bar (`--color-accent`).
* Üst satır başlık, alt satır kısa açıklama.
* Satırın tamamı tıklanabilir alan.

---

## 6. Component Checklist

Her yeni UI component'i implement ederken kontrol et:

- [ ] Renk paleti uyumlu mu? (token'lar: warm background, cream, surface, accent terracotta)
- [ ] Font boyutları doğru mu? (16px base, 14px small)
- [ ] Spacing 4'ün katları mı? (token veya değişken ile)
- [ ] Border radius 4px mi?
- [ ] Shadow hafif mi?
- [ ] Buton yüksekliği 32-36px arası mı?
- [ ] Link satırlarında sol bar var mı? (accent token)
- [ ] Kartlarda hiyerarşi net mi?

---

## Implementation Kuralları (Developer)

- **Stil yaklaşımı:** Sadece CSS Modules + semantik class isimleri. Utility class yok, inline style yok.
- **Design tokens zorunlu:** Renk, spacing, font-size, radius değerleri token'lardan alınır; component'lerde hex/rgba/hsl yazılmaz.
- **Dosya yapısı:** Her component kendi `.module.css` dosyasına sahip olmalı; sayfa spesifik stiller de module kullanır.
- **İsimlendirme:** Class isimleri elementin rolünü anlatmalı (`container`, `title`, `ctaButton`), stil efektini değil (`flex`, `gap16`).
- **Context kontrolü:** Koyu zemin için `--color-*-on-dark-*` token'larını kullan; açık zemin için `--color-text-*` vb.
- **Enforcement:** Stylelint/validate script'te hardcode renkler yasaktır; `globals.css` token tanımlarını güncel tut.
- **Reuse:** Ortak layout/kalıp ihtiyaçlarında yeni utility tanımlamak yerine semantik class'ları ve token'ları kullan.

---

## 7. Kullanım notu

Yeni UI eklerken:

1. Bu dokümandaki renk, font ve spacing kurallarını kontrol et.
2. Mevcut component'lerden örnek al (tutarlılık için).
3. Gereksiz dekorasyon veya farklı stil ekleme.

Bu dosya, PackedLink'in görsel tutarlılığını korumak için referans noktasıdır.
