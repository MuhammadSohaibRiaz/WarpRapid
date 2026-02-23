/**
 * Supabase Image Transform Utility
 * 
 * Supabase Storage supports on-the-fly image transforms via query params.
 * This drastically reduces image size (e.g. 3MB → 80KB) by resizing + compressing.
 * 
 * @see https://supabase.com/docs/guides/storage/serving/image-transformations
 */

const SUPABASE_STORAGE_HOST = 'fmwzrgjfxgxnnislysya.supabase.co'

/**
 * Returns an optimized image URL using Supabase Image Transforms.
 * For Supabase storage URLs, appends width/quality params for CDN-level compression.
 * For non-Supabase URLs, returns the original URL unchanged.
 */
export function getOptimizedImageUrl(
  url: string | undefined,
  width: number = 800,
  quality: number = 75
): string {
  if (!url) return '/placeholder.svg'

  // Only transform Supabase storage URLs
  if (!url.includes(SUPABASE_STORAGE_HOST) || !url.includes('/storage/')) {
    return url
  }

  // Convert /object/public/ to /render/image/public/ for transforms
  const transformUrl = url.replace(
    '/storage/v1/object/public/',
    '/storage/v1/render/image/public/'
  )

  // Append transform parameters
  const separator = transformUrl.includes('?') ? '&' : '?'
  return `${transformUrl}${separator}width=${width}&quality=${quality}`
}

/**
 * Preset sizes for common use cases
 */
export const IMAGE_SIZES = {
  /** Blog card thumbnail on index page */
  blogCard: { width: 800, quality: 75 },
  /** Featured/hero image on blog index */
  blogHero: { width: 1200, quality: 80 },
  /** Full-width hero image on detail page */
  blogDetailHero: { width: 1400, quality: 80 },
  /** Inline content images in blog post */
  blogInline: { width: 1000, quality: 75 },
  /** Small thumbnails for related posts */
  blogRelated: { width: 600, quality: 70 },
} as const
