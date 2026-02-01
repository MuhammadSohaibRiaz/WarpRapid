"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useSupabaseCMS } from "@/lib/supabase-cms"
import type { ProjectDetail } from "@/lib/supabase"
import { ArrowRight, ChevronRight, Briefcase, ExternalLink } from "lucide-react"

export function FeaturedWorkSection() {
  const cms = useSupabaseCMS()
  const [projects, setProjects] = useState<ProjectDetail[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    cms
      .getFeaturedProjects()
      .then((rows) => {
        if (!mounted) return
        setProjects((rows || []).slice(0, 5)) // Showing up to 5 featured projects
      })
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  if (loading || projects.length === 0) return null

  return (
    <section className="bg-transparent py-24 relative" id="featured-work">

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header Section */}
        <div className="mb-24 flex items-end justify-between">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-primary">Featured Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black theme-text tracking-tighter leading-none">
              The <span className="theme-gradient-text text-transparent bg-clip-text">Portfolio</span>
            </h2>
            <p className="text-lg theme-text opacity-70 font-medium leading-relaxed">
              Immersive journey through our latest production-grade breakthroughs.
              Each project represents a unique challenge solved with precision engineering.
            </p>
          </div>

          <Link href="/case-studies" className="hidden md:flex group items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-xs transition-all hover:gap-5">
            Explore All <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Vertical Stacking Cards */}
        {/* Added pb-[40vh] to ensures the last card has enough scroll room to fully overlap before the section ends */}
        <div className="flex flex-col items-center w-full pb-12 md:pb-[40vh]">
          {projects.map((project, i) => (
            <Card
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
            />
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-12 text-center md:hidden">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
            View All Case Studies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}

function Card({ project, index, total }: { project: ProjectDetail, index: number, total: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start']
  })

  // Subtle scale effect as the card enters
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1])

  // Static top offset for Full Overlap
  const topOffset = 120;

  return (
    <motion.div
      ref={containerRef}
      className="w-full sticky mb-12 md:mb-24 last:mb-0"
      style={{
        top: topOffset,
        zIndex: index + 1,
      }}
    >
      <Link href={`/case-studies/${project.slug ?? ''}`} className="block group max-w-6xl mx-auto">
        <div className="relative w-full aspect-[4/5] md:aspect-[2.4/1] bg-muted/10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:shadow-primary/20">

          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={project.images?.[0]?.url || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">

            {/* Top Row: Index & CTA (Swapped) */}
            <div className="flex justify-between items-start">
              <span className="text-6xl md:text-8xl font-black text-white/10 select-none">
                0{index + 1}
              </span>

              {/* CTA Moved to Top Right (Always Visible) */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all">
                <span className="text-[10px] font-black text-white uppercase tracking-widest hidden md:inline-block">View Case Study</span>
                <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 -rotate-45 group-hover:rotate-0 transition-transform" />
                </div>
              </div>
            </div>

            {/* Bottom Row: Title & Stack & Category */}
            <div className="space-y-6">
              <h3 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-4xl group-hover:translate-x-2 transition-transform duration-500">
                {project.title}
              </h3>

              <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/10">
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.technology?.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-xs font-bold text-white/80 px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Category Moved to Bottom Right */}
                <span className="px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-[10px] font-black text-white uppercase tracking-widest">
                  {project.category}
                </span>
              </div>
            </div>
          </div>

        </div>
      </Link>
    </motion.div>
  )
}