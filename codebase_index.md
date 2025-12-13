# RapidXTech Codebase Index

> **Last Updated:** December 13, 2025  
> **Project:** RapidXTech Portfolio & CMS Platform  
> **Framework:** Next.js 14 (App Router)  
> **Language:** TypeScript

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [App Routes](#app-routes)
5. [Components](#components)
6. [Libraries & Utilities](#libraries--utilities)
7. [Hooks](#hooks)
8. [Context Providers](#context-providers)
9. [Styling & Theming](#styling--theming)
10. [Database Integration](#database-integration)
11. [Admin Dashboard](#admin-dashboard)
12. [Scripts & Migrations](#scripts--migrations)

---

## Project Overview

**RapidXTech** is a modern portfolio and content management system (CMS) built with Next.js 14, featuring:

- 🎨 **Dynamic theming** with light/dark mode support
- 📝 **Full-featured CMS** for blog posts, projects, testimonials, and partners
- 🔐 **Admin dashboard** with authentication
- 🎭 **Rich animations** using Framer Motion
- 📱 **Fully responsive** design
- 🚀 **SEO optimized** with comprehensive metadata
- 💾 **Supabase backend** for database and storage
- 🎯 **TypeScript** for type safety

---

## Technology Stack

### Core Framework
- **Next.js 14.2.16** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type-safe JavaScript

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Framer Motion** - Animation library
- **next-themes** - Theme management
- **Lucide React** - Icon library
- **class-variance-authority** - Component variants
- **tailwind-merge** - Merge Tailwind classes
- **tailwindcss-animate** - Animation utilities

### Backend & Database
- **Supabase** - PostgreSQL database and authentication
- **@supabase/supabase-js** - Supabase client library

### Forms & Validation
- **react-hook-form 7.54.1** - Form management
- **@hookform/resolvers 3.9.1** - Form validation resolvers
- **zod 3.24.1** - Schema validation

### Additional Libraries
- **date-fns 4.1.0** - Date utilities
- **embla-carousel-react 8.5.1** - Carousel component
- **recharts 2.15.0** - Charts library
- **sonner 1.7.1** - Toast notifications
- **@vercel/analytics 1.3.1** - Analytics

---

## Project Structure

```
LRapidXT/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page
│   ├── admin/               # Admin dashboard
│   ├── admin-login/         # Admin login page
│   ├── blog/                # Blog listing & detail pages
│   ├── careers/             # Careers page
│   ├── case-studies/        # Portfolio/projects pages
│   ├── contact/             # Contact page
│   ├── components/          # App-level components
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Homepage
│   ├── not-found.tsx        # 404 page
│   ├── robots.ts            # Robots.txt generator
│   └── sitemap.ts           # Sitemap generator
│
├── components/              # Reusable components
│   ├── admin/              # Admin dashboard components
│   ├── blog/               # Blog-specific components
│   ├── careers/            # Careers page components
│   ├── icons/              # Custom icon components
│   ├── ui/                 # Shadcn UI components (53+ components)
│   ├── Footer.tsx          # Site footer
│   ├── Header.tsx          # Site header
│   ├── theme-provider.tsx  # Theme context provider
│   ├── theme-switcher.tsx  # Theme toggle component
│   └── [various].tsx       # Feature components
│
├── lib/                     # Utility libraries
│   ├── supabase.ts         # Supabase client & types
│   ├── supabase-cms.ts     # CMS API classes
│   ├── auth.ts             # Authentication utilities
│   ├── utils.ts            # General utilities
│   ├── constants.ts        # App constants
│   ├── theme-utils.ts      # Theme utilities
│   └── [data].ts           # Data utilities
│
├── hooks/                   # Custom React hooks
│   ├── use-toast.ts        # Toast notifications hook
│   ├── use-admin-toast.ts  # Admin toast hook
│   ├── use-mobile.tsx      # Mobile detection hook
│   ├── use-media-query.tsx # Media query hook
│   └── use-safe-overlay-close.ts # Overlay close hook
│
├── context/                 # React context providers
│   ├── auth-context.tsx    # Authentication context
│   └── theme-context.tsx   # Theme context
│
├── scripts/                 # Database scripts
│   ├── create-tables.sql   # Initial table creation
│   ├── create-blog-images-bucket.sql
│   ├── supabase-blog-migration.sql
│   ├── update-testimonials-schema.sql
│   ├── update-projects-featured.sql
│   ├── fix-project-slugs.js
│   ├── migrate-blog-images.js
│   └── partners-setup.js
│
├── public/                  # Static assets
├── styles/                  # Additional styles
├── .env.local              # Environment variables
├── next.config.mjs         # Next.js configuration
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

---

## App Routes

### Public Routes

#### `/` - Homepage
- **File:** `app/page.tsx`
- **Component:** `Home`
- **Features:**
  - Hero section with animated background
  - Company carousel (trusted partners)
  - Stats section
  - Services (floating cards)
  - Why choose section (scroll section)
  - Featured work preview
  - Client testimonials
  - Process section
  - Final CTA

#### `/about` - About Page
- **File:** `app/about/page.tsx`
- **Component:** `AboutClient`
- **Features:** Company information, team, mission, values

#### `/blog` - Blog Listing
- **File:** `app/blog/page.tsx`
- **Features:**
  - List of published blog posts
  - Tag filtering
  - Search functionality
  - Pagination

#### `/blog/[slug]` - Blog Post Detail
- **File:** `app/blog/[slug]/page.tsx`
- **Features:**
  - Full blog post content
  - Multi-image support
  - Social sharing
  - Related posts
  - Comment section
  - SEO metadata

#### `/case-studies` - Portfolio Listing
- **File:** `app/case-studies/page.tsx`
- **Component:** `PortfolioClient`
- **Features:**
  - Grid of published projects
  - Category filtering
  - Featured projects highlight

#### `/case-studies/[slug]` - Project Detail
- **File:** `app/case-studies/[slug]/page.tsx`
- **Component:** `ProjectDetailClient`
- **Features:**
  - Project overview
  - Challenge, solution, results
  - Technology stack
  - Features list
  - Image gallery
  - Client testimonial
  - Live/GitHub links

#### `/careers` - Careers Page
- **File:** `app/careers/page.tsx`
- **Features:**
  - Career pathways
  - Hiring process
  - Open roles
  - Company culture
  - Benefits

#### `/contact` - Contact Page
- **File:** `app/contact/page.tsx`
- **Features:** Contact form, company information

### Admin Routes

#### `/admin-login` - Admin Login
- **File:** `app/admin-login/page.tsx`
- **Features:** Authentication form for admin access

#### `/admin` - Admin Dashboard
- **File:** `app/admin/page.tsx`
- **Component:** `admin/dashboard.tsx`
- **Features:**
  - Overview statistics
  - Quick actions
  - Recent content

#### `/admin/dashboard` - Full Admin Dashboard
- **File:** `app/admin/dashboard.tsx`
- **Features:**
  - Projects management
  - Blog posts management
  - Testimonials management
  - Partners management
  - CRUD operations for all content types

### Metadata Routes

#### `/robots.ts` - Robots.txt
- **File:** `app/robots.ts`
- **Purpose:** SEO - search engine crawling rules

#### `/sitemap.ts` - Sitemap
- **File:** `app/sitemap.ts`
- **Purpose:** SEO - dynamic sitemap generation

---

## Components

### Layout Components

#### `Header.tsx`
- **Location:** `app/components/Header.tsx`
- **Purpose:** Main navigation header
- **Features:**
  - Responsive navigation
  - Theme switcher
  - Mobile menu
  - Active route highlighting

#### `Footer.tsx`
- **Location:** `app/components/Footer.tsx`
- **Purpose:** Site footer
- **Features:**
  - Company information
  - Social links
  - Newsletter signup
  - Legal links

#### `ProgressBar.tsx`
- **Location:** `app/components/ProgressBar.tsx`
- **Purpose:** Page loading progress indicator

### Homepage Components

#### `CompanyCarousel.tsx`
- **Purpose:** Display trusted partner logos
- **Features:** Auto-scrolling carousel with partner logos

#### `StatsSection.tsx`
- **Purpose:** Display key metrics/achievements
- **Features:** Animated counters, statistics grid

#### `FloatingCards.tsx`
- **Purpose:** Services showcase
- **Features:** Animated floating cards with service descriptions

#### `ScrollSection.tsx`
- **Purpose:** "Why Choose RapidXTech" section
- **Features:** Scroll-triggered animations

#### `FeaturedWorkSection.tsx` / `featured-work.tsx`
- **Purpose:** Portfolio preview on homepage
- **Features:** Featured projects grid

#### `TestimonialsSection.tsx`
- **Purpose:** Client testimonials display
- **Features:**
  - Carousel of testimonials
  - Support for identified/anonymous reviews
  - Star ratings

#### `ProcessSection.tsx`
- **Purpose:** Development process visualization
- **Features:** Step-by-step process display

### Blog Components

Located in: `components/blog/`

#### `blog-layout.tsx`
- **Purpose:** Blog page layout wrapper

#### `comment-section.tsx`
- **Purpose:** Blog post comments
- **Features:** Comment display and submission

#### `related-posts.tsx`
- **Purpose:** Related blog posts suggestions
- **Features:** Algorithm-based post recommendations

#### `social-share.tsx`
- **Purpose:** Social media sharing buttons
- **Features:** Share to Twitter, Facebook, LinkedIn, etc.

### Careers Components

Located in: `components/careers/`

- `AnimatedSVG.tsx` - Animated SVG graphics
- `CareerPathways.tsx` - Career path visualization
- `CareersClient.tsx` - Main careers page client component
- `FadeInSection.tsx` - Scroll-triggered fade-in animations
- `FeaturesGrid.tsx` - Benefits/features grid
- `FinalCTA.tsx` - Call-to-action section
- `HiringProcess.tsx` - Hiring process steps
- `LifeSection.tsx` - Company culture section
- `OpenRoles.tsx` - Job listings
- `SectionHeader.tsx` - Reusable section header

### Admin Components

Located in: `components/admin/`

#### Admin Dashboard
- `admin-dashboard.tsx` - Main dashboard component
- `admin-layout.tsx` - Admin layout wrapper
- `admin-toast.tsx` - Admin-specific toast notifications

#### Blog Management
- `blog/blog-form-modal.tsx` - Create/edit blog post modal
- `blog/blog-card.tsx` - Blog post card in admin list

#### Projects Management
- `projects/project-form-modal.tsx` - Create/edit project modal
- `projects/project-card.tsx` - Project card in admin list

#### Testimonials Management
- `testimonials/testimonial-form-modal.tsx` - Create/edit testimonial modal
- `testimonials/testimonial-card.tsx` - Testimonial card in admin list

#### Partners Management
- `partners/partner-form-modal.tsx` - Create/edit partner modal
- `partners/partner-card.tsx` - Partner card in admin list

#### Shared Admin Components
- `shared/ImageManager.tsx` - Image upload and management component

### Authentication Components

- `admin-auth.tsx` - Admin authentication wrapper

### UI Components (Shadcn)

Located in: `components/ui/`

**53+ Radix UI-based components:**
- `accordion.tsx` - Collapsible content sections
- `alert-dialog.tsx` - Modal dialogs
- `alert.tsx` - Alert messages
- `aspect-ratio.tsx` - Aspect ratio container
- `avatar.tsx` - User avatars
- `badge.tsx` - Status badges
- `button.tsx` - Button component
- `calendar.tsx` - Date picker calendar
- `card.tsx` - Card container
- `carousel.tsx` - Image/content carousel
- `checkbox.tsx` - Checkbox input
- `collapsible.tsx` - Collapsible sections
- `command.tsx` - Command palette
- `context-menu.tsx` - Right-click context menu
- `dialog.tsx` - Modal dialogs
- `drawer.tsx` - Side drawer
- `dropdown-menu.tsx` - Dropdown menus
- `form.tsx` - Form components
- `hover-card.tsx` - Hover popover
- `input.tsx` - Text input
- `input-otp.tsx` - OTP input
- `label.tsx` - Form labels
- `menubar.tsx` - Menu bar
- `navigation-menu.tsx` - Navigation menu
- `pagination.tsx` - Pagination controls
- `popover.tsx` - Popover component
- `progress.tsx` - Progress bar
- `radio-group.tsx` - Radio button group
- `resizable.tsx` - Resizable panels
- `scroll-area.tsx` - Custom scrollbar
- `select.tsx` - Select dropdown
- `separator.tsx` - Divider line
- `sheet.tsx` - Side sheet
- `skeleton.tsx` - Loading skeleton
- `slider.tsx` - Range slider
- `sonner.tsx` - Toast notifications
- `switch.tsx` - Toggle switch
- `table.tsx` - Data table
- `tabs.tsx` - Tab navigation
- `textarea.tsx` - Multi-line text input
- `toast.tsx` - Toast notifications
- `toggle.tsx` - Toggle button
- `toggle-group.tsx` - Toggle button group
- `tooltip.tsx` - Tooltips
- ...and more

### Utility Components

- `image-carousel.tsx` - Image carousel component
- `optimized-image.tsx` - Next.js Image wrapper with optimization
- `theme-provider.tsx` - Theme context provider
- `theme-switcher.tsx` - Light/dark mode toggle
- `company-carousel.tsx` - Partner logos carousel
- `elegant-partners.tsx` - Elegant partner display
- `minimal-partners.tsx` - Minimal partner display

---

## Libraries & Utilities

Located in: `lib/`

### `supabase.ts`
**Purpose:** Supabase client initialization and TypeScript types

**Exports:**
- `supabase` - Configured Supabase client
- `Database` - TypeScript database schema interface
- `ProjectImage` - Image object interface
- `ProjectTestimonial` - Testimonial object interface
- `ProjectDetail` - Projects table type
- `BlogPost` - Blog posts table type
- `ClientReview` - Client reviews table type
- `TrustedPartner` - Trusted partners table type

### `supabase-cms.ts`
**Purpose:** CMS API classes for database operations

**Classes:**

#### `PortfolioCMS`
- `getAllProjects()` - Get all projects
- `getPublishedProjects()` - Get published projects
- `getFeaturedProjects()` - Get featured projects
- `getProjectById(id)` - Get project by ID
- `getProjectBySlug(slug)` - Get project by slug
- `addProject(project)` - Create project
- `updateProject(id, updates)` - Update project
- `deleteProject(id)` - Delete project
- `togglePublishStatus(id)` - Toggle publish status
- `toggleProjectFeaturedStatus(id)` - Toggle featured status

#### `BlogCMS`
- `getAllBlogPosts()` - Get all blog posts
- `getPublishedBlogPosts()` - Get published posts
- `getBlogPostBySlug(slug)` - Get post by slug
- `addBlogPost(post)` - Create blog post
- `updateBlogPost(id, updates)` - Update blog post
- `deleteBlogPost(id)` - Delete blog post
- `toggleBlogPublishStatus(id)` - Toggle publish status
- `searchBlogPosts(query)` - Search posts
- `getBlogPostsByTag(tag)` - Filter by tag

#### `ReviewsCMS`
- `getAllReviews()` - Get all reviews
- `getPublishedReviews()` - Get published reviews
- `getFeaturedReviews()` - Get featured reviews
- `addReview(review)` - Create review
- `updateReview(id, updates)` - Update review
- `deleteReview(id)` - Delete review
- `toggleReviewPublishStatus(id)` - Toggle publish status
- `toggleReviewFeaturedStatus(id)` - Toggle featured status

#### `PartnersCMS`
- `getAllPartners()` - Get all partners
- `getPublishedPartners()` - Get published partners
- `getFeaturedPartners()` - Get featured partners
- `addPartner(partner)` - Create partner
- `updatePartner(id, updates)` - Update partner
- `deletePartner(id)` - Delete partner
- `togglePartnerPublishStatus(id)` - Toggle publish status
- `togglePartnerFeaturedStatus(id)` - Toggle featured status

**Hook:**
- `useSupabaseCMS()` - Combined hook exposing all CMS methods

### `auth.ts`
**Purpose:** Authentication utilities
- Admin authentication logic
- Session management
- Protected route helpers

### `utils.ts`
**Purpose:** General utility functions
- `cn()` - Class name merger (clsx + tailwind-merge)
- `slugify()` - Convert strings to URL-friendly slugs
- Date formatting
- String manipulation

### `constants.ts`
**Purpose:** Application constants
- API endpoints
- Configuration values
- Static data

### `theme-utils.ts`
**Purpose:** Theme-related utilities
- Theme color calculations
- CSS variable management

### Data Files
- `blog-data.ts` - Blog-related data utilities
- `cms-data.ts` - CMS data utilities
- `portfolio-data.ts` - Portfolio data utilities
- `testimonials-data.ts` - Testimonials data utilities

---

## Hooks

Located in: `hooks/`

### `use-toast.ts`
**Purpose:** Toast notification management
- Display success/error/info messages
- Toast queue management
- Auto-dismiss functionality

### `use-admin-toast.ts`
**Purpose:** Admin-specific toast notifications
- Admin action feedback
- Error handling for admin operations

### `use-mobile.tsx`
**Purpose:** Mobile device detection
- Responsive behavior hooks
- Mobile-specific UI logic

### `use-media-query.tsx`
**Purpose:** Media query matching
- Responsive breakpoint detection
- Dynamic layout adjustments

### `use-safe-overlay-close.ts`
**Purpose:** Safe overlay/modal closing
- Prevent accidental closes
- Confirmation dialogs

---

## Context Providers

Located in: `context/`

### `auth-context.tsx`
**Purpose:** Authentication state management

**Provides:**
- Current user state
- Login/logout functions
- Authentication status
- Protected route logic

**Usage:**
```tsx
const { user, login, logout, isAuthenticated } = useAuth()
```

### `theme-context.tsx`
**Purpose:** Theme state management

**Provides:**
- Current theme (light/dark)
- Theme toggle function
- System theme detection
- Theme persistence

**Usage:**
```tsx
const { theme, setTheme, toggleTheme } = useTheme()
```

---

## Styling & Theming

### Global Styles
- **File:** `app/globals.css`
- **Features:**
  - Tailwind directives
  - CSS custom properties for theming
  - Global animations
  - Typography styles

### Tailwind Configuration
- **File:** `tailwind.config.js`
- **Features:**
  - Custom color palette
  - Extended spacing
  - Custom animations
  - Plugin configurations

### Theme System
- **Light/Dark Mode:** Automatic theme switching
- **CSS Variables:** Dynamic color tokens
- **Theme Classes:**
  - `theme-bg` - Background color
  - `theme-text` - Text color
  - `theme-gradient-text` - Gradient text
  - `theme-glow` - Glow effects
  - `theme-transition` - Smooth transitions

---

## Database Integration

### Supabase Setup
- **URL:** `process.env.NEXT_PUBLIC_SUPABASE_URL`
- **Anon Key:** `process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Tables
1. **blog_posts** - Blog articles
2. **client_reviews** - Testimonials
3. **projects** - Portfolio case studies
4. **trusted_partners** - Partner companies

### Storage Buckets
- **blog-images** - Blog post images
- **project-images** - Project screenshots (implied)

### Row Level Security (RLS)
- Most tables have RLS disabled (development mode)
- `trusted_partners` has full RLS enabled with authenticated/public policies

**See:** `supabase_structure.md` for complete database documentation

---

## Admin Dashboard

### Authentication
- **Route:** `/admin-login`
- **Protected Routes:** All `/admin/*` routes
- **Auth Provider:** Supabase Auth

### Dashboard Features

#### Projects Management
- Create, read, update, delete projects
- Toggle publish/featured status
- Image upload and management
- Slug generation
- Rich text editing

#### Blog Management
- Create, read, update, delete blog posts
- Multi-image support
- Tag management
- SEO metadata editing
- Publish scheduling

#### Testimonials Management
- Create, read, update, delete reviews
- Support for identified/anonymous testimonials
- Rating system
- Featured testimonials selection

#### Partners Management
- Create, read, update, delete partners
- Logo upload
- Display order management
- Featured partners selection

### Admin Components Architecture

```
components/admin/
├── admin-dashboard.tsx          # Main dashboard
├── admin-layout.tsx             # Admin layout wrapper
├── admin-toast.tsx              # Toast notifications
├── blog/
│   ├── blog-form-modal.tsx     # Blog CRUD modal
│   └── blog-card.tsx           # Blog list item
├── projects/
│   ├── project-form-modal.tsx  # Project CRUD modal
│   └── project-card.tsx        # Project list item
├── testimonials/
│   ├── testimonial-form-modal.tsx
│   └── testimonial-card.tsx
├── partners/
│   ├── partner-form-modal.tsx
│   └── partner-card.tsx
└── shared/
    └── ImageManager.tsx         # Image upload component
```

---

## Scripts & Migrations

Located in: `scripts/`

### SQL Scripts

#### `create-tables.sql`
- **Purpose:** Initial database setup
- **Creates:**
  - All 4 main tables
  - Indexes
  - Triggers
  - Sample data
- **Status:** ✅ Executed

#### `create-blog-images-bucket.sql`
- **Purpose:** Create blog-images storage bucket
- **Creates:**
  - Storage bucket
  - RLS policies for storage
- **Status:** ✅ Executed

#### `supabase-blog-migration.sql`
- **Purpose:** Migrate blog posts image field
- **Changes:**
  - `image` (varchar) → `images` (jsonb)
  - Add array validation
- **Status:** ✅ Executed

#### `update-testimonials-schema.sql`
- **Purpose:** Add testimonial type support
- **Changes:**
  - Add `testimonial_type` column
  - Make client fields nullable
  - Add sample anonymous testimonials
- **Status:** ✅ Executed

#### `update-projects-featured.sql`
- **Purpose:** Add featured flag to projects
- **Changes:**
  - Add `is_featured` column
- **Status:** Likely executed

### JavaScript Utilities

#### `fix-project-slugs.js`
- **Purpose:** Fix/regenerate project slugs
- **Usage:** Node.js script to update slugs

#### `migrate-blog-images.js`
- **Purpose:** Migrate blog images to new structure
- **Usage:** Node.js script for data migration

#### `partners-setup.js`
- **Purpose:** Initial partners data setup
- **Usage:** Node.js script to populate partners

---

## Environment Variables

Required in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional
NEXT_PUBLIC_SITE_URL=https://rapidxtech.com
```

---

## Key Features

### SEO Optimization
- Dynamic metadata generation
- Sitemap generation (`/sitemap.ts`)
- Robots.txt (`/robots.ts`)
- Open Graph tags
- Twitter cards
- Structured data (JSON-LD)

### Performance
- Next.js Image optimization
- Code splitting
- Lazy loading
- Static generation where possible
- Incremental Static Regeneration (ISR)

### Animations
- Framer Motion for page transitions
- Scroll-triggered animations
- Hover effects
- Loading states
- Skeleton screens

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support

---

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## File Counts

- **App Routes:** 24+ pages
- **Components:** 104+ components
- **UI Components:** 53+ Shadcn components
- **Hooks:** 5 custom hooks
- **Context Providers:** 2 providers
- **Lib Utilities:** 10 utility files
- **SQL Scripts:** 5 migration scripts
- **JS Utilities:** 3 utility scripts

---

## Integration Points

### Frontend → Backend
- All data fetching uses CMS classes from `lib/supabase-cms.ts`
- Real-time updates via Supabase subscriptions (potential)
- Image uploads to Supabase Storage
- Authentication via Supabase Auth

### Admin → Database
- Direct CRUD operations via CMS classes
- Image management via ImageManager component
- Optimistic UI updates with error handling

### Public Pages → Database
- Read-only access to published content
- Filtered queries (is_published = true)
- Cached data where appropriate

---

## Notes

1. **App Router:** Uses Next.js 14 App Router (not Pages Router)
2. **TypeScript:** Full TypeScript coverage with strict types
3. **Responsive:** Mobile-first design approach
4. **Theming:** Dynamic theme system with CSS variables
5. **CMS:** Full-featured admin dashboard for content management
6. **SEO:** Comprehensive SEO optimization built-in
7. **Performance:** Optimized for Core Web Vitals
8. **Accessibility:** WCAG 2.1 AA compliant

---

**End of Codebase Index**
