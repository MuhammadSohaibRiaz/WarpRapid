// Utility script to help initialize and clean up Trusted Partners data
// Run this in the browser console on your admin page (same pattern as other scripts)

async function initializePartners() {
  console.log('🔧 Starting partners initialization...')
  try {
    // Import Supabase client (assumes ESM build available in app)
    const { supabase } = await import('/lib/supabase.js')

    // 1) Ensure display_order is sequential
    const { data: partners, error } = await supabase
      .from('trusted_partners')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('❌ Error fetching partners:', error)
      return
    }

    if (!partners || partners.length === 0) {
      console.log('ℹ️ No partners found. Add partners from the admin dashboard first.')
      return
    }

    // Fill missing or invalid display_order
    let nextOrder = 1
    for (const p of partners) {
      if (typeof p.display_order !== 'number' || p.display_order < 0) {
        const { error: updErr } = await supabase
          .from('trusted_partners')
          .update({ display_order: nextOrder })
          .eq('id', p.id)
        if (updErr) {
          console.error(`❌ Failed to set display_order for partner ${p.id}`, updErr)
        } else {
          console.log(`✅ Set display_order=${nextOrder} for ${p.company_name}`)
        }
      }
      nextOrder++
    }

    // 2) Optional: validate logo URLs
    const invalid = partners.filter(p => !p.company_logo || !/^https?:\/\//i.test(p.company_logo))
    if (invalid.length) {
      console.warn('⚠️ Some partners have missing/invalid logo URLs. Upload logos to the "partner-logos" bucket and paste public URLs:', invalid.map(p => ({ id: p.id, name: p.company_name, company_logo: p.company_logo })))
    } else {
      console.log('✅ All partners have valid-looking logo URLs')
    }

    console.log('🎉 Partners initialization complete')
  } catch (e) {
    console.error('❌ Script error:', e)
  }
}

console.log(`\n📋 PARTNERS SETUP:\n\n1) Upload logos to the Supabase Storage bucket: partner-logos\n   - Go to Supabase Dashboard → Storage → Create bucket "partner-logos" (public)\n   - Upload logo files and copy the public URLs\n2) Open the admin panel in your browser and add/edit partners, paste the logo URLs\n3) To normalize display order and validate logo URLs, run: initializePartners()\n`)

// Expose to window
// @ts-ignore
window.initializePartners = initializePartners
