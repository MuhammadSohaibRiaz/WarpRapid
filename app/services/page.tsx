"use client"

import { motion, useScroll } from "framer-motion"
import { servicesData, serviceCategories } from "@/lib/services-data"
import Link from "next/link"
import { MeshGradient } from "@/components/mesh-gradient"
import { ParticleBackground } from "@/components/particle-background"
import { ArrowRight, ChevronRight, Zap } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { GlobalChronometer } from "@/components/services/global-chronometer"

export default function ServicesPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    // Global scroll tracking for the whole services section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Detect active category index based on scroll progress
    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            const index = Math.min(
                Math.floor(latest * serviceCategories.length),
                serviceCategories.length - 1
            )
            if (index !== activeIndex && index >= 0) {
                setActiveIndex(index)
            }
        })
    }, [scrollYProgress, activeIndex])

    const activeCategory = serviceCategories[activeIndex]
    const activeFirstService = servicesData[activeCategory.services[0]]
    const activeIcon = activeFirstService?.icon || Zap

    return (
        <div className="min-h-screen bg-transparent theme-text selection:bg-primary/20 relative">

            {/* Header / Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <MeshGradient />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
                    <ParticleBackground particleCount={20} />
                </div>

                <div className="container relative z-10 mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-sm font-bold theme-text uppercase tracking-wider">Our Solutions</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black theme-text tracking-tight leading-[1.1]">
                            Engineering the Future of <span className="bg-clip-text text-transparent theme-gradient-text">Your Business</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            From initial strategy to rapid MVP launch and enterprise scale — we build software that drives real world results.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Services Container with Unified Sidebar */}
            <div ref={containerRef} className="container mx-auto px-6 relative">
                <div className="lg:grid lg:grid-cols-[360px_1fr] lg:gap-20">

                    {/* Unified Sticky Sidebar (Desktop Only) */}
                    {/* The width is handled inside the component with aside tag */}
                    <GlobalChronometer
                        activeCategory={{
                            title: activeCategory.title,
                            description: activeCategory.description,
                            icon: activeIcon
                        }}
                        index={activeIndex}
                        totalCategories={serviceCategories.length}
                        globalTargetRef={containerRef}
                    />

                    {/* Content Area */}
                    <div className="py-24 space-y-32 flex-1 min-w-0">
                        {serviceCategories.map((category, catIndex) => (
                            <div key={category.title} className="space-y-12">
                                {/* Category Header (Always visible for mobile, desktop context) */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Pillar 0{catIndex + 1}</span>
                                        <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                                    </div>
                                    <h2 className="text-3xl md:text-6xl font-black theme-text tracking-tighter">
                                        {category.title}
                                    </h2>
                                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                                        {category.description}
                                    </p>
                                </motion.div>

                                {/* Bento Grid for Services */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {category.services.map((slug: string, serviceIndex: number) => {
                                        const service = servicesData[slug];
                                        if (!service) return null;
                                        const SIcon = service.icon;

                                        // Wide first card within each pillar
                                        const isWide = serviceIndex === 0;

                                        return (
                                            <motion.div
                                                key={slug}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: serviceIndex * 0.1 }}
                                                className={`${isWide ? 'md:col-span-2' : 'md:col-span-1'} group relative h-full`}
                                            >
                                                <Link href={`/services/${slug}`} className="block h-full">
                                                    <div className="h-full p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-muted/50 to-muted/20 border border-border/50 backdrop-blur-md transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 group-hover:-translate-y-2 flex flex-col justify-between overflow-hidden">

                                                        {/* Background Accent */}
                                                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />

                                                        <div className="relative z-10 space-y-8">
                                                            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                                                <SIcon className="w-8 h-8" />
                                                            </div>

                                                            <div className="space-y-4">
                                                                <h3 className="text-2xl md:text-4xl font-black theme-text tracking-tight group-hover:text-primary transition-colors">
                                                                    {service.title}
                                                                </h3>
                                                                <p className="text-lg text-muted-foreground leading-relaxed">
                                                                    {service.subtitle}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="relative z-10 mt-12 pt-8 border-t border-border/40 flex items-center justify-between">
                                                            <span className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-3 group-hover:gap-5 transition-all">
                                                                Deep Dive <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                                            </span>
                                                            <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-lg group-hover:shadow-primary/20">
                                                                <ChevronRight className="w-6 h-6" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Final CTA Section */}
            <section className="py-16 md:py-20 relative overflow-hidden theme-bg border-t border-border/10">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-16 rounded-3xl md:rounded-[4rem] bg-gradient-to-br from-primary via-purple-600 to-pink-600 text-white relative overflow-hidden shadow-2xl shadow-primary/30 text-center"
                    >
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/10 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2" />

                        <div className="relative z-10 space-y-8 md:space-y-10 max-w-4xl mx-auto">
                            <div className="space-y-4 md:space-y-6">
                                <h2 className="text-3xl md:text-6xl font-black leading-none tracking-tighter">
                                    Create something <span className="italic">legendary</span>.
                                </h2>
                                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium">
                                    Join forces with RapidNexTech to engineer scalable software solutions that don't just work — they dominate.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                                <Link href="/contact" className="w-full sm:w-auto">
                                    <button className="w-full sm:w-auto h-16 md:h-16 px-8 md:px-10 rounded-full bg-white text-primary text-xl md:text-xl font-black shadow-[0_20px_50px_rgba(255,255,255,0.2)] transition-all hover:scale-105 active:scale-95">
                                        Let's Talk Business
                                    </button>
                                </Link>
                                <Link href="/case-studies" className="w-full sm:w-auto">
                                    <button className="w-full sm:w-auto h-16 md:h-16 px-8 md:px-10 rounded-full bg-transparent border-2 border-white/40 text-white text-xl md:text-xl font-black backdrop-blur-xl transition-all hover:bg-white/10">
                                        Explore Success Stories
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
