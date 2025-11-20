# Kaydet.link – Design Guide

Bu doküman, Kaydet.link'in görsel tasarım kurallarını tanımlar. Tüm UI implementasyonları bu kurallara uymalıdır.

---

## 1. Renk paleti

**Ana tema: Neutral / Ali**

### Primary Colors

* **Dashboard blue:** `#36465D`
  * Büyük arka plan bloklarında, başlık kartlarında, bazı nav alanlarında kullanılır.
  * Metin rengi olarak da kullanılabilir ama ana gövde metninde çok baskın olmamalı.

* **Yüzey rengi (kart arka planı):** `#FFFFFF`
  * Liste kartları, modal içleri, form alanlarının arka planı.

* **Arka plan nötrü:** `#F3F4F6` veya çok hafif tonlar
  * Sayfanın genel zemini için kullanılabilir (opsiyonel).
  * Kartların gerisinde çok hafif kontrast sağlar.

### Secondary Colors

* **Border / krom grileri:**
  * İnce çizgiler, ayırıcılar, ikincil metinler:
    * `#E5E7EB` – açık border
    * `#9AA2AE` – icon gray, ikincil metinler

* **Vurgu rengi (link barları):** `#56BC8A`
  * Link satırlarının solundaki barlar, küçük status göstergeleri.
  * Az ve tutarlı kullanılmalı; her link satırında aynı ton.

### Text Colors

* **Ana metin:** `#111827` veya çok koyu gri muadili.
* **İkincil metin:** `#6B7280` civarı gri.

**Not:** Coral ve electric blue temaları, gelecekte "creator preset" gibi opsiyonel temalar olarak yaşayabilir. Ana marka hissi neutral temadan gelir.

---

## 2. Tipografi

### Font ailesi
Sistem sans-serif (Tailwind `font-sans` muadili).
Örnek: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

### Boyutlar (web)

* Ana gövde metni: 16px (`text-base`).
* Küçük açıklama metni: 14px (`text-sm`).
* Kart başlıkları: 18–20px (`text-lg` / `text-xl`).
* Sayfa başlıkları: 24–32px (`text-2xl` / `text-3xl`), breakpoint'e göre.

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

Spacing için kabaca 4'ün katları kullanılır.

### Dikey boşluklar

* Kart içi dikey boşluk: 16–20px (`gap-4`, `p-4`, `p-5`).
* Bölüm başlıkları ile içerik arası: 16–24px.

### Yatay boşluklar

* Kart içi yatay padding: 16–20px.
* Kartlar arası grid boşluğu: 16–20px (`gap-4`, `gap-5`).

### Genel kural

* Çok sıkışık görünümden kaç.
* Link satırları nefes almalı; satır başına en az 8px dikey padding.

---

## 4. Kenar yuvarlama, border ve gölgeler

### Kenar yuvarlama (border-radius)

* Varsayılan radius: **4px** (`rounded-[4px]`).
* Avatarlar dahil neredeyse her şeyde 4px kullanılır.
* Tam yuvarlak formlar (örneğin `rounded-full`) mümkün olduğunca kullanılmaz.

### Border

* Kartlar: 1px solid, genelde `#E5E7EB` veya tema rengine yakın bir ton.
* Bölüm içi ayraçlar: ince border veya `divide` sınıfları, yine açık gri tonlarla.

### Gölge (shadow)

* Hafif shadow (`shadow-sm`) kartları zeminden ayırmak için yeterli.
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
* **Koyu background üzerinde (dashboard blue):** Accent green (#56BC8A) kullanılır.
  * Hover: #4AAC7A (daha koyu yeşil)
  * Active: #3E9A6E (en koyu ton)
  * Metin: Beyaz
  * Gerekçe: Dashboard blue (#36465D) background üzerinde yüksek kontrast sağlar, CTA'yı görünür kılar.

* **Açık background üzerinde (white/light gray):** Dashboard blue (#36465D) kullanılır.
  * Hover: #2A3749 (daha koyu mavi)
  * Metin: Beyaz
  * Gerekçe: Açık zemin üzerinde mavi button marka rengi olarak öne çıkar.

**Ghost Button (İkincil aksiyon):**
* **Koyu background üzerinde:** Transparent background, beyaz border ve text
  * Background: transparent
  * Border: 1px solid rgba(255, 255, 255, 0.3)
  * Text: rgba(255, 255, 255, 0.9)
  * Hover: Border opacity artırılır (0.5), hafif beyaz background (0.1)

* **Açık background üzerinde:** Border ve text primary text color
  * Background: transparent
  * Border: 1px solid #E5E7EB
  * Text: #111827
  * Hover: Background #F3F4F6

**Kritik Kural:**
Button background'ı ASLA page background ile aynı renk olmamalı. Button kaybolur ve CTA görünmez olur.

### Link satırları

* Sol tarafta 2–6px genişliğinde düz renk bar (`#56BC8A`).
* Üst satır başlık, alt satır kısa açıklama.
* Satırın tamamı tıklanabilir alan.

---

## 6. Component Checklist

Her yeni UI component'i implement ederken kontrol et:

- [ ] Renk paleti uyumlu mu? (dashboard blue, neutral, vurgu rengi)
- [ ] Font boyutları doğru mu? (16px base, 14px small)
- [ ] Spacing 4'ün katları mı? (p-4, gap-4, m-4)
- [ ] Border radius 4px mi?
- [ ] Shadow hafif mi? (shadow-sm)
- [ ] Buton yüksekliği 32-36px arası mı?
- [ ] Link satırlarında sol bar var mı? (#56BC8A)
- [ ] Kartlarda hiyerarşi net mi?

---

## 7. Kullanım notu

Yeni UI eklerken:

1. Bu dokümandaki renk, font ve spacing kurallarını kontrol et.
2. Mevcut component'lerden örnek al (tutarlılık için).
3. Gereksiz dekorasyon veya farklı stil ekleme.

Bu dosya, Kaydet.link'in görsel tutarlılığını korumak için referans noktasıdır.
