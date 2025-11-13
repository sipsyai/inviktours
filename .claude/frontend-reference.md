# Frontend Reference

Next.js frontend yapısı, componentler ve type sistemlerinin referansı.

---

## Project Structure

```
frontend/
├── app/                      # Next.js App Router
│   ├── adventures/
│   │   ├── page.tsx         # Adventures listing
│   │   └── [slug]/
│   │       └── page.tsx     # Adventure detail
│   ├── tours/
│   │   ├── page.tsx         # Tours listing
│   │   └── [slug]/
│   │       └── page.tsx     # Tour detail
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── adventure/           # Adventure-related
│   ├── tour/                # Tour-related
│   ├── home/                # Home page
│   └── layout/              # Layout components
├── lib/
│   └── strapi.ts            # Strapi API client
├── types/                   # TypeScript types
│   ├── adventure.ts
│   ├── tour.ts
│   └── home.ts
└── public/                  # Static assets
```

---

## Pages

### Home Page (`app/page.tsx`)

**Route:** `/`
**ISR:** 3600s (1 hour)
**Data:** `getHomeContent()`

**Features:**
- Dynamic content sections
- Server-side rendering
- ISR caching

---

### Adventures Listing (`app/adventures/page.tsx`)

**Route:** `/adventures`
**ISR:** 60s
**Data:** `getAdventuresForListing()`

**Features:**
- Grid layout of adventure cards
- Lightweight data fetching (only essentials)
- Metadata generation

---

### Adventure Detail (`app/adventures/[slug]/page.tsx`)

**Route:** `/adventures/[slug]`
**ISR:** 60s
**Data:** `getAdventureBySlug(slug)`

**Features:**
- Tabbed interface (Overview, Itinerary, Requirements, Pricing)
- Dynamic metadata
- Sticky navigation
- Deep data population

**Tabs:**
1. **Overview** - Hero, description, trip attributes, departures
2. **Detaylı Tur** - Day-by-day itinerary
3. **Gereksinimler** - Physical, equipment, health requirements
4. **Fiyat** - Pricing details

---

### Tours Listing (`app/tours/page.tsx`)

**Route:** `/tours`
**ISR:** 60s
**Data:** `getToursForListing()`

**Features:**
- Grid layout of tour cards
- Shows dates and pricing
- Links to tour detail pages

---

### Tour Detail (`app/tours/[slug]/page.tsx`)

**Route:** `/tours/[slug]`
**ISR:** 60s
**Data:** `getTourBySlug(slug)`

**Features:**
- Sticky tour date header
- Video player (if available)
- Full adventure details (inherited)
- Booking modal
- Floating booking button
- Tour-specific content sections (optional overrides)

---

## Components

### Adventure Components (`components/adventure/`)

**1. AdventureCard.tsx**
- Props: `{ adventure: AdventureCard }`
- Used in: Adventures listing
- Features: Image, title, subtitle, link

**2. AdventureDetailLayout.tsx**
- Props: `{ adventure: Adventure }`
- Used in: Adventure detail page
- Features: Tabbed interface, sticky nav

**3. ContentRenderer.tsx**
- Props: `{ sections: AdventureContentSection[] }`
- Used in: Legacy layout (if not using tabs)
- Features: Dynamic section rendering

**4. HeroSection.tsx**
- Props: `{ section: HeroSection }`
- Features: Background image/video, title, subtitle

**5. InfoCardsSection.tsx**
- Props: `{ section: InfoCardsSection }`
- Features: Grid of info cards with icons

**6. TimelineSection.tsx**
- Props: `{ section: TimelineSection }`
- Features: Vertical timeline with events

**7. GallerySection.tsx**
- Props: `{ section: GallerySection }`
- Features: Image grid (lightbox not implemented)

**8. PricingSection.tsx**
- Props: `{ section: PricingSection }`
- Features: Price display, included/excluded items

**9. ContactFormSection.tsx**
- Props: `{ section: ContactFormSection }`
- Features: Contact form (submission not connected)

**10. OverviewTab.tsx**
- Props: `{ adventure: Adventure }`
- Features: Overview content

**11. ItineraryTab.tsx**
- Props: `{ adventure: Adventure }`
- Features: Day-by-day itinerary, scroll to day

**12. ItineraryDayCard.tsx**
- Props: `{ day: ItineraryDay, dayIndex: number }`
- Features: Single day display, activities, meals, images

**13. RequirementsSection.tsx**
- Props: `{ requirements: Requirements }`
- Features: Physical, equipment, health requirements (Markdown)

**14. TripAttributesSection.tsx**
- Props: `{ attributes: TripAttributes }`
- Features: Style, service, physical rating, group type

**15. DeparturesSection.tsx**
- Props: `{ adventureSlug: string }`
- Features: Available tour dates, async data fetching

---

### Tour Components (`components/tour/`)

**1. TourCard.tsx**
- Props: `{ tour: TourCard }`
- Used in: Tours listing
- Features: Image, title, dates, price

**2. TourBookingWrapper.tsx**
- Props: `{ tour: Tour, adventure: TourAdventure }`
- Used in: Tour detail page
- Features: Wraps booking functionality

**3. BookingModal.tsx**
- Props: `{ isOpen, onClose, tour, adventure }`
- Features: Reservation form (frontend only)

**4. FloatingBookingButton.tsx**
- Props: `{ onClick }`
- Features: Sticky bottom button

**5. TourDateHeader.tsx**
- Props: `{ tour: Tour }`
- Features: Sticky header with dates, price

**6. ShortsVideoPlayer.tsx**
- Props: `{ videoUrl: string }`
- Features: Video player with controls

**7-12. Content Section Components**
- Same as adventure sections (HeroSection, InfoCardsSection, etc.)
- Used for tour-specific overrides

---

### Home Components (`components/home/`)

**1. HeroSection.tsx**
- Props: `{ section: HeroSection }`
- Features: Hero with CTAs

**2. StatsSection.tsx**
- Props: `{ section: StatsSection }`
- Features: Statistics display

**3. FeaturedToursSection.tsx**
- Props: `{ section: FeaturedToursSection }`
- Features: Featured tours grid

**4. FeaturesSection.tsx**
- Props: `{ section: FeaturesSection }`
- Features: Feature cards

**5. CTASection.tsx**
- Props: `{ section: CTASection }`
- Features: Call-to-action with background

---

### Layout Components (`components/layout/`)

**1. Navbar.tsx**
- Server component
- Fetches global settings
- Displays logo and navigation links

**2. Footer.tsx**
- Static footer with branding

---

## Type System

### Core Types (`types/tour.ts`)

```typescript
export interface StrapiMedia {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    thumbnail?: MediaFormat
    small?: MediaFormat
    medium?: MediaFormat
    large?: MediaFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  createdAt: string
  updatedAt: string
}

export interface StrapiResponse<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiSingleResponse<T> {
  data: T
  meta: {}
}

export interface Tour {
  id: number
  documentId: string
  slug: string
  title: string | null
  startDate: string
  endDate: string
  price: number
  currency: string
  video: StrapiMedia | null
  contentSections: TourContentSection[]
  adventure: TourAdventure
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface TourCard {
  id: number
  documentId: string
  slug: string
  startDate: string
  endDate: string
  price: number
  currency: string
  adventure: {
    id: number
    documentId: string
    title: string
    subtitle: string
    mainImage: StrapiMedia
  }
}
```

### Adventure Types (`types/adventure.ts`)

```typescript
export interface Adventure {
  id: number
  documentId: string
  slug: string
  title: string
  subtitle: string
  description: string
  tripSummary: string
  mainImage: StrapiMedia
  images: StrapiMedia[]
  video: StrapiMedia | null
  tripAttributes: TripAttributes
  tripInfo: TripInfo
  requirements: Requirements
  itinerary: ItineraryDay[]
  contentSections: AdventureContentSection[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface TripAttributes {
  id: number
  style: string
  serviceType: string
  physicalRating: number
  groupType: string
}

export interface TripInfo {
  id: number
  ageRequirement: string
  visaRequirement: string
}

export interface Requirements {
  id: number
  physicalRequirements: string
  equipmentRequirements: string
  healthRequirements: string
}

export interface ItineraryDay {
  id: number
  dayNumber: number
  title: string
  summary: string
  activities: ItineraryActivity[]
  meals: string
  accommodation: string
  images: StrapiMedia[]
  elevationGain: number | null
  distance: number | null
}

export interface ItineraryActivity {
  id: number
  time: string | null
  description: string
}
```

### Content Section Types

**Adventure Sections:**
```typescript
export type AdventureContentSection =
  | HeroSection
  | InfoCardsSection
  | TimelineSection
  | GallerySection
  | PricingSection
  | ContactFormSection

export interface HeroSection {
  id: number
  __component: 'adventure.hero-section'
  title: string
  subtitle: string
  backgroundImage: StrapiMedia | null
  heroVideo: StrapiMedia | null
}

// ... diğer section interface'leri
```

---

## API Client (`lib/strapi.ts`)

### Configuration

```typescript
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL!
```

### Key Functions

**1. getTourBySlug(slug: string)**
- Returns: `Tour | null`
- ISR: 60s
- Deep populates tour + adventure

**2. getToursForListing()**
- Returns: `TourCard[] | null`
- ISR: 60s
- Lightweight data for cards

**3. getAdventureBySlug(slug: string)**
- Returns: `Adventure | null`
- ISR: 60s
- Deep populates all relations

**4. getAdventuresForListing()**
- Returns: `AdventureCard[] | null`
- ISR: 60s
- Lightweight data for cards

**5. getHomeContent()**
- Returns: `Home | null`
- ISR: 3600s (1 hour)
- Home page content sections

**6. getGlobalSettings()**
- Returns: `Global | null`
- ISR: 3600s (1 hour)
- Site-wide settings

**7. getStrapiMediaUrl(url: string)**
- Returns: `string`
- Converts relative URLs to absolute

---

## Styling

### Tailwind Configuration

**Colors:**
```javascript
primary: '#14b814'
background: {
  light: '#f6f8f6',
  dark: '#112111'
}
```

**Fonts:**
- Geist Sans (default)
- Geist Mono (monospace)
- Work Sans (headings)

**Icons:**
- Material Symbols Outlined

### Custom CSS (`app/globals.css`)

**CSS Variables:**
```css
--background: #ffffff
--foreground: #171717
--primary: #14b814
--background-light: #f6f8f6
--background-dark: #112111
```

**Animations:**
```css
@keyframes slideUp { ... }
@keyframes fadeIn { ... }
```

---

## Routing

### Static Routes
- `/` - Home
- `/adventures` - Adventures listing
- `/tours` - Tours listing

### Dynamic Routes
- `/adventures/[slug]` - Adventure detail
- `/tours/[slug]` - Tour detail

### ISR Configuration

**Per-page:**
```typescript
export const revalidate = 60 // seconds
```

**Per-fetch:**
```typescript
fetch(url, {
  next: { revalidate: 60 }
})
```

---

## Data Fetching Patterns

### Server Component (Default)

```typescript
export default async function Page() {
  const data = await fetchData()
  return <div>{data.title}</div>
}
```

### With Error Handling

```typescript
export default async function Page() {
  const data = await fetchData()

  if (!data) {
    return <div>Error loading data</div>
  }

  return <div>{data.title}</div>
}
```

### With Suspense

```typescript
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <DataComponent />
    </Suspense>
  )
}
```

---

## Image Optimization

### Next.js Image Component

```typescript
import Image from 'next/image'
import { getStrapiMediaUrl } from '@/lib/strapi'

<Image
  src={getStrapiMediaUrl(image.url)}
  alt={image.alternativeText || 'Image'}
  width={800}
  height={600}
  className="rounded-lg"
  priority={false}
/>
```

### Responsive Images

```typescript
<div className="relative w-full h-64">
  <Image
    src={getStrapiMediaUrl(image.url)}
    alt={image.alternativeText || ''}
    fill
    className="object-cover rounded-lg"
  />
</div>
```

---

## Metadata Generation

### Static Metadata

```typescript
export const metadata = {
  title: 'Adventures | Inviktours',
  description: 'Doğa turları ve macera deneyimleri',
}
```

### Dynamic Metadata

```typescript
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const adventure = await getAdventureBySlug(params.slug)

  return {
    title: `${adventure?.title} | Inviktours`,
    description: adventure?.subtitle || '',
    openGraph: {
      title: adventure?.title,
      description: adventure?.subtitle || '',
      images: [getStrapiMediaUrl(adventure?.mainImage.url || '')],
    },
  }
}
```

---

## Common Utilities

### URL Helpers

```typescript
// Convert Strapi relative URLs to absolute
export function getStrapiMediaUrl(url: string): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}
```

### Date Formatting

```typescript
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
```

### Price Formatting

```typescript
export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency,
  }).format(price)
}
```

---

**See Also:**
- Backend: [strapi-reference.md](./strapi-reference.md)
- Development: [development-guide.md](./development-guide.md)
- Deployment: [deployment-guide.md](./deployment-guide.md)
