# AI Ajanı Katkı Rehberi

Bu rehber, kaydet.link projesine katkıda bulunan bir AI ajanı için uçtan uca iş akışını özetlemektedir. Bu sürece bağlılık, yüksek kaliteli, tutarlı ve öngörülebilir sonuçlar elde etmek için kritik öneme sahiptir.

## Temel Felsefe

Tüm katkılar, **[ZEN-SOLO-FIT](../../docs/zen.md)** içinde tanımlanan projenin temel ilkeleriyle uyumlu olmalıdır. Herhangi bir göreve başlamadan önce, yaklaşımınızın projenin ruhuyla uyumlu olduğundan emin olmak için bu ilkeleri gözden geçirin.

## Uçtan Uca Görev İş Akışı

Basit bir hata düzeltmesinden yeni bir özelliğe kadar her geliştirme görevi için aşağıdaki adımları izleyin.

### 1. Görev Anlayışı

- **Amaç:** Kullanıcının isteğini ve istenen sonucu tam olarak anlayın.
- **Eylem:**
    - İstemciyi analiz edin ve temel gereksinimleri belirleyin.
    - İstek belirsizse veya kritik ayrıntılardan yoksunsa, ilerlemeden *önce* açıklayıcı sorular sorun. Varsayımda bulunmayın.

### 2. Bilgi Toplama ve Analiz

- **Amaç:** Uygulama planınızı bilgilendirmek için mevcut kod tabanından ve dokümantasyondan bağlam toplayın.
- **Eylem:**
    - **Kod Tabanı Analizi:** Karmaşık görevler için `codebase_investigator`'ı veya hedeflenen aramalar için `search_file_content` / `glob`'ı kullanın.
    - **Dokümantasyon İncelemesi:** İlgili dokümanları belirlemek ve okumak için **[Dokümantasyon Kullanım Kılavuzu](../../GEMINI.md)**'na başvurun. Anahtar dokümanlar şunları içerir:
        - UI/UX değişiklikleri için: `docs/product/design-guide.md`, `docs/product/personas.md`
        - Yeni özellikler için: `docs/vision.md`, `docs/product/competitive-analysis.md`
        - Herhangi bir teknik çalışma için: `docs/technical/technical-decisions.md`, `docs/development/css-guide.md`

### 3. Planlama ve Teklif

- **Amaç:** Uygulama için açık, adım adım bir plan oluşturun.
- **Eylem:**
    - Planınızı oluşturmak ve takip etmek için `write_todos`'u kullanın.
    - **Kritik:** Planınız yeni bir teknoloji gerektiriyorsa, mimaride önemli bir değişiklik içeriyorsa veya yerleşik kalıplardan sapıyorsa, öncelikle bir "Teknik Karar Talebi" (TKT) teklif etmeniz **gerekir**. `docs/technical/technical-decisions.md` içindeki çerçeveyi izleyin. Karar onaylanıp belgelenene kadar ilerlemeyin.

### 4. Uygulama

- **Amaç:** Temiz, geleneksel ve doğru kod yazın.
- **Eylem:**
    - Projenin mevcut kurallarına, stiline ve yapısına titizlikle uyun.
    - Özellikle yeni özellikler veya hata düzeltmeleri için değişikliklerinizi doğrulamak üzere birim testleri ekleyin.
    - Değişikliklerinizin ardındaki "nedeni" açıklayan açıklayıcı commit mesajları kullanın.

### 5. Doğrulama

- **Amaç:** Uygulamanın doğru, uyumlu ve yüksek kaliteli olduğundan emin olun.
- **Eylem:**
    - **Testleri Çalıştırın:** İlgili test paketini çalıştırın (backend için `just test`, frontend için `npm test`). Tüm testler geçmelidir.
    - **Linter'ları Çalıştırın:** Stil ve kalite sorunlarını kontrol edin.
    - **Tasarım Tokenı Doğrulaması:** CSS değişiklikleri için doğrulama betiğini çalıştırın:
      ```bash
      ./scripts/validate-design-tokens.sh
      ```
      Çıktı `✅ PASSED` olmalıdır.

### 6. İnceleme ve Devir

- **Amaç:** Çalışmanızı insan incelemesi için açıkça sunun.
- **Eylem:**
    - Uygulanabilirse, UI değişikliklerinin ekran görüntülerini sağlayın.
    - Tamamlanan `todos`'a ve ilgili kararlara (TKT'ler) bağlantı vererek çalışmanızı özetleyin.
    - Çalışmanızın incelemeye hazır olduğunu açıkça belirtin.
