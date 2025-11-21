# Content & SEO Strategy (Sürekli Üretim)

PackedLink’in büyümesi SEO'ya dayanarak başlamıyor; ana dağıtım kanalı gerçek Elif ve Ali hikâyeleri. Yine de içerik üretimi disipline olsun diye süreklilik odaklı bir plan takip edilir.

---

## 1. Amaç

- Persona bazlı landing ve içeriklerle paylaşımı kolaylaştırmak.
- İlk 20 aktif kullanıcıya referans olacak “örnek liste” arşivi oluşturmak.
- Uzun vadeli SEO için tohum atmak (clean URL + structured data), ama şimdilik trafik hedefi koymamak.

---

## 2. İçerik Sütunları

| Sütun | Kim için? | İçerik Tipi | Not |
|------|-----------|-------------|-----|
| **Use-case landing’leri** | Elif, Ali, Kaynak küratörü | `/affiliate`, `/mekan`, `/kaynak` sayfaları | Hero mesaj + örnek listeler + CTA |
| **Örnek listeler** | Yeni ziyaretçi | “Bebek alışveriş rehberi”, “Kadıköy kahve turu” | Ürünün çıktısını gösterir, paylaşılabilir |
| **Mini rehberler / blog** | Arama yapan kullanıcı | “DM kaosu nasıl biter?”, “WhatsApp için rehber hazırlama” | 600-800 kelime, persona sorununu çözer |
| **Dokümantasyon içerikleri** | SEO geleceği | Clean sitemap, structured data, metadata | Teknik ekip için hatırlatma |

Her içerik parçası “aynı soruyu iki kez cevaplama” temasına bağlanmalı.

---

## 3. Anahtar Kelime Yaklaşımı

- **Türkçe düşük hacimli, yüksek niyetli sorgular**: “link listesi oluştur”, “kaynakları tek linkte paylaş”, “dm sorularına tek link”.
- **Persona terimleri**: “affiliate linkleri düzenleme”, “arkadaşlara mekan rehberi yollama”, “öğrenci kaynak listesi”.
- Araç: Ahrefs/LowFruits yerine manuel SERP incelemesi + Search Console verisi yeterli.
- Hedef: Başlangıçta 5–10 parça içerik yayıp indeks görmek; sonrasında haftalık/aylık düzenli üretimi sürdürmek.

---

## 4. Teknik SEO Minimumu

1. **Temiz URL yapısı**  
   - `/l/{slug}` liste, `/u/{username}` profil. Başlık + açıklama meta’ları otomatik.

2. **Structured Data (ItemList)**  
   - Public liste sayfalarına JSON-LD; arama motoru listeleri anlayabilsin.

3. **Open Graph / Twitter Cards**  
   - Her liste paylaşıldığında görsel/metin default gelsin; kullanıcı güncelleyebilsin (Focus dosyasındaki soru 3 ile bağlı).

4. **Basit sitemap + robots**  
   - `site.com/sitemap.xml` ve `robots.txt` Next.js rakamlarıyla otomatiklenir.

---

## 5. Yayın Ritmi ve Backlog

- **Ritim:** Her hafta en az 1 landing veya örnek liste + 1 mini rehber/blog; kapasite artarsa artırılır ama hedef sürdürülebilir tempo.
- **Başlangıç backlog'u:**
  - `/affiliate` ve `/mekan` landing’leri (persona problemleri + CTA)
  - Örnek liste: “Bebek Alışveriş Rehberi” (ekran görüntüsü + gerçek linkler)
  - Blog: “DM’de aynı soruyu kaç kere cevapladın?” (paylaşılabilir, sosyal içerik)
  - `/kaynak` landing’i + öğretmen örnek listesi
- **Canlıdan gelenler:** Pilot kullanıcı listeleri “Yapım Aşamasında” blog bölümünde toplanır, tamamlandıkça yayına alınır.

---

## 6. Dağıtım

- **Instagram/TikTok DM’leri:** Persona bazlı landing URL’leri.
- **Twitter/LinkedIn:** Örnek liste ekran görüntüsü + “Bu listeyi PackedLink ile yaptım” copy’si.
- **Newsletter/WhatsApp:** Kısa metin + tek link (platform testleri).
- **SEO:** Şimdilik Search Console + manuel backlink (kişisel blog, Medium) yeterli.

---

## 7. Başarı Ölçümü

- İçerik başına min. 50 ziyaret (sosyal veya direkt).
- Landing → signup dönüşümü ≥ %5 (event: `landing_signup_click`).
- Örnek listelerden gelen “liste kopyala” butonu kullanım sayısı.
- Search Console’da indekslenmiş sayfa sayısı (baseline > 0).

Her yeni içerik yayınlandığında analytics dosyasındaki event planı gözden geçirilecek; ekstra event gerekiyorsa eklemeden önce burada not al.
