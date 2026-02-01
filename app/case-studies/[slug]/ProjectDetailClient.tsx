"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
    ArrowLeft, ExternalLink, ArrowRight, X, ChevronLeft, ChevronRight,
    Maximize2, CheckCircle2, MinusCircle, PlusCircle, Building2, TrendingUp, Cpu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useThemeContext } from "@/context/theme-context"
import type { ProjectDetail } from "@/lib/supabase"

export default function ProjectDetailClient({ project }: { project: ProjectDetail }) {
    const { mode, color } = useThemeContext()
    const isDark = mode === "dark" || color === "black"

    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)

    const hasBeforeAfter = (project.before_items?.length > 0) || (project.after_items?.length > 0)
    const rawResults = project.results || []
    const validResults = rawResults.filter(r => r && r.trim().length > 0)
    const rawFeatures = project.features || []
    const validFeatures = rawFeatures.filter(f => f && f.trim().length > 0)
    const techStack = project.technology || []

    const openLightbox = (index: number) => {
        setLightboxIndex(index)
        setLightboxOpen(true)
    }

    const closeLightbox = () => setLightboxOpen(false)
    const goToNext = () => setLightboxIndex((prev) => (prev + 1) % project.images.length)
    const goToPrev = () => setLightboxIndex((prev) => (prev - 1 + project.images.length) % project.images.length)

    return (
        <div className="min-h-screen theme-bg theme-transition selection:bg-primary/30 font-sans">
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-15 ${isDark ? 'bg-primary' : 'bg-primary/30'}`} />
                <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-15 ${isDark ? 'bg-blue-600' : 'bg-blue-400/30'}`} />
            </div>

            <div className="relative z-10">
                <div className="container mx-auto px-4 pt-8 pb-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 relative">
                        <div className="space-y-4">
                            <Link href="/case-studies" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all group border border-border/50">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
                            </Link>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 self-start">
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20">
                                {project.category}
                            </span>
                            {project.client_type && (
                                <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-semibold uppercase tracking-widest border border-border/50">
                                    {project.client_type}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <section className="container mx-auto px-4 py-8 mb-24 relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        <div className="lg:col-span-7 space-y-6">
                            <div className="space-y-6">
                                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight theme-text leading-[1.05]">
                                    {project.title}
                                </h1>
                            </div>
                        </div>

                        <div className="lg:col-span-5 space-y-6">
                            <div className="relative h-0">
                                <div className="absolute bottom-4 right-0 flex justify-end w-full">
                                    <button
                                        onClick={() => {
                                            document.getElementById('interface-design')?.scrollIntoView({ behavior: 'smooth' });
                                            setTimeout(() => openLightbox(0), 400);
                                        }}
                                        className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-xs font-bold flex items-center gap-2 transition-all border border-primary/20 group shadow-sm hover:shadow-md whitespace-nowrap"
                                    >
                                        <Maximize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" /> View Gallery
                                    </button>
                                </div>
                            </div>
                            <div className={`p-6 rounded-[2rem] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white shadow-xl border-black/5'} backdrop-blur-md relative overflow-hidden group`}>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors" />
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> The Objective
                                    </div>
                                    <div className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                                        {project.business_outcome || project.description}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Button asChild size="lg" className="rounded-full px-8 h-14 text-base font-bold shadow-xl shadow-primary/20 group">
                                    <Link href="/contact">
                                        Book a Strategy Call <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                                {project.live_url && (
                                    <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-base font-bold bg-white/5 backdrop-blur-md">
                                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                            View Live System <ExternalLink className="w-4 h-4 ml-2" />
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 border-y border-border/50 bg-muted/20 backdrop-blur-sm">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                            <div className="md:col-span-4 space-y-4">
                                <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase">
                                    <Building2 className="w-4 h-4" /> The Partnership
                                </div>
                                <h2 className="text-3xl font-black theme-text">Client Context</h2>
                            </div>
                            <div className="md:col-span-8 space-y-8">
                                <p className={`text-lg md:text-xl leading-relaxed ${isDark ? 'text-blue-100/90' : 'text-muted-foreground'}`}>
                                    {project.client_description || "We partnered with this client to modernize their operations and improve scalability."}
                                </p>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                                    <div>
                                        <div className={`text-xs uppercase font-bold tracking-widest mb-1 ${isDark ? 'text-blue-200/70' : 'text-muted-foreground'}`}>Timeline</div>
                                        <div className="font-semibold theme-text">{project.duration || "N/A"}</div>
                                    </div>
                                    <div>
                                        <div className={`text-xs uppercase font-bold tracking-widest mb-1 ${isDark ? 'text-blue-200/70' : 'text-muted-foreground'}`}>Team</div>
                                        <div className="font-semibold theme-text">{project.team_size} Specialists</div>
                                    </div>
                                    <div
                                        onClick={() => document.getElementById('core-technologies')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                                        className="cursor-pointer group transition-all hover:scale-105"
                                    >
                                        <div className={`text-xs uppercase font-bold tracking-widest mb-1 ${isDark ? 'text-blue-200/70' : 'text-muted-foreground'} group-hover:text-primary transition-colors`}>Tech</div>
                                        <div className="font-semibold theme-text group-hover:text-primary transition-colors">{techStack.length} Technologies</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-black theme-text">The Business Challenge</h2>
                        <p className={`text-xl leading-relaxed ${isDark ? 'text-blue-100/80' : 'text-muted-foreground'}`}>
                            {project.challenge || "The client faced scalability issues and operational bottlenecks that hindered growth."}
                        </p>
                    </div>
                </section>

                {hasBeforeAfter && (
                    <section className="py-12 container mx-auto px-4 mb-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                            <div className="p-8 rounded-3xl bg-red-500/[0.03] border border-red-500/10 space-y-6">
                                <div className="flex items-center gap-3 text-red-500 mb-4">
                                    <MinusCircle className="w-6 h-6" />
                                    <h3 className="text-2xl font-bold">The Bottlenecks (Before)</h3>
                                </div>
                                <ul className="space-y-4">
                                    {project.before_items?.length ? project.before_items.map((item, i) => (
                                        <li key={i} className={`flex gap-3 text-lg ${isDark ? 'text-red-200/90' : 'text-muted-foreground'}`}>
                                            <X className="w-5 h-5 text-red-500/50 flex-shrink-0 mt-1" />
                                            <span>{item}</span>
                                        </li>
                                    )) : (
                                        <li className="text-muted-foreground italic">Legacy systems and manual processes.</li>
                                    )}
                                </ul>
                            </div>

                            <div className="p-8 rounded-3xl bg-green-500/[0.03] border border-green-500/10 space-y-6">
                                <div className="flex items-center gap-3 text-green-500 mb-4">
                                    <PlusCircle className="w-6 h-6" />
                                    <h3 className="text-2xl font-bold">The Solution (After)</h3>
                                </div>
                                <ul className="space-y-4">
                                    {project.after_items?.length ? project.after_items.map((item, i) => (
                                        <li key={i} className="flex gap-3 text-lg text-muted-foreground">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="font-medium theme-text">{item}</span>
                                        </li>
                                    )) : (
                                        <li className="text-muted-foreground italic">Automated, scalable, and efficient architecture.</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </section>
                )}

                <section className="py-24 bg-muted/20">
                    <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase">
                                <Cpu className="w-4 h-4" /> Strategic Approach
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black theme-text">Engineering the Solution</h2>
                            <p className={`text-lg leading-relaxed ${isDark ? 'text-blue-100/80' : 'text-muted-foreground'}`}>
                                {project.solution || "We implemented a microservices architecture to ensure high availability and independent scaling of core components."}
                            </p>

                            <div className="pt-6" id="core-technologies">
                                <h4 className="text-sm font-bold theme-text mb-4">Core Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {techStack.map((tech) => (
                                        <div key={tech} className={`px-3 py-1.5 rounded-md border text-xs font-semibold ${isDark ? 'bg-white/10 text-white border-white/20' : 'bg-background theme-text border-border'}`}>
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[400px] rounded-3xl overflow-hidden bg-background border border-border/50 shadow-xl">
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                                <Cpu className="w-32 h-32" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                        </div>
                    </div>
                </section>

                {validResults.length > 0 && (
                    <section className="py-24 container mx-auto px-4">
                        <div className="max-w-3xl mb-12">
                            <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase mb-4">
                                <TrendingUp className="w-4 h-4" /> Key Metrics
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black theme-text">Performance Outcomes</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {validResults.map((result, i) => {
                                const match = result.match(/(\d+[%\w]*)/)
                                const metric = match ? match[0] : ""
                                const text = metric ? result.replace(metric, "").trim() : result

                                return (
                                    <div key={i} className={`p-8 rounded-[2rem] space-y-2 border border-border/50 ${i === 0 ? 'md:col-span-2 bg-primary text-primary-foreground' : 'bg-muted/10'}`}>
                                        {metric && <div className={`text-5xl md:text-6xl font-black tracking-tighter ${i === 0 ? 'text-white' : (isDark ? 'text-white' : 'text-primary')}`}>{metric}</div>}
                                        <div className={`text-lg font-medium leading-tight ${i === 0 ? 'text-white/80' : (isDark ? 'text-blue-100/70' : 'text-muted-foreground')}`}>{text}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                )}

                {validFeatures.length > 0 && (
                    <section className="py-24 border-t border-border/50 bg-muted/5">
                        <div className="container mx-auto px-4">
                            <div className="max-w-3xl mb-12">
                                <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase mb-4">
                                    <CheckCircle2 className="w-4 h-4" /> Core Deliverables
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black theme-text">Key Features</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {validFeatures.map((feature, i) => (
                                    <div key={i} className={`p-8 rounded-3xl border border-border/50 bg-background shadow-sm hover:shadow-md transition-shadow group`}>
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-bold theme-text mb-2">{feature}</h3>
                                        <div className="h-1 w-12 bg-primary/20 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section id="interface-design" className="py-24 border-t border-border/50">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-end mb-12">
                            <h2 className="text-3xl font-black theme-text">Interface Design</h2>
                            <button
                                onClick={() => openLightbox(0)}
                                className="hidden md:flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-bold uppercase tracking-wider transition-colors group"
                            >
                                <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" /> Click to visualize
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {project.images.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => openLightbox(i)}
                                    className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-muted border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.alt || "Screenshot"}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 container mx-auto px-4">
                    <div className={`rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden ${isDark ? 'bg-muted/20 border-white/5' : 'bg-white shadow-2xl border-black/5'} border`}>
                        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                            <h2 className="text-4xl md:text-6xl font-black theme-text tracking-tight">Ready to Build Something Similar?</h2>
                            <p className={`text-xl ${isDark ? 'text-blue-100/80' : 'text-muted-foreground'}`}>
                                Let's design a scalable solution tailored specifically to your business goals. No sales pitch, just strategy.
                            </p>
                            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="h-16 px-10 rounded-full text-lg font-bold shadow-xl shadow-primary/20">
                                    <Link href="/contact">Book a Free Strategy Call</Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="h-16 px-10 rounded-full text-lg font-bold bg-transparent">
                                    <Link href="/case-studies">View More Work</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
                    </div>
                </section>

                <div className="h-24" />
            </div>

            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 overflow-hidden"
                        onClick={closeLightbox}
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-200 transition-all z-[10000] border border-black/10 shadow-2xl"
                        >
                            <X className="w-6 h-6 stroke-[3]" />
                        </button>
                        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-[10001]">
                            <button onClick={(e) => { e.stopPropagation(); goToPrev(); }} className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-all pointer-events-auto border border-white/10 shadow-xl">
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-all pointer-events-auto border border-white/10 shadow-xl">
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </div>
                        <motion.div
                            key={lightboxIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative max-w-7xl max-h-full flex items-center justify-center cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={project.images[lightboxIndex]?.url}
                                alt={project.images[lightboxIndex]?.alt || project.title}
                                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
