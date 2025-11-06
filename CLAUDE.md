# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Inviktours is a nature tours platform built with Next.js 15 (frontend) and Strapi 5 (backend). The application is in Turkish and manages adventures and tours with dynamic content sections.

## Development Commands

### Frontend (Next.js)
```bash
cd frontend
npm install              # Install dependencies
npm run dev             # Start dev server with Turbopack (http://localhost:3000)
npm run build           # Build for production with Turbopack
npm run start           # Start production server
npm run lint            # Run ESLint
```

### Backend (Strapi)
```bash
cd backend
npm install              # Install dependencies
npm run develop         # Start dev server (http://localhost:1337/admin)
npm run start           # Start production server
npm run build           # Build admin panel
npm run strapi          # Access Strapi CLI
```

## Architecture

### Data Model Hierarchy

The application has a two-level content structure:

1. **Adventure** (`api::adventure.adventure`) - The template/blueprint
   - Represents a specific adventure type (e.g., "Mount Ararat Climb")
   - Contains static information: title, subtitle, description, images, itinerary
   - Has components: tripAttributes, tripInfo, itinerary days
   - Uses dynamic contentSections (hero, info-cards, timeline, gallery, pricing, contact-form)
   - One adventure can have many tours

2. **Tour** (`api::tour.tour`) - The scheduled instance
   - Links to an Adventure via `manyToOne` relation
   - Contains scheduling information: startDate, endDate, price, currency
   - Inherits most content from its parent Adventure
   - Can override contentSections from the Adventure

**Key Relationship**: Tour → Adventure (many-to-one). When fetching a tour, deeply populate the Adventure relation to access all adventure details.

### Dynamic Content Sections

Both Adventures and Tours use a dynamic zone pattern with reusable components:

**Adventure Components** (`backend/src/components/adventure/`):
- `hero-section` - Hero with background image/video
- `info-cards-section` - Display key info (duration, difficulty, etc.)
- `timeline-section` - Event timeline
- `gallery-section` - Image gallery
- `pricing-section` - Pricing details with included/excluded items
- `contact-form-section` - Contact form
- `itinerary-day` - Day-by-day itinerary with activities
- `trip-attributes` - Adventure attributes
- `trip-info` - Trip metadata

**Tour Components** (`backend/src/components/tour/`):
- Similar set of sections (hero, info-cards, timeline, gallery, pricing, contact-form)
- Tours can override specific sections from their parent Adventure

### Frontend Architecture

**Data Fetching** (`frontend/lib/strapi.ts`):
- Centralized Strapi API client using `qs` for query building
- All API calls use ISR with 60s revalidation (1 hour for global settings)
- Returns `null` on error for graceful build-time handling
- Key functions:
  - `getTourBySlug()` - Deeply populates tour with adventure and all contentSections
  - `getAdventureBySlug()` - Fetches adventure with all relations
  - `getToursForListing()` / `getAdventuresForListing()` - Lightweight card data
  - `getStrapiMediaUrl()` - Converts relative media URLs to absolute

**Type System** (`frontend/types/`):
- `tour.ts` - Tour, Adventure (when embedded in Tour), TourCard, StrapiResponse types
- `adventure.ts` - Adventure, AdventureCard types
- `home.ts` - Home page content types
- All Strapi responses use generic wrappers: `StrapiResponse<T>`, `StrapiSingleResponse<T>`

**Routing**:
- `/` - Home page
- `/adventures` - Adventure listing
- `/adventures/[slug]` - Adventure detail
- `/tours` - Tour listing (scheduled instances)
- `/tours/[slug]` - Tour detail (shows tour + parent adventure data)

**Components** (`frontend/components/`):
- Organized by content type: adventure/, tour/, home/, layout/
- Components render dynamic contentSections based on `__component` field

### Backend Architecture

**Content Types**:
- `tour` - Tour instances with dates and pricing
- `adventure` - Adventure templates
- `global` - Site-wide settings (navigation, etc.)
- `home` - Home page content

**Database Configuration** (`backend/config/database.ts`):
- Development: SQLite (`.tmp/data.db`)
- Production: PostgreSQL (configured via `DATABASE_CLIENT` env var)
- Strapi Cloud auto-provisions PostgreSQL

**CORS Configuration** (`backend/config/middlewares.ts`):
- Controlled via `CORS_ORIGINS` environment variable (comma-separated)
- Default: `http://localhost:3000`
- Update for production deployments

## Environment Variables

### Backend (.env)
Required secrets (generate with `node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"`):
- `APP_KEYS` - Multiple comma-separated keys
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`

Database (development):
- `DATABASE_CLIENT=postgres` (or omit for SQLite)
- `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`

CORS:
- `CORS_ORIGINS` - Comma-separated allowed origins

### Frontend (.env.local)
- `NEXT_PUBLIC_STRAPI_URL` - Strapi base URL (e.g., `https://your-app.strapiapp.com`)
- `NEXT_PUBLIC_STRAPI_API_URL` - Strapi API URL (e.g., `https://your-app.strapiapp.com/api`)

## Strapi API Population Patterns

When fetching tours or adventures, you must explicitly populate:

1. **Basic relations**: `populate: { adventure: true }`
2. **Nested relations**: `populate: { adventure: { populate: { mainImage: true } } }`
3. **Dynamic zones**: Use `on` syntax to populate specific component types
4. **Deep nesting**: Combine all patterns for complete data

Example:
```typescript
populate: {
  adventure: {
    populate: {
      contentSections: {
        on: {
          'adventure.hero-section': {
            populate: ['backgroundImage', 'heroVideo']
          }
        }
      }
    }
  }
}
```

See `frontend/lib/strapi.ts` for complete population examples.

## Deployment

### Backend (Strapi Cloud)
1. Link GitHub repo, select `backend` directory
2. Set environment variables (all secrets)
3. Strapi Cloud auto-provisions PostgreSQL

### Frontend (Vercel)
1. Import GitHub repo
2. Set root directory to `frontend`
3. Set `NEXT_PUBLIC_STRAPI_URL` and `NEXT_PUBLIC_STRAPI_API_URL`
4. Update backend CORS_ORIGINS to include Vercel domain

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **Backend**: Strapi 5, SQLite (dev), PostgreSQL (prod)
- **Deployment**: Vercel (frontend), Strapi Cloud (backend)
