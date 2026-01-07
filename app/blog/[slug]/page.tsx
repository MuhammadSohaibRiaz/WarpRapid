import type { Metadata } from "next"
import { BlogCMS } from "@/lib/supabase-cms"
import { CommentSection } from "@/components/blog/comment-section"
import { SocialShare } from "@/components/blog/social-share"
import { RelatedPosts } from "@/components/blog/related-posts"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { slugify } from "@/lib/utils"

type Props = {
  params: { slug: string }
}

// Generate static params for all published blog posts
export async function generateStaticParams() {
  const posts = await BlogCMS.getPublishedBlogPosts()
  return posts.map((post) => ({
    slug: post.slug || slugify(post.title),
  }))
}

// Update the metadata function
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await BlogCMS.getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | RapidXTech",
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rapidnextech.com'
  const fullUrl = `${baseUrl}/blog/${params.slug}`
  
  return {
    title: `${post.title} | RapidXTech Blog`,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: 'RapidXTech',
    robots: {
      index: post.is_published,
      follow: post.is_published,
      googleBot: {
        index: post.is_published,
        follow: post.is_published,
      },
    },
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: fullUrl,
      siteName: 'RapidXTech Blog',
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated_at,
      authors: [post.author],
      tags: post.tags,
      images: post.images?.[0]?.url
        ? [
            {
              url: post.images[0].url,
              width: 1200,
              height: 630,
              alt: post.images[0].alt || post.title,
              type: 'image/jpeg',
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      site: '@RapidXTech',
      creator: '@RapidXTech',
      title: post.title,
      description: post.excerpt,
      images: post.images?.[0]?.url ? [
        {
          url: post.images[0].url,
          alt: post.images[0].alt || post.title,
        }
      ] : [],
    },
    other: {
      'article:author': post.author,
      'article:published_time': post.date,
      'article:modified_time': post.updated_at,
      'article:section': 'Technology',
      'article:tag': post.tags?.join(','),
    },
  }
}


export default async function BlogPost({ params }: Props) {
  const post = await BlogCMS.getBlogPostBySlug(params.slug)

  if (!post) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold theme-text mb-4">Post Not Found</h1>
          <p className="theme-text opacity-70 mb-8">The blog post you're looking for doesn't exist.</p>
          <a href="/blog" className="inline-flex items-center theme-text hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Blog
          </a>
        </div>
      </div>
    )
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rapidnextech.com'
  const fullUrl = `${baseUrl}/blog/${params.slug}`
  
  // Fetch related posts
  const allPosts = await BlogCMS.getAllBlogPosts()
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.is_published)
    // Don't limit to 3 - let the carousel component handle it
    .slice(0, 10) // Get up to 10 related posts

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: post.images?.[0]?.url || `${baseUrl}/og-image.jpg`,
            datePublished: post.date,
            dateModified: post.updated_at,
            author: {
              "@type": "Person",
              name: post.author,
              url: `${baseUrl}/about`
            },
            publisher: {
              "@type": "Organization",
              name: "RapidXTech",
              logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/logo.png`
              }
            },
            url: fullUrl,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": fullUrl
            },
            keywords: post.tags?.join(', '),
            articleSection: "Technology",
            inLanguage: "en-US",
            isFamilyFriendly: true
          })
        }}
      />
      
      <div className="min-h-screen theme-bg theme-transition relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div
            className="absolute inset-0 theme-glow blur-3xl theme-transition"
            style={{
              animation: "gradient-animation 20s linear infinite alternate",
            }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-12 relative z-10">
          <div className="mb-6 md:mb-8 -ml-2 md:ml-0">
            <Link href="/blog">
              <Button variant="ghost" className="theme-text hover:bg-primary/20 theme-transition">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Article */}
            <article
              className="bg-background/30 backdrop-blur-md rounded-lg overflow-hidden shadow-lg"
              itemScope
              itemType="http://schema.org/BlogPosting"
            >
              <div className="relative h-64 md:h-96">
                <img
                  src={post.images?.[0]?.url || "/placeholder.svg"}
                  alt={post.images?.[0]?.alt || post.title}
                  className="w-full h-full object-cover"
                  itemProp="image"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-primary/30 theme-text px-2 py-1 rounded theme-transition" itemProp="keywords">
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4 theme-text theme-transition" itemProp="headline">
                  {post.title}
                </h1>

                <div className="flex items-center text-muted-foreground mb-8">
                  <time dateTime={post.date} itemProp="datePublished">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="mx-2">•</span>
                  <span itemProp="author" itemScope itemType="http://schema.org/Person">
                    <span itemProp="name">{post.author}</span>
                  </span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">
                    {Math.ceil(post.content.replace(/<[^>]*>/g, '').split(' ').length / 200)} min read
                  </span>
                </div>

                <div className="mb-8">
                  <p className="text-lg theme-text opacity-80 italic border-l-4 border-primary pl-4" itemProp="description">
                    {post.excerpt}
                  </p>
                </div>

                <div
                  className="prose prose-lg max-w-none theme-transition"
                  itemProp="articleBody"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Article Footer */}
                <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="text-sm theme-text opacity-60">
                      Published on {new Date(post.date).toLocaleDateString()}
                      {post.updated_at !== post.date && (
                        <> • Updated on {new Date(post.updated_at).toLocaleDateString()}</>
                      )}
                    </div>
                    <div className="text-sm theme-text opacity-60">
                      Category: Technology
                    </div>
                  </div>
                </footer>
              </div>
            </article>

            {/* Social Sharing */}
            <SocialShare 
              title={post.title}
              url={fullUrl}
              description={post.excerpt}
              hashtags={post.tags}
            />

            {/* Related Posts */}
            <RelatedPosts 
              currentPostId={post.id}
              posts={relatedPosts}
            />

            {/* Comment Section */}
            <CommentSection 
              postSlug={params.slug}
              postTitle={post.title}
            />
          </div>
        </div>
      </div>
    </>
  )
}
