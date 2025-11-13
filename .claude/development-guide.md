# Development Guide - Geliştirici Rehberi

Bu rehber, Inviktours projesinde **kod değişiklikleri** yapacak geliştiriciler içindir.

---

## 📋 İçindekiler

1. [Development Workflow](#development-workflow)
2. [Yeni Content Type Ekleme](#yeni-content-type-ekleme)
3. [Yeni Component Ekleme](#yeni-component-ekleme)
4. [Yeni Sayfa Oluşturma](#yeni-sayfa-oluşturma)
5. [API Integration](#api-integration)
6. [Type-Safe Development](#type-safe-development)
7. [Styling Guidelines](#styling-guidelines)
8. [Testing](#testing)
9. [Git Workflow](#git-workflow)
10. [Common Patterns](#common-patterns)

---

## Development Workflow

### Environment Setup

**1. Clone Repository**
```bash
git clone <repository-url>
cd inviktours
```

**2. Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your secrets
npm run develop
```

**3. Frontend Setup**
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with Strapi URLs
npm run dev
```

### Development Servers

**Backend (Strapi):** http://localhost:1337/admin
**Frontend (Next.js):** http://localhost:3000

### Hot Reload

- **Frontend:** Auto-reload with Turbopack
- **Backend:** Auto-reload on file changes (except schema changes)

**Schema değişiklikleri için:**
- Strapi'yi restart edin
- Admin panelde "Rebuild & Restart" butonunu kullanın

---

## Yeni Content Type Ekleme

### Strapi Backend

**1. Content-Type Builder'da Oluştur**
1. Strapi Admin → Content-Type Builder
2. "Create new collection type" veya "Create new single type"
3. Display name ve API ID girin
4. Fields ekleyin (Text, Rich Text, Media, Relation, vb.)
5. Save

**2. API Endpoints Otomatik Oluşturulur**
```
GET    /api/<content-type>        # List all
GET    /api/<content-type>/:id    # Get one
POST   /api/<content-type>        # Create
PUT    /api/<content-type>/:id    # Update
DELETE /api/<content-type>/:id    # Delete
```

**3. Permissions Ayarla**
1. Settings → Users & Permissions → Roles → Public
2. İlgili content type için permissions enable et
3. Save

### Frontend Integration

**1. Type Definition Oluştur** (`frontend/types/<content-type>.ts`)
```typescript
import { StrapiMedia } from './tour'

export interface MyContentType {
  id: number
  documentId: string
  title: string
  description: string
  image: StrapiMedia
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface MyContentTypeCard {
  id: number
  documentId: string
  title: string
  image: StrapiMedia
}
```

**2. API Function Ekle** (`frontend/lib/strapi.ts`)
```typescript
export async function getMyContentTypes(): Promise<MyContentType[] | null> {
  try {
    const query = qs.stringify({
      populate: {
        image: true,
      },
    })

    const response = await fetch(
      `${STRAPI_API_URL}/my-content-types?${query}`,
      {
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) return null

    const json: StrapiResponse<MyContentType> = await response.json()
    return json.data
  } catch (error) {
    console.error('Error fetching my content types:', error)
    return null
  }
}
```

**3. Page Oluştur** (`frontend/app/my-content-types/page.tsx`)
```typescript
import { getMyContentTypes } from '@/lib/strapi'
import { MyContentTypeCard } from '@/components/my-content-type/MyContentTypeCard'

export const revalidate = 60

export default async function MyContentTypesPage() {
  const items = await getMyContentTypes()

  if (!items) {
    return <div>Error loading content</div>
  }

  return (
    <div>
      <h1>My Content Types</h1>
      <div className="grid grid-cols-3 gap-6">
        {items.map((item) => (
          <MyContentTypeCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
```

---

## Yeni Component Ekleme

### Dynamic Zone Component (Strapi)

**1. Strapi'de Component Oluştur**
1. Content-Type Builder → Components
2. "Create new component"
3. Category seçin (örn: `adventure`, `tour`, `home`)
4. Name girin (örn: `testimonials-section`)
5. Fields ekleyin
6. Save

**2. Content Type's Dynamic Zone'a Ekle**
1. İlgili content type'ı edit et
2. Dynamic zone field'i seç (örn: `contentSections`)
3. Yeni componenti listeye ekle
4. Save

### Frontend Component (React)

**1. Type Definition** (`frontend/types/<category>.ts`)
```typescript
export interface TestimonialsSection {
  id: number
  __component: 'adventure.testimonials-section'
  title: string
  testimonials: {
    id: number
    name: string
    text: string
    avatar: StrapiMedia
  }[]
}

// Union type'a ekle
export type AdventureContentSection =
  | HeroSection
  | InfoCardsSection
  | TestimonialsSection // Yeni component
  // ... diğerleri
```

**2. Component Dosyası** (`frontend/components/adventure/TestimonialsSection.tsx`)
```typescript
import { TestimonialsSection as TestimonialsSectionType } from '@/types/adventure'
import { getStrapiMediaUrl } from '@/lib/strapi'
import Image from 'next/image'

export function TestimonialsSection({
  section
}: {
  section: TestimonialsSectionType
}) {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8">{section.title}</h2>
      <div className="grid grid-cols-2 gap-6">
        {section.testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-lg">
            <Image
              src={getStrapiMediaUrl(testimonial.avatar.url)}
              alt={testimonial.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <p className="mt-4">{testimonial.text}</p>
            <p className="font-bold mt-2">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

**3. ContentRenderer'a Ekle** (`frontend/components/adventure/ContentRenderer.tsx`)
```typescript
import { TestimonialsSection } from './TestimonialsSection'

export function ContentRenderer({ sections }: { sections: AdventureContentSection[] }) {
  return (
    <>
      {sections.map((section) => {
        switch (section.__component) {
          case 'adventure.hero-section':
            return <HeroSection key={section.id} section={section} />
          case 'adventure.testimonials-section':
            return <TestimonialsSection key={section.id} section={section} />
          // ... diğer case'ler
          default:
            return null
        }
      })}
    </>
  )
}
```

**4. Population Query'ye Ekle** (`frontend/lib/strapi.ts`)
```typescript
const query = qs.stringify({
  populate: {
    contentSections: {
      on: {
        'adventure.hero-section': { populate: ['backgroundImage'] },
        'adventure.testimonials-section': {
          populate: {
            testimonials: {
              populate: ['avatar']
            }
          }
        },
        // ... diğerleri
      },
    },
  },
})
```

---

## Yeni Sayfa Oluşturma

### Static Page (No Data Fetching)

**1. Create Page File** (`frontend/app/about/page.tsx`)
```typescript
export default function AboutPage() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-8">Hakkımızda</h1>
      <p>Content here...</p>
    </div>
  )
}

export const metadata = {
  title: 'Hakkımızda | Inviktours',
  description: 'Inviktours hakkında bilgi',
}
```

### Dynamic Page with Data

**1. Create Page** (`frontend/app/blog/[slug]/page.tsx`)
```typescript
import { getBlogPostBySlug } from '@/lib/strapi'

export const revalidate = 60

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)
  return {
    title: post?.title || 'Blog Post',
    description: post?.excerpt || '',
  }
}
```

### Listing Page

**1. Create Listing** (`frontend/app/blog/page.tsx`)
```typescript
import { getBlogPosts } from '@/lib/strapi'
import { BlogPostCard } from '@/components/blog/BlogPostCard'

export const revalidate = 60

export default async function BlogListingPage() {
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-3 gap-6">
        {posts?.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
```

---

## API Integration

### Strapi Query Building

**Basic Query:**
```typescript
const query = qs.stringify({
  populate: '*', // Populate all first-level relations
})
```

**Nested Population:**
```typescript
const query = qs.stringify({
  populate: {
    author: {
      populate: ['avatar'],
    },
    categories: true,
    coverImage: true,
  },
})
```

**Filtering:**
```typescript
const query = qs.stringify({
  filters: {
    slug: {
      $eq: 'my-slug',
    },
    publishedAt: {
      $notNull: true,
    },
  },
  populate: '*',
})
```

**Sorting:**
```typescript
const query = qs.stringify({
  sort: ['publishedAt:desc'],
  populate: '*',
})
```

**Pagination:**
```typescript
const query = qs.stringify({
  pagination: {
    page: 1,
    pageSize: 10,
  },
  populate: '*',
})
```

### ISR Configuration

**Page-level revalidation:**
```typescript
export const revalidate = 60 // 60 seconds
```

**Function-level revalidation:**
```typescript
const response = await fetch(url, {
  next: { revalidate: 60 },
})
```

**On-demand revalidation:**
```typescript
import { revalidatePath } from 'next/cache'

// In API route or server action
revalidatePath('/adventures')
```

---

## Type-Safe Development

### Strapi Response Types

**Generic wrappers:**
```typescript
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
```

### Type Guards

```typescript
function isHeroSection(section: AdventureContentSection): section is HeroSection {
  return section.__component === 'adventure.hero-section'
}
```

### Utility Types

```typescript
// Extract specific fields for cards
export type AdventureCard = Pick<Adventure, 'id' | 'documentId' | 'slug' | 'title' | 'subtitle' | 'mainImage'>

// Make all fields optional
type PartialAdventure = Partial<Adventure>

// Make all fields required
type RequiredAdventure = Required<Adventure>
```

---

## Styling Guidelines

### Tailwind CSS

**Color Palette:**
```css
--primary: #14b814        /* Primary green */
--background-light: #f6f8f6
--background-dark: #112111
--text-primary: #1a1a1a
--text-secondary: #6b7280
```

**Common Classes:**
```typescript
// Containers
className="container mx-auto px-4"

// Grid layouts
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Cards
className="bg-white rounded-lg shadow-md p-6"

// Buttons
className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90"

// Typography
className="text-4xl font-bold text-gray-900"
```

### Responsive Design

**Breakpoints:**
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

**Example:**
```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
```

---

## Testing

### Local Testing

**1. Run Development Servers**
```bash
# Terminal 1: Backend
cd backend && npm run develop

# Terminal 2: Frontend
cd frontend && npm run dev
```

**2. Test Checklist**
- ✅ All pages load without errors
- ✅ Data fetches correctly from Strapi
- ✅ Images display properly
- ✅ Links work correctly
- ✅ Forms submit (if applicable)
- ✅ Responsive on mobile/tablet/desktop
- ✅ No console errors
- ✅ ISR caching works (check after 60s)

### Build Testing

```bash
cd frontend
npm run build
npm run start
```

**Check for:**
- ✅ No build errors
- ✅ No TypeScript errors
- ✅ All pages generate successfully
- ✅ Static optimization works

---

## Git Workflow

### Branch Strategy

```
master (main)         - Production
├── develop           - Development
    ├── feature/*     - New features
    ├── fix/*         - Bug fixes
    └── refactor/*    - Code refactoring
```

### Commit Messages

**Format:**
```
<type>: <short description>

<detailed description>

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code refactoring
- `style:` Styling changes
- `docs:` Documentation
- `test:` Tests
- `chore:` Maintenance

**Examples:**
```bash
git commit -m "feat: Add testimonials section to adventures

- Create TestimonialsSection component
- Add Strapi component schema
- Add to ContentRenderer
- Update types and population query

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Common Patterns

### Error Handling

```typescript
export async function getAdventureBySlug(slug: string): Promise<Adventure | null> {
  try {
    const response = await fetch(url)
    if (!response.ok) return null
    const json = await response.json()
    return json.data
  } catch (error) {
    console.error('Error fetching adventure:', error)
    return null
  }
}
```

### Image Optimization

```typescript
import Image from 'next/image'
import { getStrapiMediaUrl } from '@/lib/strapi'

<Image
  src={getStrapiMediaUrl(image.url)}
  alt={image.alternativeText || 'Image'}
  width={800}
  height={600}
  className="rounded-lg"
  priority={false} // true for above-the-fold images
/>
```

### Conditional Rendering

```typescript
{items && items.length > 0 ? (
  items.map((item) => <ItemCard key={item.id} item={item} />)
) : (
  <div>No items found</div>
)}
```

### Loading States

```typescript
import { Suspense } from 'react'

<Suspense fallback={<LoadingSpinner />}>
  <DataComponent />
</Suspense>
```

---

**Daha fazla detay için:**
- Backend detayları: [strapi-reference.md](./strapi-reference.md)
- Frontend detayları: [frontend-reference.md](./frontend-reference.md)
- Deployment: [deployment-guide.md](./deployment-guide.md)
- Troubleshooting: [troubleshooting.md](./troubleshooting.md)

---

**Version:** 2.0
**Last Updated:** 2025-01-13
**Maintainer:** Development Team
