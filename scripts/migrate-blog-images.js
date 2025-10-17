// Migration script to convert blog posts from single image field to images array
// Run this in browser console on your admin page AFTER updating the database schema

async function migrateBlogImages() {
  console.log('🔄 Starting blog images migration...')
  
  try {
    // Import Supabase client (assuming it's available in your admin page)
    const { supabase } = await import('/lib/supabase.js')
    
    // Get all blog posts
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('*')
    
    if (error) {
      console.error('❌ Error fetching blog posts:', error)
      return
    }
    
    console.log(`📊 Found ${blogPosts.length} blog posts`)
    
    // Find posts that need migration (have old image field data)
    const postsToMigrate = blogPosts.filter(post => 
      post.image && typeof post.image === 'string' && (!post.images || post.images.length === 0)
    )
    
    console.log(`🔄 Need to migrate ${postsToMigrate.length} blog posts`)
    
    if (postsToMigrate.length === 0) {
      console.log('✅ All blog posts already have proper image arrays!')
      return
    }
    
    // Migrate each post
    for (const post of postsToMigrate) {
      // Convert single image URL to images array format
      const imagesArray = [
        {
          id: 1,
          url: post.image,
          alt: `Featured image for ${post.title}`,
          caption: ""
        }
      ]
      
      console.log(`📝 Migrating "${post.title}" - Converting image URL to array`)
      
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ images: imagesArray })
        .eq('id', post.id)
      
      if (updateError) {
        console.error(`❌ Error updating blog post ${post.id}:`, updateError)
      } else {
        console.log(`✅ Migrated blog post ${post.id}`)
      }
    }
    
    console.log('🎉 Blog images migration completed!')
    console.log('📌 Next step: Update your database schema to remove the old "image" field and keep only "images"')
    
  } catch (error) {
    console.error('❌ Migration error:', error)
  }
}

// Instructions for user
console.log(`
📋 BLOG IMAGES MIGRATION STEPS:

1. FIRST: Update your Supabase database schema:
   - Add new "images" column of type JSONB to blog_posts table
   - Keep the old "image" column temporarily for migration

2. THEN: Run this migration script:
   - Open your admin panel in browser
   - Open Developer Tools (F12) → Console
   - Copy and paste this script
   - Run: migrateBlogImages()

3. FINALLY: After migration is complete:
   - Remove the old "image" column from your database
   - Create the "blog-images" storage bucket in Supabase

This will safely convert all existing blog posts to use the new images array format.
`)

// Export the function
window.migrateBlogImages = migrateBlogImages