// Run this once to fix existing projects that have null slugs
// You can run this in the browser console on your admin page

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

async function fixProjectSlugs() {
  console.log('🔧 Starting to fix project slugs...')
  
  try {
    // Import Supabase client (assuming it's available in your admin page)
    const { supabase } = await import('/lib/supabase.js')
    
    // Get all projects
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
    
    if (error) {
      console.error('❌ Error fetching projects:', error)
      return
    }
    
    console.log(`📊 Found ${projects.length} projects`)
    
    const projectsToUpdate = projects.filter(project => !project.slug)
    console.log(`🔄 Need to update ${projectsToUpdate.length} projects with missing slugs`)
    
    if (projectsToUpdate.length === 0) {
      console.log('✅ All projects already have slugs!')
      return
    }
    
    // Update each project
    for (const project of projectsToUpdate) {
      const slug = slugify(project.title)
      console.log(`📝 Updating "${project.title}" with slug: "${slug}"`)
      
      const { error: updateError } = await supabase
        .from('projects')
        .update({ slug })
        .eq('id', project.id)
      
      if (updateError) {
        console.error(`❌ Error updating project ${project.id}:`, updateError)
      } else {
        console.log(`✅ Updated project ${project.id}`)
      }
    }
    
    console.log('🎉 All done! Project slugs have been fixed.')
    
  } catch (error) {
    console.error('❌ Script error:', error)
  }
}

// Instructions for user
console.log(`
📋 HOW TO USE THIS SCRIPT:

1. Open your admin panel in the browser
2. Open Developer Tools (F12)
3. Go to the Console tab
4. Copy and paste this entire script
5. Run: fixProjectSlugs()

This will automatically update all projects with missing slugs.
`)

// Export the function so it can be called
window.fixProjectSlugs = fixProjectSlugs