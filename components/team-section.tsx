"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useThemeContext } from "@/context/theme-context"

interface TeamMember {
    name: string
    title: string
    image: string
    bio?: string
}

const teamMembers: TeamMember[] = [
    {
        name: "Muhammad Sohaib Riaz",
        title: "Founder & CEO",
        image: "/muhammad-sohaib-riaz.jpg",
    },
    {
        name: "Sohail Riaz",
        title: "Chief Technology Advisor",
        image: "/sohail-riaz.jpg",
    },
    {
        name: "Jehanzaib Javed",
        title: "Lead Full Stack Engineer",
        image: "/jehanzaib-javed.jpg",
    },
]

export function TeamSection() {
    const { mode, color } = useThemeContext()
    const cardBg = mode === "dark" || color === "black" ? "bg-gray-900/40 border-white/10" : "bg-white/60 border-white/20"

    return (
        <section className="container mx-auto px-6 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-3">
                    Meet Our Leading Team
                </h2>
                <p className="theme-text opacity-70 max-w-2xl mx-auto theme-transition">
                    The talented individuals driving innovation and excellence at RapidNexTech
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`rounded-2xl border ${cardBg} backdrop-blur-md overflow-hidden group hover:shadow-xl transition-all duration-300`}
                    >
                        <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-bold theme-text theme-transition mb-1">
                                {member.name}
                            </h3>
                            <p className="text-primary font-medium text-sm mb-3">
                                {member.title}
                            </p>
                            {member.bio && (
                                <p className="theme-text opacity-70 text-sm leading-relaxed theme-transition">
                                    {member.bio}
                                </p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
