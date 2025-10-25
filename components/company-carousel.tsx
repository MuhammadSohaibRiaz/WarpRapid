"use client"

import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { useThemeContext } from "@/context/theme-context"
import { PartnersCMS } from "@/lib/supabase-cms"
import type { TrustedPartner } from "@/lib/supabase"

export function CompanyCarousel() {
  const [companies, setCompanies] = useState<{ name: string; logo: string }[]>([])
  const { color, mode } = useThemeContext()

  useEffect(() => {
    let mounted = true
    PartnersCMS.getPublishedPartners()
      .then((rows: TrustedPartner[]) => {
        if (!mounted) return
        const mapped = rows
          .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
          .map((p) => ({ name: p.company_name, logo: p.company_logo }))
        setCompanies(
          mapped.length
            ? mapped
            : [
                { name: "TechStart", logo: "/placeholder.svg?height=40&width=160&text=TechStart" },
                { name: "InnovateHub", logo: "/placeholder.svg?height=40&width=160&text=InnovateHub" },
              ],
        )
      })
      .catch(() => {
        if (!mounted) return
        setCompanies([
          { name: "TechStart", logo: "/placeholder.svg?height=40&width=160&text=TechStart" },
          { name: "InnovateHub", logo: "/placeholder.svg?height=40&width=160&text=InnovateHub" },
        ])
      })
    return () => {
      mounted = false
    }
  }, [])

  // Always ensure enough items to animate smoothly
  const marqueeList = useMemo(() => {
    if (companies.length === 0) return []
    const minItems = 12
    const times = Math.max(2, Math.ceil(minItems / companies.length))
    return Array.from({ length: times })
      .flatMap(() => companies)
  }, [companies])

  return (
    <section className="py-20 theme-bg theme-transition relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

      <div className="container mx-auto px-4 relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-sm uppercase tracking-wider theme-text opacity-60 mb-2 theme-transition">
            Our Clients
          </p>
          <h2 className="text-xl md:text-2xl font-medium theme-text opacity-80 theme-transition">
            Brands that trust us
          </h2>
        </motion.div>

        {/* Continuous marquee */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex items-center gap-10 md:gap-16 min-w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {marqueeList.map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className={`${
                  mode === "dark" || color === "black"
                    ? "grayscale hover:grayscale-0"
                    : "opacity-70 hover:opacity-100"
                } transition-all duration-300`}
              >
                <img
                  src={c.logo || "/placeholder.svg"}
                  alt={c.name}
                  className="h-10 md:h-12 w-auto max-w-[180px] object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
