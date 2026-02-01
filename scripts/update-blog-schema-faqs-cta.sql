-- Migration: Add FAQs and CTA support to blog_posts
-- Description: Adds JSONB columns for structured FAQs and custom Call-to-Actions.
-- Author: Antigravity

ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS cta JSONB DEFAULT NULL;

-- Add helpful comments to the columns
COMMENT ON COLUMN public.blog_posts.faqs IS 'Array of {question, answer} objects for the blog post FAQ section';
COMMENT ON COLUMN public.blog_posts.cta IS 'Object containing {title, description, buttonText, buttonLink} for custom CTAs';
