"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useThemeContext } from "@/context/theme-context"
import { PortfolioCMS } from "@/lib/supabase-cms"
import type { ProjectDetail } from "@/lib/supabase"
import Image from "next/image"
import { slugify } from "@/lib/utils"

const categories = ["All", "Web Development", "App Development", "UI/UX Design", "E-commerce", "Enterprise Software"]

export default function PortfolioClient() {
  const { mode } = useThemeContext()
  const [projects, setProjects] = useState<ProjectDetail[]>([])
  const [filteredProjects, setFilteredProjects] = useState<ProjectDetail[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Load projects
  useEffect(() => {
    async function load() {
      try {
        const data = await PortfolioCMS.getPublishedProjects()
        setProjects(data)
        setFilteredProjects(data)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  // Filter Logic
  useEffect(() => {
    let result = projects
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory)
    }
    if (searchTerm) {
      const lower = searchTerm.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.technology.some(t => t.toLowerCase().includes(lower))
      )
    }
    setFilteredProjects(result)
  }, [selectedCategory, searchTerm, projects])

  // Parallax Text
  const { scrollY } = useScroll()
  const yText = useTransform(scrollY, [0, 500], [0, 100])

  if (isLoading) return <LoadingState />

  return (
    <div className="min-h-screen theme-bg theme-text theme-transition overflow-x-hidden selection:bg-primary/20">

      {/* 1. Global Texture Overlay (Film Grain) */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* 2. Swiss Header (Clean, Big, Geometric) */}
        <section className="pt-40 pb-24 border-b border-border/10">
          <motion.div style={{ y: yText }} className="max-w-[90vw]">
            <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter uppercase theme-text">
              Selected
            </h1>
            <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
              <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter uppercase theme-text/20">
                Work
              </h1>
              <div className="pb-4 max-w-xl">
                <p className="text-xl md:text-2xl font-light text-foreground/60 leading-relaxed">
                  We craft digital experiences that merge technology with human-centric design.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3. Minimalist Filter Bar */}
        <div className="sticky top-0 z-40 py-8 theme-bg/80 backdrop-blur-xl border-b border-theme-text/10 transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0 font-mono text-sm">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 border rounded-full transition-all duration-300 whitespace-nowrap ${selectedCategory === cat
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground/60 border-border/20 hover:border-foreground/50 hover:text-foreground"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 theme-text/40" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 rounded-full theme-text/5 border-transparent focus:theme-bg focus:border-theme-text/20 transition-all font-mono text-sm"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-3 h-3 theme-text/40 hover:theme-text" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 4. Asymmetrical Grid Layout */}
        <section className="py-20 min-h-screen">
          {filteredProjects.length > 0 ? (
            <div className="flex flex-col gap-y-12 md:gap-y-24">
              {/* We map and create rows based on index patterns */}
              {/* Logic: 
                      Group 0: Index 0 (Full)
                      Group 1: Index 1, 2 (Split)
                      Group 2: Index 3, 4, 5 (Tri-split or dynamic)
                      ...repeat
                  */}
              <LayoutGrid projects={filteredProjects} />
            </div>
          ) : (
            <EmptyState onClear={() => { setSearchTerm(""); setSelectedCategory("All") }} />
          )}
        </section>

      </div>
    </div>
  )
}

// --- Dynamic Layout Logic ---

function LayoutGrid({ projects }: { projects: ProjectDetail[] }) {
  // Split projects into chunks that form our rhythm
  // Pattern: [1, 2, 3] items per row repeatedly
  const chunks = []
  let i = 0
  const pattern = [1, 2] // The rhythm pattern: 1 Full, then 2 Split. Simple and elegant.
  let pIdx = 0

  while (i < projects.length) {
    const size = pattern[pIdx % pattern.length]
    chunks.push({ type: size, items: projects.slice(i, i + size) })
    i += size
    pIdx++
  }

  return (
    <>
      {chunks.map((chunk, rowIdx) => (
        <div key={rowIdx} className={`grid gap-8 md:gap-12 ${chunk.type === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
          {chunk.items.map((project, colIdx) => (
            <ProjectCard
              key={project.id}
              project={project}
              isFull={chunk.type === 1}
              index={rowIdx * 2 + colIdx}
            />
          ))}
        </div>
      ))}
    </>
  )
}


function ProjectCard({ project, isFull, index }: { project: ProjectDetail, isFull: boolean, index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group flex flex-col gap-6 cursor-none-target"
    >
      {/* Image Container */}
      <a href={`/case-studies/${project.slug || slugify(project.title)}`} className="block w-full">
        <div className={`relative overflow-hidden theme-text/5 ${isFull ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/3]'} rounded-xl`}>
          <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          <Image
            src={project.images[0]?.url || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            sizes={isFull ? "95vw" : "(max-width: 768px) 100vw, 50vw"}
            priority={index < 2}
          />

          {/* Quick View Button (appears on hover) */}
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <ArrowUpRight className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>
      </a>

      {/* Content Below */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2 cursor-pointer">
          <h3 className="text-3xl font-bold tracking-tight group-hover:underline decoration-2 underline-offset-4 transition-all">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2 text-sm font-mono theme-text/60 uppercase tracking-wider">
            <span>{project.category}</span>
            <span className="w-1 h-1 theme-text/30 rounded-full self-center" />
            <span>{project.duration}</span>
          </div>
        </div>

        <div className={`max-w-md theme-text/70 leading-relaxed ${isFull ? 'block' : 'hidden md:block'}`}>
          <p className="line-clamp-2">{project.description}</p>
        </div>
      </div>
    </motion.article>
  )
}


function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="py-32 flex flex-col items-center justify-center text-center opacity-60">
      <h3 className="text-2xl font-bold mb-2">No projects found.</h3>
      <p className="mb-6">Adjust your filters to see more work.</p>
      <Button onClick={onClear} variant="outline">Clear Filters</Button>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center theme-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-t-2 border-l-2 theme-text rounded-full animate-spin" />
        <span className="font-mono text-sm uppercase tracking-widest theme-text/60">Loading Work...</span>
      </div>
    </div>
  )
}
