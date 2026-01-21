"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { ThemeSwitcher } from "./theme-switcher"
import { Menu, X, Code2 } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import { HeaderNav } from "./header-nav"

const navigation = [
  { name: "About", href: "/about" },
  { name: "What We Do", href: "/#services" }, // Matches Desktop "What We Do"
  { name: "Case Studies", href: "/case-studies" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { mode, color } = useThemeContext()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const headerBgClass = isScrolled
    ? mode === "dark" || color === "black"
      ? "bg-background/95 shadow-md border-b border-white/5"
      : "bg-white/95 shadow-md border-b border-gray-100"
    : "bg-transparent"

  const linkClass = (isActive: boolean) =>
    `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary font-bold" : "theme-text opacity-90"
    }`

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}>
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-10 w-10 md:h-12 md:w-12 transition-transform group-hover:scale-105">
            <Image
              src={color === "white" || (mode === "light" && color !== "black") ? "/symbol-blue.png" : "/symbol-white.png"}
              alt="RapidNexTech Symbol"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="relative h-10 w-48 md:h-12 md:w-48 transition-transform group-hover:scale-105 ml-1 mt-2">
            <Image
              src={color === "white" || (mode === "light" && color !== "black") ? "/header-logo-blue.png" : "/header-logo-white.png"}
              alt="RapidNexTech"
              fill
              className="object-contain object-left"
              priority
              quality={100}
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <HeaderNav />
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 theme-text hover:bg-primary/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden absolute top-20 left-0 right-0 ${mode === "dark" || color === "black" ? "bg-background" : "bg-white"
              } border-t border-white/10 overflow-hidden`}
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6 h-full">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-2xl font-bold ${pathname === item.href ? "text-primary" : "theme-text"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
