# Deployment Guide for RapidNexTech.com to cPanel

## Overview
This guide explains how to build your Next.js application locally and deploy the static export to cPanel. 

> [!NOTE]
> **Manual Deployment Flow**: The automated GitHub Actions workflow has been removed. All deployments are now performed manually by building the project locally and uploading the results.

## Prerequisites
- Node.js installed locally (version 18 or higher)
- Access to your cPanel account
- Terminal/PowerShell access for running builds
- FTP/SFTP access or cPanel File Manager
- Supabase credentials (for environment variables)

## Step 1: Prepare Environment Variables

Create a `.env.local` file in the project root with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_BASE_URL=https://rapidnextech.com
```

**Important:** These environment variables are embedded at build time for static export. Make sure they're correct before building.

## Step 2: Install Dependencies

```bash
npm install
```

or if you're using pnpm:

```bash
pnpm install
```

## Step 3: Build the Application Locally

Run the build command to generate the static export:

```bash
npm run build
```

This will:
- Generate a static export in the `out/` folder
- Include all pages, assets, and optimized files
- Embed environment variables at build time

**Build Output:**
- The `out/` folder contains all static files ready for deployment
- All routes are pre-rendered as HTML files
- Images and assets are optimized and included

## Step 4: Verify the Build

After building, check that:
1. The `out/` folder exists and contains files
2. All pages are present (index.html, about.html, case-studies/index.html, etc.)
3. The `.htaccess` file is in the `out/` folder (or copy it there)

## Step 5: Prepare Files for Upload

### Files to Upload:
1. **All contents of the `out/` folder** - This is your entire website
2. **`.htaccess` file** - For redirects and routing (should be in `out/` or root)

### Files NOT to Upload:
- `node_modules/` folder
- `.next/` folder
- Source code files (`app/`, `components/`, `lib/`, etc.)
- `package.json`, `tsconfig.json`, etc.
- `.env.local` or any environment files

## Step 6: Upload to cPanel

### Option A: Using cPanel File Manager
1. Log into your cPanel
2. Navigate to **File Manager**
3. Go to your domain's root directory (usually `public_html/` or `rapidnextech.com/`)
4. **Delete or backup** existing files (if any)
5. Upload all files from the `out/` folder
6. Make sure `.htaccess` is uploaded to the root

### Option B: Using FTP/SFTP
1. Connect to your server via FTP/SFTP
2. Navigate to your domain's root directory
3. Upload all contents of the `out/` folder
4. Ensure `.htaccess` is uploaded

## Step 7: Verify .htaccess Configuration

The `.htaccess` file should be in your root directory and contain:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Redirect trailing slashes to non-trailing slashes (canonical URLs)
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)/$ /$1 [L,R=301]

  # 2. Clean URLs: Internally map /path to /path.html
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.*)$ $1.html [L]

  # 3. Custom 404 Page
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  ErrorDocument 404 /404.html
</IfModule>
```

### Why this works:
- **Clean URLs**: It lets users visit `/admin` but serves `/admin.html` behind the scenes.
- **No Force-Index**: Unlike SPAs, we do NOT redirect everything to `index.html`. We serve the specific HTML file for each route.
- **404 Handling**: If a user types a non-existent route, they get the proper `404.html` instead of the homepage.

## Step 8: Test Your Deployment

After uploading, test:
1. **Homepage**: `https://rapidnextech.com`
2. **Case Studies**: `https://rapidnextech.com/case-studies`
3. **Portfolio Redirect**: `https://rapidnextech.com/portfolio` (should redirect to `/case-studies`)
4. **Blog**: `https://rapidnextech.com/blog`
5. **About**: `https://rapidnextech.com/about`
6. **Contact**: `https://rapidnextech.com/contact`
7. **Careers**: `https://rapidnextech.com/careers`

## Step 9: Update Supabase RLS Policies (if needed)

If you're using Supabase for content, ensure:
- RLS policies allow public read access to published content
- Images in Supabase Storage are publicly accessible
- CORS is configured correctly for your domain

## Troubleshooting

### Issue: Pages show 404
**Solution:** Ensure `.htaccess` is in the root directory and the rewrite rules are active

### Issue: Images not loading
**Solution:** 
- Check that images are in the `out/` folder
- Verify Supabase Storage bucket permissions
- Check image URLs in the browser console

### Issue: Styling is broken
**Solution:** 
- Clear browser cache
- Verify all CSS files were uploaded
- Check that `_next/static/` folder exists in `out/`

### Issue: Environment variables not working
**Solution:** 
- Rebuild locally with correct `.env.local`
- Environment variables must be set at build time for static export

### Issue: Redirects not working
**Solution:**
- Verify `.htaccess` is uploaded
- Check cPanel allows `.htaccess` overrides
- Test redirects manually

## Step 6.5: Update Repository Head (cPanel Git Version Control)

If you are using cPanel's **Git Version Control** feature to track your site's source:

1. Log into your cPanel.
2. Navigate to **Git™ Version Control**.
3. Locate your repository and click **Manage**.
4. Click on the **Pull or Deploy** tab.
5. Click **Update from Remote** to ensure your cPanel repository is pointing to the latest `HEAD`.
6. Use the **Deploy Head Revision** button if you have specific deployment scripts configured in cPanel (though manual upload of `out/` is still recommended for reliability).

## Updating Your Site

When you need to update content:

1. **For content changes (blog posts, projects, etc.):**
   - Update content in Supabase CMS
   - Rebuild locally: `npm run build`
   - Upload new `out/` folder contents

2. **For code changes:**
   - Make changes to source code
   - Test locally: `npm run dev`
   - Rebuild: `npm run build`
   - Upload new `out/` folder contents

## Important Notes

1. **Static Export Limitation:** Since this is a static export, server-side features won't work:
   - No API routes
   - No server-side rendering at request time
   - All data must be fetched at build time

2. **Admin Panel:** The admin panel will work, but it requires Supabase connection. Ensure:
   - Supabase credentials are embedded in the build
   - RLS policies allow admin operations
   - Admin authentication works client-side

3. **Build Time:** The build process fetches all data from Supabase at build time. If you add new content:
   - Rebuild the site to include new content
   - Upload the new build

4. **Performance:** Static export is very fast since all pages are pre-rendered HTML files.

## Quick Build & Deploy Script

You can create a simple script to automate the process:

```bash
#!/bin/bash
# build-and-deploy.sh

echo "Building application..."
npm run build

echo "Build complete! Files are in the 'out' folder."
echo "Upload the contents of 'out/' to your cPanel public_html directory."
```

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all files were uploaded correctly
3. Check cPanel error logs
4. Ensure `.htaccess` is working (test with a simple redirect)

---

**Last Updated:** Based on Next.js 14.2.16 static export configuration
**Domain:** rapidnextech.com

