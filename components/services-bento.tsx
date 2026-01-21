"use client"

import { motion } from "framer-motion"
import { BentoGrid, BentoCard } from "./bento-grid"
import { Monitor, Smartphone, Cloud, PenTool, Database, ShoppingBag, Brain, Cpu, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"
import { TiltButton } from "./tilt-button"

const services = [
    {
        title: "Web Development",
        description: "High-performance web applications built with Next.js and React.",
        icon: Monitor,
        span: "2x1",
        color: "from-blue-500/20 to-cyan-500/20",
        border: "group-hover:border-blue-500/50",
        iconColor: "text-blue-500",
    },
    {
        title: "AI & Machine Learning",
        description: "Intelligent solutions that automate workflow and provide actionable insights.",
        icon: Brain,
        span: "2x2",
        color: "from-green-500/20 to-emerald-500/20",
        border: "group-hover:border-emerald-500/50",
        iconColor: "text-emerald-500",
    },
    {
        title: "Mobile Apps",
        description: "Native and cross-platform mobile experiences.",
        icon: Smartphone,
        span: "1x1",
        color: "from-purple-500/20 to-pink-500/20",
        border: "group-hover:border-purple-500/50",
        iconColor: "text-purple-500",
    },
    {
        title: "Cloud Solutions",
        description: "Scalable infrastructure on AWS, Azure, and Google Cloud.",
        icon: Cloud,
        span: "1x1",
        color: "from-emerald-500/20 to-teal-500/20",
        border: "group-hover:border-teal-500/50",
        iconColor: "text-teal-500",
    },
    {
        title: "UI/UX Design",
        description: "User-centric interfaces that convert.",
        icon: PenTool,
        span: "1x1",
        color: "from-orange-500/20 to-amber-500/20",
        border: "group-hover:border-orange-500/50",
        iconColor: "text-orange-500",
    },
    {
        title: "DevOps",
        description: "CI/CD pipelines and automated deployment.",
        icon: Database,
        span: "1x1",
        color: "from-indigo-500/20 to-purple-500/20",
        border: "group-hover:border-indigo-500/50",
        iconColor: "text-indigo-500",
    },
    {
        title: "Data Analytics",
        description: "Turn your data into strategic assets.",
        icon: BarChart3,
        span: "2x1",
        color: "from-cyan-500/20 to-blue-500/20",
        border: "group-hover:border-cyan-500/50",
        iconColor: "text-cyan-500",
    },
    {
        title: "Blockchain",
        description: "Secure decentralized applications.",
        icon: Cpu,
        span: "1x1",
        color: "from-violet-500/20 to-purple-500/20",
        border: "group-hover:border-violet-500/50",
        iconColor: "text-violet-500",
    },
    {
        title: "E-commerce",
        description: "Custom online stores that drive sales.",
        icon: ShoppingBag,
        span: "1x1",
        color: "from-rose-500/20 to-red-500/20",
        border: "group-hover:border-rose-500/50",
        iconColor: "text-rose-500",
    },
] as const

export function ServicesBento() {
    return (
        <section className="py-24 relative overflow-hidden theme-bg theme-transition">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent theme-gradient-text mb-6">
                        Our Expertise
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Comprehensive software solutions tailored to your business needs, built with cutting-edge technology.
                    </p>
                </motion.div>

                <BentoGrid>
                    {services.map((service, index) => (
                        <BentoCard
                            key={service.title}
                            span={service.span}
                            className={`bg-gradient-to-br ${service.color} backdrop-blur-xl border-border/10 ${service.border} transition-colors duration-500`}
                        >
                            <div className="h-full flex flex-col justify-between">
                                <div className="mb-4">
                                    <div className={`p-3 rounded-xl bg-background/50 w-fit mb-4 ${service.iconColor}`}>
                                        <service.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 theme-text">{service.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>

                                {service.span === "2x2" && (
                                    <div className="mt-4">
                                        <div className="flex flex-wrap gap-2">
                                            {["TensorFlow", "PyTorch", "OpenAI", "LangChain"].map((tag) => (
                                                <span key={tag} className="px-2 py-1 rounded-md bg-background/30 text-xs font-mono text-muted-foreground">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </BentoCard>
                    ))}

                    {/* CTA Card */}
                    <BentoCard span="1x1" className="bg-gradient-to-br from-primary via-purple-500 to-pink-500 text-white flex flex-col justify-center items-center text-center p-8">
                        <h3 className="text-2xl font-bold mb-4">Ready to start?</h3>
                        <Link href="/contact" className="w-full">
                            <TiltButton className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white py-3 px-6 font-semibold hover:bg-white/30 flex items-center justify-center gap-2">
                                Get in Touch <ArrowRight className="w-4 h-4" />
                            </TiltButton>
                        </Link>
                    </BentoCard>
                </BentoGrid>
            </div>
        </section>
    )
}
