-- =====================================================
-- Database Performance Optimizations (2024)
-- =====================================================
-- Run this in Supabase SQL Editor to improve query performance
-- specifically for filtered lists and ordered views.

-- 1. Projects Optimizations
-- Improves performance for fetching published/featured projects and single project by slug
CREATE INDEX IF NOT EXISTS idx_projects_slug_published 
  ON projects(slug, is_published);

CREATE INDEX IF NOT EXISTS idx_projects_published_updated 
  ON projects(is_published, updated_at DESC);

-- 2. Blog Posts Optimizations
-- Improves performance for the blog index and related posts fetching
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_date 
  ON blog_posts(is_published, date DESC);

-- 3. Trusted Partners Optimizations
-- Improves performance for partner carousels and sorted lists
CREATE INDEX IF NOT EXISTS idx_trusted_partners_published_featured 
  ON trusted_partners(is_published, is_featured);

CREATE INDEX IF NOT EXISTS idx_trusted_partners_published_order 
  ON trusted_partners(is_published, display_order ASC);

-- 4. Client Reviews (Testimonials) Optimizations
-- Improves performance for the testimonials section
CREATE INDEX IF NOT EXISTS idx_client_reviews_published_featured 
  ON client_reviews(is_published, is_featured);

-- 5. Blog Comments Optimizations
-- Fast lookup for approved comments on a specific post
CREATE INDEX IF NOT EXISTS idx_blog_comments_slug_approved 
  ON blog_comments(post_slug, is_approved);

-- Verification: List all relevant indexes to confirm they exist
-- SELECT 
--     t.relname AS table_name,
--     i.relname AS index_name,
--     a.attname AS column_name
-- FROM 
--     pg_class t,
--     pg_class i,
--     pg_index ix,
--     pg_attribute a
-- WHERE 
--     t.oid = ix.indrelid
--     AND i.oid = ix.indexrelid
--     AND a.attrelid = t.oid
--     AND a.attnum = ANY(ix.indkey)
--     AND t.relkind = 'r'
--     AND t.relname IN ('projects', 'blog_posts', 'client_reviews', 'trusted_partners', 'blog_comments')
-- ORDER BY 
--     t.relname,
--     i.relname;
