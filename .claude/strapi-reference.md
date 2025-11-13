# Strapi Backend Reference

Backend yapısı, content types ve componentlerin detaylı referansı.

---

## Content Types

### 1. Adventure (Collection Type)

**API ID:** `adventure`
**Path:** `backend/src/api/adventure`

**Fields:**
```typescript
{
  title: string                    // Macera başlığı
  slug: string (unique)            // URL-friendly identifier
  subtitle: string                 // Alt başlık
  description: text                // Markdown formatında açıklama
  tripSummary: text                // Kısa özet
  mainImage: media (single)        // Ana resim
  images: media (multiple)         // Galeri resimleri
  video: media (single)            // Video dosyası
  tripAttributes: component        // Tur özellikleri
  tripInfo: component              // Tur bilgileri
  requirements: component          // Gereksinimler
  itinerary: component (repeatable) // Günlük program
  contentSections: dynamiczone     // Dinamik içerik bölümleri
}
```

**Relations:**
- `tours`: oneToMany → Tour

**API Endpoints:**
```
GET    /api/adventures
GET    /api/adventures/:documentId
POST   /api/adventures
PUT    /api/adventures/:documentId
DELETE /api/adventures/:documentId
```

---

### 2. Tour (Collection Type)

**API ID:** `tour`
**Path:** `backend/src/api/tour`

**Fields:**
```typescript
{
  slug: string (unique)            // URL-friendly identifier
  title: string                    // Tur başlığı (opsiyonel)
  adventure: relation (manyToOne)  // İlişkili macera
  startDate: date                  // Başlangıç tarihi
  endDate: date                    // Bitiş tarihi
  price: decimal                   // Fiyat
  currency: string                 // Para birimi (TRY, USD, EUR)
  video: media (single)            // Tanıtım videosu
  contentSections: dynamiczone     // Özel içerik bölümleri
}
```

**Relations:**
- `adventure`: manyToOne → Adventure

**API Endpoints:**
```
GET    /api/tours
GET    /api/tours/:documentId
POST   /api/tours
PUT    /api/tours/:documentId
DELETE /api/tours/:documentId
```

---

### 3. Home (Single Type)

**API ID:** `home`
**Path:** `backend/src/api/home`

**Fields:**
```typescript
{
  contentSections: dynamiczone     // Anasayfa içerik bölümleri
}
```

**Content Sections:**
- home.hero-section
- home.stats-section
- home.featured-tours-section
- home.features-section
- home.cta-section

**API Endpoint:**
```
GET /api/home
```

---

### 4. Global (Single Type)

**API ID:** `global`
**Path:** `backend/src/api/global`

**Fields:**
```typescript
{
  siteName: string                 // Site adı
  siteDescription: text            // Site açıklaması
  logo: media (single)             // Logo
  navigationLinks: component (repeatable) // Menü linkleri
  bookingButtonSettings: component // Rezervasyon butonu ayarları
  contactButtonText: string        // İletişim butonu metni
  contactButtonUrl: string         // İletişim butonu URL'i
  footerText: text                 // Footer metni (Markdown)
}
```

**API Endpoint:**
```
GET /api/global
```

---

## Components

### Adventure Components (`components/adventure/`)

**1. trip-attributes**
```typescript
{
  style: string            // Stil (Trekking, Climbing, vb.)
  serviceType: string      // Hizmet tipi (Grup, Özel)
  physicalRating: integer  // Fiziksel zorluk (1-5)
  groupType: string        // Grup tipi (6-12 kişi, vb.)
}
```

**2. trip-info**
```typescript
{
  ageRequirement: string   // Yaş gereksinimi
  visaRequirement: string  // Vize gereksinimi
}
```

**3. requirements**
```typescript
{
  physicalRequirements: text    // Fiziksel gereksinimler (Markdown)
  equipmentRequirements: text   // Ekipman gereksinimleri (Markdown)
  healthRequirements: text      // Sağlık gereksinimleri (Markdown)
}
```

**4. itinerary-day**
```typescript
{
  dayNumber: integer              // Gün numarası
  title: string                   // Gün başlığı
  summary: text                   // Gün özeti (Markdown)
  activities: component (repeatable) // Aktiviteler
  meals: string                   // Öğünler
  accommodation: string           // Konaklama
  images: media (multiple)        // Günün fotoğrafları
  elevationGain: integer          // Yükselti (metre)
  distance: decimal               // Mesafe (km)
}
```

**5. itinerary-activity**
```typescript
{
  time: string               // Saat (opsiyonel)
  description: text          // Aktivite açıklaması
}
```

**6. hero-section**
```typescript
{
  title: string                   // Başlık
  subtitle: string                // Alt başlık
  backgroundImage: media (single) // Arka plan resmi
  heroVideo: media (single)       // Arka plan videosu
}
```

**7. info-cards-section**
```typescript
{
  title: string                   // Bölüm başlığı
  cards: component (repeatable)   // Info kartları
}
```

**8. info-card**
```typescript
{
  icon: string     // Material Symbol icon adı
  label: string    // Kart etiketi
  value: string    // Kart değeri
}
```

**9. timeline-section**
```typescript
{
  title: string                   // Bölüm başlığı
  items: component (repeatable)   // Timeline öğeleri
}
```

**10. timeline-item**
```typescript
{
  date: string         // Tarih
  title: string        // Başlık
  description: text    // Açıklama
}
```

**11. gallery-section**
```typescript
{
  title: string                   // Bölüm başlığı
  images: component (repeatable)  // Galeri resimleri
}
```

**12. gallery-image**
```typescript
{
  image: media (single)      // Resim
  caption: string            // Resim başlığı
}
```

**13. pricing-section**
```typescript
{
  title: string                     // Bölüm başlığı
  price: decimal                    // Fiyat
  currency: string                  // Para birimi
  priceNote: string                 // Fiyat notu
  includedItems: component (repeatable) // Dahil olanlar
  excludedItems: component (repeatable) // Dahil olmayanlar
}
```

**14. pricing-item**
```typescript
{
  item: string     // Hizmet adı
}
```

**15. contact-form-section**
```typescript
{
  title: string        // Form başlığı
  description: text    // Form açıklaması
}
```

---

### Tour Components (`components/tour/`)

Tour componentleri adventure componentleri ile aynı yapıdadır, sadece namespace farklıdır:
- `tour.hero-section`
- `tour.info-cards-section`
- `tour.timeline-section`
- `tour.gallery-section`
- `tour.pricing-section`
- `tour.contact-form-section`

---

### Home Components (`components/home/`)

**1. hero-section**
```typescript
{
  title: string                      // Ana başlık
  subtitle: string                   // Alt başlık
  backgroundImage: media (single)    // Arka plan resmi
  heroVideo: media (single)          // Arka plan videosu
  primaryButtonText: string          // Ana buton metni
  primaryButtonUrl: string           // Ana buton URL'i
  secondaryButtonText: string        // İkincil buton metni
  secondaryButtonUrl: string         // İkincil buton URL'i
}
```

**2. stats-section**
```typescript
{
  title: string                      // Bölüm başlığı
  stats: component (repeatable)      // İstatistikler
}
```

**3. stat-item**
```typescript
{
  label: string    // İstatistik etiketi
  value: string    // İstatistik değeri
  icon: string     // İkon adı
}
```

**4. featured-tours-section**
```typescript
{
  title: string              // Bölüm başlığı
  subtitle: string           // Bölüm alt başlığı
  showAllButtonText: string  // "Tümünü Gör" buton metni
}
```

**5. features-section**
```typescript
{
  title: string                     // Bölüm başlığı
  subtitle: string                  // Bölüm alt başlığı
  features: component (repeatable)  // Özellikler
}
```

**6. feature-item**
```typescript
{
  title: string        // Özellik başlığı
  description: text    // Özellik açıklaması
  icon: string         // İkon adı
}
```

**7. cta-section**
```typescript
{
  title: string                   // Başlık
  description: text               // Açıklama
  buttonText: string              // Buton metni
  buttonUrl: string               // Buton URL'i
  backgroundImage: media (single) // Arka plan resmi
}
```

---

### Layout Components (`components/layout/`)

**navigation-link**
```typescript
{
  label: string    // Menü metni
  url: string      // Bağlantı URL'i
  order: integer   // Sıralama
}
```

---

### Global Components (`components/global/`)

**booking-button-settings**
```typescript
{
  buttonText: string     // Buton metni
  buttonUrl: string      // Buton URL'i
  showButton: boolean    // Butonu göster/gizle
}
```

---

## Database Schema

### Development (SQLite)
- Dosya: `backend/.tmp/data.db`
- Otomatik oluşturulur
- Git'te ignore edilir

### Production (PostgreSQL)
- Environment variables ile yapılandırılır
- Strapi Cloud otomatik provision eder

**Connection:**
```javascript
// backend/config/database.ts
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST'),
      port: env.int('DATABASE_PORT'),
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
})
```

---

## API Population Examples

### Basic Adventure
```typescript
const query = qs.stringify({
  populate: {
    mainImage: true,
  },
})
```

### Full Adventure with Itinerary
```typescript
const query = qs.stringify({
  populate: {
    mainImage: true,
    images: true,
    video: true,
    tripAttributes: true,
    tripInfo: true,
    requirements: true,
    itinerary: {
      populate: {
        activities: true,
        images: true,
      },
    },
    contentSections: {
      on: {
        'adventure.hero-section': {
          populate: ['backgroundImage', 'heroVideo'],
        },
        'adventure.info-cards-section': {
          populate: {
            cards: true,
          },
        },
        'adventure.gallery-section': {
          populate: {
            images: {
              populate: ['image'],
            },
          },
        },
        'adventure.pricing-section': {
          populate: {
            includedItems: true,
            excludedItems: true,
          },
        },
      },
    },
  },
})
```

### Tour with Adventure
```typescript
const query = qs.stringify({
  filters: {
    slug: { $eq: slug },
  },
  populate: {
    video: true,
    adventure: {
      populate: {
        mainImage: true,
        images: true,
        video: true,
        tripAttributes: true,
        tripInfo: true,
        requirements: true,
        itinerary: {
          populate: {
            activities: true,
            images: true,
          },
        },
        contentSections: {
          on: {
            // ... adventure sections
          },
        },
      },
    },
    contentSections: {
      on: {
        // ... tour sections (overrides)
      },
    },
  },
})
```

---

## Permissions

### Public Role Required Permissions

**Settings → Users & Permissions → Roles → Public**

Enable:
- ✅ Adventure: `find`, `findOne`
- ✅ Tour: `find`, `findOne`
- ✅ Home: `find`
- ✅ Global: `find`
- ✅ Upload: `find`, `findOne`

**Do NOT enable:**
- ❌ `create`, `update`, `delete` for any content type
- ❌ Admin routes

---

## CORS Configuration

**File:** `backend/config/middlewares.ts`

```typescript
{
  name: 'strapi::cors',
  config: {
    origin: env('CORS_ORIGINS', 'http://localhost:3000').split(','),
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  },
}
```

**Environment Variable:**
```
CORS_ORIGINS=http://localhost:3000,https://your-site.vercel.app
```

---

## Environment Variables

**Required for Production:**
```bash
# Secrets (generate with crypto)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=...
DATABASE_PORT=5432
DATABASE_NAME=...
DATABASE_USERNAME=...
DATABASE_PASSWORD=...
DATABASE_SSL=false

# Server
HOST=0.0.0.0
PORT=1337

# CORS
CORS_ORIGINS=https://your-frontend.vercel.app
```

**Generate Secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

---

**See Also:**
- Frontend: [frontend-reference.md](./frontend-reference.md)
- Development: [development-guide.md](./development-guide.md)
- Deployment: [deployment-guide.md](./deployment-guide.md)
