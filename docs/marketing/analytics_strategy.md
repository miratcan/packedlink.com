# Analytics & Measurement Strategy (P1)

Kaydet.link’te ölçüm, Zen’deki **ZEN-MEASURE-FIRST** kuralına dayanır: hisle değil veriyle karar veriyoruz fakat bunu solo kurucu realitesine göre basit tutuyoruz. Bu doküman sadece P1 hedefi (20 aktif küratör) için gereken minimum setup’ı anlatır.

---

## 1. Neyi Ölçüyoruz? (P1 Soruları)

1. **Aktivasyon:** Kaydolanların kaçı ilk public listesini oluşturuyor?
2. **Kullanım Derinliği:** İlk haftada kişi başı kaç link ekleniyor?
3. **Paylaşım:** Liste paylaşma (copy link / sosyal buton) oranı nedir?
4. **Performans:** Mobilde liste sayfası <3 sn açılıyor mu?

Bu dört soru cevaplandığında “çekirdek değer çalışıyor mu?” sorusunu yanıtlayabiliriz.

---

## 2. Stack (Şimdi ve Yakın Gelecek)

| Katman | Araç | Not |
|--------|------|-----|
| Olay takip | Supabase (Postgres) `product_events` tablosu | Auth server’ı üzerinden event yazılır |
| Ürün analitiği | PostHog (cloud, 1M event free) | Funnel + retention dashboard |
| Trafik/perf | Vercel Analytics + Web Vitals scripti | <3 sn yükleme hedefi için yeterli |
| Hata izleme | Sentry (free tier) | Opsiyonel, sadece prod hataları için |

Self-host zorunlu değil; PostHog cloud başlar, ileride Supabase’e export edilir.

---

## 3. Event Şeması

| Event | Ne zaman? | Önemli Alanlar |
|-------|-----------|----------------|
| `user_signed_up` | Kayıt tamamlandığında | `user_id`, `persona_guess`, `source` |
| `list_created` | Bir liste kaydedildiğinde | `list_id`, `is_public`, `link_count` |
| `link_added` | Link eklendiğinde | `list_id`, `has_metadata`, `entry_method` |
| `list_shared` | Share butonu veya link kopyalandığında | `list_id`, `channel`, `link_count` |
| `session_device` | Kullanıcı oturumu başladığında | `device`, `width`, `locale` |

Tüm event’ler önce Supabase’e yazılır, PostHog’a forward edilir. Böylece veri bizim veritabanımızda kalır.

---

## 4. Dashboard & Ritual

### Haftalık (kurucu check-in)
- Signup → ilk public liste dönüşümü (hedef ≥ %40)
- Kullanıcı başına ortalama link (hedef ≥ 8)
- Paylaşım yapan kullanıcı oranı (hedef ≥ %30)
- Mobilde LCP ortalaması (<3 sn)

### Aylık
- Aktif küratör sayısı (≥20 hedefi için kaç kaldı?)
- Hangi persona kaynağından daha çok dönüşüm geliyor?
- En çok paylaşılan 5 liste (öğrenim için)

Dashboard PostHog’da tutulur, her Pazartesi kısa özet çıkar.

---

## 5. Consent & Gizlilik

- Email, ad gibi PII event’lere koyulmaz; sadece user_id kullanılır.
- Kullanıcı export talep ederse Supabase’teki event’ler de dahil edilir.
- Çerez banner’ı: Otomatik event’ler opsiyonel; kullanıcı reddederse sadece anonim performans ölçeriz.

---

## 6. Gelecek Fazlara Not

P1 sonrası (Pro + örnek rehber içerikleri) geldiğinde:
- Tıklama kaynakları (affiliate) için ek event’ler
- Landing / blog içerik performans ölçümleri
- Cohort raporları için Metabase/PostHog export

Ancak şu an için tek öncelik: çekirdek akışın ölçülmesi. Ek event veya araç eklemeden önce bu dokümanı güncelle.
