"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArchitectureDiagram, type ArchLayer } from "@/components/architecture-diagram"
import { FloatingHireButton } from "@/components/floating-hire-button"
import {
  ArrowRight, ArrowUpRight, Briefcase, Rocket, Code2, Shield, BookOpen,
  Menu, Mail, Linkedin, Github, Download, Send, MapPin, Clock, Sparkles,
  Layers, Lock, ExternalLink, Users, Gauge, CheckCircle2, TrendingUp, AlertTriangle
} from "lucide-react"

interface Metric { value: string; label: string }
interface CaseStudy {
  index: string; title: string; cardTitle: string; cardSubtitle: string; client: string; sector: string;
  badge?: string;
  image?: string; role: string; summary: string;
  contributions: string[]; metrics: Metric[]; tech: string[];
  arch: ArchLayer[]; archNote: string; didntWork: string; codeNote: string; liveDemo?: string; github?: string; photoNote?: string
}

const caseStudies: CaseStudy[] = [
  {
    index: "01",
    title: "Logistics Tracking System — 30s → <1s",
    cardTitle: "Logistics Tracking",
    cardSubtitle: "National scale real-time map",
    client: "Freelance • National Logistics",
    sector: "Enterprise Logistics",
    badge: "Independent / Open Source • Mar 2026 — Present • Full Stack R&D",
    image: "/gis.png",
    role: "Fullstack Developer",
    summary: "National logistics operator, 1.2M parcels/year. 2,000 dispatchers peak. Map lagged 30s on low-end Android tablets in warehouses — drivers waiting outside.",
    contributions: [
      "Rewired real-time tracking to WebSocket + Web Worker, now <1s updates",
      "Split big SPA into domain modules (Zustand per-domain) so 6 squads ship without conflicts",
      "Code-split Leaflet, lazy maps — LCP 8.1s → 2.4s on low-end tablets",
      "Replaced old UI kit (35% defect/sprint) with Figma token-based design system",
    ],
    metrics: [
      { value: "30s → <1s", label: "Map lag after fix" },
      { value: "8.1s → 2.4s", label: "LCP on low-end tablets" },
      { value: "2,000", label: "Dispatchers peak" },
      { value: "35% fewer", label: "UI bugs after tokens" },
    ],
    tech: ["React", "TypeScript", "Zustand", "Leaflet", "WebSocket", "Web Worker"],
    arch: [
      { label: "Edge", items: ["CDN", "WAF"] },
      { label: "Client", items: ["React SPA", "Leaflet Maps", "Web Worker"] },
      { label: "API Gateway", items: ["REST", "WebSocket"] },
      { label: "Services", items: ["Tracking", "Routing", "Auth"] },
      { label: "Data", items: ["PostgreSQL", "Redis cache"] },
    ],
    archNote: "First version put everything in one WebSocket — map froze when routing service slow. Split: tracking in Web Worker, routing separate REST. Zustand per domain so squads don't conflict.",
    didntWork: "First tried Redux single store — mess with 6 squads. Moved to Zustand per domain.",
    codeNote: "Real code private under NDA (1.2M shipments/yr, 2K dispatchers). Sanitized rebuild above is open — FE-only mock, no server needed, mock WebSocket <1s.",
    photoNote: "Sanitized GIS mock — real version has 2k dispatchers live. Live demo uses mock WebSocket <1s."
  },
  {
    index: "02",
    title: "Enterprise Analytics Dashboard — 8s → <2s",
    cardTitle: "Analytics Dashboard",
    cardSubtitle: "60+ KPIs, 250K monthly users",
    client: "Retail Group • 250K MAU",
    sector: "Data & Analytics",
    image: "/dashboard.png",
    role: "Fullstack Developer",
    summary: "Legacy report suite 60+ KPIs — first paint 8s, sales team on 3G complained. Needed <2s.",
    contributions: [
      "Led Vue 3 + Pinia rewrite — old reports were 12 separate pages",
      "Summary pre-aggregated for first paint, detail on drill-down — payload 4MB → <400KB",
      "Virtualized tables (10k rows) with react-window — browser no longer dies",
      "Pooled Chart.js instances — fixed memory leak after 2 hours",
    ],
    metrics: [
      { value: "8s → <2s", label: "First paint after fix" },
      { value: "250K+", label: "Monthly active" },
      { value: "60+", label: "KPIs on one screen" },
      { value: "45% less", label: "Time building reports" },
    ],
    tech: ["Vue.js", "TypeScript", "Pinia", "Chart.js", "react-window", "REST"],
    arch: [
      { label: "Edge", items: ["CDN"] },
      { label: "Client", items: ["Vue SPA", "Virtualized grids"] },
      { label: "API Gateway", items: ["REST", "Aggregation"] },
      { label: "Data", items: ["ClickHouse", "PostgreSQL"] },
    ],
    archNote: "Backend made summary endpoint for first paint, detail only on click. Virtualization keeps 10k rows smooth. Chart instances pooled and reused.",
    didntWork: "First version fetched detail for all 60 KPIs upfront — payload 4MB. Sales on 3G complained.",
    codeNote: "Real code private under NDA. Sanitized virtualization demo above — 50k rows 5fps → 60fps.",
  },
  {
    index: "03",
    title: "Telin Enterprise Portal — Cut 30% Support Tickets",
    cardTitle: "Telin Portal",
    cardSubtitle: "Enterprise self-service, 100K+ users",
    client: "Telin (Telekomunikasi Indonesia International) • 100K+ users",
    sector: "Telecommunications",
    image: "/Telin.png",
    role: "Senior Frontend Engineer",
    summary: "Self-service billing + service orders. 30% support tickets were onboarding confusion (5 steps).",
    contributions: [
      "Rebuilt Angular 11 with lazy modules — bundle halved, careful split to avoid 2s blank",
      "Cut onboarding 5 → 2 steps with product — activation up",
      "A11y 62 → 95 — color contrast + keyboard nav + screen reader",
      "Figma token system — stopped 'why is this blue different' from QA",
    ],
    metrics: [
      { value: "5 → 2 steps", label: "Onboarding" },
      { value: "100K+", label: "Enterprise users" },
      { value: "30% fewer", label: "Support tickets" },
      { value: "Bundle /2", label: "After lazy modules" },
    ],
    tech: ["Angular", "TypeScript", "Bootstrap", "SCSS", "REST", "Figma Tokens"],
    arch: [
      { label: "Edge", items: ["CDN", "WAF"] },
      { label: "Client", items: ["Angular SPA", "Lazy modules"] },
      { label: "API Gateway", items: ["REST", "OAuth2"] },
      { label: "Services", items: ["Billing", "Service Order", "Support"] },
      { label: "Data", items: ["Oracle DB", "Redis"] },
    ],
    archNote: "First lazy-load split too aggressive — users saw blank 2s. Rolled back, only split Billing + Support. Tokens from Figma keep 12 teams consistent.",
    didntWork: "First lazy-load split too aggressive, users saw blank screen 2s. Rolled back and only split Billing + Support modules.",
    codeNote: "Real code private on Telin GitLab (NDA). Sanitized design token + lazy-load demo above.",
  },
  {
    index: "04",
    title: "E-Working Permit — BTS & Office Guest Permit (5 Days → 1 Day)",
    cardTitle: "E-Working Permit",
    cardSubtitle: "BTS permit wizard, 10K+/month",
    client: "XLSmart (ex-XL Axiata) • ewp.newxlife.xlsmart.co.id • Compliance",
    sector: "Compliance / HR / Safety",
    image: "/eworking.png",
    role: "Senior Frontend Engineer",
    summary: "Working Permit (EWP) — Electronic Permit to Work for BTS Operations + Office Guest Management (ewp.newxlife.xlsmart.co.id): Internal XL Axiata app for BTS maintenance permits (not work visa) — workflow Request→Site Info→Safety Assessment→Multi-level Approval→Permit Issued→Closure (DRAFT→CLOSED). RBAC, Angular Material wizard + localStorage draft, camera selfie for office guest check-in (external visitors must selfie on entry to XL office), PDF + audit trail, 5d→1d, 10K+/month, 100% paperless — Live: ewp.newxlife.xlsmart.co.id/login",
    contributions: [
      "Built wizard Angular Material with draft save + localStorage — data not lost on tab close/refresh",
      "Implemented RBAC, multi-level approval, status management DRAFT→CLOSED + REJECTED/CANCELLED",
      "Added camera selfie feature for office guest check-in — external visitors must selfie on entry to XL office (Camera API + file input fallback)",
      "PDF generation + audit log + notification system — every click logged, compliance happy — 60% fewer errors"
    ],
    metrics: [
      { value: "5d → 1d", label: "Approval cycle" },
      { value: "10K+", label: "Permits / month" },
      { value: "Camera", label: "Selfie for guest check-in" },
      { value: "100%", label: "Paperless" }
    ],
    tech: ["Angular","TypeScript","Angular Material","Camera API","RBAC","REST","PDF Gen"],
    arch: [
      { label: "Edge", items: ["CDN"] },
      { label: "Client", items: ["Angular SPA", "Step wizard"] },
      { label: "API Gateway", items: ["REST", "Auth"] },
      { label: "Services", items: ["Permit", "Approval", "Audit"] },
      { label: "Data", items: ["PostgreSQL", "Object storage"] },
    ],
    archNote: "Paper process 5 days, users hated it. Made wizard but kept draft in localStorage. Each step validates before next — reduced errors 60%.",
    didntWork: "First form was one big page — users lost data on refresh. Split to wizard + localStorage.",
    codeNote: "Real code private on enterprise GitLab (NDA). Can demo wizard logic and audit trail approach in interview.",
    liveDemo: "https://ewp.newxlife.xlsmart.co.id/login",
  },
  {
    index: "05",
    title: "ADA Business Messaging Core — WhatsApp BSP Platform",
    cardTitle: "ADA Biz Messaging",
    cardSubtitle: "WhatsApp BSP, 1000+ accounts",
    client: "ADA Asia • bizmsgcore.ada-asia.com • WhatsApp BSP",
    sector: "Business Messaging / MarTech",
    image: "/ADA.png",
    role: "Frontend Engineer",
    summary: "Business messaging platform — bizmsgcore.ada-asia.com. ADA is official WhatsApp Business Solution Provider (BSP) in APAC. Unified inbox for WhatsApp, SMS, LINE, RCS. Login with verified email.",
    contributions: [
      "Implemented multi-channel inbox (WhatsApp, SMS, LINE, RCS) — unified messaging solution",
      "Built template messages, broadcast, and conversation assignment for 1000+ business accounts",
      "Auth with verified email + Microsoft Authentication Library (MSAL), Remember Me, Forgot Password",
      "Route-level code split — login bundle first, messaging modules after auth (<2s perceived)",
    ],
    metrics: [
      { value: "1000+", label: "Business accounts" },
      { value: "4 channels", label: "WA, SMS, LINE, RCS" },
      { value: "BSP", label: "WhatsApp Business Provider" },
      { value: "40% faster", label: "Cold start after split" },
    ],
    tech: ["Angular", "TypeScript", "Angular Material", "MSAL", "REST", "WhatsApp Business API"],
    arch: [
      { label: "Edge", items: ["CDN", "CloudFront"] },
      { label: "Client", items: ["Angular SPA", "MSAL Auth", "Multi-channel inbox"] },
      { label: "API Gateway", items: ["REST", "Auth", "WhatsApp BSP API"] },
      { label: "Services", items: ["Messaging", "Template", "Broadcast"] },
      { label: "Data", items: ["PostgreSQL", "ClickHouse"] },
    ],
    archNote: "Similar pattern to Telin WA platform but for ADA Asia as BSP. MSAL for auth, route split for messaging modules. Multi-channel means one codebase for WA/SMS/LINE/RCS.",
    didntWork: "First tried load all messaging channels in one bundle — login slow. Split: login first, then load channel modules on demand.",
    codeNote: "Live at bizmsgcore.ada-asia.com — real code private on Axiata/ADA GitLab (NDA). Same business messaging pattern as Telin WA platform. Can walk through MSAL + multi-channel inbox in interview.",
    photoNote: "Live platform: bizmsgcore.ada-asia.com — WhatsApp Business Solution Provider (BSP) portal.",
    liveDemo: "https://bizmsgcore.ada-asia.com",
  },
]

interface Experience { company: string; role: string; period: string; note?: string }

const experiences: Experience[] = [
  { company: "Independent / Open Source", role: "Full Stack R&D", period: "2026 — Present" },
  { company: "Axiata Digital Labs", role: "Senior Frontend Engineer", period: "Aug 2023 — Mar 2026" },
  { company: "Axiata Digital Labs", role: "Frontend Engineer", period: "Jul 2020 — Aug 2023" },
  { company: "Other Companies", role: "Various Roles", period: "2013 — 2020" },
]

const earlierExperiences: Experience[] = [
  { company: "PT Kreasi Digital", role: "Senior Full Stack", period: "Jan — May 2020", note: "POS SaaS (React, Angular, Laravel)" },
  { company: "Ayo Media", role: "Senior Web Dev", period: "Oct — Dec 2019", note: "Flutter Android & iOS" },
  { company: "BTPN", role: "Frontend", period: "Jun — Sep 2019", note: "Joint Financial System OJK & BI" },
  { company: "Bisnis Indonesia", role: "Web Dev", period: "2018 — 2019", note: "bisnis.com & Gramedia" },
  { company: "Bisnis Indonesia Group", role: "Software Dev", period: "2015 — 2018", note: "Biofarma eMagazine" },
  { company: "Springfields Asia", role: "Junior", period: "2013", note: "KPK Gratification System" },
]

const techStack = [
  { name: "React", logo: "/tech/react.svg" },
  { name: "Angular", logo: "/tech/angular.svg" },
  { name: "TypeScript", logo: "/tech/typescript.svg" },
  { name: "Next.js", logo: "/tech/nextjs.svg" },
  { name: "NestJS", logo: "/tech/nestjs.svg" },
  { name: "Laravel", logo: "/tech/laravel.svg" },
  { name: "PHP", logo: "/tech/php.svg" },
  { name: "Node.js", logo: "/tech/nodejs.svg" },
  { name: "PostgreSQL", logo: "/tech/postgresql.svg" },
  { name: "Redis", logo: "/tech/redis.svg" },
  { name: "Docker", logo: "/tech/docker.svg" },
  { name: "RabbitMQ", logo: "/tech/rabbitmq.svg" },
]

const aboutHighlights = [
  { icon: Rocket, title: "13+ Years of Experience", note: "Enterprise frontend since 2013" },
  { icon: Shield, title: "Secure & Performant Applications", note: "Bank-grade auth, <2s loads" },
  { icon: Code2, title: "Clean Code & Best Practices", note: "Design tokens, RBAC, a11y 95" },
  { icon: BookOpen, title: "Continuous Learning", note: "React 19, WebSocket, Web Worker" },
]

const skillGroups = [
  { icon: Sparkles, title: "Core 2025-2026", items: ["React", "Next.js 14", "TypeScript", "Zustand", "TanStack Query"] },
  { icon: Users, title: "Business Messaging", items: ["WhatsApp Business API", "BSP", "MSAL", "Multi-channel (WA/SMS/LINE/RCS)"] },
  { icon: Gauge, title: "Performance", items: ["WebSocket", "Web Worker", "Leaflet", "react-window", "LCP Optimization"] },
  { icon: CheckCircle2, title: "Quality", items: ["A11y 95", "Lighthouse", "Code Splitting", "Figma Tokens"] },
]

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dedi-kusniadi", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/dedikusniadi2026", icon: Github },
  { label: "Email", href: "mailto:dedikusniadi.bisnis@gmail.com", icon: Mail },
]

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("home")
  const [showAllExp, setShowAllExp] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target) }
      })
    }, { threshold: 0, rootMargin: "0px 0px -60px 0px" })
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: "-45% 0px -50% 0px" })
    navItems.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) spy.observe(el)
    })
    return () => spy.disconnect()
  }, [])

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/CV-Dedi-Kusniadi-Frontend.pdf"
    link.download = "CV-Dedi-Kusniadi-Frontend.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ================= NAV ================= */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "nav-blur" : ""}`}>
        <div className="shell flex h-[76px] items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="logo-mark h-10 w-10 text-sm">DK</span>
            <span className="text-[15px] font-bold tracking-tight">Dedi Kusniadi</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map(({ label, href }) => {
              const isActive = active === href.slice(1)
              return (
                <a key={label} href={href}
                   className={`relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                  {label}
                  {isActive && <span className="absolute inset-x-4 -bottom-0.5 h-[3px] rounded-full bg-primary" />}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild className="btn-pill hidden bg-primary px-5 text-primary-foreground shadow-[0_12px_26px_-14px_rgba(37,99,235,0.9)] md:inline-flex">
              <a href="#contact"><Send className="mr-1.5 h-4 w-4" />Let's Talk</a>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card lg:hidden" aria-label="Open menu">
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-[300px] flex-col gap-1 pt-14">
                {navItems.map(({ label, href }) => (
                  <a key={label} href={href} className="rounded-xl px-3 py-2.5 text-base font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">{label}</a>
                ))}
                <Button variant="outline" className="btn-pill mt-3" onClick={handleDownload}><Download className="mr-2 h-4 w-4" />Download CV</Button>
                <Button asChild className="btn-pill mt-2"><a href="#contact">Let's Talk</a></Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section id="home" className="hero-canvas pt-[76px]">
        <span className="hero-slash hidden lg:block" aria-hidden />
        <div className="shell relative grid items-start gap-12 pb-14 pt-8 md:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-20">
          <div className="animate-fade-in-up relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-semibold shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
              Senior Frontend &amp; Full-Stack Developer
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">Dedi Kusniadi</h1>
            <h2 className="mt-4 max-w-xl text-2xl font-bold leading-tight text-primary/90 sm:text-[28px]">
              Crafting Scalable Web Applications with Modern Technologies
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              13+ years of experience in building high-quality, secure, and user-focused web applications —
              from national logistics maps to WhatsApp BSP platforms used by 1000+ businesses.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="btn-pill bg-primary px-6 text-[15px] text-primary-foreground shadow-[0_16px_30px_-16px_rgba(37,99,235,0.95)]">
                <a href="#projects">View My Projects <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" onClick={handleDownload}
                      className="btn-pill border-border bg-card px-6 text-[15px] font-semibold hover:bg-secondary">
                <Briefcase className="mr-2 h-4 w-4" />Download CV
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              {socials.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="social-dot">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <span className="ml-2 text-xs font-medium text-muted-foreground">Open to Remote • Available Now</span>
            </div>
          </div>

          <div className="animate-fade-in-up relative z-10 pr-4 lg:pr-0" style={{ animationDelay: "120ms" }}>
            <span className="dot-grid right-6 top-0 hidden lg:block" aria-hidden />
            <div className="relative mx-auto max-w-[380px] lg:max-w-none">
              <div className="pointer-events-none absolute inset-x-8 bottom-4 top-12 z-0 rounded-full bg-primary/10 blur-3xl" aria-hidden />
              <Image src="/images/avatar-3d.png" alt="Dedi Kusniadi — Senior Frontend Engineer" width={760} height={1140}
                     priority
                     className="relative z-[1] mx-auto aspect-[2/3] w-full max-w-[400px] object-contain drop-shadow-[0_28px_40px_rgba(15,40,90,0.28)] [mask-image:linear-gradient(to_bottom,#000_92%,transparent_99%)]" />
              <div className="soft-card absolute -bottom-6 -left-3 hidden w-[250px] px-4 py-3 sm:block">
                <p className="flex items-center gap-2 text-xs font-bold">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-success" />Ex-Axiata Digital Labs
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  WhatsApp BSP • React / Next.js / Angular • 100K+ users
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech stack strip */}
        <div className="shell relative z-10 pb-16">
          <div className="soft-card flex flex-col gap-6 px-6 py-6 lg:flex-row lg:items-center lg:gap-10">
            <div className="shrink-0">
              <p className="text-[15px] font-bold">Tech Stack</p>
              <p className="text-xs text-muted-foreground">Technologies I work with</p>
            </div>
            <div className="grid flex-1 grid-cols-3 items-start gap-x-3 gap-y-5 sm:grid-cols-4 lg:grid-cols-12 lg:border-l lg:pl-8">
              {techStack.map(({ name, logo }) => (
                <div key={name} className="tech-item">
                  <Image src={logo} alt={name} width={48} height={48} unoptimized />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="scroll-mt-24 py-16 md:py-20">
        <div className="shell grid items-center gap-10 lg:grid-cols-[0.9fr_1fr_0.8fr] lg:gap-12">
          <div className="animate-on-scroll img-reveal border border-border">
            <Image src="/images/about-workspace.png" alt="Developer workspace" width={900} height={700}
                   className="aspect-[4/3] w-full object-cover" />
          </div>

          <div className="animate-on-scroll">
            <p className="kicker mb-4">About Me</p>
            <h2 className="section-head">Building Better Digital Experiences</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              I'm <strong className="text-foreground">Dedi Kusniadi</strong>, a Senior Frontend &amp; Full-Stack Developer
              with 13+ years of experience building scalable web applications. I love turning complex problems —
              a 30-second map, a 4MB payload, a 5-day approval form — into simple, elegant solutions.
            </p>
            <Button asChild variant="outline" className="btn-pill mt-6 border-primary/40 bg-card px-5 text-primary hover:bg-secondary">
              <a href="#experience">More About Me <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
          </div>

          <ul className="animate-on-scroll space-y-4">
            {aboutHighlights.map(({ icon: Icon, title, note }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="icon-badge shrink-0"><Icon className="h-5 w-5" /></span>
                <div>
                  <p className="text-sm font-bold leading-snug">{title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= EXPERIENCE + FEATURED PROJECTS ================= */}
      <section className="pb-16 md:pb-20">
        <div className="shell grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-12">
          <div id="experience" className="animate-on-scroll scroll-mt-24">
            <div className="mb-2 flex items-center gap-2">
              <h2 className="section-head text-[26px]">Experience</h2>
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
            <p className="mb-7 text-sm text-muted-foreground">My Professional Journey</p>

            <div className="timeline-rail space-y-6">
              {(showAllExp ? [...experiences.slice(0, 3), ...earlierExperiences] : experiences).map((exp) => (
                <div key={`${exp.company}-${exp.period}`} className="timeline-item">
                  <p className="text-[15px] font-bold leading-snug">{exp.company}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{exp.role}</p>
                  <p className="mt-0.5 text-xs font-semibold text-primary">{exp.period}</p>
                  {exp.note && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{exp.note}</p>}
                </div>
              ))}
            </div>

            <Button variant="outline" onClick={() => setShowAllExp((v) => !v)}
                    className="btn-pill mt-8 border-border bg-card px-5 text-sm hover:bg-secondary">
              {showAllExp ? "Show Less Experience" : "View All Experience"}
              <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${showAllExp ? "-rotate-90" : "rotate-90"}`} />
            </Button>
          </div>

          <div id="projects" className="animate-on-scroll scroll-mt-24">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <h2 className="section-head text-[26px]">Featured Projects</h2>
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Selected works that showcase my skills</p>
              </div>
              <a href="#case-studies" className="link-group text-sm font-semibold text-primary">
                View All Projects <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
              {caseStudies.map((cs, i) => (
                <a key={cs.index} href="#case-studies"
                   className={`group card-lift soft-card overflow-hidden ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"} ${i === 4 ? "sm:col-span-2" : ""}`}>
                  <div className="img-reveal rounded-none border-0">
                    <Image src={cs.image || "/dashboard.png"} alt={cs.cardTitle} width={600} height={400}
                           className="aspect-[16/10] w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold leading-snug">{cs.cardTitle}</p>
                      {cs.liveDemo && (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" /> Live
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{cs.cardSubtitle}</p>
                    <div className="mt-3.5 flex items-end justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {cs.tech.slice(0, 3).map((t) => (<span key={t} className="tag-pill">{t}</span>))}
                      </div>
                      <span className="arrow-circle shrink-0"><ArrowUpRight className="h-4 w-4" /></span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CASE STUDIES (detail) ================= */}
      <section id="case-studies" className="scroll-mt-24 border-t border-border bg-secondary/40 py-16 md:py-20">
        <div className="shell">
          <div className="animate-on-scroll mb-12 max-w-2xl">
            <p className="kicker mb-4">Case Studies</p>
            <h2 className="section-head text-[clamp(1.8rem,3.4vw,2.6rem)]">Selected work, in depth.</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              5 flagship projects including 2 WhatsApp BSP platforms (Telin + ADA bizmsgcore).
              Real code is under NDA — sanitized rebuilds and honest engineering notes below.
            </p>
          </div>

          <div className="space-y-10">
            {caseStudies.map((cs) => (
              <article key={cs.title} className="animate-on-scroll cs-card scroll-mt-24">
                <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
                  <div>
                    <div className="img-reveal group relative border border-border shadow-[0_18px_40px_-24px_rgba(11,27,58,0.35)]">
                      {cs.image
                        ? <Image src={cs.image} alt={cs.title} width={760} height={480} className="aspect-[16/10] w-full rounded-[var(--radius-lg)] object-cover" />
                        : <div className="flex aspect-[16/10] w-full items-center justify-center bg-muted"><Layers className="h-10 w-10 text-muted-foreground/40" /></div>}
                      {cs.liveDemo && (
                        <a href={cs.liveDemo} target="_blank" rel="noreferrer"
                           className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-success px-3 py-1 text-xs font-bold text-white shadow-lg">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Live Demo
                        </a>
                      )}
                    </div>
                    {cs.photoNote && <p className="mt-2 text-[11px] italic text-muted-foreground">{cs.photoNote}</p>}

                    <div id={`cs-${cs.index}-impact`} className="mt-6 scroll-mt-24">
                      <p className="cs-label mb-3"><TrendingUp className="h-3.5 w-3.5" /> Impact</p>
                      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        {cs.metrics.map((m) => (
                          <div key={m.label} className="metric-card cs-metric">
                            <div className="metric-value">{m.value}</div>
                            <div className="metric-label">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="cs-index">{cs.index}</span>
                      <span className="tag-pill">{cs.sector}</span>
                      <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                        <Briefcase className="h-3.5 w-3.5 text-primary" /> {cs.role}
                      </span>
                    </div>
                    {cs.badge && (
                      <p className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                        <Rocket className="h-3 w-3" /> {cs.badge}
                      </p>
                    )}
                    <h3 className="text-xl font-extrabold leading-snug tracking-tight md:text-2xl">{cs.title}</h3>
                    <p className="mt-1.5 text-sm font-semibold text-primary">{cs.client}</p>

                    <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-semibold">
                      <a href={`#cs-${cs.index}-impact`} className="cs-anchor">Impact</a>
                      <a href={`#cs-${cs.index}-did`} className="cs-anchor">What I Did</a>
                      <a href={`#cs-${cs.index}-arch`} className="cs-anchor">Architecture</a>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{cs.summary}</p>

                    <p className="cs-label mb-3 mt-6"><CheckCircle2 className="h-3.5 w-3.5" /> What I did</p>
                    <ul id={`cs-${cs.index}-did`} className="scroll-mt-24 space-y-2.5">
                      {cs.contributions.map((c) => (
                        <li key={c} className="cs-contrib">
                          <span className="cs-contrib-icon"><CheckCircle2 className="h-3.5 w-3.5" /></span>
                          <span className="text-sm leading-relaxed text-muted-foreground">{c}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="warn-card mt-6 flex gap-3">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#b45309] dark:text-[#fbbf24]" />
                      <div>
                        <p className="text-xs font-bold text-[#b45309] dark:text-[#fbbf24]">What did not work</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{cs.didntWork}</p>
                      </div>
                    </div>

                    {cs.liveDemo && (
                      <a href={cs.liveDemo} target="_blank" rel="noreferrer"
                         className="live-link mt-4">
                        <ExternalLink className="h-4 w-4" />
                        <span className="font-bold">{cs.liveDemo.replace("https://", "")}</span>
                        <ArrowUpRight className="ml-auto h-4 w-4" />
                      </a>
                    )}

                    <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-border bg-muted/50 px-3.5 py-3">
                      <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <p className="text-[11px] leading-relaxed text-muted-foreground">{cs.codeNote}</p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {cs.tech.map((t) => (<span key={t} className="tag-pill">{t}</span>))}
                    </div>
                  </div>
                </div>

                <div id={`cs-${cs.index}-arch`} className="cs-foot grid scroll-mt-24 gap-5 lg:grid-cols-2 lg:gap-7">
                  <div>
                    <p className="cs-label mb-3"><Layers className="h-3.5 w-3.5" /> Architecture</p>
                    <ArchitectureDiagram layers={cs.arch} />
                  </div>
                  <div>
                    <p className="cs-label mb-3"><Code2 className="h-3.5 w-3.5" /> Engineering Notes — honest version</p>
                    <p className="rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">{cs.archNote}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills" className="scroll-mt-24 py-16 md:py-20">
        <div className="shell">
          <div className="animate-on-scroll mb-10 max-w-2xl">
            <p className="kicker mb-4">Skills</p>
            <h2 className="section-head">What I bring to the team</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Four areas I use every day — taken from the projects above, not from a learning list.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map(({ icon: Icon, title, items }) => (
              <div key={title} className="animate-on-scroll card-lift soft-card p-5">
                <span className="icon-badge mb-4"><Icon className="h-5 w-5" /></span>
                <h3 className="text-[15px] font-bold">{title}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {items.map((item) => (<span key={item} className="skill-chip">{item}</span>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="scroll-mt-24 pb-20">
        <div className="shell">
          <div className="animate-on-scroll soft-card relative overflow-hidden px-6 py-10 text-center md:px-12 md:py-14">
            <span className="hero-slash opacity-60" aria-hidden />
            <div className="relative mx-auto max-w-2xl">
              <p className="kicker mx-auto mb-4">Contact</p>
              <h2 className="section-head text-[clamp(1.8rem,3.6vw,2.6rem)]">Let's build something that scales</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Open to Senior Frontend &amp; Full-Stack roles — remote, worldwide. I usually reply within a day.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="btn-pill bg-primary px-6 text-primary-foreground shadow-[0_16px_30px_-16px_rgba(37,99,235,0.95)]">
                  <a href="mailto:dedikusniadi.bisnis@gmail.com"><Mail className="mr-2 h-4 w-4" />Email me</a>
                </Button>
                <Button size="lg" variant="outline" onClick={handleDownload} className="btn-pill border-border bg-card px-6 hover:bg-secondary">
                  <Download className="mr-2 h-4 w-4" />Download CV
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />Indonesia (WIB)</span>
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />Available for Remote</span>
                <span className="inline-flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" />13+ years experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-border bg-card">
        <div className="shell flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="logo-mark h-9 w-9 text-xs">DK</span>
            <span className="leading-tight">
              <span className="block text-sm font-bold">Dedi Kusniadi</span>
              <span className="block text-xs text-muted-foreground">Senior Frontend &amp; Full-Stack Developer</span>
            </span>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navItems.map(({ label, href }) => (
              <a key={label} href={href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">{label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {socials.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="social-dot">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © 2026 Dedi Kusniadi. All rights reserved.
        </div>
      </footer>

      <FloatingHireButton />
    </div>
  )
}
