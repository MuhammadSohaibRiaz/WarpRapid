"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, User, Share2, MessageCircle, BookOpen, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import type { BlogPost } from "@/lib/supabase-cms"
import { CommentSection } from "@/components/blog/comment-section"
import { SocialShare } from "@/components/blog/social-share"
import { RelatedPosts } from "@/components/blog/related-posts"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { AuthorCard, defaultAuthors } from "@/components/blog/author-card"
import { useState, useEffect } from "react"

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

    // Enhanced reading statistics
    const [scrollPercent, setScrollPercent] = useState(0)
    const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
    const readingTime = Math.ceil(wordCount / 200)
    const remainingTime = Math.ceil(readingTime * (1 - scrollPercent / 100))

    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            setScrollPercent(Math.round(latest * 100))
        })
    }, [scrollYProgress])

    // Parallax effects for hero
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
    const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1])

    // Next post logic
    const nextPost = relatedPosts[0]

    // Get author data
    const authorData = defaultAuthors[post.author] || defaultAuthors["RapidNexTech Team"]

    return (
        <div className="min-h-screen theme-bg theme-text theme-transition selection:bg-primary/20 relative">

            {/* Grid Background Pattern with Theme Glow */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                <div className="absolute inset-0 theme-glow blur-3xl theme-transition" />
            </div>

            {/* Enhanced Reading Progress Bar with Stats */}
            <div className="fixed top-0 left-0 right-0 z-50">
                {/* Progress Bar */}
                <motion.div
                    className="h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 origin-left shadow-lg shadow-primary/50"
                    style={{ scaleX }}
                />

                {/* Floating Progress Stats */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: scrollPercent > 5 ? 1 : 0, y: scrollPercent > 5 ? 0 : -20 }}
                    className="absolute top-4 right-6 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl px-4 py-2 shadow-xl hidden md:flex items-center gap-4"
                >
                    <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-primary">{scrollPercent}%</span>
                    </div>
                    <div className="w-px h-4 bg-border" />
                    <div className="flex items-center gap-2 text-sm theme-text">
                        <Clock className="w-4 h-4" />
                        <span>{remainingTime}min left</span>
                    </div>
                </motion.div>
            </div>

            {/* Floating Header Actions (Back + Share) - Adjusted for header clearance */}
            <div className="fixed top-24 left-6 z-40 hidden md:flex items-center gap-4">
                <Link href="/blog">
                    <Button variant="outline" size="icon" className="rounded-full theme-bg/50 backdrop-blur-md border-border/50 hover:theme-bg">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
            </div>

            {/* Hero Section - Enhanced with Parallax & Depth */}
            <header className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Parallax Background Image */}
                <motion.div
                    className="absolute inset-0"
                    style={{ scale: heroScale, y: heroY }}
                >
                    <Image
                        src={post.images?.[0]?.url || "/placeholder.svg"}
                        alt={post.images?.[0]?.alt || post.title}
                        fill
                        priority
                        className="object-cover"
                    />
                </motion.div>

                {/* Multi-layer Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-purple-500/10" />

                {/* Animated Particles Effect */}
                <div className="absolute inset-0 opacity-30">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white/20 rounded-full blur-sm"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.2, 0.5, 0.2],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>

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

            {/* Main Content - Magazine-Style Layout */}
            <main className="container max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 relative z-20">
                {/* Article Wrapper with Gradient Border */}
                <div className="relative">
                    {/* Decorative gradient line */}
                    <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-purple-500 to-pink-500 rounded-full hidden lg:block" />

                    <article className="prose prose-lg md:prose-xl dark:prose-invert max-w-none 
                        prose-headings:font-black prose-headings:tracking-tight prose-headings:scroll-mt-24
                        prose-h2:text-4xl prose-h2:md:text-5xl prose-h2:mb-8 prose-h2:mt-16
                        prose-h3:text-3xl prose-h3:md:text-4xl prose-h3:mb-6 prose-h3:mt-12
                        prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
                        prose-p:first-of-type:text-xl prose-p:first-of-type:leading-relaxed
                        prose-p:first-of-type:first-letter:text-7xl prose-p:first-of-type:first-letter:font-bold
                        prose-p:first-of-type:first-letter:text-primary prose-p:first-of-type:first-letter:float-left
                        prose-p:first-of-type:first-letter:mr-3 prose-p:first-of-type:first-letter:mt-1
                        prose-a:text-primary prose-a:font-semibold prose-a:no-underline prose-a:border-b-2 prose-a:border-primary/30 hover:prose-a:border-primary hover:prose-a:bg-primary/5 prose-a:transition-all
                        prose-img:rounded-3xl prose-img:shadow-2xl prose-img:w-full prose-img:my-12 prose-img:border prose-img:border-border/50
                        prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-xl prose-blockquote:font-medium prose-blockquote:my-12
                        prose-code:text-primary prose-code:bg-primary/10 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-mono prose-code:text-sm
                        prose-pre:bg-gray-900 prose-pre:border prose-pre:border-border prose-pre:rounded-2xl prose-pre:p-6 prose-pre:my-8
                        prose-ul:my-8 prose-li:my-2 prose-li:text-muted-foreground
                        prose-strong:text-foreground prose-strong:font-bold
                        prose-em:text-muted-foreground prose-em:italic
                    ">
                        {/* Content with enhanced styling */}
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </article>
                </div>

                {/* Enhanced Share & Tags Footer with Glassmorphism */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-24 pt-12 border-t border-border/50"
                >
                    <div className="flex flex-col gap-12">
                        {/* Tags Section */}
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="font-bold text-lg theme-text flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-primary" />
                                Topics:
                            </span>
                            {post.tags.map((tag, index) => (
                                <motion.div
                                    key={tag}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    <Link
                                        href={`/blog?tag=${tag}`}
                                        className="group relative px-5 py-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 hover:border-primary/40 backdrop-blur-sm transition-all duration-300"
                                    >
                                        <span className="relative z-10 font-semibold text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                                            #{tag}
                                        </span>
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Share Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 backdrop-blur-sm">
                            <div>
                                <h3 className="text-2xl font-bold theme-text mb-2">Enjoyed this article?</h3>
                                <p className="text-muted-foreground">Share it with your network and help others discover it too!</p>
                            </div>
                            <SocialShare
                                title={post.title}
                                url={fullUrl}
                                description={post.excerpt}
                                hashtags={post.tags}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Author Card */}
                <AuthorCard author={authorData} className="mt-16" />
            </main>

            {/* Table of Contents */}
            <TableOfContents content={post.content} />

            {/* Next Article Preview - Enhanced with Image */}
            {nextPost && (
                <section className="relative border-t border-border mt-32 overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />

                    <div className="container max-w-6xl mx-auto px-6 py-24 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="text-center text-muted-foreground uppercase tracking-widest text-sm font-bold mb-12 flex items-center justify-center gap-3">
                                <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
                                Continue Reading
                                <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
                            </p>

                            <Link href={`/blog/${nextPost.slug || ''}`} className="group block">
                                <div className="grid md:grid-cols-2 gap-12 items-center">
                                    {/* Image */}
                                    <motion.div
                                        className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Image
                                            src={nextPost.images?.[0]?.url || "/placeholder.svg"}
                                            alt={nextPost.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                        {/* Floating badge */}
                                        <div className="absolute top-6 right-6 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                            Next →
                                        </div>
                                    </motion.div>

                                    {/* Content */}
                                    <div className="space-y-6">
                                        {nextPost.tags?.slice(0, 2).map((tag) => (
                                            <span key={tag} className="inline-block px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-semibold mr-2">
                                                {tag}
                                            </span>
                                        ))}

                                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black theme-text leading-tight group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-500 transition-all duration-300">
                                            {nextPost.title}
                                        </h2>

                                        {nextPost.excerpt && (
                                            <p className="text-lg text-muted-foreground line-clamp-3">
                                                {nextPost.excerpt}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-4 pt-4">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <User className="w-4 h-4" />
                                                <span>{nextPost.author}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Clock className="w-4 h-4" />
                                                <span>{Math.ceil(nextPost.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length / 200)} min</span>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-primary text-white font-bold group-hover:gap-5 transition-all duration-300 shadow-lg shadow-primary/20">
                                                Read Article
                                                <ArrowLeft className="w-5 h-5 rotate-180" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            )
            }

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

        </div >
    )
}
