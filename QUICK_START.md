# Quick Start - Build & Deploy to cPanel

## 🚀 Quick Deployment Steps

### 1. Set Environment Variables
Create `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_BASE_URL=https://rapidnextech.com
```

### 2. Install & Build
```bash
npm install
npm run build
```

This will:
- Build the static site in `out/` folder
- Automatically copy `.htaccess` to `out/` folder

### 3. Upload to cPanel
Upload **ALL contents** of the `out/` folder to your cPanel `public_html/` directory.

### 4. Test
Visit `https://rapidnextech.com` and verify:
- ✅ Homepage loads
- ✅ `/portfolio` redirects to `/case-studies`
- ✅ All pages work
- ✅ Images load correctly

---

## 📋 What Changed

✅ **Domain Updated**: All references changed from `rapidxtech.com` to `rapidnextech.com`
✅ **Build Configuration**: Already set for static export (`output: "export"`)
✅ **Redirects**: `.htaccess` configured for portfolio → case-studies redirects
✅ **Build Script**: Automatically copies `.htaccess` to output folder

---

## 🔧 Troubleshooting

**Build fails?**
- Check Node.js version (need 18+)
- Verify `.env.local` has correct Supabase credentials
- Run `npm install` first

**Pages show 404?**
- Ensure `.htaccess` is in root directory on server
- Check cPanel allows `.htaccess` overrides

**Images not loading?**
- Verify Supabase Storage bucket permissions
- Check image URLs in browser console

---

For detailed instructions, see `DEPLOYMENT_GUIDE.md`








