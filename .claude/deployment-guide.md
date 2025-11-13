# Deployment Guide - Test ve Canlıya Alma Rehberi

Bu rehber, Inviktours projesinin test edilmesi ve production'a deploy edilmesi için adım adım talimatlar içerir.

---

## 📋 İçindekiler

1. [Local Testing](#local-testing)
2. [Production Build Testing](#production-build-testing)
3. [Backend Deployment (Strapi Cloud)](#backend-deployment-strapi-cloud)
4. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
5. [Post-Deployment Checklist](#post-deployment-checklist)
6. [Rollback Procedures](#rollback-procedures)

---

## Local Testing

### 1. Backend Test

**Start Strapi:**
```bash
cd backend
npm run develop
```

**Test Checklist:**
- ✅ Admin panel loads: http://localhost:1337/admin
- ✅ Can login successfully
- ✅ All content types visible
- ✅ Can create/edit content
- ✅ Media library works
- ✅ No console errors

**Test API Endpoints:**
```bash
# Adventures
curl http://localhost:1337/api/adventures

# Tours
curl http://localhost:1337/api/tours

# Home
curl http://localhost:1337/api/home

# Global
curl http://localhost:1337/api/global
```

**Expected:** JSON responses with data

---

### 2. Frontend Test

**Start Next.js:**
```bash
cd frontend
npm run dev
```

**Test Checklist:**
- ✅ Home page loads: http://localhost:3000
- ✅ Adventures listing loads: http://localhost:3000/adventures
- ✅ Adventure detail pages load
- ✅ Tours listing loads: http://localhost:3000/tours
- ✅ Tour detail pages load
- ✅ Images display correctly
- ✅ Videos play (if any)
- ✅ Navigation works
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ No console errors
- ✅ No TypeScript errors

**Test Browser Compatibility:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

### 3. Integration Test

**Both servers running:**
1. Make a change in Strapi admin
2. Publish the change
3. Wait 60 seconds (ISR revalidation)
4. Hard refresh frontend (Cmd+Shift+R or Ctrl+Shift+R)
5. Verify change appears

---

## Production Build Testing

### Backend Build

```bash
cd backend
npm run build
```

**Check:**
- ✅ No build errors
- ✅ Admin panel builds successfully
- ✅ All plugins compile

**Start production server:**
```bash
npm run start
```

**Test:**
- ✅ Admin panel accessible
- ✅ API endpoints work
- ✅ Performance acceptable

---

### Frontend Build

```bash
cd frontend
npm run build
```

**Check:**
- ✅ No build errors
- ✅ No TypeScript errors
- ✅ All pages generate successfully
- ✅ Static optimization works
- ✅ No missing dependencies

**Build Output Review:**
```
Route (app)                      Size     First Load JS
┌ ○ /                           X kB           Y kB
├ ○ /adventures                 X kB           Y kB
├ ƒ /adventures/[slug]          X kB           Y kB
├ ○ /tours                      X kB           Y kB
└ ƒ /tours/[slug]               X kB           Y kB

○  (Static)  prerendered as static content
ƒ  (Dynamic) server-rendered on demand
```

**Start production server:**
```bash
npm run start
```

**Test:**
- ✅ All pages load
- ✅ Data fetching works
- ✅ Images optimized
- ✅ Performance acceptable
- ✅ No runtime errors

---

## Backend Deployment (Strapi Cloud)

### First Time Setup

**1. Create Strapi Cloud Account**
- Go to https://cloud.strapi.io
- Sign up or login

**2. Create New Project**
- Click "Create Project"
- Connect GitHub repository
- Select `backend` directory as root
- Choose region (closest to your users)

**3. Configure Environment Variables**

**Required Variables:**
```bash
# Generate 4 keys with:
# node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
APP_KEYS=key1,key2,key3,key4

# Generate each with same command:
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...

# Database (auto-configured by Strapi Cloud)
DATABASE_CLIENT=postgres
# (Other DB vars auto-set by Strapi Cloud)

# Server
HOST=0.0.0.0
PORT=1337

# CORS - Important!
CORS_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app

# Node environment
NODE_ENV=production
```

**4. Deploy**
- Click "Deploy"
- Wait for build and deployment
- Note the Strapi URL (e.g., `https://your-app.strapiapp.com`)

---

### Post-Deployment Backend Configuration

**1. Access Admin Panel**
- Go to `https://your-app.strapiapp.com/admin`
- Create admin user (first time only)

**2. Configure Public Permissions**
- Settings → Users & Permissions → Roles → Public
- Enable permissions:
  - ✅ Adventure: `find`, `findOne`
  - ✅ Tour: `find`, `findOne`
  - ✅ Home: `find`
  - ✅ Global: `find`
  - ✅ Upload: `find`, `findOne`
- Click "Save"

**3. Test API Endpoints**
```bash
# Replace with your actual URL
curl https://your-app.strapiapp.com/api/adventures
curl https://your-app.strapiapp.com/api/tours
curl https://your-app.strapiapp.com/api/home
curl https://your-app.strapiapp.com/api/global
```

**Expected:** JSON responses with data

**4. Upload Content**
- Upload all media files via Media Library
- Create/publish all content types
- Verify content is accessible via API

---

### Subsequent Deployments

**Option 1: Auto-Deploy (Recommended)**
- Push to GitHub main branch
- Strapi Cloud auto-deploys

**Option 2: Manual Deploy**
- Strapi Cloud dashboard → "Deploy" button

---

## Frontend Deployment (Vercel)

### First Time Setup

**1. Create Vercel Account**
- Go to https://vercel.com
- Sign up or login with GitHub

**2. Import Project**
- Click "Add New" → "Project"
- Select your GitHub repository
- Configure:
  - **Root Directory:** `frontend`
  - **Framework Preset:** Next.js
  - **Build Command:** `npm run build`
  - **Output Directory:** `.next`

**3. Environment Variables**

**Required Variables:**
```bash
NEXT_PUBLIC_STRAPI_URL=https://your-app.strapiapp.com
NEXT_PUBLIC_STRAPI_API_URL=https://your-app.strapiapp.com/api
```

**Add in Vercel:**
- Project Settings → Environment Variables
- Add each variable
- Apply to: Production, Preview, Development

**4. Deploy**
- Click "Deploy"
- Wait for build and deployment
- Note the Vercel URL (e.g., `https://your-site.vercel.app`)

---

### Update Backend CORS

**Important:** After getting Vercel URL, update backend CORS:

1. Go to Strapi Cloud dashboard
2. Settings → Environment Variables
3. Update `CORS_ORIGINS`:
   ```
   CORS_ORIGINS=http://localhost:3000,https://your-site.vercel.app
   ```
4. Redeploy backend

---

### Test Deployment

**1. Visit Deployed Site**
- Go to your Vercel URL
- Test all pages

**2. Check Data Loading**
- Home page should display content from Strapi
- Adventures and tours should load
- Images should display

**3. Test ISR**
- Make a change in Strapi
- Publish
- Wait 60 seconds
- Hard refresh Vercel site
- Verify change appears

---

### Subsequent Deployments

**Auto-Deploy:**
- Push to GitHub main branch
- Vercel auto-deploys
- Preview deployments for PR branches

**Manual Deploy:**
- Vercel dashboard → "Redeploy" button

---

## Post-Deployment Checklist

### Functionality

- ✅ Home page loads with all sections
- ✅ Adventures listing displays all adventures
- ✅ Adventure detail pages load with full data
- ✅ Tours listing displays all tours with dates/prices
- ✅ Tour detail pages load with full data
- ✅ Navigation menu works
- ✅ Logo displays
- ✅ Footer displays

### Content

- ✅ All text content in Turkish
- ✅ All images display correctly
- ✅ Videos play (if any)
- ✅ Itineraries show correctly
- ✅ Pricing displays correctly
- ✅ Departure dates show correctly

### Performance

- ✅ Page load time < 3 seconds
- ✅ Images optimized and lazy-loaded
- ✅ No unnecessary re-renders
- ✅ ISR caching works (check network tab)

### SEO

- ✅ Meta titles set for all pages
- ✅ Meta descriptions set
- ✅ Open Graph tags set
- ✅ Image alt texts set
- ✅ Proper heading hierarchy (h1, h2, h3)

### Mobile

- ✅ Responsive design works on all screen sizes
- ✅ Touch targets large enough (min 44x44px)
- ✅ No horizontal scrolling
- ✅ Forms work on mobile
- ✅ Images scale properly

### Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ iOS Safari
- ✅ Chrome Mobile

### Analytics & Monitoring

- ✅ Analytics installed (if applicable)
- ✅ Error tracking set up (if applicable)
- ✅ Uptime monitoring (optional)

---

## Rollback Procedures

### Frontend Rollback (Vercel)

**1. Via Vercel Dashboard**
- Go to project → Deployments
- Find previous working deployment
- Click "..." menu → "Promote to Production"

**2. Via Git**
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push origin main --force
```

---

### Backend Rollback (Strapi Cloud)

**Option 1: Redeploy Previous Version**
- Strapi Cloud dashboard → Deployments
- Find previous working deployment
- Click "Redeploy"

**Option 2: Git Revert**
```bash
cd backend
git revert HEAD
git push origin main
```

**Option 3: Database Restore**
- Strapi Cloud dashboard → Backups
- Select backup
- Restore

**⚠️ Warning:** Database restore will lose all data changes since backup

---

### Emergency Rollback

**If site is completely broken:**

1. **Frontend:** Promote previous Vercel deployment
2. **Backend:** Redeploy previous Strapi version
3. **Verify:** Test all critical functionality
4. **Investigate:** Review logs to find issue
5. **Fix:** Make fix in development, test thoroughly, redeploy

---

## Monitoring & Logs

### Vercel Logs

**Access Logs:**
- Project → Deployments → Select deployment → "Runtime Logs"

**Check for:**
- Server errors (500)
- Failed data fetches
- Build warnings/errors

### Strapi Cloud Logs

**Access Logs:**
- Project → Logs

**Check for:**
- API errors
- Database connection issues
- Permission errors

### Browser Console

**Check for:**
- JavaScript errors
- Failed network requests
- CORS errors

---

## Continuous Deployment

### Automatic Deployment Workflow

**1. Development → Production Flow:**
```
Developer makes changes
    ↓
Push to GitHub
    ↓
Vercel/Strapi Cloud detect push
    ↓
Automatic build & deploy
    ↓
Live site updated
```

**2. Content Updates (No Code):**
```
Content editor updates in Strapi
    ↓
Publish changes
    ↓
ISR revalidation (60s)
    ↓
Live site updated
```

---

## Custom Domain Setup

### Vercel Custom Domain

**1. Add Domain:**
- Project Settings → Domains
- Enter your domain (e.g., `inviktours.com`)

**2. Configure DNS:**
- Add A record: `76.76.21.21`
- Or CNAME: `cname.vercel-dns.com`

**3. Update Backend CORS:**
```
CORS_ORIGINS=http://localhost:3000,https://inviktours.com,https://www.inviktours.com
```

### Strapi Cloud Custom Domain

**1. Add Domain:**
- Project Settings → Custom Domain
- Enter your domain (e.g., `api.inviktours.com`)

**2. Configure DNS:**
- Follow Strapi Cloud instructions
- Usually CNAME record

**3. Update Frontend Env:**
```
NEXT_PUBLIC_STRAPI_URL=https://api.inviktours.com
NEXT_PUBLIC_STRAPI_API_URL=https://api.inviktours.com/api
```

---

## SSL/HTTPS

**Automatic:**
- Both Vercel and Strapi Cloud provide automatic SSL certificates
- No configuration needed
- Auto-renews

---

## Performance Optimization

### Frontend

**1. Image Optimization:**
- Use Next.js Image component (already implemented)
- WebP format preferred
- Lazy loading enabled

**2. Code Splitting:**
- Automatic with Next.js App Router
- Dynamic imports for heavy components

**3. Caching:**
- ISR enabled (60s for content, 3600s for global)
- Adjust revalidation times if needed

### Backend

**1. Database Optimization:**
- Strapi Cloud handles this automatically
- Monitor slow queries

**2. Media Optimization:**
- Upload optimized images
- Use responsive image formats

---

**See Also:**
- Development: [development-guide.md](./development-guide.md)
- Troubleshooting: [troubleshooting.md](./troubleshooting.md)
- User Guide: [user-guide.md](./user-guide.md)

---

**Version:** 2.0
**Last Updated:** 2025-01-13
