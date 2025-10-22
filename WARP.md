# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Framework: Next.js (App Router, TypeScript) with client/server components under the app/ directory. Global layout and SEO live in app/layout.tsx; routes include blog, portfolio, about, contact, and an admin area.
- UI system: Reusable primitives in components/ui (shadcn-style components). Shared feature components in components/*.tsx. Some app-scoped components in app/components/.
- State and theming: ThemeContext (context/theme-context.tsx) controls color scheme and provides helpers for gradient/text/bg classes; ThemeProvider (components/theme-provider.tsx) wraps the app. AuthProvider (context/auth-context.tsx) manages Supabase auth state, failed-attempt lockouts, and exposes login/logout.
- Data/CMS: Supabase is the source of truth. lib/supabase.ts creates the client and defines typed tables (projects, blog_posts, client_reviews, trusted_partners). lib/supabase-cms.ts exposes CMS classes (PortfolioCMS, BlogCMS, ReviewsCMS, PartnersCMS) and a combined useSupabaseCMS() helper with CRUD and toggle methods used by the admin UI.
- Admin area: app/admin/* and components/admin/**/* provide a CMS dashboard (admin-dashboard.tsx) inside AdminLayout with session timers and toasts. Login UI is at app/admin-login/page.tsx. The dashboard calls useSupabaseCMS() for managing content.
- SEO: Central metadata is in app/layout.tsx; blog/[slug]/page.tsx generates per-post metadata and JSON-LD. app/robots.ts and app/sitemap.ts provide robots and sitemap.

Commands and workflows
- Install deps
  - npm install
- Dev server (http://localhost:3000)
  - npm run dev
- Production build and start
  - npm run build
  - npm start
- Lint
  - npm run lint
- Testing
  - Not configured in this repo; no test scripts are defined.
- Run one route locally: start dev server, then navigate to the path (e.g., /blog/my-post or /portfolio/my-project).

Admin maintenance scripts (run in browser console on the admin page)
- Fix missing project slugs (scripts/fix-project-slugs.js)
  1) Open the admin UI in your browser, open DevTools > Console
  2) Paste the file contents; run: fixProjectSlugs()
- Migrate legacy blog image field to images[] (scripts/migrate-blog-images.js)
  1) After adding an images JSONB column in Supabase, open the admin UI console
  2) Paste the file contents; run: migrateBlogImages()

Environment and configuration
- Base URL: Optional NEXT_PUBLIC_BASE_URL is read in blog/[slug]/page.tsx for canonical/OG URLs; falls back to https://rapidxtech.com.
- Supabase: Credentials and table typings are in lib/supabase.ts in this repo snapshot. Update there (or move to env loading) if your working copy uses different credentials.
- Styles: Global styles live in app/globals.css and styles/globals.css. Component-level classes rely on Tailwind-style utility classes.

Testing and linting
- No test setup or config was detected in this snapshot. If tests exist in your working copy, use the project’s configured runner (e.g., npm test) and filters (e.g., jest -t "pattern" or vitest -t "pattern").
- No explicit ESLint/Prettier configs were found here; if present in your working copy, use the provided scripts.
