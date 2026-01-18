"use client"

import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { BlogCMS, BlogPost } from "@/lib/supabase-cms"
import { formatDate } from "@/lib/utils"
import { ArrowUpRight, Calendar, User, Tag, Clock } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)

  // Scroll parallax for header
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await BlogCMS.getPublishedBlogPosts()
        setPosts(data)
      } catch (error) {
        console.error("Failed to load blog posts", error)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen theme-bg flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <div ref={containerRef} className="min-h-screen theme-bg theme-transition relative overflow-hidden">

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      <div className="relative z-10 w-full">

        {/* Massive Formatting Header */}
        <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-6 container mx-auto">
          <motion.div
            style={{ y, opacity }}
            className="relative"
          >
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[15vw] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-theme-text/80 to-theme-text/10 select-none pointer-events-none text-center md:text-left drop-shadow-md"
            >
              INSIGHTS
            </motion.h1>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="md:absolute md:right-0 md:bottom-4 max-w-md text-right ml-auto mt-8 md:mt-0"
            >
              <p className="text-xl md:text-2xl theme-text font-light leading-relaxed">
                Exploring the frontiers of <span className="text-primary font-bold">technology</span>, <span className="text-purple-500 font-bold">design</span>, and <span className="text-blue-500 font-bold">innovation</span>.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Post - Hero Card */}
        {featuredPost && (
          <section className="container mx-auto px-6 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <Link href={`/blog/${featuredPost.slug}`} className="group block">
                <div className="relative w-full overflow-hidden rounded-[2.5rem] bg-gray-900 aspect-[4/3] md:aspect-[21/9] shadow-2xl transition-all duration-500 hover:shadow-primary/20 hover:scale-[1.01]">
                  {/* Image Background */}
                  <div className="absolute inset-0">
                    <Image
                      src={featuredPost.images?.[0]?.url || "/placeholder.svg"}
                      alt={featuredPost.title}
                      fill
                      priority
                      sizes="100vw"
                      className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-start justify-end h-full relative z-10">
                    <motion.div
                      className="flex flex-wrap gap-3 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {featuredPost.tags.slice(0, 3).map((tag: string, i: number) => (
                        <span key={i} className="px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-sm font-medium tracking-wide uppercase">
                          {tag}
                        </span>
                      ))}
                    </motion.div>

                    <motion.h2
                      className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-5xl group-hover:text-primary transition-colors duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {featuredPost.title}
                    </motion.h2>

                    <motion.div
                      className="flex items-center gap-8 text-white/80"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <User size={18} className="text-white" />
                        </div>
                        <span className="font-medium">{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>{formatDate(featuredPost.date)}</span>
                      </div>
                    </motion.div>

                    {/* Floating Arrow CTA */}
                    <div className="absolute top-8 right-8 md:top-12 md:right-12 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight className="text-white w-8 h-8" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </section>
        )}

        {/* Bento Grid Layout */}
        <section className="container mx-auto px-6 pb-24">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-8"
          >
            {remainingPosts.map((post, index) => {
              // Make every 4th post span 2 columns for Bento effect
              const isWide = index % 4 === 0 || index % 4 === 3;

              return (
                <motion.article
                  key={post.id}
                  variants={fadeInUp}
                  className={`group relative rounded-[2rem] overflow-hidden bg-background/50 border border-theme-text/10 backdrop-blur-sm hover:border-primary/50 transition-colors duration-500 ${isWide ? 'md:col-span-2' : 'col-span-1'}`}
                >
                  <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                    {/* Image */}
                    <div className={`relative overflow-hidden ${isWide ? 'h-64 md:h-80' : 'h-64'}`}>
                      <Image
                        src={post.images?.[0]?.url || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes={isWide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
                        <ArrowUpRight className="text-white w-5 h-5" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow relative">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 2).map((tag: string, i: number) => (
                          <span key={i} className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className={`font-bold theme-text mb-3 leading-tight group-hover:text-primary transition-colors ${isWide ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                        {post.title}
                      </h3>

                      <p className="text-theme-text/60 line-clamp-2 md:line-clamp-3 mb-6 flex-grow">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-theme-text/5 mt-auto">
                        <div className="flex items-center gap-2 text-sm text-theme-text/50">
                          <Clock size={14} />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <span className="text-sm font-medium text-theme-text group-hover:translate-x-2 transition-transform duration-300">Read Article →</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              )
            })}
          </motion.div>

          {posts.length === 0 && !loading && (
            <div className="text-center py-24 opacity-50">
              <h3 className="text-2xl font-bold theme-text">No articles found</h3>
              <p>Check back later for updates.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
