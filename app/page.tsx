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
  Layers, MapPin, Menu, Rocket, Smartphone, Users, Zap, Mail, Linkedin, Lock
} from "lucide-react"

interface Metric { value: string; label: string }
interface CaseStudy {
  index: string; title: string; client: string; sector: string;
  image?: string; role: string; summary: string;
  contributions: string[]; metrics: Metric[]; tech: string[];
  arch: ArchLayer[]; archNote: string; didntWork: string; codeNote: string; photoNote?: string
}

const caseStudies: CaseStudy[] = [
  
  {
    index: "01",
    title: "Logistics Management System",
    client: "Freelance • National Logistics",
    sector: "Enterprise Logistics",
    image: "/gis.png",
    role: "Lead Frontend Engineer",
    summary: "National logistics operator, 1.2M parcels/year. Dispatchers complained map lag 30s on warehouse tablets — not on my MacBook.",
    contributions: [
      "Came in when dispatchers said map lag 30s — rewired tracking to WebSocket, now <1s",
      "Split big SPA into domain modules (Zustand) so 6 squads can ship without stepping on each other",
      "Warehouse tablets low-end Android — code-split Leaflet, lazy maps, 8.1s to 2.4s",
      "Old UI kit 35% defect per sprint — replaced with token-based system with designer",
    ],
    metrics: [
      { value: "30s to <1s", label: "Map lag after fix" },
      { value: "8.1s to 2.4s", label: "On low-end tablets" },
      { value: "2,000", label: "Dispatchers peak" },
      { value: "35% fewer", label: "UI bugs after tokens" },
    ],
    tech: ["React", "TypeScript", "Zustand", "Leaflet", "WebSocket"],
    arch: [
      { label: "Edge", items: ["CDN", "WAF"] },
      { label: "Client", items: ["React SPA", "Leaflet Maps"] },
      { label: "API Gateway", items: ["REST", "WebSocket"] },
      { label: "Services", items: ["Tracking", "Routing", "Auth"] },
      { label: "Data", items: ["PostgreSQL", "Redis cache"] },
    ],
    archNote: "First version put everything in one WebSocket — map froze when routing service slow. Split: tracking in Web Worker, routing separate REST. Zustand per domain so squads don't conflict.",
    didntWork: "First tried Redux single store — mess with 6 squads. Moved to Zustand per domain.",
    codeNote: "Code: https://github.com/dedikusniadi2026/logistics-tracking-fe | https://github.com/dedikusniadi2026/logistics-tracking-be | Sanitized rebuild, no company code.",
    photoNote: "Photo: NDA — can't show real tracking, using GIS mock. Real version has 2k dispatchers online."
  },
  {
    index: "02",
    title: "Enterprise Analytics Dashboard",
    client: "Retail Group • 250K MAU",
    sector: "Data & Analytics",
    image: "/dashboard.png",
    role: "Senior Frontend Engineer",
    summary: "Legacy report suite 60+ KPIs — first paint 8s, sales team complained. Needed to be less than 2s.",
    contributions: [
      "Led Vue 3 + Pinia rewrite — old reports were 12 separate pages",
      "Tried load all KPIs at once — 8s. Made summary pre-aggregated, detail on drill-down",
      "Virtualized tables (10k rows) else browser dies — used react-window",
      "Chart.js instances pooled — memory leak after 2 hours if not",
    ],
    metrics: [
      { value: "8s to <2s", label: "First paint after fix" },
      { value: "250K+", label: "Monthly active" },
      { value: "60+", label: "KPIs on one screen" },
      { value: "45% less", label: "Time building reports" },
    ],
    tech: ["Vue.js", "TypeScript", "Pinia", "Chart.js", "REST"],
    arch: [
      { label: "Edge", items: ["CDN"] },
      { label: "Client", items: ["Vue SPA", "Virtualized grids"] },
      { label: "API Gateway", items: ["REST", "Aggregation"] },
      { label: "Data", items: ["ClickHouse", "PostgreSQL"] },
    ],
    archNote: "Backend made summary endpoint for first paint, detail only on click. Virtualization keeps 10k rows smooth. Chart instances pooled and reused.",
    didntWork: "First version fetched detail for all 60 KPIs upfront — payload 4MB. Sales on 3G complained.",
    codeNote: "Code: Private — Retail Group GitLab. No public access due to NDA. Can walk through virtualization and aggregation logic in interview.",
  },
  {
    index: "03",
    title: "Telin Enterprise Portal — billing yang bikin support capek",
    client: "Telin (Telekomunikasi Indonesia Intl.)",
    sector: "Telecommunications",
    image: "/Telin.png",
    role: "Frontend Engineer",
    summary: "Self-service portal billing + service orders. Support ticket 30% cuma karena onboarding 5 step.",
    contributions: [
      "Rebuilt Angular 11 with lazy modules — bundle halved, but first split too aggressive (blank 2s)",
      "Cut onboarding 5 to 2 steps with product — activation up",
      "A11y 62 to 95 — mostly color contrast and keyboard nav",
      "Design tokens from Figma — stopped why is this blue different from QA",
    ],
    metrics: [
      { value: "5 to 2 steps", label: "Onboarding" },
      { value: "100K+", label: "Enterprise users" },
      { value: "30% fewer", label: "Support tickets" },
      { value: "Bundle /2", label: "After lazy modules" },
    ],
    tech: ["Angular", "TypeScript", "Bootstrap", "SCSS", "REST"],
    arch: [
      { label: "Edge", items: ["CDN", "WAF"] },
      { label: "Client", items: ["Angular SPA", "Lazy modules"] },
      { label: "API Gateway", items: ["REST", "OAuth2"] },
      { label: "Services", items: ["Billing", "Service Order", "Support"] },
      { label: "Data", items: ["Oracle DB", "Redis"] },
    ],
    archNote: "First lazy-load split too aggressive — users saw blank 2s. Rolled back, only split Billing + Support. Tokens from Figma keep 12 teams consistent.",
    didntWork: "What didn't work: first lazy-loading split was too aggressive, users saw blank screen 2s. Rolled back and only split Billing + Support modules.",
    codeNote: "Code: Private — Telin enterprise GitLab. No access after project end. NDA. Can explain lazy-load rollback and token system in interview.",
  },
  {
    index: "04",
    title: "E-Working Permit — dari kertas jadi 1 hari",
    client: "Industrial Group • Compliance",
    sector: "Compliance / HR",
    image: "/eworking.png",
    role: "Frontend Engineer",
    summary: "Paper process 5 days, lost documents. Need 100% paperless + audit trail.",
    contributions: [
      "Designed end-to-end flow Angular Material — request to sign-off, with draft save",
      "Step wizard with localStorage — if user closes tab, data not lost",
      "PDF generation + audit log — every click logged, compliance happy",
      "Conditional validation per step — cut submission errors 60%",
    ],
    metrics: [
      { value: "5d to 1d", label: "Approval cycle" },
      { value: "10K+", label: "Permits / month" },
      { value: "100%", label: "Paperless" },
      { value: "60% fewer", label: "Submission errors" },
    ],
    tech: ["Angular", "TypeScript", "Angular Material", "Karma/Jasmine", "REST"],
    arch: [
      { label: "Edge", items: ["CDN"] },
      { label: "Client", items: ["Angular SPA", "Step wizard"] },
      { label: "API Gateway", items: ["REST", "Auth"] },
      { label: "Services", items: ["Permit", "Approval", "Audit"] },
      { label: "Data", items: ["PostgreSQL", "Object storage"] },
    ],
    archNote: "Paper process 5 days, users hated it. Made wizard but kept draft in localStorage. Each step validates before next — reduced errors 60%.",
    didntWork: "First form was one big page — users lost data on refresh. Split to wizard + localStorage.",
    codeNote: "Code: Private — Industrial Group GitLab. NDA. Can demo wizard logic and audit trail approach.",
  },
  {
    index: "05",
    title: "ADA BSP — partner graph yang bikin pusing",
    client: "ADA Business Support Partner",
    sector: "Business Support Systems",
    image: "/ADA.png",
    role: "Frontend Engineer",
    summary: "Partner management network — relationship graph 4 levels deep, 1M data points/day. First version 5fps.",
    contributions: [
      "Implemented relationship graph D3.js — recursive broke on 4 levels, fixed with BFS",
      "50k rows in DOM = 5fps — moved to virtual list + memo, now 60fps",
      "Reusable chart components — before each team made own chart, colors random",
      "Route-level code split — login bundle first, D3 after auth (less than 2s perceived)",
    ],
    metrics: [
      { value: "5fps to 60fps", label: "Large list fix" },
      { value: "1M+", label: "Data points / day" },
      { value: "15+", label: "Data sources" },
      { value: "40% faster", label: "Cold start after split" },
    ],
    tech: ["Angular", "TypeScript", "Angular Material", "D3.js", "REST"],
    arch: [
      { label: "Edge", items: ["CDN"] },
      { label: "Client", items: ["Angular SPA", "D3 visualizations"] },
      { label: "API Gateway", items: ["REST", "Auth"] },
      { label: "Services", items: ["Partner", "Transaction", "Report"] },
      { label: "Data", items: ["PostgreSQL", "ClickHouse"] },
    ],
    archNote: "50k rows in DOM = 5fps. Memo + virtual list = 60fps. Partner graph recursive broke on 4 levels — fixed BFS. Login bundle first, D3 streams after auth.",
    didntWork: "First chart color random per team — user complained why partner A blue here, red there. Standardized tokens.",
    codeNote: "Code: Private — ADA enterprise GitLab (Axiata group). No public access. Hosted on Axiata GitLab, no access after Aug 2023.",
  },
]

const experiences = [
  { title: "Senior Frontend Engineer", company: "Axiata Digital Labs", period: "2020 — Aug 2023", highlights: ["Led frontend across 6 squads — SaaS, mobile, WordPress plugins", "Shared design system + cut page load 45% via code-splitting", "Left in Aug 2023 — code remains on Axiata GitLab (private, NDA)"], tech: ["React", "React Native", "TypeScript", "Angular", "Zustand"] },
  { title: "Senior Software Engineer", company: "Kreasi Digital Indo Utama", period: "Jan 2020 — May 2020", highlights: ["Frontend for restaurant POS — high-volume real-time orders", "Touch-screen + mobile ordering on sales floor"], tech: ["PHP", "Laravel", "React", "MySQL"] },
  { title: "Senior Software Engineer", company: "Ayo Media Network", period: "Oct 2019 — Dec 2019", highlights: ["Full-stack media platform 10M+ traffic", "Shipped iOS & Android with Flutter"], tech: ["Flutter", "CodeIgniter", "Laravel", "MySQL"] },
  { title: "Frontend Developer", company: "Bank BTPN Tbk", period: "Jun 2019 — Sep 2019", highlights: ["Back-office, compliance, risk tools — every button needs audit log", "Banking security standards — code on BTPN GitLab, NDA"], tech: ["Angular", "SCSS", "Node.js", "Angular Material"] },
  { title: "Web Developer", company: "Bisnis Indonesia Sibertama", period: "Jun 2018 — Aug 2019", highlights: ["Digital products for Bisnis Indonesia media network", "Editorial + subscription flows"], tech: ["CodeIgniter", "JavaScript", "MySQL", "jQuery"] },
  { title: "Software Developer", company: "Bisnis Indonesia", period: "Aug 2015 — Jul 2018", highlights: ["Built media platform + native mobile apps", "Full lifecycle requirements to prod"], tech: ["AngularJS", "Flutter", "CodeIgniter", "Ionic"] },
  { title: "Junior Software Developer", company: "Springfields", period: "Aug 2013 — Dec 2013", highlights: ["Internal apps + public service portals", "First job — learned secure code from day one"], tech: ["PHP", "CodeIgniter", "MySQL", "CSS"] },
]

const techCategories = [
  { title: "Frameworks", items: ["React", "Next.js 14", "Angular", "Vue.js", "Flutter"] },
  { title: "State & Data", items: ["Zustand", "TanStack Query", "Redux", "Pinia", "REST", "GraphQL"] },
  { title: "Styling & UI", items: ["Tailwind CSS", "SCSS", "Bootstrap", "Angular Material", "Figma"] },
  { title: "Testing & Quality", items: ["Jest", "Vitest", "Playwright", "Cypress", "Karma/Jasmine"] },
  { title: "Tooling & Delivery", items: ["Webpack", "Vite", "Docker", "CI/CD", "Git"] },
  { title: "Backend & Infra", items: ["Node.js", "Nest.js", "Redis", "RabbitMQ", "Firebase"] },
]

const moreProjects = [
  { icon: Zap, title: "XL — BAU Automation", desc: "Automation platform for XL Axiata ops. Code on Axiata GitLab (NDA).", tech: ["Angular", "Angular Material"] },
  { icon: Code2, title: "Axonect", desc: "Enterprise Angular + unit tests. Coverage 40% to 85%. Code on Axiata GitLab.", tech: ["Angular", "Figma"] },
  { icon: Layers, title: "Widget Accessibility", desc: "WordPress plugin TensorFlow.js. A11y not sexy but needed.", tech: ["TensorFlow.js", "JavaScript"] },
  { icon: Smartphone, title: "Ayo Jakarta", desc: "Flutter + Firebase for Jakarta city services.", tech: ["Flutter", "Firebase"] },
  { icon: Gauge, title: "Point of Sale", desc: "POS with Recoil — touch screen laggy before fix.", tech: ["React", "Recoil"] },
  { icon: Globe2, title: "Koran Bisnis", desc: "Digital newspaper — paywall logic tricky.", tech: ["CodeIgniter", "Bootstrap"] },
]

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target) } })
    }, { threshold: 0, rootMargin: "0px 0px -60px 0px" })
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const navItems = ["About", "Case Studies", "Experience", "Contact"]
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/CV-Dedi-Kusniadi-Frontend.pdf"
    link.download = "CV-Dedi-Kusniadi-Frontend.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "nav-blur" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-xs font-black text-primary-foreground">DK</span>
            <span className="text-sm font-semibold tracking-tight">Dedi Kusniadi</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (<a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{item}</a>))}
            <ThemeToggle />
            <Button asChild size="sm"><a href="#contact">Hire Me</a></Button>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent">
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col gap-1 pt-12">
                {navItems.map((item) => (<a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="rounded-md px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">{item}</a>))}
                <Button asChild size="sm" className="mt-4"><a href="#contact">Hire Me</a></Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section id="top" className="hero-backdrop relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-16 md:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28">
          <div className="animate-fade-in-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Available for new opportunities • Bandung to Remote
            </div>
            <p className="section-kicker mb-6">Senior Frontend Engineer · 13+ years • React / Next.js</p>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              I have spent 13 years fixing slow dashboards and messy frontend code.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Previously led frontend at Axiata Digital Labs (2020-2023), BTPN banking compliance, and national logistics handling 1.2M shipments/year. Most of it was not greenfield — I came in when it was already slow and had users.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <a href="mailto:dedikusniadi.bisnis@gmail.com" className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline"><Mail className="h-3.5 w-3.5" />dedikusniadi.bisnis@gmail.com</a>
              <span>•</span>
              <a href="https://www.linkedin.com/in/dedi-kusniadi" target="_blank" className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline"><Linkedin className="h-3.5 w-3.5" />linkedin.com/in/dedi-kusniadi</a>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><a href="#case-studies">View Case Studies <ArrowRight className="ml-2 h-4 w-4" /></a></Button>
              <Button variant="outline" size="lg" onClick={handleDownload}><Briefcase className="mr-2 h-4 w-4" />Download CV (ATS)</Button>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
              {[["13+", "Years"], ["35+", "Projects"], ["250K+", "Daily users"], ["1.2M+", "Shipments/yr"]].map(([v,l]) => (
                <div key={l} className="flex flex-col bg-card px-4 py-3.5"><dt className="text-2xl font-black tracking-tight">{v}</dt><dd className="text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">{l}</dd></div>
              ))}
            </dl>
          </div>
          <div className="animate-fade-in-up relative" style={{ animationDelay: "120ms" }}>
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="overflow-hidden rounded-xl border border-border">
                <Image src="/1609985817736.jpg" alt="Dedi Kusniadi" width={640} height={800} priority className="aspect-[4/5] w-full object-cover" />
              </div>
              <div className="absolute -bottom-5 left-1/2 w-[86%] -translate-x-1/2 rounded-lg border border-border bg-card px-4 py-3 shadow-lg">
                <p className="text-xs font-semibold">Ex-Axiata Digital Labs • Open to Work • Available Immediately</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Bandung to Remote • 13+ years • React / Next.js / TypeScript</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="animate-on-scroll mb-14 grid gap-8 lg:grid-cols-[1fr_0.6fr]">
            <div>
              <p className="section-kicker mb-5">About — a bit more honest</p>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl leading-[1.1]">13 years fixing frontends<br/>that already had users.</h2>
            </div>
            <div className="lg:pt-2">
              <p className="text-sm leading-relaxed text-muted-foreground">I started 2013 from KPK gratification system, then media (Bisnis Indonesia), banking compliance (BTPN), telecom (Telin, Axiata), and logistics. Most jobs were not greenfield — I came in when dashboard was slow or support tickets piling up.</p>
              <p className="mt-3 text-xs font-mono text-muted-foreground/70">Bandung to Remote • Open to Work • Available Immediately</p>
            </div>
          </div>
          <div className="animate-on-scroll grid gap-10 lg:grid-cols-2">
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>What I usually do: take over frontend that is hard to maintain, split into modules so teams do not step on each other, build simple token system with designer, and cut load time where it hurts — often on low-end tablets in warehouses, not on my MacBook.</p>
              <p>At Axiata I led frontend across 6 squads. At BTPN I learned banking audit is no joke — every button needs log. At logistics (freelance, 1.2M/year) I learned map lag 30s is not UI bug, it is driver waiting outside.</p>
              <p className="rounded-md border border-amber-200/50 bg-amber-50/50 p-3 text- leading-relaxed text-amber-900 dark:border-amber-900/30 dark:bg-amber-950/20 dark:text-amber-200/80">
                <span className="font-semibold">Update 2024-2026:</span> After Axiata (Aug 2023), I focused on rebuilding stack from Angular-heavy to React / Next.js 14 + Zustand + TanStack Query and shipped freelance logistics (1.2M shipments/year). Now also building Security Platform (React + NestJS) — local dev, pushing to GitHub. Open to senior remote roles.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 md:p-7">
              <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-foreground">Technology focus — what I actually use in 2025-2026</h3>
              <p className="mb-5 text-xs text-muted-foreground">Sorted by what I use most now, not 2015.</p>
              <div className="space-y-5">
                {techCategories.map((cat) => (
                  <div key={cat.title}><p className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary">{cat.title}</p>
                    <div className="flex flex-wrap gap-1.5">{cat.items.map((tech) => (<Badge key={tech} variant="outline" className="font-normal">{tech}</Badge>))}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="case-studies" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="animate-on-scroll mb-16 max-w-2xl">
            <p className="section-kicker mb-5">Case Studies — real projects, real mess</p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Selected work, in depth.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">  5 flagship projects — what worked, what didn't, and what I'd do differently now.</p>
          </div>
          <div className="space-y-16 md:space-y-24">
            {caseStudies.map((cs, i) => (
              <article key={cs.title} className="animate-on-scroll scroll-mt-24">
                <div className={`grid gap-8 lg:grid-cols-2 lg:gap-14 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative">
                    <div className="overflow-hidden rounded-xl border border-border">
                      {cs.image ? <Image src={cs.image} alt={cs.title} width={720} height={460} className="aspect-[16/10] w-full object-cover" /> : <div className="flex aspect-[16/10] w-full items-center justify-center bg-muted"><Layers className="h-10 w-10 text-muted-foreground/40" /></div>}
                    </div>
                    {cs.photoNote && <p className="mt-2 text- italic text-muted-foreground/70">{cs.photoNote}</p>}
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-4 flex items-baseline gap-3">
                      <span className="font-mono text-sm font-bold text-muted-foreground">{cs.index}</span>
                      <span className="rounded-full border border-border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">{cs.sector}</span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight">{cs.title}</h3>
                    <p className="mt-1 text-sm font-medium text-primary">{cs.client}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cs.summary}</p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><Users className="h-3.5 w-3.5" /><span className="font-semibold uppercase tracking-wider">My role:</span><span className="text-foreground">{cs.role}</span></div>
                    <ul className="mt-4 space-y-2">
                      {cs.contributions.map((c) => (<li key={c} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"><span className="mt- h-1 w-1 shrink-0 rounded-full bg-primary" />{c}</li>))}
                    </ul>
                    <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {cs.metrics.map((m) => (
                        <div key={m.label} className="metric-card"><div className="metric-value text- font-bold">{m.value}</div><div className="metric-label mt-1 text- leading-tight">{m.label}</div></div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-md border border-border bg-muted/30 p-3">
                      <p className="text-xs font-semibold">What did not work:</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{cs.didntWork}</p>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 rounded-md border border-amber-200/40 bg-amber-50/40 px-2.5 py-1.5 dark:bg-amber-950/20">
                      <Lock className="h-3 w-3 text-amber-700 dark:text-amber-300" />
                      <p className="text- leading-relaxed text-amber-800 dark:text-amber-200/80">{cs.codeNote}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">{cs.tech.map((t) => (<Badge key={t} variant="outline" className="font-normal">{t}</Badge>))}</div>
                  </div>
                </div>
                <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                  <ArchitectureDiagram layers={cs.arch} />
                  <div className="rounded-xl border border-border bg-card p-5 md:p-6">
                    <div className="mb-3 flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" /><span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Engineering Notes — honest version</span></div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{cs.archNote}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

     <section id="contact" className="scroll-mt-20 border-t border-border">
  <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
    <div className="animate-on-scroll rounded-2xl border border-border bg-card px-6 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="section-kicker mb-5 justify-center">Contact</p>
        <h2 className="text-3xl font-black tracking-tight md:text-5xl">
          Let us build something that scales — or fix something that does not.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          Open to senior frontend roles, consulting, and long-term collaborations. 
          Code from Axiata/BTPN/Telin is private on enterprise GitLab (NDA) — I can walk through architecture in interview. 
          Current 2026 code (Security Platform) will be public on GitHub.
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

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Built by Dedi — Bandung 2026 • 13 years and still debugging IE quirks in my head</p>
          <p className="flex items-center gap-1.5">Previously: Axiata • BTPN • Telin • Bisnis Indonesia • KPK system</p>
        </div>
      </footer>

      <FloatingHireButton />
    </div>
  )
}