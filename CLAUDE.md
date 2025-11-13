# CLAUDE.md - Inviktours Project Guide

Bu dosya, Claude Code'un Inviktours projesi üzerinde çalışırken kullanacağı ana rehberdir.

## 📚 Dokümantasyon Yapısı

Bu proje, farklı kullanıcı tipleri ve görevler için modüler dokümantasyon kullanır:

### Referans Dosyaları (`.claude/` klasöründe)

1. **[user-guide.md](.claude/user-guide.md)** - Teknik olmayan kullanıcılar için Strapi kullanım rehberi
2. **[development-guide.md](.claude/development-guide.md)** - Geliştiriciler için detaylı teknik rehber
3. **[strapi-reference.md](.claude/strapi-reference.md)** - Backend içerik yapıları ve bileşen detayları
4. **[frontend-reference.md](.claude/frontend-reference.md)** - Frontend komponent ve tip sistemleri
5. **[deployment-guide.md](.claude/deployment-guide.md)** - Test ve canlıya alma prosedürleri
6. **[troubleshooting.md](.claude/troubleshooting.md)** - Yaygın sorunlar ve çözümleri

---

## 🎯 Görev Yönlendirme - Hangi Dosyayı Kullanmalı?

### İçerik Yönetimi İstekleri (Kod Değişikliği YOK)
**Örnek istekler:**
- "Menüyü değiştir", "Logo güncelle"
- "Yeni tur tarihi ekle", "Macera ekle"
- "Fiyatları güncelle", "Resim değiştir"
- "Anasayfa içeriğini düzenle"
- "Program/itinerary güncelle"

**→ [.claude/user-guide.md](.claude/user-guide.md) dosyasını oku**
- Strapi admin paneli üzerinden yapılacak adımları açıkla
- Kod değişikliği YAPMA, sadece Strapi kullanım talimatları ver
- Kullanıcıyı adım adım yönlendir

---

### Yeni Özellik/Geliştirme İstekleri (Kod Değişikliği EVET)
**Örnek istekler:**
- "Yeni sayfa ekle", "Yeni component oluştur"
- "Rezervasyon sistemi backend'i", "Ödeme entegrasyonu"
- "Email bildirimleri", "Arama/filtreleme özelliği"
- "SEO optimizasyonu", "Blog bölümü"

**→ [.claude/development-guide.md](.claude/development-guide.md) ve ilgili reference'ları oku**
- Plan oluştur (TodoWrite kullan)
- Kod değişiklikleri yap
- Test talimatları ver

---

### Teknik Soru/Açıklama İstekleri
**Örnek istekler:**
- "Bu component nasıl çalışıyor?"
- "Type definitions nedir?"
- "API nasıl çağrılıyor?"
- "Dynamic zone pattern'i açıkla"

**→ İlgili reference dosyasını oku:**
- Backend soruları: [strapi-reference.md](.claude/strapi-reference.md)
- Frontend soruları: [frontend-reference.md](.claude/frontend-reference.md)
- Geliştirme soruları: [development-guide.md](.claude/development-guide.md)

---

### Test ve Deployment İstekleri
**Örnek istekler:**
- "Canlıya nasıl gönderilir?"
- "Test nasıl yapılır?"
- "Build hatası alıyorum"
- "Production'a deploy et"

**→ [.claude/deployment-guide.md](.claude/deployment-guide.md) dosyasını oku**
- Adım adım test/deployment talimatları ver
- Environment setup açıkla
- Checklist'leri takip et

---

### Hata Giderme İstekleri
**Örnek istekler:**
- "CORS hatası alıyorum"
- "Resimler yüklenmiyor"
- "Build başarısız oluyor"
- "Strapi'ye bağlanamıyorum"

**→ [.claude/troubleshooting.md](.claude/troubleshooting.md) dosyasını oku**
- Yaygın hataları kontrol et
- Debug adımlarını uygula
- Çözüm öner

---

## 🚀 Hızlı Başlangıç

### Proje Hakkında
Inviktours, doğa turları platformudur. **Next.js 15** (frontend) ve **Strapi 5** (backend) ile geliştirilmiştir. Tüm içerik **Türkçe**'dir.

### Temel Komutlar

**Frontend (Next.js):**
```bash
cd frontend
npm install              # Bağımlılıkları yükle
npm run dev             # Dev server başlat (http://localhost:3000)
npm run build           # Production build
npm run start           # Production server
```

**Backend (Strapi):**
```bash
cd backend
npm install              # Bağımlılıkları yükle
npm run develop         # Dev server başlat (http://localhost:1337/admin)
npm run build           # Admin panel build
npm run start           # Production server
```

### Proje Yapısı (Kısaca)

```
inviktours/
├── frontend/           # Next.js 15 uygulaması
│   ├── app/           # Next.js App Router (sayfalar)
│   ├── components/    # React bileşenleri
│   ├── lib/           # Strapi API client
│   └── types/         # TypeScript type definitions
├── backend/           # Strapi 5 uygulaması
│   ├── src/api/       # Content types (adventure, tour, home, global)
│   └── src/components/ # Reusable components (34 adet)
└── .claude/           # Referans dokümantasyonları
```

---

## 🏗️ Mimari Özet

### İçerik Hiyerarşisi
```
Adventure (Macera Şablonu)
  ├── Temel Bilgiler (başlık, açıklama, resimler)
  ├── Program (günlük itinerary)
  ├── Özellikler (zorluk, süre, vb.)
  ├── Gereksinimler (fiziksel, ekipman)
  └── Tours (Tur Tarihleri - scheduled instances)
       ├── Tarih aralığı (başlangıç-bitiş)
       ├── Fiyat
       └── İsteğe bağlı özel içerik
```

### Veri Akışı
1. **Kullanıcı isteği** → Frontend Next.js
2. **API çağrısı** → Strapi REST API
3. **Derin populate** → Adventure + Tour + Tüm ilişkiler
4. **ISR cache** → 60 saniye revalidation
5. **Render** → Dynamic content sections

---

## 🎨 Dil Politikası

### Türkçe İçerik (Strapi)
- Tüm kullanıcıya görünen içerik **Türkçe** olmalı
- Sayfa başlıkları, açıklamalar, buton metinleri
- Hata mesajları, form etiketleri
- Yeni içerik eklerken **mutlaka Türkçe kullan**

### İngilizce Kod (Next.js/Strapi)
- Component isimleri: İngilizce
- Function isimleri: İngilizce
- Type definitions: İngilizce
- Kod yorumları: İngilizce
- Git commit mesajları: İngilizce

---

## ⚠️ Kritik Kurallar

### 1. Strapi vs Code Ayrımı
- **Strapi değişiklikleri:** Admin panel üzerinden, kod yazmadan
- **Kod değişiklikleri:** Yeni özellikler, layout değişiklikleri, entegrasyonlar

### 2. Her Zaman İlk Önce Oku
- Değişiklik yapmadan önce **mutlaka** ilgili dosyayı Read tool ile oku
- Mevcut kodu anlamadan değişiklik yapma
- Type definitions'ı kontrol et

### 3. Güvenlik
- **Asla** API keys, secrets, credentials commit etme
- Environment variables kullan
- CORS ayarlarına dikkat et
- SQL injection, XSS gibi güvenlik açıklarına karşı dikkatli ol

### 4. Test Etme
- Her değişiklikten sonra **mutlaka** local test
- Build başarılı olmalı (`npm run build`)
- Type errors olmamalı
- Responsive tasarımı kontrol et

### 5. TodoWrite Kullan
- Karmaşık görevler için **mutlaka** TodoWrite kullan
- Adım adım ilerlemeyi göster
- Her adımı tamamladıkça işaretle

---

## 🔐 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_STRAPI_URL=https://your-app.strapiapp.com
NEXT_PUBLIC_STRAPI_API_URL=https://your-app.strapiapp.com/api
```

### Backend (.env)
```
# Secrets (generate with node crypto)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...

# Database (production)
DATABASE_CLIENT=postgres
DATABASE_HOST=...
DATABASE_PORT=5432
DATABASE_NAME=...
DATABASE_USERNAME=...
DATABASE_PASSWORD=...

# CORS
CORS_ORIGINS=http://localhost:3000,https://your-vercel-app.vercel.app
```

**Secret oluşturma:**
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

---

## 📦 Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router, Turbopack)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Fonts:** Google Fonts (Geist Sans, Work Sans)
- **Icons:** Material Symbols Outlined

### Backend
- **CMS:** Strapi 5
- **Database (Dev):** SQLite
- **Database (Prod):** PostgreSQL
- **API:** REST API

### Deployment
- **Frontend:** Vercel
- **Backend:** Strapi Cloud
- **ISR:** 60s revalidation for content, 3600s for global settings

---

## 🆘 Yardım ve Destek

### Kullanıcı Türüne Göre Başlangıç Noktası

**Teknik olmayan kullanıcı** (içerik yöneticisi):
→ [.claude/user-guide.md](.claude/user-guide.md) dosyasını oku

**Geliştirici** (yeni özellik ekleyecek):
→ [.claude/development-guide.md](.claude/development-guide.md) dosyasını oku

**Claude Code** (görev routing):
→ Yukarıdaki "Görev Yönlendirme" bölümünü takip et

### Ortak Görevler Hızlı Bağlantılar

- Yeni macera ekle → [user-guide.md - "Yeni Macera Ekleme"](.claude/user-guide.md#yeni-macera-ekleme)
- Tur tarihi ekle → [user-guide.md - "Yeni Tur Tarihi Ekleme"](.claude/user-guide.md#yeni-tur-tarihi-ekleme)
- Menü değiştir → [user-guide.md - "Menü ve Logo Yönetimi"](.claude/user-guide.md#menü-ve-logo-yönetimi)
- Yeni component ekle → [development-guide.md - "Yeni Component Ekleme"](.claude/development-guide.md#yeni-component-ekleme)
- Deployment → [deployment-guide.md - "Production Deployment"](.claude/deployment-guide.md#production-deployment)
- Hata çözme → [troubleshooting.md](.claude/troubleshooting.md)

---

## 📊 Proje Durumu

### Mevcut Özellikler
- ✅ Macera listing ve detay sayfaları
- ✅ Tur listing ve detay sayfaları
- ✅ Dinamik anasayfa
- ✅ Günlük itinerary sistemi
- ✅ Resim galerileri
- ✅ Fiyatlandırma bölümleri
- ✅ Rezervasyon modalı (frontend only)
- ✅ Responsive tasarım
- ✅ SEO-friendly (metadata)
- ✅ ISR caching

### Eksik/Gelecek Özellikler
- ⏳ Rezervasyon backend entegrasyonu
- ⏳ Email bildirimleri
- ⏳ Ödeme sistemi
- ⏳ Kullanıcı hesapları
- ⏳ Arama ve filtreleme
- ⏳ Çoklu dil desteği (i18n)
- ⏳ Blog/haberler bölümü
- ⏳ Değerlendirme ve yorumlar

---

## 🎓 Öğrenme Kaynakları

### Kullanılan Teknolojiler Dokümantasyonları
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Strapi 5 Docs](https://docs.strapi.io)
- [Tailwind CSS 4](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

### Proje-Spesifik Dokümantasyon
- Strapi yapıları: [.claude/strapi-reference.md](.claude/strapi-reference.md)
- Frontend yapıları: [.claude/frontend-reference.md](.claude/frontend-reference.md)
- Geliştirme rehberi: [.claude/development-guide.md](.claude/development-guide.md)

---

## 📝 Son Notlar

### Claude Code İçin Önemli Hatırlatmalar

1. **Her zaman doğru dosyayı oku:** Görev tipine göre yukarıdaki routing'i takip et
2. **Strapi vs Code ayrımını koru:** İçerik değişiklikleri için kod yazma
3. **TodoWrite kullan:** Karmaşık görevleri planla ve takip et
4. **Test et:** Her değişiklikten sonra mutlaka test
5. **Türkçe içerik:** Kullanıcıya görünen tüm metinler Türkçe olmalı
6. **Güvenlik:** Secrets commit etme, güvenlik açıklarına dikkat et
7. **Type-safe:** TypeScript type'ları kullan, any kullanma
8. **ISR:** Değişikliklerin görünmesi için 60 saniye beklenebilir

### İletişim ve Geri Bildirim

Bu dokümantasyon sürekli gelişmektedir. Eklemeler ve düzeltmeler için GitHub'da issue açabilirsiniz.

---

**Version:** 2.0
**Last Updated:** 2025-01-13
**Maintainer:** Claude Code + Development Team
