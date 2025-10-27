"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Building, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageCarousel } from "@/components/image-carousel"
import { useThemeContext } from "@/context/theme-context"
import type { ProjectDetail } from "@/lib/supabase"

export default function ProjectDetailClient({ project }: { project: ProjectDetail }) {
  const { mode, color } = useThemeContext()

  const classes = useMemo(() => {
    const card = mode === "dark" || color === "black" ? "bg-gray-900/90 border border-gray-700/50" : "bg-white/95 border border-gray-200/50"
    const text = mode === "dark" || color === "black" ? "text-white" : "text-gray-900"
    const secondary = mode === "dark" || color === "black" ? "text-gray-200" : "text-gray-700"
    const muted = mode === "dark" || color === "black" ? "text-gray-300" : "text-gray-600"
    return { card, text, secondary, muted }
  }, [mode, color])

  const hasContent = (content: any): boolean => {
    if (!content) return false
    if (Array.isArray(content)) return content.length > 0 && content.some((item) => item && item.trim && item.trim() !== "")
    if (typeof content === "string") return content.trim() !== ""
    return true
  }

  return (
    <div className="min-h-screen theme-bg theme-transition relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <motion.div
          className="absolute inset-0 theme-glow blur-3xl theme-transition opacity-20"
          animate={{ x: ["0%", "100%", "0%"], y: ["0%", "50%", "0%"] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-12 relative z-10">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-6 md:mb-8 -ml-2 md:ml-0">
<Link href="/case-studies">
            <Button variant="ghost" className={`theme-text ${classes.text} hover:bg-primary/20 theme-transition`}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Case Studies
            </Button>
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium shadow-lg">{project.category}</span>
            {project.technology.slice(0, 3).map((tech) => (
              <span key={tech} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg">
                {tech}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-6">{project.title}</h1>
          <p className={`text-xl ${classes.secondary} max-w-3xl theme-transition leading-relaxed`}>{project.long_description || project.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <ImageCarousel images={project.images} projectTitle={project.title} />
            </motion.div>

            {(hasContent(project.challenge) || hasContent(project.solution)) && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className={`${classes.card} backdrop-blur-md rounded-lg p-8 shadow-xl theme-transition`}>
                <h2 className={`text-2xl font-bold ${classes.text} mb-6 theme-transition`}>Project Overview</h2>
                <div className="space-y-6">
                  {hasContent(project.challenge) && (
                    <div>
                      <h3 className={`text-lg font-semibold ${classes.text} mb-3 theme-transition`}>Challenge</h3>
                      <p className={`${classes.secondary} theme-transition leading-relaxed`}>{project.challenge}</p>
                    </div>
                  )}
                  {hasContent(project.solution) && (
                    <div>
                      <h3 className={`text-lg font-semibold ${classes.text} mb-3 theme-transition`}>Solution</h3>
                      <p className={`${classes.secondary} theme-transition leading-relaxed`}>{project.solution}</p>
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {hasContent(project.features) && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className={`${classes.card} backdrop-blur-md rounded-lg p-8 shadow-xl theme-transition`}>
                <h2 className={`text-2xl font-bold ${classes.text} mb-6 theme-transition`}>Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.filter((f) => f && f.trim() !== "").map((f, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className={`${classes.text} theme-transition`}>{f}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {hasContent(project.results) && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className={`${classes.card} backdrop-blur-md rounded-lg p-8 shadow-xl theme-transition`}>
                <h2 className={`text-2xl font-bold ${classes.text} mb-6 theme-transition`}>Results & Impact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.results.filter((r) => r && r.trim() !== "").map((r, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }} className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 shadow-lg">
                      <div className="text-3xl font-bold text-primary mb-2">{r.match(/\d+%?/)?.[0] || "✓"}</div>
                      <p className={`${classes.secondary} text-sm theme-transition font-medium`}>{r.replace(/\d+%?\s*/, "")}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className={`${classes.card} backdrop-blur-md rounded-lg p-8 shadow-xl theme-transition`}>
              <h2 className={`text-2xl font-bold ${classes.text} mb-6 theme-transition`}>Technology Stack</h2>
              <div className="flex flex-wrap gap-3">
                {project.technology.map((tech, i) => (
                  <motion.span key={tech} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }} className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-shadow">
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className={`${classes.card} backdrop-blur-md rounded-lg p-6 shadow-xl theme-transition`}>
              <h3 className={`text-xl font-bold ${classes.text} mb-4 theme-transition`}>Project Details</h3>
              <div className="space-y-4">
                {hasContent(project.duration) && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <div className={`text-sm ${classes.muted} theme-transition`}>Duration</div>
                      <div className={`font-semibold ${classes.text} theme-transition text-lg`}>{project.duration}</div>
                    </div>
                  </div>
                )}
                {project.team_size && (
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <div className={`text-sm ${classes.muted} theme-transition`}>Team Size</div>
                      <div className={`font-semibold ${classes.text} theme-transition text-lg`}>{project.team_size} members</div>
                    </div>
                  </div>
                )}
                {hasContent(project.client_type) && (
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-primary" />
                    <div>
                      <div className={`text-sm ${classes.muted} theme-transition`}>Client Type</div>
                      <div className={`font-semibold ${classes.text} theme-transition text-lg`}>{project.client_type}</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="space-y-3">
              {hasContent(project.live_url) && (
                <Button asChild className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <a href={project.live_url!} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" /> View Live Project
                  </a>
                </Button>
              )}
              {hasContent(project.github_url) && (
                <Button asChild className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <a href={project.github_url!} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" /> View Source Code
                  </a>
                </Button>
              )}
              <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact">
                  <MessageCircle className="w-4 h-4 mr-2" /> Discuss Your Project
                </Link>
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className={`${classes.card} backdrop-blur-md rounded-lg p-6 shadow-xl theme-transition`}>
              <h3 className={`text-xl font-bold ${classes.text} mb-4 theme-transition`}>Ready to Start Your Project?</h3>
              <p className={`text-sm ${classes.muted} mb-4 theme-transition leading-relaxed`}>Let's discuss how we can help bring your unique vision to life with our expertise and dedication to excellence.</p>
              <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact">Get a Free Consultation</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
