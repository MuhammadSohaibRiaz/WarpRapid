"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useSupabaseCMS } from "@/lib/supabase-cms"
import type { ProjectDetail } from "@/lib/supabase"

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
        setProjects((rows || []).slice(0, 4))
      })
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  if (loading || projects.length === 0) return null

  return (
    <section className="py-20 theme-bg theme-transition relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold theme-text theme-transition">Featured Work</h2>
            <p className="mt-2 text-base theme-text opacity-70 theme-transition">
              A glimpse of projects we loved building
            </p>
          </div>
          <Link href="/portfolio" className="text-primary text-sm hover:underline">
            View Full Portfolio →
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md"
            >
              <Link href={`/portfolio/${p.slug ?? ''}`} className="block">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={p.images?.[0]?.url || "/placeholder.svg?height=300&width=400&text=Project"}
                    alt={p.images?.[0]?.alt || p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      {(p.technology || []).slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-xs bg-white/20 text-white">
                          {t}
                        </span>
                      ))}
                      {p.technology && p.technology.length > 3 && (
                        <span className="px-2 py-0.5 rounded text-xs bg-white/20 text-white">+{p.technology.length - 3}</span>
                      )}
                    </div>
                    <h3 className="text-white text-lg font-semibold line-clamp-1">{p.title}</h3>
                    <p className="text-white/80 text-xs line-clamp-2">{p.description}</p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA for mobile */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/portfolio" className="inline-block text-primary text-sm hover:underline">
            View Full Portfolio →
          </Link>
        </div>
      </div>
    </section>
  )
}
