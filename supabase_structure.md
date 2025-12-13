# Supabase Database Structure Documentation

> **Last Updated:** December 13, 2025  
> **Project:** RapidXTech Portfolio & CMS Platform  
> **Database:** PostgreSQL (Supabase)

---

## 📋 Table of Contents

1. [Database Overview](#database-overview)
2. [Tables](#tables)
   - [blog_posts](#1-blog_posts)
   - [client_reviews](#2-client_reviews)
   - [projects](#3-projects)
   - [trusted_partners](#4-trusted_partners)
3. [Storage Buckets](#storage-buckets)
4. [Row Level Security (RLS) Policies](#row-level-security-rls-policies)
5. [Indexes](#indexes)
6. [Triggers & Functions](#triggers--functions)
7. [TypeScript Types](#typescript-types)
8. [CMS API Classes](#cms-api-classes)

---

## Database Overview

The database consists of **4 main tables** that power the RapidXTech portfolio website and CMS:

- **blog_posts**: Blog articles with multi-image support
- **client_reviews**: Client testimonials (identified & anonymous)
- **projects**: Portfolio case studies with detailed information
- **trusted_partners**: Partner/client company logos and information

All tables include automatic timestamp tracking (`created_at`, `updated_at`) and publish/feature flags for content management.

---

## Tables

### 1. blog_posts

**Purpose:** Stores blog articles with SEO optimization and multi-image support.

#### Schema

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `int4` | PRIMARY KEY, SERIAL | Auto-incrementing unique identifier |
| `title` | `varchar(255)` | NOT NULL | Blog post title |
| `slug` | `varchar(255)` | NOT NULL, UNIQUE | URL-friendly slug for routing |
| `excerpt` | `text` | NOT NULL | Short summary/preview text |
| `content` | `text` | NOT NULL | Full HTML content of the blog post |
| `tags` | `text[]` | NOT NULL, DEFAULT '{}' | Array of tags for categorization |
| `author` | `varchar(100)` | NOT NULL, DEFAULT 'RapidXTech Team' | Author name |
| `date` | `date` | NOT NULL, DEFAULT CURRENT_DATE | Publication date |
| `is_published` | `bool` | NOT NULL, DEFAULT false | Visibility flag |
| `seo_title` | `varchar(255)` | NULL | SEO-optimized title |
| `seo_description` | `text` | NULL | SEO meta description |
| `created_at` | `timestamptz` | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | `timestamptz` | DEFAULT NOW() | Last update timestamp |
| `images` | `jsonb` | NOT NULL, DEFAULT '[]' | Array of image objects |

#### Images JSONB Structure

```json
[
  {
    "id": 1,
    "alt": "Image alt text",
    "url": "https://fmwzrgjfxgxnnislysya.supabase.co/storage/v1/object/public/blog-images/filename.png",
    "caption": "Optional caption text"
  },
  {
    "id": 2,
    "alt": "Another image",
    "url": "https://...",
    "caption": ""
  }
]
```

#### Example Data

```json
{
  "id": 1,
  "title": "The Future of Web Development",
  "slug": "future-of-web-development-2024",
  "excerpt": "Explore cutting-edge trends...",
  "content": "<h2>Introduction</h2><p>...</p>",
  "tags": ["web development", "trends", "AI"],
  "author": "Alex Rodriguez",
  "date": "2024-01-15",
  "is_published": true,
  "seo_title": "Future of Web Development 2024 | RapidXTech",
  "seo_description": "Discover the latest trends...",
  "images": [
    {
      "id": 1,
      "alt": "testimonial",
      "url": "https://fmwzrgjfxgxnnislysya.supabase.co/storage/v1/object/public/blog-images/testimonial.PNG",
      "caption": "hey hey"
    }
  ]
}
```

---

### 2. client_reviews

**Purpose:** Stores client testimonials with support for both identified and anonymous reviews.

#### Schema

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `int4` | PRIMARY KEY, SERIAL | Auto-incrementing unique identifier |
| `client_name` | `varchar` | NULL | Client's full name (NULL for anonymous) |
| `client_position` | `varchar` | NULL | Client's job title (NULL for anonymous) |
| `client_company` | `varchar` | NULL | Client's company name (NULL for anonymous) |
| `client_image` | `varchar` | NULL | URL to client's profile image |
| `review_text` | `text` | NOT NULL | The testimonial content |
| `rating` | `int4` | NOT NULL | Star rating (typically 1-5) |
| `project_category` | `varchar` | NULL | Associated project category |
| `is_featured` | `bool` | NOT NULL, DEFAULT false | Featured on homepage flag |
| `is_published` | `bool` | NOT NULL, DEFAULT false | Visibility flag |
| `created_at` | `timestamptz` | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | `timestamptz` | DEFAULT NOW() | Last update timestamp |
| `testimonial_type` | `varchar(20)` | DEFAULT 'identified', CHECK | Type: 'identified' or 'anonymous' |

#### Testimonial Types

- **`identified`**: Full client information displayed (name, position, company, image)
- **`anonymous`**: Only review text and rating shown (client fields are NULL)

#### Example Data

**Identified Testimonial:**
```json
{
  "id": 1,
  "client_name": "Sarah Johnson",
  "client_position": "CEO",
  "client_company": "TechCorp",
  "client_image": "https://example.com/sarah.jpg",
  "review_text": "Outstanding work! Exceeded expectations.",
  "rating": 5,
  "project_category": "Web Development",
  "testimonial_type": "identified",
  "is_featured": true,
  "is_published": true
}
```

**Anonymous Testimonial:**
```json
{
  "id": 2,
  "client_name": null,
  "client_position": null,
  "client_company": null,
  "client_image": null,
  "review_text": "Professional service and excellent communication.",
  "rating": 5,
  "project_category": "App Development",
  "testimonial_type": "anonymous",
  "is_featured": false,
  "is_published": true
}
```

---

### 3. projects

**Purpose:** Portfolio case studies with detailed project information, images, and embedded testimonials.

#### Schema

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `int4` | PRIMARY KEY, SERIAL | Auto-incrementing unique identifier |
| `title` | `varchar(255)` | NOT NULL | Project title |
| `slug` | `text` | NULL | URL-friendly slug |
| `category` | `varchar(100)` | NOT NULL | Project category (e.g., "Web Development") |
| `technology` | `text[]` | NOT NULL, DEFAULT '{}' | Tech stack array |
| `description` | `text` | NOT NULL | Short project description |
| `long_description` | `text` | NULL | Detailed project overview |
| `challenge` | `text` | NULL | Client's challenge/problem |
| `solution` | `text` | NULL | How the challenge was solved |
| `results` | `text[]` | NOT NULL, DEFAULT '{}' | Array of measurable outcomes |
| `features` | `text[]` | NOT NULL, DEFAULT '{}' | Array of key features |
| `images` | `jsonb` | NOT NULL, DEFAULT '[]' | Array of project screenshots |
| `duration` | `varchar(50)` | NULL | Project timeline (e.g., "4 months") |
| `team_size` | `int4` | NOT NULL, DEFAULT 1 | Number of team members |
| `client_type` | `varchar(100)` | NULL | Type of client (e.g., "Retail Business") |
| `live_url` | `varchar(500)` | NULL | Production website URL |
| `github_url` | `varchar(500)` | NULL | GitHub repository URL |
| `is_published` | `bool` | NOT NULL, DEFAULT false | Visibility flag |
| `is_featured` | `bool` | NOT NULL, DEFAULT false | Featured project flag |
| `testimonial` | `jsonb` | NULL | Embedded client testimonial |
| `created_at` | `timestamptz` | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | `timestamptz` | DEFAULT NOW() | Last update timestamp |

#### Images JSONB Structure

```json
[
  {
    "id": 1,
    "alt": "E-commerce platform",
    "url": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
    "caption": "Modern shopping interface"
  }
]
```

#### Testimonial JSONB Structure

```json
{
  "quote": "Outstanding work! The platform exceeded our expectations.",
  "author": "John Smith",
  "company": "TechCorp",
  "position": "CEO"
}
```

#### Example Data

```json
{
  "id": 1,
  "title": "E-commerce Platform",
  "slug": "e-commerce-platform",
  "category": "Web Development",
  "technology": ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
  "description": "A full-featured e-commerce platform...",
  "long_description": "A comprehensive e-commerce solution...",
  "challenge": "The client needed a robust platform...",
  "solution": "We developed a scalable microservices architecture...",
  "results": [
    "40% increase in conversion rates",
    "60% reduction in page load times",
    "99.9% uptime during peak traffic"
  ],
  "features": [
    "Real-time inventory management",
    "Multi-payment gateway integration",
    "Advanced search and filtering"
  ],
  "images": [
    {
      "id": 1,
      "alt": "E-commerce platform",
      "url": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      "caption": "Modern shopping interface"
    }
  ],
  "duration": "4 months",
  "team_size": 5,
  "client_type": "Retail Business",
  "live_url": "https://example.com",
  "github_url": null,
  "is_published": true,
  "is_featured": true,
  "testimonial": {
    "quote": "RapidXTech delivered an exceptional platform...",
    "author": "Sarah Johnson",
    "position": "CEO",
    "company": "RetailCorp"
  }
}
```

---

### 4. trusted_partners

**Purpose:** Stores partner/client company information for display on the website.

#### Schema

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `int4` | PRIMARY KEY, SERIAL | Auto-incrementing unique identifier |
| `company_name` | `varchar` | NOT NULL | Partner company name |
| `company_website` | `varchar` | NULL | Partner's website URL |
| `partnership_type` | `varchar` | NULL | Type of partnership |
| `description` | `text` | NULL | Partnership description |
| `is_published` | `bool` | NOT NULL, DEFAULT false | Visibility flag |
| `is_featured` | `bool` | NOT NULL, DEFAULT false | Featured partner flag |
| `display_order` | `int4` | NOT NULL, DEFAULT 0 | Sort order for display |
| `created_at` | `timestamptz` | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | `timestamptz` | DEFAULT NOW() | Last update timestamp |

> **Note:** The schema shows `company_logo` field in TypeScript types but not explicitly mentioned in your original structure. The TypeScript interface includes it as a required field.

#### Example Data

```json
{
  "id": 1,
  "company_name": "TechCorp Inc.",
  "company_website": "https://techcorp.com",
  "partnership_type": "Strategic Partner",
  "description": "Long-term technology partner",
  "is_published": true,
  "is_featured": true,
  "display_order": 1
}
```

---

## Storage Buckets

### blog-images

**Purpose:** Stores uploaded images for blog posts.

**Configuration:**
- **Bucket ID:** `blog-images`
- **Public Access:** `true`
- **Policies:** Same as project-images bucket

**Policies:**

1. **Public read access for blog images**
   - Operation: `SELECT`
   - Access: Public (anyone can read)

2. **Authenticated users can upload blog images**
   - Operation: `INSERT`
   - Access: Authenticated users only

3. **Authenticated users can update blog images**
   - Operation: `UPDATE`
   - Access: Authenticated users only

4. **Authenticated users can delete blog images**
   - Operation: `DELETE`
   - Access: Authenticated users only

---

## Row Level Security (RLS) Policies

Based on the screenshots provided:

### blog_posts
- **RLS Status:** DISABLED
- **Default Policy:** Anyone with the project's anonymous key can read, modify, or delete data
- **No custom policies created**

### client_reviews
- **RLS Status:** DISABLED
- **Default Policy:** Anyone with the project's anonymous key can read, modify, or delete data
- **No custom policies created**

### projects
- **RLS Status:** DISABLED
- **Default Policy:** Anyone with the project's anonymous key can read, modify, or delete data
- **No custom policies created**

### trusted_partners
- **RLS Status:** ENABLED
- **Policies:**
  1. **Authenticated delete partners**
     - Command: `DELETE`
     - Applied to: `authenticated`
  
  2. **Authenticated insert partners**
     - Command: `INSERT`
     - Applied to: `authenticated`
  
  3. **Authenticated read all partners**
     - Command: `SELECT`
     - Applied to: `authenticated`
  
  4. **Authenticated update partners**
     - Command: `UPDATE`
     - Applied to: `authenticated`
  
  5. **Public read published partners**
     - Command: `SELECT`
     - Applied to: `anon` (anonymous/public users)
     - Condition: Only published partners visible

---

## Indexes

### blog_posts Indexes

```sql
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);
```

**Purpose:**
- Fast filtering by publish status
- Quick slug lookups for routing
- Efficient date-based sorting
- GIN index for array tag searches

### projects Indexes

```sql
CREATE INDEX IF NOT EXISTS idx_projects_is_published ON projects(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
```

**Purpose:**
- Fast filtering by publish status
- Category-based filtering
- Chronological sorting

### client_reviews Indexes

```sql
CREATE INDEX idx_client_reviews_type ON client_reviews(testimonial_type);
CREATE INDEX idx_client_reviews_published_type ON client_reviews(is_published, testimonial_type);
```

**Purpose:**
- Filter by testimonial type (identified/anonymous)
- Composite index for published + type queries

---

## Triggers & Functions

### update_updated_at_column()

**Purpose:** Automatically updates the `updated_at` timestamp on row modifications.

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';
```

### Applied Triggers

```sql
-- Projects table
CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Blog posts table
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

---

## TypeScript Types

### Database Interface

Located in: `lib/supabase.ts`

```typescript
export interface Database {
  public: {
    Tables: {
      projects: { Row, Insert, Update }
      blog_posts: { Row, Insert, Update }
      client_reviews: { Row, Insert, Update }
      trusted_partners: { Row, Insert, Update }
    }
  }
}
```

### Shared Types

```typescript
export interface ProjectImage {
  id: number
  url: string
  alt: string
  caption?: string
}

export interface ProjectTestimonial {
  quote: string
  author: string
  position: string
  company: string
}

export type ProjectDetail = Database["public"]["Tables"]["projects"]["Row"]
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"]
export type ClientReview = Database["public"]["Tables"]["client_reviews"]["Row"]
export type TrustedPartner = Database["public"]["Tables"]["trusted_partners"]["Row"]
```

---

## CMS API Classes

Located in: `lib/supabase-cms.ts`

### PortfolioCMS

**Methods:**
- `getAllProjects()` - Get all projects (admin)
- `getPublishedProjects()` - Get published projects only
- `getFeaturedProjects()` - Get featured published projects
- `getProjectById(id)` - Get single project by ID
- `getProjectBySlug(slug)` - Get project by URL slug
- `addProject(project)` - Create new project
- `updateProject(id, updates)` - Update existing project
- `deleteProject(id)` - Delete project
- `togglePublishStatus(id)` - Toggle is_published flag
- `toggleProjectFeaturedStatus(id)` - Toggle is_featured flag

### BlogCMS

**Methods:**
- `getAllBlogPosts()` - Get all blog posts (admin)
- `getPublishedBlogPosts()` - Get published posts only
- `getBlogPostBySlug(slug)` - Get post by URL slug
- `addBlogPost(post)` - Create new blog post
- `updateBlogPost(id, updates)` - Update existing post
- `deleteBlogPost(id)` - Delete blog post
- `toggleBlogPublishStatus(id)` - Toggle is_published flag
- `searchBlogPosts(query)` - Search posts by title/excerpt/content
- `getBlogPostsByTag(tag)` - Filter posts by tag

### ReviewsCMS

**Methods:**
- `getAllReviews()` - Get all reviews (admin)
- `getPublishedReviews()` - Get published reviews only
- `getFeaturedReviews()` - Get featured published reviews
- `addReview(review)` - Create new review
- `updateReview(id, updates)` - Update existing review
- `deleteReview(id)` - Delete review
- `toggleReviewPublishStatus(id)` - Toggle is_published flag
- `toggleReviewFeaturedStatus(id)` - Toggle is_featured flag

### PartnersCMS

**Methods:**
- `getAllPartners()` - Get all partners (admin)
- `getPublishedPartners()` - Get published partners only
- `getFeaturedPartners()` - Get featured published partners
- `addPartner(partner)` - Create new partner
- `updatePartner(id, updates)` - Update existing partner
- `deletePartner(id)` - Delete partner
- `togglePartnerPublishStatus(id)` - Toggle is_published flag
- `togglePartnerFeaturedStatus(id)` - Toggle is_featured flag

---

## Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

## Migration History

### Executed Scripts (in `/scripts` directory)

1. **create-tables.sql** - Initial table creation with sample data
2. **create-blog-images-bucket.sql** - Blog images storage bucket setup
3. **supabase-blog-migration.sql** - Migrated blog posts from `image:varchar` to `images:jsonb`
4. **update-testimonials-schema.sql** - Added `testimonial_type` field to client_reviews
5. **update-projects-featured.sql** - Added `is_featured` flag to projects (likely)

### Pending/Utility Scripts

- **fix-project-slugs.js** - JavaScript utility to fix project slugs
- **migrate-blog-images.js** - JavaScript utility for blog image migration
- **partners-setup.js** - JavaScript utility for partners setup

---

## Notes & Best Practices

1. **Slug Generation:** Slugs are auto-generated from titles using the `slugify()` utility function
2. **Image Storage:** All images should be uploaded to Supabase Storage buckets, not stored as base64
3. **JSONB Validation:** The `images` column has a CHECK constraint ensuring it's always a valid JSON array
4. **Automatic Timestamps:** `created_at` and `updated_at` are managed automatically via triggers
5. **Publish Workflow:** All content uses `is_published` flag for draft/live management
6. **Featured Content:** `is_featured` flag allows highlighting specific content on homepage
7. **RLS Security:** Currently most tables have RLS disabled except `trusted_partners` - consider enabling for production

---

## Quick Reference

### Common Queries

**Get all published blog posts:**
```sql
SELECT * FROM blog_posts WHERE is_published = true ORDER BY date DESC;
```

**Get featured projects:**
```sql
SELECT * FROM projects WHERE is_published = true AND is_featured = true;
```

**Get identified testimonials:**
```sql
SELECT * FROM client_reviews 
WHERE is_published = true AND testimonial_type = 'identified';
```

**Get partners by display order:**
```sql
SELECT * FROM trusted_partners 
WHERE is_published = true 
ORDER BY display_order ASC;
```

---

**End of Documentation**
