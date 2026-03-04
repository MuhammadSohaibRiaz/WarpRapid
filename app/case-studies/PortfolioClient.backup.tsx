"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Search, X, CheckCircle2, MessageSquare, Workflow, HelpCircle, ChevronRight, Layout, Zap, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useThemeContext } from "@/context/theme-context"
import type { ProjectDetail } from "@/lib/supabase"
import Image from "next/image"
import { slugify } from "@/lib/utils"
import Link from "next/link"
import { ProjectCTA } from "@/components/shared/ProjectCTA"

const categories = ["All", "Web Development", "App Development", "UI/UX Design", "E-commerce", "Enterprise Software"]

interface PortfolioClientProps {
  initialProjects?: ProjectDetail[]
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

export default function PortfolioClient({ initialProjects = [] }: PortfolioClientProps) {
  const { mode, getGradient } = useThemeContext()
  const [projects, setProjects] = useState<ProjectDetail[]>(initialProjects)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [quickViewProject, setQuickViewProject] = useState<ProjectDetail | null>(null)

  // Sorting: Featured first, then Newest Updated
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1
      if (!a.is_featured && b.is_featured) return 1
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    })
  }, [projects])

  // Filter Logic
  const filteredProjects = useMemo(() => {
    let result = sortedProjects
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
    return result
  }, [selectedCategory, searchTerm, sortedProjects])

  // Split into Featured (Top 3 of ALL featured) and Others
  const featuredWork = useMemo(() => sortedProjects.filter(p => p.is_featured).slice(0, 3), [sortedProjects])

  // Parallax Header
  const { scrollY } = useScroll()
  const yText = useTransform(scrollY, [0, 500], [0, 100])

  return (
    <div className="min-h-screen theme-bg theme-text theme-transition overflow-x-hidden selection:bg-primary/20">

      {/* 1. Global Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* 2. Conversion Hero */}
        <section className="pt-32 pb-20 border-b border-border/10">
          <motion.div style={{ y: yText }} className="max-w-5xl">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6">
              Selected <span className="opacity-20">Work</span>
            </h1>
            <p className="text-xl md:text-3xl font-light text-foreground/70 leading-relaxed max-w-3xl">
              We build production-ready products and automation systems that remove operational drag and scale with your business.
            </p>

            {/* "How to read" guide */}
            <div className="mt-12 flex flex-wrap gap-6 md:gap-12">
              {[
                { label: "The Challenge", icon: Zap, text: "Identifying fixed business friction" },
                { label: "The System", icon: Layout, text: "Custom engineering for scale" },
                { label: "The Outcome", icon: CheckCircle2, text: "Measurable technical results" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest">{item.label}</h4>
                    <p className="text-sm opacity-50">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 3. Featured Spotlight */}
        {featuredWork.length > 0 && selectedCategory === "All" && !searchTerm && (
          <section className="py-20">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Case Studies</h2>
              <div className="h-[1px] flex-grow bg-border/20 mx-8 hidden md:block" />
              <span className="text-xs font-mono opacity-40 uppercase tracking-widest">Selected Items / 03</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredWork.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onQuickView={() => setQuickViewProject(project)}
                  variant="featured"
                />
              ))}
            </div>
          </section>
        )}

        {/* 4. Filter Bar */}
        <div className="sticky top-0 z-40 py-8 theme-bg/80 backdrop-blur-xl border-b border-theme-text/10 transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
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

        {/* 5. Main Grid */}
        <section className="py-20">
          <div className="mb-12">
            <h2 className="text-2xl font-bold">{searchTerm || selectedCategory !== "All" ? 'Search Results' : 'All Work'}</h2>
          </div>
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onQuickView={() => setQuickViewProject(project)}
                />
              ))}
            </div>
          ) : (
            <div className="py-32 flex flex-col items-center justify-center text-center opacity-60">
              <h3 className="text-2xl font-bold mb-2">No projects found.</h3>
              <p className="mb-6">Adjust your filters to see more work.</p>
              <Button onClick={() => { setSearchTerm(""); setSelectedCategory("All") }} variant="outline">Clear Filters</Button>
            </div>
          )}
        </section>

        {/* 6. Engagement Model / FAQ Strip */}
        <section className="py-20 border-t border-border/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Engagement Bullets */}
            <div>
              <h2 className="text-3xl font-bold mb-8">How We Deliver Outcomes</h2>
              <div className="space-y-8">
                {[
                  { title: "Direct Collaboration", text: "You speak directly with engineers, not account managers. We move faster by removing layers.", icon: MessageSquare },
                  { title: "Production-First", text: "Every feature is built with RLS policies, proper indexing, and SEO schema from Day 1.", icon: Zap },
                  { title: "Strategic Automation", text: "We don't just build UI; we automate the operational drag behind the scenes.", icon: Workflow }
                ].map((item, i) => (
                  <motion.div key={i} className="flex gap-6" {...fadeUp(i * 0.1)}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                      <p className="theme-text opacity-60 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Common Questions</h2>
              <div className="space-y-4">
                {[
                  { q: "How long does a typical project take?", a: "Most MVP-level systems are delivered in 6-12 weeks, while smaller automation tasks can take 2-4 weeks." },
                  { q: "What is your tech stack focus?", a: "We specialize in the T3 Stack (Next.js, TypeScript, Supabase) and React Native for mobile, ensuring 100% interoperability." },
                  { q: "Do you offer post-launch support?", a: "Yes. Every project includes a 30-day stability guarantee and optional monthly maintenance for scaling." }
                ].map((item, i) => (
                  <details key={i} className="group border border-border/10 rounded-2xl overflow-hidden hover:bg-theme-text/5 transition-colors">
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold">
                      <span className="flex items-center gap-3"><HelpCircle className="w-4 h-4 text-primary" /> {item.q}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="px-5 pb-5 theme-text opacity-60 text-sm leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. CTA Section */}
        <div className="py-20">
          <ProjectCTA title="Want Results Like These?" description="Let's build a system that works as hard as you do." />
        </div>

      </div>

      {/* Quick View Drawer */}
      <AnimatePresence>
        {quickViewProject && (
          <QuickViewDrawer
            project={quickViewProject}
            onClose={() => setQuickViewProject(null)}
            getGradient={getGradient}
          />
        )}
      </AnimatePresence>

    </div>
  )
}

function ProjectCard({ project, index, onQuickView, variant = "grid" }: {
  project: ProjectDetail,
  index: number,
  onQuickView: () => void,
  variant?: "grid" | "featured"
}) {
  const isFeatured = variant === "featured"

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      className={`group flex flex-col relative h-full ${isFeatured
        ? 'md:bg-theme-text/[0.03] md:p-8 md:rounded-[2.5rem] md:hover:bg-theme-text/[0.06] border border-transparent md:hover:border-primary/20 transition-all duration-500'
        : 'p-2'
        }`}
    >
      {/* 1. Image Area */}
      <Link href={`/case-studies/${project.slug || slugify(project.title)}`} className="block w-full mb-8">
        <div className="relative aspect-video overflow-hidden rounded-[2rem] border border-border/50 bg-muted/5 shadow-sm group-hover:shadow-2xl transition-all duration-700">
          <Image
            src={project.images[0]?.url || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index < 4}
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
            <button
              onClick={(e) => { e.preventDefault(); onQuickView(); }}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform"
            >
              <Eye className="w-6 h-6 text-black" />
            </button>
          </div>

          <div className="absolute top-6 left-6 z-20">
            <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl text-[10px] font-bold text-white uppercase tracking-wider">
              {project.category}
            </span>
          </div>
        </div>
      </Link>

      {/* 2. Content Area */}
      <div className="flex flex-col flex-grow space-y-6">
        {/* Title - Fixed height to keep cards aligned */}
        <div className="min-h-[5rem] flex flex-col justify-start">
          <h3 className={`${isFeatured ? 'text-2xl md:text-3xl' : 'text-2xl'} font-black tracking-tighter leading-tight group-hover:text-primary transition-colors`}>
            {project.title}
          </h3>
        </div>

        {/* Transformation - Redesigned to handle long text */}
        {!!(project.before_items?.length || project.after_items?.length) && (
          <div className="grid grid-cols-1 gap-2 py-4 border-y border-border/5 text-[10px] font-mono uppercase tracking-widest">
            <div className="flex items-start gap-2 opacity-60">
              <span className="italic shrink-0">Before:</span>
              <span className="line-through line-clamp-2">{project.before_items?.[0] || 'Manual Process'}</span>
            </div>
            <div className="flex items-start gap-2 font-bold text-primary">
              <span className="italic shrink-0 opacity-40">After:</span>
              <span className="line-clamp-2">{project.after_items?.[0] || 'Automated System'}</span>
            </div>
          </div>
        )}

        {/* Story Snippets */}
        <div className="space-y-6 flex-grow">
          <div className="min-h-[4rem]">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">The friction</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3 italic">
              "{project.challenge || project.description}"
            </p>
          </div>

          <div className="min-h-[3rem] flex flex-wrap gap-2 content-start">
            {project.results?.slice(0, 3).map((res, i) => (
              <span key={i} className="px-3 py-1 bg-primary/5 rounded-full font-mono text-[9px] uppercase tracking-tighter text-primary/80 border border-primary/10">
                • {res}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-border/10">
          <span className="text-xs font-mono theme-text/40">{project.duration}</span>
          <Link href={`/case-studies/${project.slug || slugify(project.title)}`} className="text-[10px] font-bold theme-text/40 group-hover:theme-text/80 transition-colors uppercase tracking-widest flex items-center gap-2">
            Case Details <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

function QuickViewDrawer({ project, onClose, getGradient }: { project: ProjectDetail, onClose: () => void, getGradient: any }) {
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-xl h-full theme-bg shadow-2xl overflow-y-auto"
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 rounded-full bg-border/20 theme-text hover:bg-border/40 transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-64 w-full">
          <Image src={project.images[0]?.url || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-transparent to-transparent" />
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">{project.category}</span>
            <h2 className="text-3xl font-black tracking-tight leading-tight">{project.title}</h2>
            <p className="theme-text opacity-60 text-sm">{project.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 py-6 border-y border-border/10">
            <div className="text-center">
              <span className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Duration</span>
              <span className="font-mono text-sm">{project.duration || 'N/A'}</span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Team</span>
              <span className="font-mono text-sm">{project.team_size} Experts</span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] uppercase tracking-widest opacity-40 mb-1">Scale</span>
              <span className="font-mono text-sm">{project.client_type || 'Custom'}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3">
                <Zap className="w-4 h-4 text-primary" /> The challenge
              </h4>
              <p className="text-sm theme-text opacity-70 leading-relaxed italic border-l-2 border-primary/20 pl-4">
                {project.challenge}
              </p>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3">
                <Layout className="w-4 h-4 text-primary" /> What We Built
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.features?.map((f, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-theme-text/5 text-xs theme-text">{f}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Technical Outcomes
              </h4>
              <div className="space-y-2">
                {project.results?.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs theme-text opacity-70">
                    <div className="mt-1 w-1 h-1 rounded-full bg-primary" />
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-10 flex flex-col sm:flex-row gap-4">
            <Link href={`/case-studies/${project.slug || slugify(project.title)}`} className="flex-grow">
              <Button className="w-full h-14 rounded-2xl bg-primary text-white font-bold">Read Full Case Study</Button>
            </Link>
            <Link href="/contact" className="flex-grow">
              <Button variant="outline" className="w-full h-14 rounded-2xl font-bold">Book Strategy Call</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
