# Analytics & Measurement Strategy

PackedLink’te ölçüm, Zen’deki **ZEN-MEASURE-FIRST** kuralına dayanır: hisle değil veriyle karar veriyoruz fakat bunu solo kurucu gerçekliğine göre basit tutuyoruz. Bu doküman çekirdek akışın çalışıp çalışmadığını görmek için gereken minimum setup’ı anlatır.

---

## 1. Neyi Ölçüyoruz? (Mekanizma)

Sürekli takip edilecek akışlar:
1. **Aktivasyon:** Kaydolanların ilk public listesini oluşturma oranı
2. **Kullanım derinliği:** Zaman aralığına göre kişi başı eklenen link sayısı
3. **Paylaşım:** Liste paylaşma eylemi (copy link / sosyal buton)
4. **Performans:** Mobil LCP ölçümü

Bu sinyaller çekirdek akışın çalışıp çalışmadığını gösterir; metrik eşik/hedefleri dönemsel kararlara göre ayrı belirlenir.

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
- Signup → ilk public liste dönüşümü (trend takibi)
- Kullanıcı başına ortalama link (trend takibi)
- Paylaşım yapan kullanıcı oranı (trend takibi)
- Mobilde LCP ortalaması (Web Vitals verisi varsa)

### Aylık
- Aktif küratör sayısı (trend takibi)
- Persona kaynağı kırılımları (hangi kanal/mesaj daha iyi çalışıyor?)
- En çok paylaşılan 5 liste (öğrenim için)

Dashboard PostHog’da tutulur, her Pazartesi kısa özet çıkar.

---

## 5. Consent & Gizlilik

- Email, ad gibi PII event’lere koyulmaz; sadece user_id kullanılır.
- Kullanıcı export talep ederse Supabase’teki event’ler de dahil edilir.
- Çerez banner’ı: Otomatik event’ler opsiyonel; kullanıcı reddederse sadece anonim performans ölçeriz.

---

## 6. Gelecek Fazlara Not

Pro + örnek rehber içerikleri fazına geçildiğinde:
- Tıklama kaynakları (affiliate) için ek event’ler
- Landing / blog içerik performans ölçümleri
- Cohort raporları için Metabase/PostHog export

Eşik/hedefler dönemsel kararla belirlenir; doküman sadece mekanizmaları tarif eder.
