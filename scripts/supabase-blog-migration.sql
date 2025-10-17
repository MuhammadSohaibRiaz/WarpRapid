-- =====================================================
-- Blog Posts Image Field Migration Script
-- =====================================================
-- Run this in Supabase SQL Editor to migrate from image:varchar to images:jsonb
-- This will safely remove the old image field and add the new images field

BEGIN;

-- Step 1: Add the new images column as JSONB with default empty array
ALTER TABLE blog_posts 
ADD COLUMN images JSONB DEFAULT '[]'::jsonb;

-- Step 2: Update existing records to have empty images array (if they have null)
UPDATE blog_posts 
SET images = '[]'::jsonb 
WHERE images IS NULL;

-- Step 3: Make images column NOT NULL with default
ALTER TABLE blog_posts 
ALTER COLUMN images SET NOT NULL,
ALTER COLUMN images SET DEFAULT '[]'::jsonb;

-- Step 4: Remove the old image column (varchar)
ALTER TABLE blog_posts 
DROP COLUMN IF EXISTS image;

-- Step 5: Add a check constraint to ensure images is always an array
ALTER TABLE blog_posts 
ADD CONSTRAINT check_images_is_array 
CHECK (jsonb_typeof(images) = 'array');

-- Step 6: Add a comment to document the new structure
COMMENT ON COLUMN blog_posts.images IS 'Array of image objects: [{"id": number, "url": string, "alt": string, "caption": string}]';

COMMIT;

-- =====================================================
-- Verification Queries (Optional - run after migration)
-- =====================================================

-- Check the new table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'blog_posts' AND column_name = 'images';

-- Check that all blog_posts have valid images arrays
SELECT id, title, images 
FROM blog_posts 
LIMIT 5;

-- Count blog posts by image count
SELECT 
  CASE 
    WHEN jsonb_array_length(images) = 0 THEN '0 images'
    WHEN jsonb_array_length(images) = 1 THEN '1 image'
    ELSE jsonb_array_length(images)::text || ' images'
  END as image_count,
  COUNT(*) as post_count
FROM blog_posts 
GROUP BY jsonb_array_length(images)
ORDER BY jsonb_array_length(images);