"use client"

import { motion } from "framer-motion"
import { useThemeContext } from "@/context/theme-context"
import { useState } from "react"

interface Country {
    name: string
    x: number
    y: number
    description: string
    flag: string
}

const countries: Country[] = [
    { name: "USA", x: 20, y: 38, description: "Innovating scalable web solutions", flag: "🇺🇸" },
    { name: "UK", x: 48, y: 28, description: "Empowering startup growth", flag: "🇬🇧" },
    { name: "Brazil", x: 30, y: 68, description: "Streamlining operations with AI", flag: "🇧🇷" },
    { name: "Saudi Arabia", x: 58, y: 42, description: "Building secure enterprise systems", flag: "🇸🇦" },
    { name: "Pakistan", x: 68, y: 38, description: "Driving local tech innovation", flag: "🇵🇰" },
]

export function WorldMap() {
    const { mode, color } = useThemeContext()
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
    const dotColor = "bg-primary"
    const cardBg = mode === "dark" || color === "black" ? "bg-gray-900/90" : "bg-white/90"

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
                    Global Reach
                </h2>
                <p className="theme-text opacity-70 max-w-2xl mx-auto theme-transition">
                    Serving clients across 5 countries with world-class software solutions
                </p>
            </motion.div>

            {/* Desktop Map View */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-5xl mx-auto aspect-[2/1] rounded-2xl overflow-hidden group hidden md:block"
                role="img"
                aria-label="Interactive map of our global presence in 5 countries"
            >
                {/* World Map SVG Background */}
                <div
                    className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity duration-500"
                    style={{
                        backgroundImage: `url(/worldmap.svg)`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        filter: mode === "dark" || color === "black"
                            ? "invert(1) opacity(0.5) brightness(1.2)" // White lines for Dark Mode
                            : "invert(0) opacity(0.3) contrast(1.2)"   // Black lines for Light Mode
                    }}
                />

                {/* Country Dots */}
                {countries.map((country, index) => (
                    <motion.div
                        key={country.name}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="absolute group/dot cursor-pointer"
                        style={{
                            left: `${country.x}%`,
                            top: `${country.y}%`,
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                        }}
                        onMouseEnter={() => setHoveredCountry(country.name)}
                        onMouseLeave={() => setHoveredCountry(null)}
                        onClick={() => console.log(`Clicked: ${country.name}`)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Presence in ${country.name}: ${country.description}`}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                console.log(`Selected: ${country.name}`)
                            }
                        }}
                    >
                        {/* Pulsing ring */}
                        <div className="absolute -inset-2">
                            <div className={`w-6 h-6 ${dotColor} rounded-full opacity-30 animate-ping`} />
                        </div>

                        {/* Main dot */}
                        <div className={`w-4 h-4 ${dotColor} rounded-full relative z-10 transform transition-all duration-300 ${hoveredCountry === country.name ? 'scale-150 shadow-lg' : 'group-hover/dot:scale-125'}`} />

                        {/* Enhanced Tooltip */}
                        <div className={`absolute left-1/2 -translate-x-1/2 top-8 opacity-0 ${hoveredCountry === country.name ? 'opacity-100' : 'group-hover/dot:opacity-100'} transition-opacity whitespace-nowrap z-20 pointer-events-none`}>
                            <div className={`${cardBg} backdrop-blur-md px-4 py-3 rounded-xl border ${mode === "dark" || color === "black" ? "border-white/10" : "border-gray-200"} shadow-lg`}>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-2xl">{country.flag}</span>
                                    <span className="theme-text font-bold text-sm">{country.name}</span>
                                </div>
                                <p className="theme-text text-xs opacity-80">{country.description}</p>
                            </div>
                            {/* Arrow */}
                            <div className={`absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rotate-45 ${mode === "dark" || color === "black" ? "bg-gray-900/90" : "bg-white/90"} border-l border-t ${mode === "dark" || color === "black" ? "border-white/10" : "border-gray-200"}`} />
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Interactive Country Pills */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex flex-wrap justify-center gap-3 mt-8 hidden md:flex"
            >
                {countries.map((country) => (
                    <motion.button
                        key={country.name}
                        className={`px-4 py-2 rounded-full ${mode === "dark" || color === "black" ? "bg-white/10 hover:bg-white/20" : "bg-black/5 hover:bg-black/10"} backdrop-blur-sm transition-all duration-300 ${hoveredCountry === country.name ? 'ring-2 ring-primary scale-105 shadow-lg' : ''}`}
                        onMouseEnter={() => setHoveredCountry(country.name)}
                        onMouseLeave={() => setHoveredCountry(null)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => console.log(`Clicked pill: ${country.name}`)}
                        aria-label={`${country.name}: ${country.description}`}
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-lg">{country.flag}</span>
                            <span className="theme-text text-sm font-medium">{country.name}</span>
                        </span>
                    </motion.button>
                ))}
            </motion.div>

            {/* Mobile List View */}
            <div className="md:hidden mt-8 space-y-3">
                {countries.map((country, index) => (
                    <motion.div
                        key={country.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={`${cardBg} backdrop-blur-md p-4 rounded-xl border ${mode === "dark" || color === "black" ? "border-white/10" : "border-gray-200"} shadow-sm`}
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">{country.flag}</span>
                            <div>
                                <h3 className="theme-text font-bold mb-1">{country.name}</h3>
                                <p className="theme-text text-sm opacity-80">{country.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
