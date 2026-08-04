"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { FloatingHireButton } from "@/components/floating-hire-button"
import { ArchitectureDiagram, type ArchLayer } from "@/components/architecture-diagram"
import {
  ArrowRight, Briefcase, Code2, FileCheck2, Gauge, Globe2,
  Layers, MapPin, Menu, Rocket, Smartphone, Users, Zap,
} from "lucide-react"

/* ─────────────────────────────────────────────
   CASE STUDY DATA
   ───────────────────────────────────────────── */

interface Metric {
  value: string
  label: string
}

interface CaseStudy {
  index: string
  title: string
  client: string
  sector: string
  image?: string
  role: string
  summary: string
  contributions: string[]
  metrics: Metric[]
  tech: string[]
  arch: ArchLayer[]
  archNote: string
}

const caseStudies: CaseStudy[] = [
  {
    index: "01",
    title: "Logistics Management System",
    client: "freelance",
    sector: "Enterprise Logistics",
    image: "/gis.png",
    role: "Lead Frontend Engineer",
    summary:
      "Real-time shipment tracking and route optimization platform built for a national logistics operator handling millions of parcels a year.",
    contributions: [
      "Architected a modular React + TypeScript SPA that serves 2,000+ concurrent dispatchers",
      "Built live tracking views over WebSocket, cutting map refresh latency from 30s to under 1s",
      "Designed route-optimization flows with Zustand, enabling six squads to ship in parallel",
      "Introduced a token-based design system, reducing UI defects by roughly 35%",
    ],
    metrics: [
      { value: "2.4s", label: "Page load (was 8.1s)" },
      { value: "99.9%", label: "Platform uptime" },
      { value: "40%", label: "Faster dispatch decisions" },
      { value: "1.2M+", label: "Shipments tracked / year" },
    ],
    tech: ["React", "TypeScript", "Zustand", "Leaflet", "WebSocket"],
    arch: [
      { label: "Edge", items: ["CDN", "WAF"] },
      { label: "Client", items: ["React SPA", "Leaflet Maps"] },
      { label: "API Gateway", items: ["REST", "WebSocket"] },
      { label: "Services", items: ["Tracking", "Routing", "Auth"] },
      { label: "Data", items: ["PostgreSQL", "Redis cache"] },
    ],
    archNote:
      "Live positions stream through a WebSocket channel while route optimization runs as a separate service, keeping the UI responsive even at peak load. State is split by domain in Zustand stores so each squad owns a slice without cross-team merge conflicts.",
  },
  {
    index: "02",
    title: "Enterprise Analytics Dashboard",
    client: "Retail Group",
    sector: "Data & Analytics",
    image: "/dashboard.png",
    role: "Senior Frontend Engineer",
    summary:
      "Real-time analytics dashboard aggregating sales, inventory, and traffic data for a nationwide retail operation across 250,000+ monthly active users.",
    contributions: [
      "Led the Vue 3 + Pinia rewrite of a legacy report suite into a single live dashboard",
      "Engineered virtualized tables and chart reuse, keeping 60+ KPIs interactive without jank",
      "Defined the data fetching layer so reports render within 2 seconds on first paint",
      "Worked with backend to shape aggregation APIs, cutting payload size by half",
    ],
    metrics: [
      { value: "250K+", label: "Monthly active users" },
      { value: "<2s", label: "Dashboard first render" },
      { value: "45%", label: "Less time building reports" },
      { value: "60+", label: "Live KPIs on one screen" },
    ],
    tech: ["Vue.js", "TypeScript", "Pinia", "Chart.js", "REST"],
    arch: [
      { label: "Edge", items: ["CDN"] },
      { label: "Client", items: ["Vue SPA", "Virtualized grids"] },
      { label: "API Gateway", items: ["REST", "Aggregation"] },
      { label: "Data", items: ["ClickHouse", "PostgreSQL"] },
    ],
    archNote:
      "Pre-aggregated endpoints return summary-level data for first paint, with drill-downs fetching detail on demand. Virtualization keeps 10,000-row tables smooth, and chart instances are pooled to avoid memory growth on long-lived sessions.",
  },
  {
    index: "03",
    title: "Telin Enterprise Portal",
    client: "Telin (Telekomunikasi Indonesia Intl.)",
    sector: "Telecommunications",
    image: "/Telin.png",
    role: "Frontend Engineer",
    summary:
      "Self-service enterprise portal consolidating billing, service orders, and support for international telecom customers.",
    contributions: [
      "Rebuilt the Angular 11 frontend with lazy-loaded modules, halving initial bundle size",
      "Standardized Bootstrap 4 + custom SCSS tokens into a maintainable UI kit",
      "Shipped accessibility improvements, lifting Lighthouse a11y score from 62 to 95",
      "Collaborated with product to cut onboarding from 5 steps to 2, lifting activation rate",
    ],
    metrics: [
      { value: "100K+", label: "Enterprise users served" },
      { value: "3.2x", label: "Faster account onboarding" },
      { value: "99.9%", label: "Portal uptime" },
      { value: "30%", label: "Fewer support tickets" },
    ],
    tech: ["Angular", "TypeScript", "Bootstrap", "SCSS", "REST"],
    arch: [
      { label: "Edge", items: ["CDN", "WAF"] },
      { label: "Client", items: ["Angular SPA", "Lazy modules"] },
      { label: "API Gateway", items: ["REST", "OAuth2"] },
      { label: "Services", items: ["Billing", "Service Order", "Support"] },
      { label: "Data", items: ["Oracle DB", "Redis"] },
    ],
    archNote:
      "Each business domain ships as a lazy-loaded Angular module, so users only download what they open. A shared UI kit built on design tokens keeps dozens of teams visually consistent without duplicated styles.",
  },
  {
    index: "04",
    title: "E-Working Permit",
    client: "Enterprise Compliance Group",
    sector: "Compliance / HR",
    image: "/eworking.png",
    role: "Frontend Engineer",
    summary:
      "Digital work-permit platform replacing a paper process for a multi-site industrial group, with full approval workflows and audit trails.",
    contributions: [
      "Designed the end-to-end approval flow with Angular Material, from request to sign-off",
      "Built step-wizard forms with conditional validation, cutting submission errors by 60%",
      "Added PDF generation and audit logging, achieving 100% paperless compliance",
      "Partnered with QA to reach 85% unit test coverage across critical workflows",
    ],
    metrics: [
      { value: "10K+", label: "Permits processed / month" },
      { value: "5d→1d", label: "Approval cycle time" },
      { value: "98%", label: "Audit compliance rate" },
      { value: "100%", label: "Paperless workflow" },
    ],
    tech: ["Angular", "TypeScript", "Angular Material", "Karma/Jasmine", "REST"],
    arch: [
      { label: "Edge", items: ["CDN"] },
      { label: "Client", items: ["Angular SPA", "Step wizard"] },
      { label: "API Gateway", items: ["REST", "Auth"] },
      { label: "Services", items: ["Permit", "Approval", "Audit"] },
      { label: "Data", items: ["PostgreSQL", "Object storage"] },
    ],
    archNote:
      "Form state is captured per step and only submitted once fully validated, which keeps partial drafts recoverable. Every action writes to the audit service, so compliance reports are generated without extra data entry.",
  },
  {
    index: "05",
    title: "ADA BSP",
    client: "ADA (Business Support Partner)",
    sector: "Business Support Systems",
    image: "/ADA.png",
    role: "Frontend Engineer",
    summary:
      "Business support system for a partner management network, visualizing complex relationships and transaction flows in real time.",
    contributions: [
      "Implemented complex relationship graphs and data visualizations on Angular",
      "Optimized large-list rendering, holding 50K-row views at 60fps",
      "Standardized reusable chart components shared across modules",
      "Introduced route-level code splitting, cutting cold start time by 40%",
    ],
    metrics: [
      { value: "1M+", label: "Data points processed / day" },
      { value: "25%", label: "Faster analyst workflows" },
      { value: "15+", label: "Integrated data sources" },
      { value: "60fps", label: "Large-list interactions" },
    ],
    tech: ["Angular", "TypeScript", "Angular Material", "D3.js", "REST"],
    arch: [
      { label: "Edge", items: ["CDN"] },
      { label: "Client", items: ["Angular SPA", "D3 visualizations"] },
      { label: "API Gateway", items: ["REST", "Auth"] },
      { label: "Services", items: ["Partner", "Transaction", "Report"] },
      { label: "Data", items: ["PostgreSQL", "ClickHouse"] },
    ],
    archNote:
      "Heavy visualization logic is isolated into worker-friendly modules and chart data is normalized client-side. Code splitting means the login-critical path loads first while visualization bundles stream in after authentication.",
  },
]

/* ─────────────────────────────────────────────
   EXPERIENCE DATA
   ───────────────────────────────────────────── */

interface Experience {
  title: string
  company: string
  period: string
  highlights: string[]
  tech: string[]
}

const experiences: Experience[] = [
  {
    title: "Senior Frontend Engineer",
    company: "Axiata Digital Labs",
    period: "2020 — Present",
    highlights: [
      "Lead frontend architecture for SaaS platforms, mobile apps, and WordPress plugins",
      "Design and maintain a shared design system used across 6 product squads",
      "Cut median page load time by 45% via code splitting and cache strategy",
    ],
    tech: ["React", "React Native", "TypeScript", "Angular", "Zustand"],
  },
  {
    title: "Senior Software Engineer",
    company: "Kreasi Digital Indo Utama",
    period: "Jan 2020 — May 2020",
    highlights: [
      "Led frontend for restaurant & POS systems handling high-volume real-time orders",
      "Built touch-screen and mobile ordering interfaces used on the sales floor",
    ],
    tech: ["PHP", "Laravel", "React", "MySQL"],
  },
  {
    title: "Senior Software Engineer",
    company: "Ayo Media Network",
    period: "Oct 2019 — Dec 2019",
    highlights: [
      "Full-stack development for a high-traffic media platform",
      "Shipped iOS & Android apps with Flutter alongside the web experience",
    ],
    tech: ["Flutter", "CodeIgniter", "Laravel", "MySQL"],
  },
  {
    title: "Frontend Developer",
    company: "Bank BTPN Tbk",
    period: "Jun 2019 — Sep 2019",
    highlights: [
      "Built mission-critical banking applications: back-office, compliance, risk tools",
      "Adhered to strict banking security and audit standards in every screen",
    ],
    tech: ["Angular", "SCSS", "Node.js", "Angular Material"],
  },
  {
    title: "Web Developer",
    company: "Bisnis Indonesia Sibertama",
    period: "Jun 2018 — Aug 2019",
    highlights: [
      "Developed and maintained digital products for Bisnis Indonesia's media network",
      "Owned the frontend for editorial and subscription flows",
    ],
    tech: ["CodeIgniter", "JavaScript", "MySQL", "jQuery"],
  },
  {
    title: "Software Developer",
    company: "Bisnis Indonesia",
    period: "Aug 2015 — Jul 2018",
    highlights: [
      "Built the media platform and native mobile apps across multiple stacks",
      "Covered the full lifecycle from requirements to production releases",
    ],
    tech: ["AngularJS", "Flutter", "CodeIgniter", "Ionic"],
  },
  {
    title: "Junior Software Developer",
    company: "Springfields",
    period: "Aug 2013 — Dec 2013",
    highlights: [
      "Developed internal applications and public service portals",
      "Focused on secure, maintainable code from day one",
    ],
    tech: ["PHP", "CodeIgniter", "MySQL", "CSS"],
  },
]

/* ─────────────────────────────────────────────
   TECHNOLOGY CATEGORIES & MORE PROJECTS
   ───────────────────────────────────────────── */

const techCategories = [
  {
    title: "Frameworks",
    items: ["React", "Next.js", "Angular", "Vue.js", "Flutter"],
  },
  {
    title: "State & Data",
    items: ["Zustand", "Redux", "Pinia", "TanStack Query", "REST", "GraphQL"],
  },
  {
    title: "Styling & UI",
    items: ["Tailwind CSS", "SCSS", "Bootstrap", "Angular Material", "Figma"],
  },
  {
    title: "Testing & Quality",
    items: ["Jest", "Vitest", "Playwright", "Cypress", "Karma/Jasmine"],
  },
  {
    title: "Tooling & Delivery",
    items: ["Webpack", "Vite", "Docker", "CI/CD", "Git"],
  },
  {
    title: "Backend & Infra",
    items: ["Node.js", "Nest.js", "Redis", "RabbitMQ", "Firebase"],
  },
]

const moreProjects = [
  { icon: Zap, title: "XL — BAU Automation", desc: "Business-as-usual automation platform for XL Axiata operations.", tech: ["Angular", "Angular Material"] },
  { icon: Code2, title: "Axonect", desc: "Enterprise Angular application with comprehensive unit test coverage.", tech: ["Angular", "Figma"] },
  { icon: Layers, title: "Widget Accessibility", desc: "WordPress plugin using TensorFlow.js for AI-powered accessibility.", tech: ["TensorFlow.js", "JavaScript"] },
  { icon: Smartphone, title: "Ayo Jakarta", desc: "Flutter mobile app with Firebase backend for Jakarta city services.", tech: ["Flutter", "Firebase"] },
  { icon: Gauge, title: "Point of Sale", desc: "High-performance POS with Recoil state and full test coverage.", tech: ["React", "Recoil"] },
  { icon: Globe2, title: "Koran Bisnis", desc: "Digital newspaper platform for Bisnis Indonesia publication.", tech: ["CodeIgniter", "Bootstrap"] },
]

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    )
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const navItems = ["About", "Case Studies", "Experience", "Contact"]
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/cv_dedi.pdf"
    link.download = "cv_dedi.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">

      {/* ── NAVBAR ── */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "nav-blur" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-xs font-black text-primary-foreground">
              DK
            </span>
            <span className="text-sm font-semibold tracking-tight">Dedi Kusniadi</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
            <ThemeToggle />
            <Button asChild size="sm">
              <a href="#contact">Hire Me</a>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col gap-1 pt-12">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="rounded-md px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item}
                  </a>
                ))}
                <Button asChild size="sm" className="mt-4">
                  <a href="#contact">Hire Me</a>
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="top" className="hero-backdrop relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-16 md:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28">
          <div className="animate-fade-in-up">
            <p className="section-kicker mb-6">Senior Frontend Engineer · 13+ years</p>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              I build enterprise-grade frontends that hold up under real traffic.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              For over a decade I&apos;ve shipped web platforms for telecom operators, banks, and media
              groups — self-service portals, analytics dashboards, and operational tools used by
              hundreds of thousands of people every day.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#case-studies">
                  View Case Studies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" onClick={handleDownload}>
                <Briefcase className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
              {[
                ["13+", "Years experience"],
                ["35+", "Enterprise projects"],
                ["250K+", "Daily active users reached"],
                ["5", "Industries served"],
              ].map(([value, label]) => (
                <div key={label} className="flex flex-col bg-card px-4 py-3.5">
                  <dt className="text-2xl font-black tracking-tight">{value}</dt>
                  <dd className="text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-fade-in-up relative" style={{ animationDelay: "120ms" }}>
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="overflow-hidden rounded-xl border border-border">
                <Image
                  src="/1609985817736.jpg"
                  alt="Dedi Kusniadi"
                  width={640}
                  height={800}
                  priority
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-1/2 w-[86%] -translate-x-1/2 rounded-lg border border-border bg-card px-4 py-3 shadow-lg">
                <p className="text-xs font-semibold">Currently at Axiata Digital Labs</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Leading frontend for enterprise SaaS & telecom platforms.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="animate-on-scroll mb-14 grid gap-8 lg:grid-cols-[1fr_0.6fr]">
            <div>
              <p className="section-kicker mb-5">About</p>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Frontend engineering for systems people depend on.
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground lg:pt-9">
              I&apos;ve spent my career inside large organizations — telecom, banking, media — where a
              slow page or a broken flow has real cost. I bring that context to every screen:
              performance budgets, accessibility, and architecture that stays maintainable as teams grow.
            </p>
          </div>

          <div className="animate-on-scroll grid gap-10 lg:grid-cols-2">
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                My work sits at the intersection of engineering and product. I lead frontend
                architecture, build design systems, and coordinate with backend, QA, and design
                teams to ship features that scale — from a 3-person startup to 2,000+ concurrent
                dispatchers on a logistics platform.
              </p>
              <p>
                Over 35 enterprise projects, I&apos;ve repeatedly cut load times by 40–60%, reduced
                support load through self-service flows, and helped teams move from slow release
                cycles to continuous delivery.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 md:p-7">
              <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-foreground">
                Technology focus areas
              </h3>
              <div className="space-y-5">
                {techCategories.map((cat) => (
                  <div key={cat.title}>
                    <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                      {cat.title}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((tech) => (
                        <Badge key={tech} variant="outline" className="font-normal">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section id="case-studies" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="animate-on-scroll mb-16 max-w-2xl">
            <p className="section-kicker mb-5">Case Studies</p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Selected work, in depth.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Five flagship projects with my role, the measurable results, and the architecture
              decisions that made them work.
            </p>
          </div>

          <div className="space-y-16 md:space-y-24">
            {caseStudies.map((cs, i) => (
              <article key={cs.title} id={`case-${cs.index}`} className="animate-on-scroll scroll-mt-24">
                <div className={`grid gap-8 lg:grid-cols-2 lg:gap-14 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  {/* Image */}
                  <div className="relative">
                    <div className="overflow-hidden rounded-xl border border-border">
                      {cs.image ? (
                        <Image
                          src={cs.image}
                          alt={cs.title}
                          width={720}
                          height={460}
                          className="aspect-[16/10] w-full object-cover"
                        />
                      ) : (
                        <div className="flex aspect-[16/10] w-full items-center justify-center bg-muted">
                          <Layers className="h-10 w-10 text-muted-foreground/40" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col">
                    <div className="mb-4 flex items-baseline gap-3">
                      <span className="font-mono text-sm font-bold text-muted-foreground">{cs.index}</span>
                      <span className="rounded-full border border-border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                        {cs.sector}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight">{cs.title}</h3>
                    <p className="mt-1 text-sm font-medium text-primary">{cs.client}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cs.summary}</p>

                    <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      <span className="font-semibold uppercase tracking-wider">My role:</span>
                      <span className="text-foreground">{cs.role}</span>
                    </div>

                    <ul className="mt-4 space-y-2">
                      {cs.contributions.map((c) => (
                        <li key={c} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {c}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {cs.metrics.map((m) => (
                        <div key={m.label} className="metric-card">
                          <div className="metric-value">{m.value}</div>
                          <div className="metric-label mt-1">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {cs.tech.map((t) => (
                        <Badge key={t} variant="outline" className="font-normal">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                  <ArchitectureDiagram layers={cs.arch} />
                  <div className="rounded-xl border border-border bg-card p-5 md:p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Engineering Notes
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{cs.archNote}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── MORE PROJECTS ── */}
      <section id="projects" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="animate-on-scroll mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="section-kicker mb-5">More Work</p>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">Selected projects</h2>
            </div>
            <p className="text-sm text-muted-foreground">A sample from 35+ delivered projects.</p>
          </div>

          <div className="animate-on-scroll grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {moreProjects.map((p) => (
              <div
                key={p.title}
                className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background">
                  <p.icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-bold">{p.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded border border-border px-1.5 py-0.5 text-[0.65rem] text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="animate-on-scroll mb-16">
            <p className="section-kicker mb-5">Experience</p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Career path</h2>
          </div>

          <div className="animate-on-scroll timeline-rail ml-2 space-y-10">
            {experiences.map((exp) => (
              <div key={`${exp.company}-${exp.period}`} className="relative pl-8">
                <span className="timeline-dot" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-base font-bold">{exp.title}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{exp.period}</span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-primary">{exp.company}</p>
                <ul className="mt-3 space-y-1.5">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span key={t} className="rounded border border-border px-1.5 py-0.5 text-[0.65rem] text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="animate-on-scroll rounded-2xl border border-border bg-card px-6 py-14 md:px-12 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mb-5 justify-center">Contact</p>
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">
                Let&apos;s build something that scales.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                Open to senior frontend roles, consulting, and long-term collaborations with
                teams that care about craft and reliability.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="mailto:dedikusniadi.bisnis@gmail.com">
                    <Rocket className="mr-2 h-4 w-4" />
                    Get in touch
                  </a>
                </Button>
                <Button variant="outline" size="lg" onClick={handleDownload}>
                  <FileCheck2 className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> Indonesia (remote-friendly)
                </span>
                <a href="https://www.linkedin.com/in/dedi-kusniadi" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                  LinkedIn
                </a>
                <a href="https://github.com/dedikusniadi2026" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Dedi Kusniadi · Senior Frontend Engineer</p>
          <p className="flex items-center gap-1.5">
            Built with <span className="font-semibold text-foreground">Next.js</span> &amp;
            <span className="font-semibold text-foreground">Tailwind CSS</span>
          </p>
        </div>
      </footer>

      <FloatingHireButton />
    </div>
  )
}
