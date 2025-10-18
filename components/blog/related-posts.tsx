"use client"

import { motion } from "framer-motion"
import { useThemeContext } from "@/context/theme-context"
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface RelatedPost {
  id: number
  title: string
  slug: string
  excerpt: string
  date: string
  author: string
  images: { url: string; alt: string }[]
  tags: string[]
}

interface RelatedPostsProps {
  currentPostId: number
  posts?: RelatedPost[]
  category?: string
}

export function RelatedPosts({ currentPostId, posts = [], category }: RelatedPostsProps) {
  const { mode, color } = useThemeContext()
  const isDark = mode === "dark" || color === "black"
  const [currentSlide, setCurrentSlide] = useState(0)

  // Filter out current post and get related posts
  const relatedPosts = posts.filter(post => post.id !== currentPostId)
  
  // Determine if we need a carousel
  const needsCarousel = relatedPosts.length > 3
  const postsPerSlide = 3
  const totalSlides = needsCarousel ? Math.ceil(relatedPosts.length / postsPerSlide) : 1
  
  // Get posts for current slide
  const currentPosts = needsCarousel 
    ? relatedPosts.slice(currentSlide * postsPerSlide, (currentSlide + 1) * postsPerSlide)
    : relatedPosts.slice(0, 3)
    
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }
  
  // Keyboard navigation
  useEffect(() => {
    if (!needsCarousel) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [needsCarousel, totalSlides])

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={`${
        isDark ? "bg-gray-900/40" : "bg-white/40"
      } backdrop-blur-md rounded-lg p-6 shadow-lg border ${
        isDark ? "border-gray-700/50" : "border-gray-200/50"
      } theme-transition`}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="text-center flex-1">
          <h2 className="text-2xl md:text-3xl font-bold theme-text theme-transition mb-2">
            Related <span className="text-blue-600">blogs</span>
          </h2>
        </div>
        
        {/* Carousel Controls */}
        {needsCarousel && (
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className={`p-2 rounded-full transition-all duration-200 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } disabled:opacity-50`}
              aria-label="Previous posts"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentSlide + 1} / {totalSlides}
            </span>
            
            <button
              onClick={nextSlide}
              className={`p-2 rounded-full transition-all duration-200 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } disabled:opacity-50`}
              aria-label="Next posts"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="group"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className={`rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                isDark ? "bg-gray-800/50" : "bg-white"
              } border ${isDark ? "border-gray-700/50" : "border-gray-200"} h-full flex flex-col`}>
                {/* Image */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <img
                    src={post.images?.[0]?.url || "/placeholder.svg"}
                    alt={post.images?.[0]?.alt || post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                      BLOG
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-lg font-bold theme-text theme-transition line-clamp-2 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-tight min-h-[3.5rem]">
                    {post.title}
                  </h4>
                  
                  {/* Excerpt */}
                  <p className="text-sm theme-text opacity-70 theme-transition line-clamp-3 mb-4 leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>
                  
                  {/* Read More Link */}
                  <div className="flex items-center text-sm font-medium text-orange-500 group-hover:text-orange-600 transition-colors mt-auto">
                    <span>READ MORE</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
          ))}
        </motion.div>
        
        {/* Carousel Dots Indicator */}
        {needsCarousel && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? 'bg-blue-600 w-8'
                    : isDark
                    ? 'bg-gray-600 hover:bg-gray-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

    </motion.section>
  )
}