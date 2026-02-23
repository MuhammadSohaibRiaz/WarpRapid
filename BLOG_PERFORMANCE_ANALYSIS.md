# Blog Performance – Analysis & Root Causes

## 1. Executive Summary

- **Images on detail page not showing:** Caused by using Supabase Image Transform URLs (`/storage/v1/render/image/public/...`). That endpoint returns 404 if the project does not have [Image Transforms](https://supabase.com/docs/guides/storage/serving/image-transformations) enabled (Pro plan). **Fix:** Use raw storage URLs for all blog images so they always display.
- **Detail page feels slow:** Large payload (full row with big `content` and `images`), multiple server fetches per request, and heavy client-side work (ReactMarkdown, framer-motion, many images). **Fixes:** Use selective fetches (no `content` on list), single combined fetch for detail where possible, keep layout but ensure data and images are minimal and efficient.

---

## 2. How Blog Data Is Stored (Supabase)

### 2.1 Schema (from `scripts/` and types)

- **Table:** `blog_posts`
- **Columns (relevant):**
  - `id`, `title`, `slug`, `excerpt`, `content` (TEXT), `images` (JSONB), `tags`, `author`, `date`, `is_published`, `seo_title`, `seo_description`, `faqs` (JSONB), `cta` (JSONB), `created_at`, `updated_at`
- **Images:** JSONB array `[{ "id", "url", "alt", "caption" }]`. URLs are Supabase Storage public URLs, e.g. `https://<project>.supabase.co/storage/v1/object/public/blog-images/...`
- **Content:** Full markdown/HTML in `content`; can be very large (tens of KB per post).

### 2.2 Indexes (from `scripts/create-tables.sql`, `database-optimizations-2024.sql`)

- `idx_blog_posts_is_published`, `idx_blog_posts_slug`, `idx_blog_posts_date`, `idx_blog_posts_tags` (GIN), `idx_blog_posts_published_date`  
- Good for filtering and ordering; the main cost is **payload size**, not index lookups.

---

## 3. How Blog Data Is Fetched

### 3.1 Public blog list (`/blog`)

- **Server:** `BlogPage` (async) calls `BlogCMS.getPublishedBlogPosts()`.
- **Supabase:** `select("*")` from `blog_posts` where `is_published = true`, order by `date` desc.
- **Problem:** `*` includes `content` (and all other columns). So the list page receives **full body for every post**. With many/long posts, this is a large response and large HTML/JSON.
- **Fix:** Use a selective query for the list: e.g. `id, title, slug, excerpt, images, author, date, tags, is_published, created_at, updated_at` (no `content`, `faqs`, `cta`, `seo_*` if not needed for cards).

### 3.2 Public blog detail (`/blog/[slug]`)

- **Server:**  
  - `generateMetadata({ params })` → `BlogCMS.getBlogPostBySlug(params.slug)` (full row).  
  - `BlogPostPage({ params })` → `BlogCMS.getBlogPostBySlug(params.slug)` again, then `BlogCMS.getRelatedBlogPosts(post.id, 3)`.
- **Supabase:**  
  - `getBlogPostBySlug`: `select("*")` by `slug` + `is_published`, `.single()`.  
  - `getRelatedBlogPosts`: `select("id, title, slug, excerpt, images, author, date, tags, is_published")` (no `content`) – already lean.
- **Problems:**  
  1. **Double fetch of the same post:** metadata and page each call `getBlogPostBySlug`. React `cache()` dedupes within the same request, but it’s still two logical calls and the **response is big** (full `content` + `images`).  
  2. **One full row is unavoidable** for the detail view (we need `content` and `images` to render the post). The slowness is from:  
     - Network: large payload.  
     - Client: parsing JSON, rendering long markdown (ReactMarkdown + rehypeRaw), many components (framer-motion, TOC, comments, related, many images).

### 3.3 Admin dashboard (blog tab)

- **Client:** On load, `loadData()` runs `cms.getAllBlogPosts()` (and other CMS calls in parallel).
- **Supabase:** `select("*")` from `blog_posts`, order by `date` desc. So **every post’s full `content`** is loaded for the list.
- **Problem:** With many/long posts, this is a very large payload and slows the admin “Blog” tab.
- **Fix:**  
  - Use a list API that returns only list-needed fields (no `content`).  
  - When user clicks “Edit”, fetch full post by `id` (e.g. `getBlogPostById(id)`) and open the form with that.  
  - This keeps the list fast and only loads full body when editing.

---

## 4. Root Causes of Slowness (Summary)

| Cause | Where | Fix |
|-------|--------|-----|
| List fetches full row (incl. `content`) | `getPublishedBlogPosts()` | Select only list columns (no `content`) |
| Detail fetches full row (necessary) | `getBlogPostBySlug()` | Keep; ensure no duplicate fetch in same request (cache); consider one “get post + related” helper |
| Admin fetches full rows for list | `getAllBlogPosts()` | List endpoint without `content`; fetch full post by id on Edit |
| Images 404 | Detail (and list if using transform URLs) | Use raw Supabase Storage URLs; avoid transform URL until Image Transforms are enabled |
| Heavy client bundle / work | Detail page | Already using dynamic import for CommentSection and TableOfContents; keep layout, ensure images use raw URLs and list uses light payload |

---

## 5. Image Fix (Detail)

- **Why images broke:** Code used `getOptimizedImageUrl()` which turns Supabase URLs into `/storage/v1/render/image/public/...?width=...&quality=...`. That path is only valid when [Supabase Image Transforms](https://supabase.com/docs/guides/storage/serving/image-transformations) are enabled (Pro plan). Otherwise the server returns 404 and the image does not show.
- **Fix applied:** Use **raw** storage URLs for all blog images (hero, inline, next post, related) so they always work. No change to layout.
- **Optional later:** When Image Transforms are enabled, you can switch back to `getOptimizedImageUrl()` for smaller image bytes and faster loading.

---

## 6. Recommendations Implemented

1. **Images:** Use raw image URLs everywhere on blog list and detail so images always show.  
2. **List payload:** `getPublishedBlogPosts()` should select only fields needed for cards (no `content`).  
3. **Detail:** Keep one full fetch per request (cache ensures `getBlogPostBySlug` isn’t duplicated); related posts already use a lean select.  
4. **Admin:** Use a list query without `content` for the blog tab; add `getBlogPostById(id)` and fetch full post only when opening Edit.  
5. **Layout:** No change; only data and image URL handling are optimized.

---

## 7. Fixes Implemented

### 7.1 Images (detail page)

- **BlogPostClient.tsx:** All image `src` values use raw URLs via a small `blogImageUrl(url)` helper (no Supabase transform URL). Hero, inline `[Image:N]`, markdown `img`, next-post, and related images all use this so images display even when Image Transforms are not enabled.
- **related-posts.tsx:** Related post thumbnails use raw `post.images?.[0]?.url` (no transform).

### 7.2 List payload (public + admin)

- **getPublishedBlogPosts:** Now selects only list-needed columns: `id, title, slug, excerpt, images, author, date, tags, is_published, created_at, updated_at, seo_title, seo_description, faqs, cta` (no `content`). Public `/blog` and `generateStaticParams` receive a much smaller payload.
- **getAllBlogPosts (admin):** Same selective columns (no `content`). Admin blog tab loads quickly.

### 7.3 Admin: full post only when editing

- **getBlogPostById(id):** New CMS method that fetches a single full row by `id` (includes `content`).
- **Admin dashboard:** `handleEditBlogPost` is async: it calls `cms.getBlogPostById(post.id)`, then sets form and opens the modal. Blog list still uses the light list; full post is fetched only when the user clicks Edit.

### 7.4 Files changed

- `app/blog/[slug]/BlogPostClient.tsx` – raw image URLs, remove `getOptimizedImageUrl` usage.
- `components/blog/related-posts.tsx` – raw URL for related images.
- `lib/supabase-cms.ts` – selective `getPublishedBlogPosts` and `getAllBlogPosts`, new `getBlogPostById`, export in `useSupabaseCMS`.
- `lib/hooks/use-supabase-cms.ts` – add `getBlogPostById` to hook.
- `components/admin/admin-dashboard.tsx` – `handleEditBlogPost` async, fetches full post via `getBlogPostById` before opening form.
