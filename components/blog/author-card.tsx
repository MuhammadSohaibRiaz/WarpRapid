"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Twitter, Linkedin, Github, Globe, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export interface AuthorData {
    name: string
    role: string
    bio: string
    avatar: string
    social?: {
        twitter?: string
        linkedin?: string
        github?: string
        website?: string
        email?: string
    }
}

interface AuthorCardProps {
    author: AuthorData
    className?: string
}

export function AuthorCard({ author, className }: AuthorCardProps) {
    const socialLinks = [
        {
            name: "Twitter",
            icon: Twitter,
            url: author.social?.twitter,
            color: "hover:text-[#1DA1F2]",
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: author.social?.linkedin,
            color: "hover:text-[#0A66C2]",
        },
        {
            name: "GitHub",
            icon: Github,
            url: author.social?.github,
            color: "hover:text-gray-900 dark:hover:text-white",
        },
        {
            name: "Website",
            icon: Globe,
            url: author.social?.website,
            color: "hover:text-primary",
        },
        {
            name: "Email",
            icon: Mail,
            url: author.social?.email ? `mailto:${author.social.email}` : undefined,
            color: "hover:text-primary",
        },
    ].filter((link) => link.url)

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn(
                "relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-xl shadow-2xl",
                className
            )}
        >
            {/* Decorative Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />

            {/* Animated Glow Effect */}
            <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="relative p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Avatar */}
                    <motion.div
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="relative flex-shrink-0"
                    >
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-background shadow-2xl">
                            <Image
                                src={author.avatar}
                                alt={author.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 128px, 160px"
                            />
                        </div>

                        {/* Decorative Ring */}
                        <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/30 to-purple-500/30 blur-xl -z-10" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                        {/* Header */}
                        <div>
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl md:text-3xl font-black theme-text mb-2 leading-tight"
                            >
                                {author.name}
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="text-base md:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
                            >
                                {author.role}
                            </motion.p>
                        </div>

                        {/* Bio */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-muted-foreground leading-relaxed text-base md:text-lg"
                        >
                            {author.bio}
                        </motion.p>

                        {/* Social Links */}
                        {socialLinks.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center gap-3 pt-2"
                            >
                                <span className="text-sm font-semibold text-muted-foreground">
                                    Connect:
                                </span>
                                <div className="flex items-center gap-2">
                                    {socialLinks.map((link, index) => {
                                        const Icon = link.icon
                                        return (
                                            <motion.div
                                                key={link.name}
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.6 + index * 0.1 }}
                                            >
                                                <Link
                                                    href={link.url!}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={cn(
                                                        "group relative flex items-center justify-center w-10 h-10 rounded-xl bg-background/50 border border-border/50 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:bg-background hover:shadow-lg",
                                                        link.color
                                                    )}
                                                    aria-label={`${author.name} on ${link.name}`}
                                                >
                                                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />

                                                    {/* Tooltip */}
                                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                                        {link.name}
                                                    </span>
                                                </Link>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />
        </motion.div>
    )
}

// Default author data for RapidNexTech
export const defaultAuthors: Record<string, AuthorData> = {
    "Muhammad Sohaib Riaz": {
        name: "Muhammad Sohaib Riaz",
        role: "Founder & CEO",
        bio: "Passionate about building scalable software solutions that solve real business problems. With over 7 years of experience in full-stack development, I lead RapidNexTech's mission to deliver production-ready applications.",
        avatar: "/muhammad-sohaib-riaz.jpg",
        social: {
            linkedin: "https://linkedin.com/in/muhammad-sohaib-riaz",
            github: "https://github.com/sohaibriaz",
            website: "https://rapidnextech.com",
            email: "contact@rapidnextech.com",
        },
    },
    "RapidNexTech Team": {
        name: "RapidNexTech Team",
        role: "Content Team",
        bio: "Our team of experienced developers and designers share insights, tutorials, and best practices to help you build better software.",
        avatar: "/logo.png",
        social: {
            website: "https://rapidnextech.com",
            email: "contact@rapidnextech.com",
        },
    },
}
