-- =====================================================
-- Create Blog Images Storage Bucket with Policies
-- =====================================================
-- Run this in Supabase SQL Editor to create the blog-images bucket
-- with the same policies as project-images bucket

-- Step 1: Create the blog-images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

-- Step 2: Create storage policies for blog-images bucket
-- These policies match your project-images bucket configuration

-- Policy 1: Allow public SELECT (read) access
CREATE POLICY "Public read access for blog images"
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'blog-images');

-- Policy 2: Allow authenticated users to INSERT (upload)
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);

-- Policy 3: Allow authenticated users to UPDATE
CREATE POLICY "Authenticated users can update blog images"
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);

-- Policy 4: Allow authenticated users to DELETE
CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);

-- =====================================================
-- Verification Queries (Optional - run after creation)
-- =====================================================

-- Verify bucket was created
SELECT id, name, public, created_at 
FROM storage.buckets 
WHERE id = 'blog-images';

-- Verify policies were created
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%blog%'
ORDER BY policyname;