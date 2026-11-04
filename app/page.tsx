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
  Layers, MapPin, Menu, Rocket, Smartphone, Users, Zap, Mail, Linkedin, Lock, ExternalLink, MessageSquare
} from "lucide-react"

interface Metric { value: string; label: string }
interface CaseStudy {
  index: string; title: string; client: string; sector: string;
  image?: string; role: string; summary: string;
  contributions: string[]; metrics: Metric[]; tech: string[];
  arch: ArchLayer[]; archNote: string; didntWork: string; codeNote: string; liveDemo?: string; github?: string; photoNote?: string
}

const caseStudies: CaseStudy[] = [
  {
    index: "01",
    title: "Logistics Tracking System — 30s → <1s",
    client: "Freelance • National Logistics",
    sector: "Enterprise Logistics",
    image: "/gis.png",
    role: "Lead Frontend Engineer",
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
    client: "Retail Group • 250K MAU",
    sector: "Data & Analytics",
    image: "/dashboard.png",
    role: "Senior Frontend Engineer",
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
    client: "Telin (Telekomunikasi Indonesia International) • 100K+ users",
    sector: "Telecommunications",
    image: "/Telin.png",
    role: "Frontend Engineer",
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
    liveDemo: "https://dashboard.neuapix.com/auth/login",
    codeNote: "Live at dashboard.neuapix.com — Telin enterprise portal (NeuAPIX). Real code private on Telin GitLab (NDA). Sanitized design token + lazy-load demo on GitHub.",
    photoNote: "Live portal: dashboard.neuapix.com — Telin Enterprise Portal (NeuAPIX), 100K+ users."
  },
  {
    index: "04",
    title: "E-Working Permit — 5 Days → 1 Day, 100% Paperless",
    client: "XLSmart (ex-XL Axiata) • ewp.newxlife.xlsmart.co.id • Compliance",
    sector: "Compliance / HR",
    image: "/eworking.png",
    role: "Frontend Engineer",
    summary: "Paper work permit 5 days, lost documents, no audit trail. Built at XL Axiata, now live at XLSmart (XL Axiata + Smartfren merger) — ewp.newxlife.xlsmart.co.id. Need 100% paperless + full audit trail.",
    contributions: [
      "Designed end-to-end flow Angular Material — request to sign-off with draft save",
      "Step wizard with localStorage — data not lost on tab close/refresh",
      "PDF generation + audit log — every click logged, compliance happy",
      "Conditional validation per step — cut submission errors 60%",
    ],
    metrics: [
      { value: "5d → 1d", label: "Approval cycle" },
      { value: "10K+", label: "Permits / month" },
      { value: "100%", label: "Paperless" },
      { value: "60% fewer", label: "Submission errors" },
    ],
    tech: ["Angular", "TypeScript", "Angular Material", "Karma/Jasmine", "REST", "PDF Gen"],
    arch: [
      { label: "Edge", items: ["CDN"] },
      { label: "Client", items: ["Angular SPA", "Step wizard", "localStorage"] },
      { label: "API Gateway", items: ["REST", "Auth"] },
      { label: "Services", items: ["Permit", "Approval", "Audit"] },
      { label: "Data", items: ["PostgreSQL", "Object storage"] },
    ],
    archNote: "Paper process 5 days, users hated it. Made wizard but kept draft in localStorage. Each step validates before next — reduced errors 60%. Now live at XLSmart.",
    didntWork: "First form was one big page — users lost data on refresh. Split to wizard + localStorage + draft save.",
    liveDemo: "https://ewp.newxlife.xlsmart.co.id/login",
    codeNote: "Live at ewp.newxlife.xlsmart.co.id/login — real code private on XL Axiata/XLSmart GitLab (NDA). Can demo wizard + audit log pattern in interview.",
    photoNote: "Live portal: ewp.newxlife.xlsmart.co.id — E-Working Permit XLSmart, 10K+ permits/month."
  },
  {
    index: "05",
    title: "ADA Business Messaging Core — WhatsApp BSP Platform",
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
    liveDemo: "https://bizmsgcore.ada-asia.com/",
    codeNote: "Live at bizmsgcore.ada-asia.com — real code private on Axiata/ADA GitLab (NDA). Same business messaging pattern as Telin WA platform. Can walk through MSAL + multi-channel inbox in interview.",
    photoNote: "Live platform: bizmsgcore.ada-asia.com — WhatsApp Business Solution Provider (BSP) portal."
  },
]

const experiences = [
  { title: "Senior Frontend Engineer", company: "Axiata Digital Labs", period: "Jul 2020 — Mar 2026", highlights: ["Led frontend across 6 squads — React/Next.js 14 + Angular, shared design system", "Built business messaging platforms: Telin WA + ADA BSP (bizmsgcore.ada-asia.com) — WhatsApp BSP, 1000+ accounts", "Cut load 45% via code-splitting, virtualization 50k rows 5fps→60fps"], tech: ["React", "Next.js 14", "TypeScript", "Angular", "Zustand"] },
  { title: "Independent / Open Source", company: "Full Stack R&D", period: "Mar 2026 — Present", highlights: ["Rebuilding logistics tracking as sanitized open demo — WebSocket <1s, LCP 2.4s", "Bank-grade security R&D: httpOnly cookies, Helmet, DOMPurify, Redis rate-limit"], tech: ["React", "Next.js 14", "NestJS", "PostgreSQL", "Redis"] },
]

const techCategories = [
  { title: "Core 2025-2026", items: ["React", "Next.js 14", "TypeScript", "Zustand", "TanStack Query"] },
  { title: "Business Messaging", items: ["WhatsApp Business API", "BSP", "MSAL", "Multi-channel (WA/SMS/LINE/RCS)"] },
  { title: "Performance", items: ["WebSocket", "Web Worker", "Leaflet", "react-window", "LCP Optimization"] },
  { title: "Quality", items: ["A11y 95", "Lighthouse", "Code Splitting", "Figma Tokens"] },
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
            <span className="hidden sm:inline-flex ml-2 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Open to Remote • Available Now</span>
          </a>
          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (<a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground px-2">{item}</a>))}
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={handleDownload}>Download CV</Button>
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
                <Button variant="outline" size="sm" className="mt-2" onClick={handleDownload}>Download CV</Button>
                <Button asChild size="sm" className="mt-2"><a href="#contact">Hire Me</a></Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section id="top" className="hero-backdrop relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-10 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28">
          <div className="animate-fade-in-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Open to Remote • Ex-Axiata Digital Labs (2020-2026)
            </div>
            <p className="section-kicker mb-4">Senior Frontend Engineer · 13+ years • React / Next.js • Business Messaging (WhatsApp BSP)</p>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
              I fix slow, heavy dashboards that block operations at national scale.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-[17px]">
              13 years fixing frontends that already had users. Led frontend at <strong>Axiata Digital Labs (2020-2026)</strong> including <strong>business messaging platforms</strong>: Telin WA + ADA BSP (bizmsgcore.ada-asia.com, WhatsApp Business Solution Provider). Also national logistics <strong>1.2M shipments/year, 2,000 dispatchers peak</strong>.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
              <Badge variant="secondary" className="gap-1.5"><MessageSquare className="h-3 w-3" /> WhatsApp BSP • bizmsgcore</Badge>
              <Badge variant="secondary" className="gap-1.5"><Zap className="h-3 w-3" /> 30s → &lt;1s WebSocket</Badge>
              <Badge variant="secondary" className="gap-1.5"><Gauge className="h-3 w-3" /> LCP 8.1s → 2.4s</Badge>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><a href="#case-studies">View Case Studies <ArrowRight className="ml-2 h-4 w-4" /></a></Button>
              <Button variant="outline" size="lg" onClick={handleDownload}><Briefcase className="mr-2 h-4 w-4" />Download CV (ATS 1-Page)</Button>
            </div>
          </div>
          <div className="animate-fade-in-up relative" style={{ animationDelay: "120ms" }}>
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="overflow-hidden rounded-xl border border-border">
                <Image src="/1609985817736.jpg" alt="Dedi Kusniadi" width={640} height={800} priority className="aspect-[4/5] w-full object-cover" />
              </div>
              <div className="absolute -bottom-6 left-1/2 w-[90%] -translate-x-1/2 rounded-lg border border-border bg-card px-4 py-3 shadow-lg">
                <p className="text-xs font-semibold flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />Ex-Axiata Digital Labs • BSP Platform</p>
                <p className="mt-1 text-xs text-muted-foreground">bizmsgcore.ada-asia.com • React / Next.js / WA Business API</p>
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
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">5 flagship projects including 2 WhatsApp BSP platforms (Telin + ADA bizmsgcore). Real code under NDA, sanitized rebuilds linked.</p>
          </div>
          <div className="space-y-16 md:space-y-24">
            {caseStudies.map((cs, i) => (
              <article key={cs.title} className="animate-on-scroll scroll-mt-24">
                <div className={`grid gap-8 lg:grid-cols-2 lg:gap-14 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="relative">
                    <div className="overflow-hidden rounded-xl border border-border relative">
                      {cs.image ? <Image src={cs.image} alt={cs.title} width={720} height={460} className="aspect-[16/10] w-full object-cover" /> : <div className="flex aspect-[16/10] w-full items-center justify-center bg-muted"><Layers className="h-10 w-10 text-muted-foreground/40" /></div>}
                      {cs.liveDemo && (
                        <a href={cs.liveDemo} target="_blank" className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow">
                          <span className="h-2 w-2 rounded-full bg-white animate-pulse" /> Live Demo
                        </a>
                      )}
                      {cs.title.includes("BSP") && (
                        <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow">
                          <MessageSquare className="h-3 w-3" /> Live: bizmsgcore.ada-asia.com
                        </div>
                      )}
                    </div>
                    {cs.photoNote && <p className="mt-2 text-[11px] italic text-muted-foreground/70">{cs.photoNote}</p>}
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
                      {cs.contributions.map((c) => (<li key={c} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />{c}</li>))}
                    </ul>
                    <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {cs.metrics.map((m) => (
                        <div key={m.label} className="metric-card rounded-md border border-border bg-card p-3"><div className="metric-value text-sm font-bold">{m.value}</div><div className="metric-label mt-1 text-[11px] leading-tight text-muted-foreground">{m.label}</div></div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-md border border-border bg-muted/30 p-3">
                      <p className="text-xs font-semibold">What did not work:</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{cs.didntWork}</p>
                    </div>
                    <div className="mt-3 flex flex-col gap-2">
                      {cs.liveDemo && (
                        <a href={cs.liveDemo} target="_blank" className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-300">
                          <ExternalLink className="h-3.5 w-3.5" /> Live Demo: {cs.liveDemo.replace('https://','')}
                        </a>
                      )}
                      <div className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-2">
                        <Lock className="h-3 w-3 text-muted-foreground" />
                        <p className="text-[11px] leading-relaxed text-muted-foreground">{cs.codeNote}</p>
                      </div>
                      {cs.github && (
                        <a href={cs.github} target="_blank" className="inline-flex items-center gap-1.5 text-xs underline-offset-4 hover:underline"><Code2 className="h-3.5 w-3.5" /> {cs.github.replace('https://','')}</a>
                      )}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">{cs.tech.map((t) => (<Badge key={t} variant="outline" className="font-normal text-[11px]">{t}</Badge>))}</div>
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

      <FloatingHireButton />
    </div>
  )
}