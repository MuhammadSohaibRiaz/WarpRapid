import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About RapidXTech",
  description:
    "RapidXTech accelerates product delivery for startups and enterprises with clean engineering, modern UI, and automation.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About RapidXTech",
    description:
      "We build high‑performance apps and platforms using modern frameworks and clean, scalable code.",
    url: "/about",
    type: "website",
  },
}

export default function AboutPage() {
  const card = "rounded-xl border border-white/10 bg-white/10 dark:bg-black/30 shadow-sm transition-colors hover:bg-white/15 dark:hover:bg-white/20 p-6"
  return (
    <main className="container mx-auto px-6 py-16 md:py-20">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent theme-gradient-text">
          About RapidXTech
        </h1>
        <p className="mt-4 text-lg theme-text opacity-80">
          The speed you need, the technology you trust. We craft scalable products with clean code, strong UX, and
          automation that saves time.
        </p>
      </section>

      {/* Who we are */}
      <section className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={card}>
          <h2 className="text-xl font-semibold theme-text mb-2">Who We Are</h2>
          <p className="theme-text opacity-80 leading-relaxed">
            We help teams move faster—from idea to launch—using modern stacks (Next.js, React Native), cloud‑native
            backends, and thoughtful design systems.
          </p>
        </div>
        <div className={card}>
          <h2 className="text-xl font-semibold theme-text mb-2">What We Do</h2>
          <ul className="list-disc pl-5 space-y-1 theme-text opacity-80">
            <li>Web & Mobile App Development</li>
            <li>SaaS Platforms & APIs</li>
            <li>AI & Workflow Automation</li>
            <li>UI/UX & Design Systems</li>
          </ul>
        </div>
      </section>

      {/* Values */}
      <section className="mt-14">
        <h3 className="text-2xl font-bold theme-text mb-4">Our Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[{
            t: "Transparency",
            d: "Open, honest collaboration at every step.",
          },{
            t: "Quality",
            d: "Clean, maintainable, performance‑tuned code.",
          },{
            t: "Innovation",
            d: "Continuous improvement through R&D.",
          },{
            t: "Partnership",
            d: "Long‑term mindset and shared goals.",
          }].map((v) => (
            <div key={v.t} className={card}>
              <h4 className="font-semibold theme-text mb-1">{v.t}</h4>
              <p className="text-sm theme-text opacity-80 leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mt-14">
        <h3 className="text-2xl font-bold theme-text mb-4">Our Process</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Discover","Plan","Build","Deliver"].map((step, i) => (
            <div key={step} className={card}>
              <span className="inline-block text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 theme-text mb-2">
                {(i+1).toString().padStart(2,'0')}
              </span>
              <h4 className="font-semibold theme-text mb-1">{step}</h4>
              <p className="text-sm theme-text opacity-80 leading-relaxed">
                {step === 'Discover' && 'Understand business, users, and goals.'}
                {step === 'Plan' && 'Define scope, timeline, and a pragmatic roadmap.'}
                {step === 'Build' && 'Design, develop, test, and optimize.'}
                {step === 'Deliver' && 'Launch, monitor, and support for the long term.'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
