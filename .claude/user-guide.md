# Kullanıcı Rehberi - Strapi İçerik Yönetimi

Bu rehber, **teknik olmayan kullanıcılar** için Inviktours web sitesinin içeriklerini Strapi admin paneli üzerinden nasıl yöneteceğinizi adım adım açıklar.

> **Önemli:** Bu rehberdeki tüm işlemler **kod yazmadan**, sadece Strapi admin paneli kullanılarak yapılır.

---

## 📋 İçindekiler

1. [Strapi Admin Paneline Giriş](#strapi-admin-paneline-giriş)
2. [Yeni Macera Ekleme](#yeni-macera-ekleme)
3. [Yeni Tur Tarihi Ekleme](#yeni-tur-tarihi-ekleme)
4. [Mevcut İçerikleri Düzenleme](#mevcut-içerikleri-düzenleme)
5. [Resim ve Video Yükleme](#resim-ve-video-yükleme)
6. [Menü ve Logo Yönetimi](#menü-ve-logo-yönetimi)
7. [Anasayfa İçeriğini Düzenleme](#anasayfa-içeriğini-düzenleme)
8. [Fiyat Güncelleme](#fiyat-güncelleme)
9. [Program (Itinerary) Düzenleme](#program-itinerary-düzenleme)
10. [Değişiklikleri Görüntüleme ve Test Etme](#değişiklikleri-görüntüleme-ve-test-etme)
11. [Yapabilecekleriniz vs Geliştirici Gereken İşler](#yapabilecekleriniz-vs-geliştirici-gereken-işler)

---

## Strapi Admin Paneline Giriş

### Adım 1: Admin Paneline Erişim

**Yerel Geliştirme Ortamı:**
```
http://localhost:1337/admin
```

**Canlı Site (Production):**
```
https://your-strapi-app.strapiapp.com/admin
```

### Adım 2: Giriş Yapma

1. Email adresinizi girin
2. Şifrenizi girin
3. "Giriş Yap" butonuna tıklayın

### Adım 3: Ana Kontrol Paneli

Giriş yaptıktan sonra sol menüde şu bölümleri göreceksiniz:

- **Content Manager** - İçerikleri düzenlemek için ana bölüm
- **Media Library** - Resim ve videoları yönetmek için
- **Settings** - Site ayarları

---

## Yeni Macera Ekleme

Macera, tur şablonlarıdır (örn: "Kaçkar Dağları Trekking", "Ağrı Dağı Tırmanışı"). Her maceranın altında birden fazla tur tarihi olabilir.

### Adım 1: Adventure Collection'a Git

1. Sol menüden **Content Manager** seçin
2. **Collection Types** altında **Adventures** seçin
3. Sağ üst köşedeki **"Create new entry"** butonuna tıklayın

### Adım 2: Temel Bilgileri Doldurun

**Gerekli Alanlar:**

1. **Title (Başlık)** - Maceranın adı
   - Örnek: "Kaçkar Dağları Trekking"
   - **Not:** Slug otomatik oluşturulur (URL için kullanılır)

2. **Subtitle (Alt Başlık)** - Kısa açıklama
   - Örnek: "Doğu Karadeniz'in muhteşem zirvelerinde 7 günlük macera"

3. **Description (Açıklama)** - Detaylı açıklama
   - Markdown formatında yazabilirsiniz
   - Örnek: "Kaçkar Dağları, Doğu Karadeniz'in en etkileyici..."

4. **Trip Summary (Tur Özeti)** - Kısa özet metin
   - Örnek: "Yüksek zirvelere tırmanış, buzul gölleri ve endemik flora"

### Adım 3: Ana Resmi Yükleyin

1. **Main Image** alanını bulun
2. "Add new assets" butonuna tıklayın
3. Bilgisayarınızdan resim seçin veya sürükle-bırak yapın
4. Resim için "Alternative text" (alternatif metin) girin
   - Örnek: "Kaçkar Dağları manzarası"

**Resim Önerileri:**
- Boyut: En az 1920x1080 piksel
- Format: JPG veya PNG
- Dosya adı: Türkçe karakter kullanmayın

### Adım 4: Galeri Resimleri Ekleyin

1. **Images** alanını bulun
2. "Add new assets" butonuna tıklayın
3. Birden fazla resim seçebilirsiniz
4. Her resim için alternatif metin ekleyin

### Adım 5: Video Ekleyin (Opsiyonel)

1. **Video** alanını bulun
2. Video dosyası yükleyin veya video URL'si girin
3. Format: MP4 önerilir

### Adım 6: Tur Özellikleri (Trip Attributes)

Bu bölümde turun temel özelliklerini belirleyin:

1. **Style (Stil)** - Tur tipi
   - Örnek: "Trekking", "Climbing", "Expedition"

2. **Service Type (Hizmet Tipi)** - Grup tipi
   - Örnek: "Grup Turu", "Özel Tur"

3. **Physical Rating (Fiziksel Zorluk)** - 1-5 arası
   - 1: Çok Kolay
   - 3: Orta
   - 5: Çok Zor

4. **Group Type (Grup Tipi)** - Kaç kişilik gruplar
   - Örnek: "6-12 kişi", "Özel grup"

### Adım 7: Tur Bilgileri (Trip Info)

1. **Age Requirement (Yaş Gereksinimi)**
   - Örnek: "18-65 yaş arası"

2. **Visa Requirement (Vize Gereksinimi)**
   - Örnek: "Türk vatandaşları için vize gerekmez"

### Adım 8: Gereksinimler (Requirements)

Bu bölüm üç alt bölüme ayrılır:

**Physical Requirements (Fiziksel Gereksinimler):**
- Örnek: "Günde 6-8 saat yürüyebilme kapasitesi"

**Equipment Requirements (Ekipman Gereksinimleri):**
- Markdown formatında liste yapabilirsiniz:
```markdown
- Dağ botu (su geçirmez)
- Sırt çantası (40-50L)
- Uyku tulumu (-10°C konfor)
- Trekking pole (opsiyonel)
```

**Health Requirements (Sağlık Gereksinimleri):**
- Örnek: "Kalp rahatsızlığı olmamalı, yükseklik tutmaya müsait olmalı"

### Adım 9: Program Ekleme (Itinerary)

Program, günlük aktiviteleri gösterir.

**Her Gün İçin:**

1. "Add an entry to Itinerary" butonuna tıklayın

2. **Day Number** - Gün numarası
   - Örnek: 1, 2, 3...

3. **Title** - Gün başlığı
   - Örnek: "Gün 1: Trabzon'dan Ayder'e Transfer"

4. **Summary** - Gün özeti
   - Örnek: "Trabzon havalimanından alınış ve Ayder yaylasına transfer"

5. **Aktiviteler Ekleyin** (Activities):
   - "Add an entry to Activities" butonuna tıklayın
   - **Time**: Saat (opsiyonel) - Örnek: "09:00"
   - **Description**: Aktivite açıklaması - Örnek: "Havalimanından transfer"

6. **Meals** - Öğünler
   - Örnek: "Akşam Yemeği"

7. **Accommodation** - Konaklama
   - Örnek: "Ayder Otel (Çift Kişilik Oda)"

8. **Images** - Günün fotoğrafları
   - O güne ait resimler ekleyebilirsiniz

9. **Elevation Gain** - Yükselti (metre)
   - Örnek: 500

10. **Distance** - Mesafe (km)
    - Örnek: 12

Tüm günler için bu adımları tekrarlayın.

### Adım 10: İçerik Bölümleri (Content Sections) - Opsiyonel

İçerik bölümleri, sayfa düzenini özelleştirmenizi sağlar.

**Eklenebilecek Bölümler:**

1. **Hero Section** - Ana başlık bölümü
   - Arka plan resmi/video
   - Başlık ve alt başlık

2. **Info Cards Section** - Bilgi kartları
   - Süre, zorluk, mesafe vb.

3. **Timeline Section** - Zaman çizelgesi
   - Önemli olaylar ve dönüm noktaları

4. **Gallery Section** - Galeri
   - Fotoğraf koleksiyonu

5. **Pricing Section** - Fiyatlandırma
   - Dahil olan ve olmayan hizmetler

6. **Contact Form Section** - İletişim formu
   - Form başlığı ve açıklaması

**Not:** Çoğu durumda content sections boş bırakılabilir. Standart düzen yeterlidir.

### Adım 11: Kaydet ve Yayınla

1. **Taslak olarak kaydetmek için:** Sağ üst köşede "Save" butonuna tıklayın
2. **Yayınlamak için:** "Save" butonunun yanındaki oka tıklayın ve "Publish" seçin

**Önemli:** Sadece "Publish" edilen içerikler web sitesinde görünür!

---

## Yeni Tur Tarihi Ekleme

Tur, bir maceranın belirli tarihlerde gerçekleşen örneğidir.

### Adım 1: Tour Collection'a Git

1. Sol menüden **Content Manager** seçin
2. **Collection Types** altında **Tours** seçin
3. **"Create new entry"** butonuna tıklayın

### Adım 2: Tur Bilgilerini Doldurun

**Gerekli Alanlar:**

1. **Title** - Tur başlığı (opsiyonel, boş bırakılabilir)
   - Boş bırakılırsa macera başlığı kullanılır

2. **Slug** - URL için benzersiz isim
   - Örnek: "kackalar-trekking-haziran-2025"

3. **Adventure** - Hangi maceraya ait olduğunu seçin
   - Açılır menüden ilgili macerayı seçin
   - **Çok Önemli:** Bu alanı seçmeyi unutmayın!

4. **Start Date** - Başlangıç tarihi
   - Format: YYYY-MM-DD
   - Örnek: 2025-06-15

5. **End Date** - Bitiş tarihi
   - Format: YYYY-MM-DD
   - Örnek: 2025-06-22

6. **Price** - Fiyat
   - Sadece sayı girin
   - Örnek: 8500

7. **Currency** - Para birimi
   - Örnek: "TRY", "USD", "EUR"

### Adım 3: Video Ekle (Opsiyonel)

Eğer tura özel bir tanıtım videosu varsa:

1. **Video** alanını bulun
2. Video dosyası yükleyin (MP4 formatı önerilir)
3. Alternatif metin ekleyin

### Adım 4: İçerik Bölümleri (Opsiyonel)

Normalde tur, bağlı olduğu maceranın içeriğini kullanır. Ancak tura özel içerik eklemek isterseniz:

1. **Content Sections** bölümünü bulun
2. İstediğiniz bölümü ekleyin (Hero, Info Cards, Gallery, vb.)
3. Bu bölümler maceranın içeriğini **geçersiz kılar** (override eder)

**Önerilen:** Çoğu durumda bu bölümü boş bırakın.

### Adım 5: Kaydet ve Yayınla

1. "Save" veya "Publish" butonuna tıklayın
2. Yayınlanan tur, web sitesinin "Turlar" sayfasında görünür

---

## Mevcut İçerikleri Düzenleme

### Macera Düzenleme

1. **Content Manager** → **Adventures** seçin
2. Düzenlemek istediğiniz macerayı bulun
3. Macera satırına tıklayın
4. İstediğiniz alanları değiştirin
5. "Save" veya "Publish" butonuna tıklayın

### Tur Düzenleme

1. **Content Manager** → **Tours** seçin
2. Düzenlemek istediğiniz turu bulun
3. Tur satırına tıklayın
4. İstediğiniz alanları değiştirin
5. "Save" veya "Publish" butonuna tıklayın

### Toplu İşlemler

Birden fazla içeriği aynı anda yayınlamak veya yayından kaldırmak için:

1. İçerik listesinde seçmek istediğiniz öğelerin yanındaki kutucukları işaretleyin
2. Üst menüden "Publish" veya "Unpublish" seçin
3. Onaylayın

---

## Resim ve Video Yükleme

### Media Library Kullanımı

1. Sol menüden **Media Library** seçin
2. **"Add new assets"** butonuna tıklayın
3. Dosyaları seçin veya sürükle-bırak yapın

### Resim Yükleme En İyi Uygulamaları

**Resim Boyutları:**
- Ana resimler: 1920x1080 piksel veya daha büyük
- Galeri resimleri: 1280x720 piksel minimum
- Logo: 400x400 piksel veya daha büyük

**Dosya Formatı:**
- Fotoğraflar: JPG (sıkıştırılmış)
- Grafikler/logolar: PNG (şeffaf arka plan için)
- Web için optimize edilmiş: WebP

**Dosya Adlandırma:**
- Türkçe karakter kullanmayın (ç, ğ, ı, ö, ş, ü)
- Boşluk yerine tire (-) kullanın
- Küçük harf kullanın
- Örnek: `kackalar-trekking-ana-gorsel.jpg`

**Dosya Boyutu:**
- Mümkünse 2MB'ın altında tutun
- Çok büyük dosyalar yükleme süresini uzatır

### Video Yükleme

**Video Formatı:**
- MP4 (H.264 codec) önerilir
- Mobil uyumlu olmalı

**Video Boyutu:**
- Maksimum 50MB (Strapi ayarlarına bağlı)
- Çok büyük videolar için YouTube/Vimeo kullanın

**Video Optimizasyonu:**
- 1080p (Full HD) veya 720p (HD) çözünürlük
- 30 fps yeterli
- Ses sıkıştırması: AAC

### Alternatif Metin (Alt Text) Ekleme

Her resim için alternatif metin ekleyin:

1. Media Library'de resme tıklayın
2. Sağda açılan panelde **"Alternative text"** alanını bulun
3. Resmi açıklayan kısa bir metin girin
   - Örnek: "Kaçkar Dağları zirvesinden manzara"
4. **"Save"** butonuna tıklayın

**Neden Önemli:**
- Görme engelli kullanıcılar için erişilebilirlik
- SEO (arama motoru optimizasyonu)
- Resim yüklenmezse gösterilecek metin

### Klasörlerle Organize Etme

Media Library'de klasörler oluşturarak resimlerinizi organize edin:

1. Media Library'de **"Create new folder"** butonuna tıklayın
2. Klasör adı verin (örn: "Kaçkar Trekking", "Logolar")
3. Resimleri sürükleyerek klasörlere taşıyın

---

## Menü ve Logo Yönetimi

### Logo Değiştirme

1. **Content Manager** → **Global** (Single Type) seçin
2. **Logo** alanını bulun
3. "Remove" butonuna tıklayarak mevcut logoyu kaldırın
4. "Add new assets" butonuyla yeni logoyu yükleyin
5. **"Save"** butonuna tıklayın

**Logo Özellikleri:**
- Format: PNG (şeffaf arka plan için)
- Boyut: 400x400 piksel veya 800x200 piksel (yatay logo için)
- Dosya boyutu: 100KB'ın altında

### Menü Düzenleme

1. **Content Manager** → **Global** seçin
2. **Navigation Links** bölümünü bulun
3. Mevcut menü öğelerini göreceksiniz

**Yeni Menü Öğesi Eklemek:**

1. "Add an entry to Navigation Links" butonuna tıklayın
2. Alanları doldurun:
   - **Label**: Menüde görünecek metin (Türkçe)
     - Örnek: "Maceralar", "Turlar", "Hakkımızda"
   - **URL**: Bağlantı adresi
     - İç sayfa: `/adventures`, `/tours`
     - Dış sayfa: `https://example.com`
   - **Order**: Sıralama numarası (küçük numara önce gelir)
     - Örnek: 1, 2, 3, 4...
3. **"Save"** butonuna tıklayın

**Menü Öğesi Düzenlemek:**

1. İlgili menü öğesine tıklayın
2. İstediğiniz alanları değiştirin
3. **"Save"** butonuna tıklayın

**Menü Öğesi Silmek:**

1. İlgili menü öğesinin sağındaki çöp kutusu ikonuna tıklayın
2. Onaylayın
3. **"Save"** butonuna tıklayın

**Menü Sıralaması Değiştirmek:**

1. Her menü öğesinin **Order** alanını düzenleyin
2. Küçük numara önce gelir (1, 2, 3...)
3. **"Save"** butonuna tıklayın

### Site Adı ve Açıklama

1. **Content Manager** → **Global** seçin
2. **Site Name** - Site başlığı
   - Örnek: "Inviktours - Doğa Turları"
3. **Site Description** - Site açıklaması (SEO için)
   - Örnek: "Türkiye'nin en güzel dağlarında profesyonel rehberlik hizmeti"
4. **"Save"** butonuna tıklayın

### Rezervasyon Butonu Ayarları

1. **Content Manager** → **Global** seçin
2. **Booking Button Settings** bölümünü bulun
3. Alanları doldurun:
   - **Button Text**: Buton üzerindeki yazı
     - Örnek: "Rezervasyon Yap"
   - **Button URL**: Butonun yönlendireceği sayfa
     - Örnek: `/contact`, `tel:+905551234567`
   - **Show Button**: Butonu göster/gizle (true/false)
4. **"Save"** butonuna tıklayın

### Footer (Alt Kısım) Metni

1. **Content Manager** → **Global** seçin
2. **Footer Text** alanını bulun
3. Markdown formatında yazabilirsiniz
   - Örnek:
   ```markdown
   © 2025 Inviktours. Tüm hakları saklıdır.

   İletişim: info@inviktours.com | Tel: +90 555 123 45 67
   ```
4. **"Save"** butonuna tıklayın

---

## Anasayfa İçeriğini Düzenleme

Anasayfa, dinamik içerik bölümlerinden oluşur.

### Anasayfa Düzenleme

1. **Content Manager** → **Home** (Single Type) seçin
2. **Content Sections** bölümünü bulun
3. Mevcut bölümleri görürsünüz

### Eklenebilecek Bölümler

**1. Hero Section** - Ana başlık bölümü

- **Title**: Ana başlık
- **Subtitle**: Alt başlık
- **Background Image**: Arka plan resmi
- **Hero Video**: Arka plan videosu (opsiyonel)
- **CTA Buttons**: Harekete geçirici butonlar
  - **Primary Button Text**: Ana buton yazısı
  - **Primary Button URL**: Ana buton linki
  - **Secondary Button Text**: İkincil buton yazısı
  - **Secondary Button URL**: İkincil buton linki

**2. Stats Section** - İstatistikler bölümü

- **Title**: Bölüm başlığı
- **Stats**: İstatistikler
  - "Add an entry to Stats" butonuna tıklayın
  - **Label**: İstatistik etiketi (örn: "Mutlu Müşteri")
  - **Value**: İstatistik değeri (örn: "1000+")
  - **Icon**: İkon adı (Material Symbols)

**3. Featured Tours Section** - Öne çıkan turlar

- **Title**: Bölüm başlığı
- **Subtitle**: Bölüm alt başlığı
- **Show All Button Text**: "Tümünü Gör" buton yazısı

**4. Features Section** - Özellikler bölümü

- **Title**: Bölüm başlığı
- **Subtitle**: Bölüm alt başlığı
- **Features**: Özellikler
  - "Add an entry to Features" butonuna tıklayın
  - **Title**: Özellik başlığı
  - **Description**: Özellik açıklaması
  - **Icon**: İkon adı

**5. CTA Section** - Harekete geçirici bölüm

- **Title**: Başlık
- **Description**: Açıklama
- **Button Text**: Buton yazısı
- **Button URL**: Buton linki
- **Background Image**: Arka plan resmi

### Bölüm Ekleme

1. "Add a component to Content Sections" butonuna tıklayın
2. Eklemek istediğiniz bölümü seçin
3. Bölüm alanlarını doldurun
4. **"Save"** butonuna tıklayın

### Bölüm Sıralama

Bölümleri sürükle-bırak ile yeniden sıralayabilirsiniz.

### Bölüm Silme

İlgili bölümün sağındaki çöp kutusu ikonuna tıklayın.

---

## Fiyat Güncelleme

### Tur Fiyatı Değiştirme

1. **Content Manager** → **Tours** seçin
2. Fiyatını değiştirmek istediğiniz turu seçin
3. **Price** alanını bulun ve yeni fiyatı girin
4. **Currency** alanını kontrol edin (TRY, USD, EUR)
5. **"Save"** butonuna tıklayın

### Pricing Section Ekleme (Detaylı Fiyatlandırma)

Macera veya tura Pricing Section ekleyerek detaylı fiyatlandırma gösterebilirsiniz:

1. İlgili macera veya tura git
2. **Content Sections** bölümünü bulun
3. "Add a component" → **Pricing Section** seçin
4. Alanları doldurun:
   - **Title**: Bölüm başlığı (örn: "Fiyatlandırma")
   - **Price**: Fiyat
   - **Currency**: Para birimi
   - **Price Note**: Fiyat notu (örn: "Kişi başı")
   - **Included Items**: Dahil olan hizmetler
     - "Add an entry" butonuna tıklayın
     - **Item**: Hizmet adı (örn: "Ulaşım")
   - **Excluded Items**: Dahil olmayan hizmetler
     - "Add an entry" butonuna tıklayın
     - **Item**: Hizmet adı (örn: "Kişisel ekipman")
5. **"Save"** butonuna tıklayın

---

## Program (Itinerary) Düzenleme

### Mevcut Program Günü Düzenleme

1. **Content Manager** → **Adventures** seçin
2. İlgili macerayı seçin
3. **Itinerary** bölümünü bulun
4. Düzenlemek istediğiniz güne tıklayın
5. İstediğiniz alanları değiştirin:
   - Title, Summary, Meals, Accommodation, vb.
6. **"Save"** butonuna tıklayın

### Yeni Program Günü Ekleme

1. **Itinerary** bölümünde "Add an entry to Itinerary" butonuna tıklayın
2. Gün bilgilerini doldurun (bkz: [Program Ekleme](#adım-9-program-ekleme-itinerary))
3. **"Save"** butonuna tıklayın

### Program Günü Silme

1. İlgili günün sağındaki çöp kutusu ikonuna tıklayın
2. Onaylayın
3. **"Save"** butonuna tıklayın

### Aktivite Ekleme

Her gün içinde birden fazla aktivite ekleyebilirsiniz:

1. İlgili güne tıklayın
2. **Activities** bölümünü bulun
3. "Add an entry to Activities" butonuna tıklayın
4. Alanları doldurun:
   - **Time**: Saat (opsiyonel)
   - **Description**: Aktivite açıklaması
5. **"Save"** butonuna tıklayın

### Günlere Resim Ekleme

Her güne özel resimler ekleyebilirsiniz:

1. İlgili güne tıklayın
2. **Images** alanını bulun
3. "Add new assets" butonuyla resimleri yükleyin
4. **"Save"** butonuna tıklayın

---

## Değişiklikleri Görüntüleme ve Test Etme

### Değişiklikler Ne Zaman Görünür?

**ISR (Incremental Static Regeneration) Sistemi:**

- İçeriklerde yaptığınız değişiklikler **60 saniye içinde** web sitesinde görünür
- Global ayarlar (menü, logo) **1 saat içinde** güncellenir

### Test Etme Adımları

1. **Strapi'de değişiklik yapın ve "Publish" edin**
2. **60 saniye bekleyin** (1-2 dakika ideal)
3. **Web sitesini ziyaret edin:**
   - Yerel: `http://localhost:3000`
   - Canlı: `https://your-site.vercel.app`
4. **Sayfayı yenileyin** (F5 veya Cmd+R)
5. **Hard refresh yapın** (cache'i temizlemek için):
   - Windows: Ctrl + Shift + R
   - Mac: Cmd + Shift + R
6. **Değişiklikleri kontrol edin**

### Değişiklikler Görünmüyorsa

**Adım 1: Strapi'de Kontrol Edin**
- İçerik "Published" durumunda mı?
- Taslak olarak kaydedilmemiş mi?

**Adım 2: Cache Temizleme**
- Tarayıcı cache'ini temizleyin
- Gizli pencere (Incognito/Private) modunda deneyin

**Adım 3: Bekleme Süresi**
- 2-3 dakika bekleyip tekrar deneyin
- Özellikle menü/logo değişiklikleri için 1 saat bekleyin

**Adım 4: Geliştirici Desteği**
- Sorun devam ediyorsa geliştiriciye bildirin
- Hata mesajı varsa ekran görüntüsü alın

### Yaygın Hatalar

**1. İçerik Görünmüyor**
- ✅ "Publish" butonuna tıkladınız mı?
- ✅ 60 saniye beklediİniz mi?
- ✅ Hard refresh yaptınız mı?

**2. Resimler Yüklenmiyor**
- ✅ Resim formatı destekleniyor mu? (JPG, PNG, WebP)
- ✅ Dosya boyutu çok büyük mü? (Max 5-10MB)
- ✅ Alternatif metin eklediniz mi?

**3. Menü Değişmedi**
- ✅ Global content type'ı kaydettiniz mi?
- ✅ 1 saat beklediniz mi? (Global ayarlar için)

**4. Tur Tarihi Görünmüyor**
- ✅ Adventure ilişkisini seçtiniz mi?
- ✅ Tarih formatı doğru mu? (YYYY-MM-DD)
- ✅ Published durumunda mı?

---

## Yapabilecekleriniz vs Geliştirici Gereken İşler

### ✅ Strapi Üzerinden Yapabilecekleriniz (Kod Gerekmez)

**İçerik Yönetimi:**
- ✅ Yeni macera ekleme/düzenleme/silme
- ✅ Yeni tur tarihi ekleme/düzenleme/silme
- ✅ Resim ve video yükleme
- ✅ Program (itinerary) düzenleme
- ✅ Fiyat güncelleme
- ✅ Metin içerikleri değiştirme

**Görsel Değişiklikler:**
- ✅ Logo değiştirme
- ✅ Ana resim değiştirme
- ✅ Galeri resimleri ekleme/silme
- ✅ Arka plan resimleri değiştirme

**Menü ve Navigasyon:**
- ✅ Menü öğeleri ekleme/düzenleme/silme
- ✅ Menü sıralama
- ✅ Footer metni değiştirme

**Anasayfa:**
- ✅ Anasayfa bölümleri ekleme/düzenleme
- ✅ İstatistikler güncelleme
- ✅ Öne çıkan özellikler ekleme
- ✅ CTA buton metinleri değiştirme

**İçerik Bölümleri:**
- ✅ Hero section ekleme/düzenleme
- ✅ Info cards ekleme/düzenleme
- ✅ Timeline ekleme/düzenleme
- ✅ Gallery bölümleri ekleme
- ✅ Pricing section ekleme/düzenleme
- ✅ Contact form metinleri değiştirme

**Genel Ayarlar:**
- ✅ Site adı ve açıklama değiştirme
- ✅ Rezervasyon butonu ayarları
- ✅ İletişim bilgileri güncelleme

### ❌ Geliştirici Gereken İşler (Kod Değişikliği Gerekir)

**Sayfa Yapısı:**
- ❌ Yeni sayfa türü ekleme
- ❌ Sayfa layout değiştirme
- ❌ Responsive davranış değiştirme
- ❌ Mobil görünüm düzenleme

**Yeni Özellikler:**
- ❌ Rezervasyon sistemi backend entegrasyonu
- ❌ Ödeme sistemi ekleme
- ❌ Email bildirimleri
- ❌ Kullanıcı kayıt/giriş sistemi
- ❌ Arama ve filtreleme özelliği
- ❌ Yorum ve değerlendirme sistemi
- ❌ Blog/haberler bölümü
- ❌ Çoklu dil desteği (i18n)
- ❌ Canlı chat sistemi

**Tasarım Değişiklikleri:**
- ❌ Renk şeması değiştirme (Tailwind config)
- ❌ Font değiştirme
- ❌ Buton stilleri değiştirme
- ❌ Animasyon ekleme/değiştirme
- ❌ Component düzeni değiştirme

**Teknik Değişiklikler:**
- ❌ API endpoint ekleme/değiştirme
- ❌ Database şeması değiştirme
- ❌ Yeni Strapi content type oluşturma
- ❌ Yeni Strapi component oluşturma
- ❌ CORS ayarları değiştirme
- ❌ Environment variables ekleme
- ❌ Build/deployment ayarları

**Performans ve Optimizasyon:**
- ❌ ISR cache sürelerini değiştirme
- ❌ Image optimization ayarları
- ❌ SEO yapılandırması (metadata, sitemap)
- ❌ Analytics entegrasyonu
- ❌ Performance monitoring

**Entegrasyonlar:**
- ❌ Google Maps entegrasyonu
- ❌ Social media entegrasyonları
- ❌ Email servis entegrasyonu (SendGrid, Mailgun)
- ❌ CRM entegrasyonu
- ❌ Üçüncü parti API entegrasyonları

### 🤔 Emin Değilseniz

Bir özelliğin Strapi üzerinden mi yoksa kod değişikliği ile mi yapılacağından emin değilseniz:

**Genel Kural:**
- **İçerik değişikliği** → Strapi üzerinden yapabilirsiniz
- **Yapı/davranış değişikliği** → Geliştirici gereklidir

**Örnekler:**
- "Bu butonun yazısını değiştirmek istiyorum" → ✅ Strapi (eğer buton Strapi'de tanımlıysa)
- "Bu butonu kırmızı yapmak istiyorum" → ❌ Geliştirici (renk tasarım değişikliği)
- "Yeni bir resim yüklemek istiyorum" → ✅ Strapi
- "Resmin köşelerini yuvarlak yapmak istiyorum" → ❌ Geliştirici (stil değişikliği)

**İletişim:**
Emin olmadığınız durumlarda geliştiriciye danışın. Açıklama yaparken:
1. Ne yapmak istediğinizi açıklayın
2. Mümkünse ekran görüntüsü ekleyin
3. Hangi sayfada olduğunu belirtin

---

## 💡 Püf Noktaları ve İpuçları

### Markdown Kullanımı

Birçok metin alanında Markdown formatı kullanabilirsiniz:

**Başlıklar:**
```markdown
# Ana Başlık
## Alt Başlık
### Daha Küçük Başlık
```

**Kalın ve İtalik:**
```markdown
**Kalın metin**
*İtalik metin*
**_Hem kalın hem italik_**
```

**Listeler:**
```markdown
- Madde 1
- Madde 2
- Madde 3

1. Numaralı liste
2. İkinci madde
3. Üçüncü madde
```

**Linkler:**
```markdown
[Link metni](https://example.com)
```

**Resimler:**
```markdown
![Alternatif metin](resim-url)
```

### İçerik Yazma İpuçları

**Başlıklar:**
- Kısa ve öz olun (max 60 karakter)
- Anahtar kelimeler kullanın
- Türkçe karakter kullanabilirsiniz

**Açıklamalar:**
- İlk cümle en önemlisidir
- Paragraflar arası boşluk bırakın
- Liste kullanarak okunabilirliği artırın

**SEO İçin:**
- Başlıklarda anahtar kelime kullanın
- Alt metinlere (alternative text) özen gösterin
- Açıklamaları detaylı yazın
- URL'lerde (slug) Türkçe karakter kullanmayın

### Toplu İçerik Yükleme

Çok sayıda tur veya macera eklemeniz gerekiyorsa:

1. Önce bir tane örnek oluşturun
2. Tüm alanları doldurun
3. Diğerleri için bu örneği şablon olarak kullanın
4. Copy-paste ile hızlandırabilirsiniz

### Düzenli Yedekleme

Önemli değişiklikler yapmadan önce:

1. Mevcut içeriğin ekran görüntüsünü alın
2. Veya metinleri bir not defterine kopyalayın
3. Böylece hata durumunda geri dönebilirsiniz

**Not:** Strapi'nin otomatik versiyonlama sistemi yoktur, bu yüzden manuel yedekleme önemlidir.

---

## 🆘 Yardım ve Destek

### Sorun mu Yaşıyorsunuz?

1. **Bu rehberi tekrar okuyun** - Çözüm burada olabilir
2. **[Troubleshooting Guide](.claude/../troubleshooting.md) dosyasına bakın** - Yaygın hatalar ve çözümleri
3. **Geliştiriciye ulaşın** - Detaylı bilgi vererek

### İletişimde Bulunurken

Sorununuzu açıklarken şunları ekleyin:

1. **Ne yapmaya çalıştığınız** - Örn: "Yeni tur eklemeye çalışıyorum"
2. **Ne oldu** - Örn: "Save butonuna bastığımda sayfa donuyor"
3. **Ekran görüntüleri** - Hata mesajı varsa
4. **Tarayıcı bilgisi** - Chrome, Firefox, Safari, vb.
5. **Tarih ve saat** - Sorunun ne zaman oluştuğu

---

**Hazırlayan:** Claude Code
**Versiyon:** 2.0
**Son Güncelleme:** 2025-01-13
**Hedef Kullanıcı:** Teknik olmayan içerik yöneticileri
