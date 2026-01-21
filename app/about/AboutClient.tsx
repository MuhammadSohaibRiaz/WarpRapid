
import Link from "next/link"
import Script from "next/script"
import Image from "next/image"
import { motion, useMotionValue, animate, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Cpu, Layers, Shield, Zap, BarChart3, MessageSquare, Workflow, ArrowRight, type LucideIcon } from "lucide-react"
import { useEffect } from "react"
import { useThemeContext } from "@/context/theme-context"

const fadeUp = (delay = 0, rm?: boolean) => ({
  initial: { opacity: 0, y: rm ? 0 : 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: rm ? 0 : 0.6, delay: rm ? 0 : delay },
})

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10">
      <motion.h2 className="text-3xl md:text-4xl font-bold theme-text theme-transition" {...fadeUp(0)}>
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p className="mt-3 text-lg theme-text opacity-70 theme-transition" {...fadeUp(0.1)}>
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

function ValueCard({ icon: Icon, title, text }: { icon: LucideIcon | React.ComponentType<{ className?: string }>; title: string; text: string }) {
  const { mode, color } = useThemeContext()
  const surface = useSurface(mode, color)
  return (
    <motion.div
      className={`rounded-xl border p-6 ${surface.card} backdrop-blur-md`}
      {...fadeUp(0.1)}
    >
      <Icon className="w-6 h-6 text-blue-500 mb-3" />
      <h3 className="font-semibold theme-text mb-2">{title}</h3>
      <p className="text-sm theme-text opacity-80 leading-relaxed">{text}</p>
    </motion.div>
  )
}

function useSurface(mode: string, color: string) {
  // Theme-adaptive surface tokens tuned for dark-blue
  const isDark = mode === "dark" || color === "black"
  if (isDark) {
    return {
      card: "bg-slate-900/70 border-slate-800 ring-blue-500/20",
      glass: "bg-slate-900/60 border-slate-800",
    }
  }
  return {
    card: "bg-white/80 border-slate-200 ring-blue-500/10",
    glass: "bg-white/70 border-slate-200",
  }
}

function ProcessStep({ step, title, text, icon: Icon }: { step: number; title: string; text: string; icon?: any }) {
  const { mode, color, getGradient } = useThemeContext()
  const surface = useSurface(mode, color)
  return (
    <motion.div
      className={`group relative rounded-2xl p-6 border ${surface.card} backdrop-blur-md transition-transform`}
      whileHover={{ y: -10 }}
      {...fadeUp(0.1)}
    >
      {/* gradient glow ring on hover */}
      <div className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity ${`ring-1 ring-offset-0 ring-transparent`} `} />
      <div className={`absolute -top-4 -left-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white ${`bg-gradient-to-r ${getGradient("from")} ${getGradient("to")}`}`}>{step.toString().padStart(2, '0')}</div>
      {Icon && <Icon className="w-6 h-6 text-blue-500 mb-3" />}
      <h4 className="font-semibold theme-text mb-2">{title}</h4>
      <p className="text-sm theme-text opacity-80 leading-relaxed">{text}</p>
    </motion.div>
  )
}

function Counter({ to, suffix = "", duration = 1.2, className = "" }: { to: number; suffix?: string; duration?: number; className?: string }) {
  const count = useMotionValue(0)
  useEffect(() => {
    const controls = animate(count, to, { duration, ease: "easeOut" })
    return () => controls.stop()
  }, [to, duration, count])
  return (
    <motion.span className={className}>
      {Math.round(count.get())}
      {suffix}
    </motion.span>
  )
}

function LottieProcess({ src }: { src?: string }) {
  const canvasId = "process-dotlottie-canvas"
  const rm = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // Use CDN ESM to avoid bundler install; plays only if motion allowed
  return (
    <div className="my-8">
      <div className="relative mx-auto max-w-6xl">
        <canvas id={canvasId} width={1152} height={420} className="w-full h-[260px] sm:h-[300px] md:h-[360px] lg:h-[420px] block" />
        {/* Overlay our own labels to replace embedded ones visually */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-8 hidden sm:grid grid-cols-4 gap-4 text-center">
          {['Discover', 'Plan', 'Build', 'Deliver'].map((t) => (
            <span key={t} className="mx-2 inline-block rounded-full px-3 py-1 text-xs font-medium bg-white/20 dark:bg-black/30 backdrop-blur-md theme-text">
              {t}
            </span>
          ))}
        </div>
      </div>
      <Script id="dotlottie-loader" type="module" strategy="afterInteractive">{
        `import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";
         const c = document.getElementById("${canvasId}");
         if (c) {
           const player = new DotLottie({ autoplay: ${!rm}, loop: false, canvas: c, src: "${src || "/project-evolution-steps.json"}" });
           player.addEventListener?.('complete', () => { try { player.goToAndPlay(0); } catch(e){} });
           if (${rm}) { try { player.stop(); } catch(e){} }
         }
        `}
      </Script>
    </div>
  )
}

export default function AboutClient() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RapidNexTech",
    url: "https://rapidnextech.com/about",
    sameAs: [
      "https://x.com/RapidNexTech",
      "https://www.linkedin.com/company/108194958",
      "https://github.com/RapidNexTech",
    ],
  }

  const { mode, color, getGradient } = useThemeContext()
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="min-h-screen theme-bg theme-transition relative overflow-hidden">
      {/* Accent adaptive glow mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div
          className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full blur-3xl opacity-25 ${`bg-gradient-to-tr ${getGradient("from")} ${getGradient("to")}`}`}
        />
      </div>

      <Script id="about-org-jsonld" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

      <div className="container mx-auto px-6 py-16 md:py-20 relative z-10">
        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent theme-gradient-text"
            {...fadeUp(0, prefersReducedMotion)}
          >
            About RapidNexTech
          </motion.h1>
          <motion.p className="mt-5 text-lg md:text-xl theme-text opacity-80" {...fadeUp(0.1, prefersReducedMotion)}>
            The speed you need, the technology you trust.
          </motion.p>
          <motion.p className="mt-4 theme-text opacity-80" {...fadeUp(0.15, prefersReducedMotion)}>
            RapidNexTech is a next-generation software company helping startups and enterprises move faster through
            intelligent design, clean engineering, and strategic automation.
          </motion.p>
          <motion.div className="mt-8" {...fadeUp(0.2, prefersReducedMotion)}>
            <Link href="/contact">
              <Button size="lg" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
                Work With Us
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Who We Are */}
        <section className="mb-20">
          <SectionHeading
            title="Who We Are"
            subtitle="We transform ideas into scalable, high‑impact digital products."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image / mockup */}
            <motion.div {...fadeUp(0, prefersReducedMotion)} className="relative order-2 lg:order-1">
              <div className={`rounded-2xl overflow-hidden ring-1 ring-primary/20 shadow-xl ${mode === "dark" ? "bg-gray-900/60" : "bg-white/70"}`}>
                <Image
                  src="/logo-main.png"
                  alt="RapidNexTech workspace mockup"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain p-8"
                  loading="lazy"
                />
              </div>
              {/* floating icons */}
              <motion.div className="absolute -top-4 -left-4" animate={{ y: [0, -6, 0], opacity: [0.8, 1, 0.8] }} transition={{ duration: 4, repeat: Infinity }}>
                <Cpu className="w-8 h-8 text-blue-600" />
              </motion.div>
              <motion.div className="absolute -bottom-4 -right-4" animate={{ y: [0, 6, 0], opacity: [0.8, 1, 0.8] }} transition={{ duration: 5, repeat: Infinity }}>
                <Workflow className="w-8 h-8 text-blue-600" />
              </motion.div>
            </motion.div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <motion.p {...fadeUp(0.05, prefersReducedMotion)} className="theme-text opacity-90 leading-relaxed">
                RapidNexTech was founded to accelerate digital transformation for startups and enterprises. We create
                world‑class web and mobile solutions using clean, scalable, high‑performance code — crafted for speed,
                usability, and growth.
              </motion.p>
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="rounded-xl p-4 border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40">
                  <Counter to={100} suffix="+" className="text-2xl font-bold theme-text" />
                  <p className="text-xs theme-text opacity-70">Projects</p>
                </div>
                <div className="rounded-xl p-4 border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40">
                  <Counter to={95} suffix="+" className="text-2xl font-bold theme-text" />
                  <p className="text-xs theme-text opacity-70">Lighthouse Score</p>
                </div>
                <div className="rounded-xl p-4 border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40">
                  <Counter to={7} suffix="+" className="text-2xl font-bold theme-text" />
                  <p className="text-xs theme-text opacity-70">Countries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick capabilities */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ValueCard icon={Cpu} title="Full‑Stack Development" text="MERN, Next.js, React Native" />
            <ValueCard icon={Workflow} title="Automation" text="n8n, Zapier, AI integrations" />
            <ValueCard icon={Shield} title="SaaS & Enterprise" text="Secure, scalable platforms" />
            <ValueCard icon={Layers} title="UI/UX Design" text="Design systems that convert" />
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`rounded-xl p-6 border ${useSurface(mode, color).card}`}>
            <h3 className="text-xl font-semibold mb-2 theme-text">Our Mission</h3>
            <p className="theme-text opacity-80">
              Empower businesses to scale faster through technology that is fast, reliable, and built with excellence.
            </p>
          </div>
          <div className={`rounded-xl p-6 border ${useSurface(mode, color).card}`}>
            <h3 className="text-xl font-semibold mb-2 theme-text">Our Vision</h3>
            <p className="theme-text opacity-80">
              Set the benchmark for software companies — recognized for innovation, clean code, and trust‑driven partnerships.
            </p>
          </div>
        </section>

        {/* What We Do */}
        <section className="mb-20">
          <SectionHeading
            title="Building Technology That Moves Businesses Forward"
            subtitle="End‑to‑end solutions, engineered for growth."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[{ icon: Cpu, title: "Web & Mobile App Development", text: "High‑performance, cross‑platform apps." },
            { icon: Layers, title: "SaaS Platforms", text: "Secure multi‑tenant applications." },
            { icon: Zap, title: "AI & Workflow Automation", text: "Save hours with intelligent pipelines." },
            { icon: MessageSquare, title: "UI/UX Design", text: "Design systems that convert." },
            { icon: BarChart3, title: "Cloud & Integrations", text: "Reliable APIs and services." },
            { icon: Shield, title: "IT Consulting", text: "Roadmaps, audits, and architecture." }]
              .map((s, i) => (
                <motion.div
                  key={i}
                  className={`group relative rounded-xl p-6 border overflow-hidden transition-transform ${mode === "dark" ? "bg-gray-900/40 border-gray-700" : "bg-white/60 border-gray-200"} hover:scale-[1.02]`}
                  whileHover={{ y: -6 }}
                  {...fadeUp(i * 0.05)}
                >
                  <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-30 blur-2xl ${`bg-gradient-to-tr ${getGradient("from")} ${getGradient("to")}`}`} />
                  <s.icon className="w-7 h-7 text-blue-600 mb-3" />
                  <h3 className="font-semibold theme-text mb-1">{s.title}</h3>
                  <p className="text-sm theme-text opacity-80 leading-relaxed">{s.text}</p>
                  <ArrowRight className="w-4 h-4 absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <SectionHeading title="Our Values" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ValueCard icon={MessageSquare} title="Transparency" text="Open, honest communication at every step." />
            <ValueCard icon={CheckCircle2} title="Quality" text="Clean, maintainable, and scalable code." />
            <ValueCard icon={Zap} title="Innovation" text="We constantly explore and adopt what’s next." />
            <ValueCard icon={Layers} title="Partnership" text="We aim for long‑term success with our clients." />
          </div>
        </section>

        {/* Why RapidNexTech */}
        <section className="mb-20">
          <SectionHeading title="What Makes Us Different" />
          <div className="max-w-4xl mx-auto">
            <motion.p className="text-center theme-text opacity-90" {...fadeUp(0)}>
              We don’t just ship software — we deliver outcomes. Every line of code is optimized for performance, SEO,
              and reusability. We prioritize collaboration, quality, and measurable business impact.
            </motion.p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[{ icon: Layers, title: "Reusable Architecture", text: "Composable, DRY, scalable components." },
              { icon: BarChart3, title: "Benchmark‑Driven", text: "Lighthouse 95+ targets." },
              { icon: MessageSquare, title: "Agile & Transparent", text: "Fast iterations, aligned progress." },
              { icon: Shield, title: "SEO & Mobile‑First", text: "Semantic, accessible, performant." }].map((f, i) => (
                <ProcessStep key={i} step={i + 1} title={f.title} text={f.text} icon={f.icon} />
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mb-20">
          <SectionHeading title="Our Process" />
          {/* Lottie animation (6-step plan/design/develop/deploy/support/evolve) */}
          <LottieProcess src="https://lottie.host/daa84d4b-3421-4895-aae9-5229a84f31c7/XgUMc3cBH0.lottie" />
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProcessStep step={1} title="Discover" text="Understand the business, users, and goals." icon={Cpu} />
            <ProcessStep step={2} title="Plan" text="Define scope, timelines, and a pragmatic roadmap." icon={Workflow} />
            <ProcessStep step={3} title="Build" text="Design, develop, and optimize for speed & scale." icon={Layers} />
            <ProcessStep step={4} title="Deliver" text="Launch, monitor, and long‑term support." icon={Shield} />
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-2xl p-10 md:p-14 text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
          <motion.h3 className="text-2xl md:text-3xl font-bold" {...fadeUp(0, prefersReducedMotion)}>
            Ready to Build Something Extraordinary?
          </motion.h3>
          <motion.p className="mt-3 opacity-90" {...fadeUp(0.1, prefersReducedMotion)}>
            Let’s turn your vision into a powerful digital product — built for speed, performance, and long‑term impact.
          </motion.p>
          <motion.div className="mt-6" {...fadeUp(0.2, prefersReducedMotion)}>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="rounded-xl text-blue-700">
                Start Your Project
              </Button>
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
