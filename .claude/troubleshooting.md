# Troubleshooting Guide - Sorun Giderme Rehberi

Yaygın sorunlar ve çözümleri.

---

## 📋 İçindekiler

1. [Strapi Sorunları](#strapi-sorunları)
2. [Frontend Sorunları](#frontend-sorunları)
3. [CORS Hataları](#cors-hataları)
4. [Image Loading Sorunları](#image-loading-sorunları)
5. [Build Hataları](#build-hataları)
6. [ISR Cache Sorunları](#isr-cache-sorunları)
7. [Deployment Sorunları](#deployment-sorunları)
8. [Performance Sorunları](#performance-sorunları)

---

## Strapi Sorunları

### İçerik Yayınlandığında Sitede Görünmüyor

**Belirtiler:**
- Strapi'de "Published" durumda
- Frontend'de görünmüyor

**Çözümler:**

**1. ISR Cache Bekle**
```
Problem: Cache henüz yenilenmedi
Çözüm: 60-120 saniye bekle, hard refresh yap (Cmd+Shift+R)
```

**2. Public Permissions Kontrol**
```
Problem: Public role'de permission yok
Çözüm:
1. Settings → Users & Permissions → Roles → Public
2. İlgili content type için find ve findOne enable
3. Save
```

**3. API Response Kontrol**
```bash
# Test API endpoint
curl https://your-app.strapiapp.com/api/adventures

# Beklenen: JSON response with data
# Hata: 403 Forbidden → Permission sorunu
# Hata: 404 Not Found → Content published değil
```

---

### Admin Paneline Giriş Yapamıyorum

**Belirtiler:**
- Login sayfası açılıyor ama giriş yapamıyorum
- "Invalid credentials" hatası

**Çözümler:**

**1. Şifre Sıfırla**
```bash
# Local'de
cd backend
npm run strapi admin:reset-user-password -- --email=admin@example.com --password=NewPassword123
```

**2. Database Bağlantısı Kontrol**
```bash
# .env dosyasını kontrol et
DATABASE_CLIENT=postgres
DATABASE_HOST=...
DATABASE_PORT=5432
DATABASE_NAME=...
DATABASE_USERNAME=...
DATABASE_PASSWORD=...
```

**3. JWT Secret Kontrol**
```bash
# .env'de olmalı
ADMIN_JWT_SECRET=...
JWT_SECRET=...
```

---

### Media Upload Çalışmıyor

**Belirtiler:**
- Resim yüklemeye çalışınca hata
- "Upload failed" mesajı

**Çözümler:**

**1. Dosya Boyutu**
```
Problem: Dosya çok büyük
Çözüm: Resmi sıkıştır (max 5-10MB)
```

**2. File Format**
```
Problem: Desteklenmeyen format
Çözüm: JPG, PNG, WebP kullan
```

**3. Upload Plugin Config**
```javascript
// backend/config/plugins.ts
module.exports = {
  upload: {
    config: {
      sizeLimit: 10 * 1024 * 1024, // 10MB
    },
  },
}
```

**4. Permissions**
```
Problem: Upload permission yok
Çözüm: Settings → Roles → Public → Upload (find, findOne)
```

---

### Database Migration Hataları

**Belirtiler:**
- Strapi başlamıyor
- "Migration failed" hatası

**Çözümler:**

**1. Development (SQLite):**
```bash
# Database'i sil ve yeniden oluştur
rm -rf backend/.tmp
npm run develop
```

**2. Production (PostgreSQL):**
```bash
# Strapi Cloud'da database reset
# Dashboard → Database → Reset
# ⚠️ Tüm datayı siler!
```

---

## Frontend Sorunları

### Sayfa 404 Hatası Veriyor

**Belirtiler:**
- "/adventures/slug" açılmıyor
- 404 Not Found

**Çözümler:**

**1. Slug Kontrolü**
```
Problem: Slug yanlış yazılmış
Çözüm: Strapi'de doğru slug'ı kontrol et
```

**2. Content Published Değil**
```
Problem: İçerik draft durumunda
Çözüm: Strapi'de "Publish" butonuna tıkla
```

**3. API Fetch Başarısız**
```typescript
// Debug için console.log ekle
const adventure = await getAdventureBySlug(slug)
console.log('Fetched adventure:', adventure)

// null dönüyorsa API problemi
```

---

### Data Fetching Çalışmıyor

**Belirtiler:**
- Sayfalar boş görünüyor
- Console'da fetch error

**Çözümler:**

**1. Environment Variables**
```bash
# frontend/.env.local kontrol et
NEXT_PUBLIC_STRAPI_URL=https://your-app.strapiapp.com
NEXT_PUBLIC_STRAPI_API_URL=https://your-app.strapiapp.com/api

# Değişiklikten sonra server restart
npm run dev
```

**2. Network Tab Kontrol**
```
1. Browser DevTools → Network tab aç
2. Sayfayı yenile
3. API request'leri kontrol et
4. Status code 200 olmalı
5. Response JSON olmalı
```

**3. CORS Hatası**
```
Problem: CORS policy blocking
Çözüm: Aşağıdaki CORS bölümüne bak
```

---

### TypeScript Errors

**Belirtiler:**
- Build başarısız
- "Type error" mesajları

**Çözümler:**

**1. Type Definitions Kontrol**
```typescript
// Strapi'den gelen data ile type uyuşmuyor mu?
// Type definition'ı güncelle

// Örnek:
interface Adventure {
  id: number
  documentId: string
  // Yeni field ekle
  newField?: string // opsiyonel yap
}
```

**2. Any Type Kullan (Geçici)**
```typescript
// Hızlı fix için (production'da kullanma!)
const data: any = await fetchData()
```

**3. Type Guard Kullan**
```typescript
if (data && 'title' in data) {
  // data.title safe to use
}
```

---

## CORS Hataları

### "Access-Control-Allow-Origin" Hatası

**Belirtiler:**
```
Access to fetch at 'https://strapi.com/api/...' from origin 'https://vercel.app'
has been blocked by CORS policy
```

**Çözümler:**

**1. Backend CORS Config**
```bash
# backend/.env
CORS_ORIGINS=http://localhost:3000,https://your-vercel-app.vercel.app

# Virgülle ayır, boşluk bırakma!
```

**2. Middleware Config**
```typescript
// backend/config/middlewares.ts
{
  name: 'strapi::cors',
  config: {
    origin: env('CORS_ORIGINS', 'http://localhost:3000').split(','),
  },
}
```

**3. Wildcard (Development Only)**
```typescript
// ⚠️ Sadece development'ta!
origin: '*'
```

**4. Strapi Restart**
```bash
# CORS değişikliğinden sonra restart gerekli
npm run develop
```

---

### Preflight Request Failed

**Belirtiler:**
- OPTIONS request 403/405
- CORS error

**Çözümler:**

**1. Methods Ekle**
```typescript
// backend/config/middlewares.ts
{
  name: 'strapi::cors',
  config: {
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  },
}
```

**2. Headers Ekle**
```typescript
{
  name: 'strapi::cors',
  config: {
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  },
}
```

---

## Image Loading Sorunları

### Resimler Görünmüyor

**Belirtiler:**
- Broken image icon
- Console'da 404 error

**Çözümler:**

**1. URL Kontrolü**
```typescript
// getStrapiMediaUrl kullanıldığından emin ol
import { getStrapiMediaUrl } from '@/lib/strapi'

<Image
  src={getStrapiMediaUrl(image.url)} // ✅
  // src={image.url} ❌ (relative URL çalışmaz)
/>
```

**2. NEXT_PUBLIC_STRAPI_URL Kontrol**
```bash
# .env.local'de doğru mu?
NEXT_PUBLIC_STRAPI_URL=https://your-app.strapiapp.com

# Trailing slash OLMAMALI
```

**3. Upload Permissions**
```
Settings → Roles → Public → Upload (find, findOne)
```

**4. Image Format**
```typescript
// Next.js Image için format kontrolü
<Image
  src={url}
  alt={alt}
  width={800}
  height={600}
  // unoptimized={true} // Sorun devam ederse ekle
/>
```

---

### Resimler Yavaş Yükleniyor

**Çözümler:**

**1. Priority Flag**
```typescript
// Above-the-fold images için
<Image
  src={url}
  priority={true}
  alt={alt}
/>
```

**2. Lazy Loading**
```typescript
// Below-the-fold images için (default)
<Image
  src={url}
  loading="lazy"
  alt={alt}
/>
```

**3. Responsive Sizes**
```typescript
<Image
  src={url}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt={alt}
/>
```

**4. Format Optimization**
```
Strapi'de resim yüklerken:
- WebP format kullan
- Boyutu optimize et (max 2MB)
- Dimensions uygun olsun (max 1920px width)
```

---

## Build Hataları

### "Module not found" Hatası

**Belirtiler:**
```
Error: Cannot find module '@/components/MyComponent'
```

**Çözümler:**

**1. Import Path Kontrol**
```typescript
// ✅ Doğru
import { MyComponent } from '@/components/MyComponent'

// ❌ Yanlış
import { MyComponent } from '@/components/mycomponent'
```

**2. Dosya Var mı?**
```bash
ls frontend/components/MyComponent.tsx
```

**3. TypeScript Config**
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

### Build Timeout

**Belirtiler:**
- Build çok uzun sürüyor
- Vercel'de timeout

**Çözümler:**

**1. ISR Kullan**
```typescript
// Tüm sayfaları build time'da generate etme
export const revalidate = 60 // ISR enable
```

**2. Dynamic Import**
```typescript
// Ağır componentler için
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <LoadingSpinner />
})
```

**3. Vercel Timeout Artır**
```json
// vercel.json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next",
      "config": {
        "maxDuration": 300
      }
    }
  ]
}
```

---

## ISR Cache Sorunları

### Değişiklikler Görünmüyor

**Belirtiler:**
- Strapi'de değişiklik yaptım
- Sitede eski içerik görünüyor

**Çözümler:**

**1. Bekle**
```
ISR revalidation süresi: 60 saniye
Çözüm: 1-2 dakika bekle
```

**2. Hard Refresh**
```
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

**3. Incognito/Private Mode**
```
Tarayıcı cache'siz test et
```

**4. Manual Revalidation (Development)**
```typescript
// API route oluştur
// pages/api/revalidate.ts
export default async function handler(req, res) {
  await res.revalidate('/adventures')
  return res.json({ revalidated: true })
}

// Call: /api/revalidate
```

---

### ISR Cache Çok Uzun

**Belirtiler:**
- Değişiklikler çok geç görünüyor
- 1 saat beklemem gerekiyor

**Çözümler:**

**1. Revalidation Süresini Azalt**
```typescript
// app/page.tsx
export const revalidate = 30 // 30 saniye

// Veya fetch level
fetch(url, {
  next: { revalidate: 30 }
})
```

**2. Cache Bypass (Development)**
```typescript
// Cache'i disable et
export const revalidate = 0
// veya
fetch(url, { cache: 'no-store' })
```

---

## Deployment Sorunları

### Vercel Build Başarısız

**Belirtiler:**
- "Build failed" on Vercel
- Red X on deployment

**Çözümler:**

**1. Logs Kontrol**
```
Vercel Dashboard → Deployment → View Logs
Son error mesajını oku
```

**2. Local Build Test**
```bash
cd frontend
npm run build

# Hata varsa local'de fix et
# Fix'ten sonra push
```

**3. Environment Variables**
```
Vercel'de tüm env vars set mi?
Project Settings → Environment Variables

NEXT_PUBLIC_STRAPI_URL
NEXT_PUBLIC_STRAPI_API_URL
```

**4. Node Version**
```json
// package.json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

### Strapi Cloud Deploy Başarısız

**Belirtiler:**
- Deploy stuck or failed
- Red status on dashboard

**Çözümler:**

**1. Logs Kontrol**
```
Strapi Cloud Dashboard → Logs
Error mesajlarını oku
```

**2. Environment Variables**
```
Tüm required vars set mi?
APP_KEYS, API_TOKEN_SALT, ADMIN_JWT_SECRET, etc.
```

**3. Database Connection**
```
Strapi Cloud otomatik PostgreSQL provision ediyor mu?
Dashboard → Database section kontrol et
```

**4. Build Command**
```bash
# Doğru build command kullanılıyor mu?
npm run build
```

---

## Performance Sorunları

### Sayfa Yavaş Yükleniyor

**Çözümler:**

**1. Network Tab Analiz**
```
DevTools → Network → Reload
Hangi request'ler yavaş?
```

**2. Image Optimization**
```typescript
// WebP kullan, boyutu küçült
// Next.js Image component kullan
<Image src={url} alt={alt} width={800} height={600} />
```

**3. Code Splitting**
```typescript
// Heavy components için dynamic import
import dynamic from 'next/dynamic'
const Heavy = dynamic(() => import('./Heavy'))
```

**4. Lighthouse Report**
```
Chrome DevTools → Lighthouse → Generate report
Performance score'u incele
Önerileri uygula
```

---

### High Server Response Time

**Çözümler:**

**1. ISR Enable**
```typescript
export const revalidate = 60
```

**2. Strapi Query Optimization**
```typescript
// Sadece gerekli field'ları populate et
populate: {
  mainImage: true,
  // images: true, // Eğer gerekmiyorsa kaldır
}
```

**3. Database Indexing**
```
Strapi'de slug field'leri index'lenmiş olmalı
(Strapi otomatik yapar unique field'ler için)
```

---

## Debug Checklist

### Sorun Yaşadığınızda

**1. Console Errors**
```
Browser DevTools → Console
Error mesajlarını oku
```

**2. Network Tab**
```
Network → XHR/Fetch
Failed requests'leri kontrol et
```

**3. Server Logs**
```
Strapi: Dashboard → Logs
Vercel: Deployment → Runtime Logs
```

**4. Environment Variables**
```
Tüm required vars set mi?
Production ve development'ta farklı mı?
```

**5. CORS**
```
Strapi CORS_ORIGINS doğru mu?
Frontend domain dahil mi?
```

**6. Permissions**
```
Strapi Public role permissions set mi?
find ve findOne enable mi?
```

**7. ISR Cache**
```
60 saniye bekledin mi?
Hard refresh yaptın mı?
```

---

## İletişim

**Sorun çözülmediyse:**

1. Error mesajının tam halini kopyala
2. Ekran görüntüsü al
3. Hangi adımları denediğini listele
4. Geliştiriciye ilet

**Gerekli Bilgiler:**
- Tarayıcı (Chrome, Firefox, Safari, vb.)
- İşletim sistemi (Windows, Mac, Linux)
- Hata mesajı
- Ne yapmaya çalıştığın
- Ne zaman başladı (deployment sonrası mı?)

---

**See Also:**
- Development: [development-guide.md](./development-guide.md)
- Deployment: [deployment-guide.md](./deployment-guide.md)
- User Guide: [user-guide.md](./user-guide.md)

---

**Version:** 2.0
**Last Updated:** 2025-01-13
