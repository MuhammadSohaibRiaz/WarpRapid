"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useThemeContext } from "@/context/theme-context"
import { Bolt, ShieldCheck, Clock, Rocket, Code2, Users, BrainCircuit, Layers, Cloud, Palette, Lock, Cog, LineChart, Handshake, Search } from "lucide-react"

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-10">
      <h2 className="text-3xl md:text-4xl font-bold theme-text theme-transition">{title}</h2>
      {subtitle && (
        <p className="mt-3 theme-text opacity-70 theme-transition">{subtitle}</p>
      )}
    </div>
  )
}

function AccentMesh() {
  const { color, mode } = useThemeContext()
  const map: Record<string, { light: string; dark: string }> = {
    blue: { light: "from-blue-500/30 to-cyan-400/20", dark: "from-sky-400/25 to-cyan-300/15" },
    green: { light: "from-emerald-500/30 to-teal-400/20", dark: "from-emerald-400/25 to-teal-300/15" },
    purple: { light: "from-fuchsia-500/30 to-pink-400/20", dark: "from-fuchsia-400/25 to-pink-300/15" },
    red: { light: "from-rose-500/30 to-orange-400/20", dark: "from-rose-400/25 to-orange-300/15" },
    orange: { light: "from-amber-500/30 to-orange-400/20", dark: "from-amber-400/25 to-orange-300/15" },
    white: { light: "from-gray-300/40 to-gray-100/20", dark: "from-gray-300/20 to-white/10" },
    black: { light: "from-gray-900/20 to-gray-600/10", dark: "from-black/30 to-gray-800/20" },
  }
  const g = map[color] || map.blue
  const grad = mode === "dark" || color === "black" ? g.dark : g.light
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${grad} blur-3xl`} />
  )
}

export default function AboutClient() {
  const { mode, color } = useThemeContext()
  const surface = mode === "dark" || color === "black" ? "bg-gray-900/40 border-white/10" : "bg-white/60 border-white/20"
  const chip = mode === "dark" || color === "black" ? "bg-white/10" : "bg-black/5"

  return (
    <main className="min-h-screen theme-bg theme-transition relative overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
        <AccentMesh />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="container mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent theme-gradient-text">
              About RapidXTech
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-4 text-lg theme-text opacity-80">
              The speed you need, the technology you trust. We’re a global software company helping startups and enterprises move faster through innovation and reliable engineering. From concept to launch, we build products that are fast, scalable, and designed to last.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-6">
              <Link href="/case-studies">
                <Button className="bg-primary hover:bg-primary/90 text-white">Explore Our Work</Button>
              </Link>
            </motion.div>
          </div>
          {/* Right graphic */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className={`relative rounded-2xl border ${surface} p-6 overflow-hidden`}
            aria-hidden>
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-secondary/30 blur-3xl" />
            <div className="relative">
              <div className="grid grid-cols-3 gap-3">
                {[Bolt, Rocket, ShieldCheck, Code2, BrainCircuit, Cloud, Users, Layers, Clock].map((Icon, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className={`flex items-center justify-center rounded-xl ${chip} h-20`}>
                    <Icon className="w-6 h-6 theme-text" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Company Overview */}
        <section className="container mx-auto px-6 py-14">
          <SectionHeading title="Who We Are" subtitle="Founded with a vision to accelerate digital innovation" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="theme-text opacity-80 leading-relaxed text-lg">
                RapidXTech combines deep technical expertise with creative problem‑solving. We help organizations build web, mobile, and AI‑powered products that drive measurable growth — powered by clean code, automation, and a customer‑first mindset.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[{ n: "150+", t: "Projects" }, { n: "50+", t: "Enterprise" }, { n: "8+", t: "Years" }].map((s) => (
                  <div key={s.t} className={`rounded-xl border ${surface} p-4 text-center`}>
                    <div className="text-2xl font-bold theme-text">{s.n}</div>
                    <div className="text-xs theme-text opacity-70">{s.t}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className={`rounded-2xl border ${surface} overflow-hidden`}
              aria-hidden>
              <img src="/version-control-animate.svg" alt="Version control animated illustration" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="container mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{ t: "Mission", d: "To empower businesses through technology that’s fast, scalable, and built with precision.", Icon: Rocket }, { t: "Vision", d: "To set the global standard for innovation and reliability in digital engineering — the partner of choice for businesses that value speed and quality.", Icon: ShieldCheck }].map(({ t, d, Icon }, i) => (
              <motion.div key={t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className={`rounded-2xl border ${surface} p-6 relative group`}>
                <div className="absolute inset-0 rounded-2xl border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-3">
                  <Icon className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold theme-text">{t}</h3>
                    <p className="mt-2 theme-text opacity-80 leading-relaxed">{d}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What We Do */}
        <section className="container mx-auto px-6 py-14">
          <SectionHeading title="What We Do" subtitle="Capabilities that deliver results" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { Icon: Code2, t: "Web Development", d: "Modern, performance‑driven web apps with Next.js & React." },
              { Icon: Users, t: "Mobile Apps", d: "Native & cross‑platform apps with React Native & Swift." },
              { Icon: Cloud, t: "Cloud & APIs", d: "Scalable backend infrastructure with Node.js & AWS." },
              { Icon: BrainCircuit, t: "AI & Automation", d: "Workflow automation and AI integrations using OpenAI & n8n." },
              { Icon: Palette, t: "UI/UX Design", d: "Intuitive, user‑centered design systems that convert." },
              { Icon: Layers, t: "SaaS Platforms", d: "End‑to‑end SaaS solutions that scale with your users." },
              { Icon: Cog, t: "DevOps & CI/CD", d: "Efficient deployments and uptime monitoring." },
              { Icon: Lock, t: "Enterprise Systems", d: "Secure, high‑availability architecture for large‑scale needs." },
              { Icon: LineChart, t: "Analytics", d: "Insights and dashboards that inform smarter decisions." },
            ].map(({ Icon, t, d }, i) => (
              <motion.div key={t} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className={`rounded-2xl border ${surface} p-5 hover:shadow-lg transition-shadow`}
                role="article" aria-labelledby={`cap-${i}`}
              >
                <div className={`w-10 h-10 rounded-lg ${chip} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 theme-text" />
                </div>
                <h3 id={`cap-${i}`} className="font-semibold theme-text">{t}</h3>
                <p className="text-sm mt-1 theme-text opacity-80 leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose */}
        <section className="container mx-auto px-6 py-14">
          <SectionHeading title="Why Choose RapidXTech" subtitle="Values that shape how we build" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              { Icon: Handshake, t: "Transparency", d: "We keep communication open — no surprises, no silos." },
              { Icon: BrainCircuit, t: "Innovation", d: "We experiment boldly, but ship with discipline." },
              { Icon: ShieldCheck, t: "Quality", d: "Every line of code reflects our obsession with excellence." },
              { Icon: Users, t: "Partnership", d: "We grow with our clients, not just alongside them." },
              { Icon: LineChart, t: "Scalability", d: "We design today with tomorrow’s growth in mind." },
            ].map(({ Icon, t, d }, i) => (
              <motion.div key={t} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className={`rounded-2xl border ${surface} p-6 text-center relative`}>
                <div className={`w-12 h-12 rounded-xl ${chip} mx-auto flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 theme-text" />
                </div>
                <h3 className="font-semibold theme-text">{t}</h3>
                <p className="text-sm mt-2 theme-text opacity-80 leading-relaxed">{d}</p>
                <div className="absolute left-1/2 -bottom-0.5 -translate-x-1/2 h-0.5 w-0 group-hover:w-20 bg-primary transition-all" aria-hidden />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="container mx-auto px-6 py-16">
          <SectionHeading title="Our Process" subtitle="From discovery to delivery" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { Icon: Search, t: "Discover", d: "Understand goals, users, and constraints." },
              { Icon: Cog, t: "Plan", d: "Roadmap with milestones and clear deliverables." },
              { Icon: Code2, t: "Build", d: "Design, develop, and iterate with preview links." },
              { Icon: Rocket, t: "Deliver", d: "Deploy, monitor, document, and support." },
            ].map(({ Icon, t, d }, i) => (
              <motion.div key={t} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className={`rounded-2xl border ${surface} p-6`}>
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-lg ${chip} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 theme-text" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Step {i + 1}</span>
                </div>
                <h3 className="mt-3 font-semibold theme-text">{t}</h3>
                <p className="text-sm mt-1 theme-text opacity-80 leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values in Action (optional visuals) */}
        <section className="relative py-16">
          <div className="absolute inset-0 bg-black/5 dark:bg-white/5" aria-hidden />
          <div className="container mx-auto px-6 relative">
            <div className={`rounded-2xl border ${surface} p-8 text-center`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["We don’t just code — we craft.", "Clean code is our culture.", "Speed means nothing without precision."].map((q, i) => (
                  <motion.blockquote key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="theme-text opacity-80 text-sm md:text-base">
                    “{q}”
                  </motion.blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Brand Statement */}
        <section className="container mx-auto px-6 py-12">
          <p className="max-w-3xl mx-auto text-center theme-text opacity-80 text-lg">At RapidXTech, we believe technology isn’t just about code — it’s about confidence. The confidence that your product will perform under pressure, scale as you grow, and evolve with your vision.</p>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className={`rounded-2xl border ${surface} p-10 md:p-14 relative overflow-hidden`}
            role="region" aria-label="Start your project">
            <div className="absolute -inset-16 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" aria-hidden />
            <h3 className="text-2xl md:text-3xl font-bold theme-text">Let’s Build Something Extraordinary</h3>
            <p className="mt-3 theme-text opacity-80 max-w-2xl mx-auto">Ready to bring your vision to life? Let’s build software that performs, scales, and inspires trust.</p>
            <div className="mt-6">
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-white">Start Your Project</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
