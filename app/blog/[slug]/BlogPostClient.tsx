"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, User, Share2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import type { BlogPost } from "@/lib/supabase-cms"
import { CommentSection } from "@/components/blog/comment-section"
import { SocialShare } from "@/components/blog/social-share"
import { RelatedPosts } from "@/components/blog/related-posts"

interface BlogPostClientProps {
    post: BlogPost
    relatedPosts: BlogPost[]
    fullUrl: string
}

export default function BlogPostClient({ post, relatedPosts, fullUrl }: BlogPostClientProps) {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Next post logic (simple: first related post)
    const nextPost = relatedPosts[0]

    return (
        <div className="min-h-screen theme-bg theme-text theme-transition selection:bg-primary/20 relative">

            {/* Grid Background Pattern with Theme Glow */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                <div className="absolute inset-0 theme-glow blur-3xl theme-transition" />
            </div>

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
                style={{ scaleX }}
            />

            {/* Floating Header Actions (Back + Share) - Adjusted for header clearance */}
            <div className="fixed top-24 left-6 z-40 hidden md:flex items-center gap-4">
                <Link href="/blog">
                    <Button variant="outline" size="icon" className="rounded-full theme-bg/50 backdrop-blur-md border-border/50 hover:theme-bg">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
            </div>

            {/* Hero Section - Clean, Professional Design */}
            <header className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Background Image - Preserved */}
                <Image
                    src={post.images?.[0]?.url || "/placeholder.svg"}
                    alt={post.images?.[0]?.alt || post.title}
                    fill
                    priority
                    className="object-cover"
                />
                {/* Gradient Overlay - Enhanced for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />

                {/* Hero Content */}
                <div className="relative z-10 container max-w-5xl mx-auto px-6 text-center flex-1 flex flex-col items-center justify-center pt-32 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        {/* Tags - Cleaner, more professional styling */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {post.tags.slice(0, 4).map((tag, index) => (
                                <motion.span
                                    key={tag}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    className="px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-xs font-semibold text-white uppercase tracking-wider hover:bg-white/20 transition-all duration-300"
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>

                        {/* Title - Enhanced typography */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white drop-shadow-2xl"
                        >
                            {post.title}
                        </motion.h1>

                        {/* Metadata - Refined presentation */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex flex-wrap items-center justify-center gap-6 text-white/90 text-sm font-medium"
                        >
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                                <User className="w-4 h-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(post.date)}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                                <Clock className="w-4 h-4" />
                                <span>{Math.ceil(post.content.replace(/<[^>]*>/g, '').split(' ').length / 200)} min read</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator - Animated mouse icon */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2"
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                    </motion.div>
                    <span className="text-white/60 text-xs font-medium uppercase tracking-widest">Scroll</span>
                </motion.div>
            </header>

            {/* Main Content - Full Width Layout */}
            <main className="container max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 relative z-20">
                <article className="prose prose-lg md:prose-xl dark:prose-invert max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight 
            prose-p:text-muted-foreground prose-p:leading-relaxed 
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-2xl prose-img:shadow-xl prose-img:w-full
            prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
         ">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>

                {/* Share & Tags Footer */}
                <div className="mt-20 pt-10 border-t border-border">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-wrap gap-2">
                            <span className="font-mono text-sm text-muted-foreground mr-2">Tags:</span>
                            {post.tags.map(tag => (
                                <Link key={tag} href={`/blog?tag=${tag}`} className="text-sm border border-border px-3 py-1 rounded-md hover:bg-muted transition-colors">
                                    #{tag}
                                </Link>
                            ))}
                        </div>
                        <SocialShare
                            title={post.title}
                            url={fullUrl}
                            description={post.excerpt}
                            hashtags={post.tags}
                        />
                    </div>
                </div>
            </main>

            {/* Next Article Preview */}
            {nextPost && (
                <section className="border-t border-border mt-32 py-24 bg-muted/30">
                    <div className="container max-w-4xl mx-auto px-6 text-center">
                        <p className="text-muted-foreground uppercase tracking-widest text-sm font-semibold mb-6">Read Next</p>
                        <Link href={`/blog/${nextPost.slug || ''}`} className="group block">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 group-hover:text-primary transition-colors duration-300">
                                {nextPost.title}
                            </h2>
                            <div className="inline-flex items-center gap-2 text-lg font-medium border-b-2 border-transparent group-hover:border-primary transition-all">
                                Continue Reading <ArrowLeft className="w-5 h-5 rotate-180" />
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Related Posts & Comments */}
            <div className="theme-bg py-24 relative z-10">
                <div className="container max-w-6xl mx-auto px-6 space-y-24">
                    <RelatedPosts
                        currentPostId={post.id}
                        posts={relatedPosts}
                    />
                    <div className="max-w-3xl mx-auto">
                        <CommentSection
                            postSlug={post.slug || ''}
                            postTitle={post.title}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
