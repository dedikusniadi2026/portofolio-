"use client";

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArchitectureDiagram, type ArchLayer } from "@/components/architecture-diagram"
import { CaseStudyTabs } from "@/components/case-study-tabs"
import { ContactForm } from "@/components/contact-form"
import { FloatingHireButton } from "@/components/floating-hire-button"
import {
  ArrowRight, Briefcase, Rocket, Code2, Shield, BookOpen,
  Menu, Mail, Linkedin, Github, Download, MapPin, Clock,
  Layers, Lock, Gauge, CheckCircle2, TrendingUp, AlertTriangle,
  MonitorSmartphone, Quote,
  MessageCircle
} from "lucide-react"

const contact = {
  email: "dedikusniadi.bisnis@gmail.com",
  linkedin: "https://www.linkedin.com/in/dedi-kusniadi",
  github: "https://github.com/dedikusniadi2026",
  whatsapp: "https://wa.me/6282215012841",
  cv: "/CV-Dedi-Kusniadi-Frontend.pdf",
  cvFileName: "CV-Dedi-Kusniadi-Frontend.pdf",
}

interface Metric { value: string; label: string }
interface CaseStudy {
  index: string; title: string; cardTitle: string; cardSubtitle: string; client: string; sector: string;
  topLabel: string;
  image?: string; role: string; summary: string; impact?: string[];
  contributions: string[]; metrics: Metric[]; tech: string[];
  arch: ArchLayer[]; archNote: string; didntWork: string; codeNote: string; ctaLabel: string; cardCtaLabel?: string; photoNote?: string; ctaOnly?: boolean
}

const caseStudiesRaw: CaseStudy[] = [
  {
    index: "02",
    title: "SentinelPay — Wallet Transfers & Double-Entry Ledger",
    cardTitle: "SentinelPay",
    cardSubtitle: "IDR & USD — balance always derived from the journal, never edited",
    client: "Personal R&D • Internal wallet workspace • IDR & USD",
    sector: "FinTech / Payments Infrastructure",
    topLabel: "Personal R&D • 2026 — Present",
    image: "/sentinelpay-light.png",
    role: "Full-Stack R&D — personal project",
    summary: "Problem — in the enterprise projects I worked on, the ledger was often the source of bugs: one editable balance number per wallet, simple to render and impossible to audit. I built SentinelPay to prove the opposite: IDR and USD balances, transfers and a readable history where every movement posts to an append-only double-entry journal, so a balance is always derived — never edited.",
    impact: [
      "Result — every fund movement is atomic, idempotent where it matters, and posted as a balanced journal, so reconciliation is a query instead of a trust assumption.",
      "The UI renders only API data — no fabricated balances or transactions anywhere on screen.",
      "Layered security in place: HttpOnly Redis-backed sessions, CSRF-bound state changes, Argon2id passwords, TOTP MFA plus a transaction PIN, and step-up verification before money moves.",
    ],
    contributions: [
      "Action — built the NestJS API and React SPA together: Redis-backed HttpOnly sessions, a session-bound CSRF token and an exact Origin allowlist for every unsafe request",
      "Designed the double-entry ledger and the transfer engine: deposits, withdrawals, reversals and refunds post balanced journals inside one PostgreSQL transaction with row locks and idempotency keys",
      "Implemented TOTP MFA with HKDF-derived AES-256-GCM encrypted secrets, one-time recovery codes, a transaction PIN and 5-minute step-up for money movement",
      "Set up deny-by-default RBAC — 32 permissions across 20 staff roles; navigation, route guards and action buttons are generated from the server permission list while the API enforces each permission independently of the UI",
      "Shipped the delivery pipeline: Docker Compose for dev and a production stack with two API replicas behind nginx, plus CI for typecheck, lint, API E2E against real services, image builds, dependency audit and a gitleaks secret scan",
      "Wired Datadog in for monitoring — APM traces and JSON logs tagged with the API's request correlation ID, dashboards on the in-process metrics snapshot (requests, status classes, latency, memory), and liveness/readiness probes as the deployment gate",
    ],
    metrics: [
      { value: "151", label: "Tests passing (API unit + E2E + web)" },
      { value: "Double-entry", label: "Append-only ledger, BigInt minor units" },
      { value: "20 roles", label: "Staff RBAC over 32 permissions" },
      { value: "18", label: "Checksummed SQL migrations" },
    ],
    tech: ["React", "TypeScript", "NestJS", "PostgreSQL", "Redis", "Docker", "Datadog"],
    arch: [
      { label: "Edge", items: ["nginx", "TLS terminator"] },
      { label: "Client", items: ["React SPA", "TanStack Query", "Zod forms"] },
      { label: "API Gateway", items: ["REST /api/v1", "Session + CSRF", "Throttling"] },
      { label: "Services", items: ["Wallets", "Transfer Engine", "Ledger", "Risk / KYC"] },
      { label: "Data", items: ["PostgreSQL", "Redis sessions"] },
      { label: "Observability", items: ["Datadog APM", "Logs", "Metrics", "Health probes"] },
    ],
    archNote: "One API owns both the session and the money path, so the client is never trusted with a balance: journals live in PostgreSQL and Redis only holds sessions plus rate-limit buckets. The SPA and /api/ share one origin behind nginx, which is what makes SameSite=Lax with an exact Origin match enough for CSRF. Datadog sits outside that path — traces and logs carry the same correlation ID the API generates, so one slow transfer is searchable end to end without touching the ledger.",
    didntWork: "Early version kept the session in browser storage and stored one balance number per wallet — simple to render, impossible to audit. Moved sessions into HttpOnly Redis-backed cookies and derived every balance from the ledger; the extra join cost is worth paying because reconciliation became a query.",
    codeNote: "Code private under NDA — Demo & walkthrough available in interview.",
    ctaLabel: "Request Walkthrough",
    cardCtaLabel: "Request Walkthrough",
    photoNote: "SentinelPay sign-in — dark/gold brand variant, no user data.",
  },
  {
    index: "01",
    title: "Logistics Tracking System",
    cardTitle: "Logistics Tracking",
    cardSubtitle: "National scale real-time map",
    client: "National Logistics Operator • Client Work",
    sector: "Enterprise Logistics",
    topLabel: "Client Work • Frontend + Architecture",
    image: "/gis.png",
    role: "Solo Frontend + Architecture",
    summary: "Problem — the dispatch map lagged 30 seconds on the low-end Android tablets used inside the warehouses. 2,000 dispatchers at peak, 1.2M parcels/year, and drivers waiting outside while the screen caught up.",
    impact: [
      "Result — map latency 30s → 1s (97%) on the same warehouse tablets.",
      "LCP 8.1s → 2.4s after code-splitting the map, so dispatchers see parcels before the rest of the app finishes loading.",
      "One realtime pipeline now serves 2,000 dispatchers at peak across 1.2M parcels/year.",
    ],
    contributions: [
      "Action — rebuilt the realtime client: position events arrive over WebSocket and are applied as deltas straight to the map, no polling loop",
      "Moved map rendering off the main thread into a Web Worker so the UI stays responsive on low-end Android tablets",
      "Code-split Leaflet so the map bundle only loads on the screens that actually draw it",
      "Split global state into per-domain Zustand stores — 6 squads shipping without stepping on each other",
      "Replaced the legacy UI kit with a Figma token-based design system — 35% fewer UI defects per sprint",
    ],
    metrics: [
      { value: "30s → 1s", label: "Map lag (97%)" },
      { value: "8.1s → 2.4s", label: "LCP on low-end tablets" },
      { value: "1.2M", label: "Parcels / year" },
      { value: "2,000", label: "Dispatchers at peak" },
    ],
    tech: ["Next.js", "TypeScript", "Zustand", "Leaflet", "WebSocket"],
    arch: [
      { label: "Client", items: ["Next.js app", "Leaflet map", "Web Worker"] },
      { label: "State", items: ["Zustand store per domain", "Delta-applied positions"] },
      { label: "Realtime", items: ["WebSocket position events", "Apply delta, never poll"] },
      { label: "Delivery", items: ["Route-level code split", "Map loads only where drawn"] },
    ],
    archNote: "The browser only pays for what it shows: the map bundle splits per route, position events come over the socket as deltas and are patched straight into the markers, and the heavy rendering work sits in a Web Worker so the main thread keeps the UI responsive on warehouse-grade Android tablets.",
    didntWork: "First version pushed everything down one WebSocket and kept a single global store. The map froze whenever another service was slow, and six squads kept colliding in one state tree. Split it: only tracking events on the socket, state per domain.",
    codeNote: "Code private under NDA — Demo & walkthrough available in interview.",
    ctaLabel: "Request Walkthrough",
    photoNote: "Dispatch console and live map view — client data removed.",
  },
  {
    index: "03",
    title: "Telin NeuAPIX — WhatsApp Business Platform",
    cardTitle: "Telin NeuAPIX",
    cardSubtitle: "Telco WhatsApp BSP, CPaaS dashboard",
    client: "Telin (Telekomunikasi Indonesia International) • Official WhatsApp BSP by Meta",
    sector: "Telecommunications / CPaaS",
    topLabel: "Employer Project • Telco WhatsApp BSP • CPaaS",
    image: "/Telin.png",
    role: "Senior Frontend Engineer",
    summary: "Problem — WABA onboarding and the unified inbox confused the businesses onboarding onto the platform. 10M+ users behind it, and every unclear step turned into a support ticket.",
    impact: [
      "Result — Accessibility score 62 → 95.",
      "WABA onboarding 5 steps → 2 steps.",
      "Support tickets about onboarding and inbox down 30%.",
    ],
    contributions: [
      "Action — built the WABA onboarding flow (Meta Embedded Signup) and the Template Manager: create, submit to Meta for approval, track status",
      "Built the unified inbox for WhatsApp — media messages and delivery status in one conversation model",
      "Added API usage monitoring (Log API, Hit Rate, Report) with RBAC — same pattern as the ADA platform",
      "Applied Figma Tokens across the dashboard so design changes ship as token changes, not code changes",
      "Split channel modules into lazy modules so the heavy screens load only after login",
    ],
    metrics: [
      { value: "62 → 95", label: "Accessibility score" },
      { value: "5 → 2", label: "WABA onboarding steps" },
      { value: "-30%", label: "Support tickets" },
      { value: "10M+", label: "Users" },
    ],
    tech: ["Angular", "React", "TypeScript", "WhatsApp Cloud API", "Figma Tokens"],
    arch: [
      { label: "Client", items: ["Angular / React app", "Embedded Signup", "Unified Inbox"] },
      { label: "Modules", items: ["Lazy channel modules", "Login-first bundle"] },
      { label: "Design", items: ["Figma Tokens", "One token set per theme"] },
      { label: "Platform", items: ["WhatsApp Cloud API", "Meta template approval"] },
    ],
    archNote: "Most of this dashboard is state tracking, because every template goes to Meta for approval: onboarding status, template status, message delivery. Channel modules load lazily after login so the first paint stays small, and the UI is driven by Figma tokens so a design change is a token change rather than a code change.",
    didntWork: "First lazy-load split was too aggressive — users saw a blank screen for ~2s after login. Rolled it back and split only the heavy modules: Billing, Template Manager, and Inbox.",
    codeNote: "Code private under NDA — Demo & walkthrough available in interview.",
    ctaLabel: "Request Walkthrough",
    photoNote: "NeuAPIX dashboard — WABA onboarding, template manager and unified inbox.",
  },
  {
    index: "04",
    title: "E-Working Permit — Office Guest & BTS Permit System",
    cardTitle: "E-Working Permit",
    cardSubtitle: "5 days → 1 day, 10K+/month, 100% paperless",
    client: "XLSmart (ex-XL Axiata) • Compliance & Physical Security",
    sector: "Compliance & Physical Security",
    topLabel: "Employer Project • Compliance & Physical Security",
    image: "/eworking.png",
    role: "Senior Frontend Engineer",
    summary: "Two systems in one portal: office guest check-in with selfie capture, and the BTS Electronic Permit to Work. Replaced a 5-day paper approval with a 1-day digital flow — 10K+ permits per month, 100% paperless.",
    impact: [
      "Office Guest Management — any external guest entering an XL office fills a form on the web and takes a selfie on entry. The selfie + ID is logged for the security audit, so we know exactly who is inside the building.",
      "BTS Work Permit — Electronic Permit to Work for tower maintenance: DRAFT → Request → Site Info → Safety Assessment → Multi-level Approval → Permit Issued → CLOSED.",
      "Before: manual paper form, approval took 5 days. After: 1 day, 100% paperless, with a full audit trail.",
    ],
    contributions: [
      "Built the multi-step wizard (Angular Material) — Request → Site Info → Safety → Approval, with localStorage draft so users don't lose data on refresh",
      "Implemented the Camera API for office guest selfie check-in — external visitors must selfie on entry to the XL office",
      "Built RBAC with multi-level approval, PDF generation, and audit trail for compliance",
      "Optimized form validation for the low-end devices field technicians actually use",
    ],
    metrics: [
      { value: "5 Days → 1 Day", label: "Approval cycle" },
      { value: "10K+", label: "Permits / month" },
      { value: "100%", label: "Paperless" },
    ],
    tech: ["Angular","TypeScript","Angular Material","Camera API","RBAC","REST","PDF Gen"],
    arch: [
      { label: "Edge", items: ["CDN"] },
      { label: "Client", items: ["Angular SPA", "Step wizard", "Camera API"] },
      { label: "API Gateway", items: ["REST", "RBAC"] },
      { label: "Services", items: ["Guest Check-in", "Permit", "Approval", "Audit"] },
      { label: "Data", items: ["PostgreSQL", "Object storage (selfie + PDF)"] },
    ],
    archNote: "Two audiences, one portal: office guests need a fast selfie check-in, field technicians need a multi-step permit wizard on low-end phones. Draft state lives in localStorage so a refresh never kills the request, and each step validates before the next one unlocks.",
    didntWork: "First version was one big single-page form — users lost all data when they refreshed. Split into a wizard with auto-save to localStorage.",
    codeNote: "Code private under NDA — Demo & walkthrough available in interview.",
    ctaLabel: "Request Walkthrough",
    cardCtaLabel: "Request Walkthrough",
    photoNote: "Guest check-in and the BTS permit wizard — product UI.",
    ctaOnly: true,
  },
  {
    index: "05",
    title: "ADA Business Messaging Core",
    cardTitle: "ADA Biz Messaging",
    cardSubtitle: "1,000+ accounts, WA/SMS/LINE/RCS in one queue",
    client: "ADA Asia • Official WhatsApp BSP in APAC",
    sector: "Business Messaging / MarTech",
    topLabel: "Employer Project • WhatsApp BSP • 1,000+ Accounts",
    image: "/ADA.png",
    role: "Frontend Engineer",
    summary: "Business messaging platform for ADA Asia, an official WhatsApp Business Solution Provider in APAC. One inbox for WhatsApp, SMS, LINE and RCS across 1,000+ business accounts.",
    contributions: [
      "Implemented the multi-channel inbox (WhatsApp, SMS, LINE, RCS) as one conversation model, so agents answer from a single queue",
      "Built template messages, broadcast and conversation assignment for 1,000+ business accounts",
      "Auth with verified email + Microsoft Authentication Library (MSAL), Remember Me and Forgot Password",
      "Route-level code split — login bundle first, messaging modules after auth: perceived cold start 40% faster",
    ],
    metrics: [
      { value: "1,000+", label: "Business accounts" },
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
    codeNote: "Code private under NDA — Demo & walkthrough available in interview.",
    ctaLabel: "Request Walkthrough",
    cardCtaLabel: "Request Walkthrough",
    photoNote: "BizMsgCore unified inbox — WhatsApp, SMS, LINE and RCS in one queue.",
    ctaOnly: true,
  },
  {
    index: "06",
    title: "Connectivity+ — Enterprise Data Portal",
    cardTitle: "Connectivity+",
    cardSubtitle: "50k-row grid, 5fps → 60fps",
    client: "XL Axiata • Enterprise Connectivity",
    sector: "Enterprise Telecom / Data Portal",
    topLabel: "Employer Project • Enterprise Data Portal",
    role: "Senior Frontend Engineer, data grid architecture",
    summary: "Problem — the enterprise connectivity portal rendered a 50,000-row data grid on one page. Every filter change repainted all 50k rows and the grid ran at about 5fps — unusable for the teams living in it all day.",
    impact: [
      "Result — 5fps → 60fps on the same 50k-row dataset, on the same hardware.",
      "Cold start 40% faster after route-level code splitting.",
      "Connection status now updates in the grid in real time over WebSocket, without a manual refresh.",
    ],
    contributions: [
      "Action — virtualized the 50k-row grid with react-window so only visible rows render",
      "Streamed real-time connection status over WebSocket into the virtualized rows",
      "Applied route-level code splitting: the portal shell loads first, heavy route modules on demand",
      "Kept Ant Design table semantics (sorting, filters, column config) working on top of virtualization",
    ],
    metrics: [
      { value: "5fps → 60fps", label: "50k-row grid" },
      { value: "50,000", label: "Rows in one grid" },
      { value: "40% faster", label: "Cold start after split" },
      { value: "Realtime", label: "Status over WebSocket" },
    ],
    tech: ["React", "TypeScript", "Ant Design", "react-window", "WebSocket"],
    arch: [
      { label: "Client", items: ["React + TypeScript", "Ant Design table semantics"] },
      { label: "Grid", items: ["react-window virtualization", "Only visible rows render"] },
      { label: "Realtime", items: ["WebSocket status stream", "Patched into visible rows"] },
      { label: "Delivery", items: ["Route-level code split", "Shell first, routes on demand"] },
    ],
    archNote: "Rendering 50k rows was never the requirement — rendering the rows on screen was. react-window keeps the DOM to a window of visible rows, the WebSocket stream patches status into those rows as it arrives, and route-level splitting means the portal shell paints before the heavy grid module is even downloaded.",
    didntWork: "First attempt batched the row updates and still repainted everything — it moved the stutter, it didn't remove it. The fix was virtualization: stop rendering rows nobody is looking at.",
    codeNote: "Code private under NDA — Demo & walkthrough available in interview.",
    ctaLabel: "Request Walkthrough",
    cardCtaLabel: "Request Walkthrough",
    ctaOnly: true,
  },
]

const caseStudies = caseStudiesRaw.slice().sort((a, b) => a.index.localeCompare(b.index))

interface Experience { company: string; role: string; period: string; note?: string }

const earlierExperiences: Experience[] = [
  { company: "PT Kreasi Digital", role: "Senior Full Stack", period: "Jan — May 2020", note: "POS SaaS (React, Angular, Laravel)" },
  { company: "Ayo Media", role: "Senior Web Dev", period: "Oct — Dec 2019", note: "Flutter Android & iOS" },
  { company: "BTPN", role: "Frontend", period: "Jun — Sep 2019", note: "Joint Financial System OJK & BI" },
  { company: "Bisnis Indonesia", role: "Web Dev", period: "2018 — 2019", note: "bisnis.com & Gramedia" },
  { company: "Bisnis Indonesia Group", role: "Software Dev", period: "2015 — 2018", note: "Biofarma eMagazine" },
  { company: "Springfields Asia", role: "Junior", period: "2013", note: "KPK Gratification System" },
]

const experienceGroups: { title: string; items: Experience[]; more?: Experience[] }[] = [
  {
    title: "Previous Employment",
    items: [
      { company: "Axiata Digital Labs", role: "Senior Frontend Engineer", period: "Jul 2020 — Mar 2026", note: "Promoted from Frontend Developer" },
      { company: "Other Companies", role: "Various Roles", period: "2013 — 2020" },
    ],
    more: earlierExperiences,
  },
  {
    title: "Personal R&D",
    items: [{ company: "SentinelPay", role: "Full-Stack R&D", period: "2026 — Present" }],
  },
]

const techGroups = [
  {
    icon: MonitorSmartphone,
    title: "Frontend Core",
    items: [
      { name: "React", tip: "Connectivity+ data grid, Logistics map client, and my own R&D wallet. Hooks + per-domain state." },
      { name: "Next.js 14", tip: "Logistics Tracking — route-level code splitting so the map bundle loads only where it is drawn. Also this portfolio." },
      { name: "TypeScript", tip: "Every case study here. Strict mode on new codebases." },
      { name: "Angular 2-17", tip: "Telin NeuAPIX, XLSmart EWP, ADA bizmsgcore — lazy modules, Material, RBAC." },
      { name: "RxJS", tip: "Streams behind the Angular dashboards: status updates and form validation without re-rendering the whole screen." },
      { name: "NgRx", tip: "Store pattern for large multi-team Angular dashboards; on React I use per-domain Zustand stores instead." },
    ],
  },
  {
    icon: Gauge,
    title: "Performance",
    items: [
      { name: "WebSocket", tip: "Realtime position events on the logistics map, live connection status in the 50k-row grid. 30s lag → 1s." },
      { name: "Web Worker", tip: "Map rendering moved off the main thread so the UI stays responsive on low-end warehouse tablets." },
      { name: "Leaflet", tip: "The map layer itself, split per route: LCP 8.1s → 2.4s." },
      { name: "Virtualization", tip: "react-window on a 50,000-row grid — 5fps → 60fps on the same hardware." },
      { name: "LCP Optimization", tip: "Measure on the real device first: cold start 40% faster after route-level splitting." },
    ],
  },
  {
    icon: Shield,
    title: "Security & Banking",
    items: [
      { name: "OWASP Top 10", tip: "Threat model and OWASP control mapping written per project, not a checkbox exercise." },
      { name: "DOMPurify", tip: "Anything that reaches the DOM as HTML — inbox bodies and template previews — is sanitized before render." },
      { name: "Helmet", tip: "Secure response headers on the Node services in front of these UIs." },
      { name: "httpOnly cookies", tip: "Sessions never live in browser storage — no script can read them." },
      { name: "JWT", tip: "Token auth verified server-side; the UI never decides what a role can do." },
      { name: "OAuth2", tip: "Delegated consent flows, including Meta Embedded Signup for WhatsApp Business Account onboarding." },
      { name: "OJK & BI Compliance", tip: "Joint financial system at Bank BTPN built to OJK & BI rules." },
    ],
  },
]

const trustedBy = [
  { name: "Telin NeuAPIX", note: "WhatsApp BSP · CPaaS" },
  { name: "XLSmart", note: "BTS & office permit compliance" },
  { name: "ADA Asia", note: "WhatsApp BSP · BizMsgCore" },
  { name: "National Logistics", note: "Real-time parcel tracking" },
]

const testimonials = [
  {
    name: "Mohammad Riza N.",
    role: "Senior Business Analyst · Quality Assurance",
    meta: "Worked with Dedi on the same team · May 12, 2024",
    quote:
      "Dedi is a well knowledgeable software developer with a wide range of expertise, and a good learner when it comes to new tools and technology. He showed persistence and dedication to tackle any difficulty that arose, and always supported his fellow developers. I am certain Dedi can be a valuable member in any software development team.",
  },
  {
    name: "Billy Huar Noning",
    role: "Founder & Entrepreneur · Special Situation & Critical Mission",
    meta: "Managed Dedi directly · November 2, 2021",
    quote:
      "I found Dedi like finding gold in the nature. He is a silent man, but skillful, and will finish every task assigned to him — he pushes himself over the limit to get there. One thing for sure: I feel safe every time having Dedi on the project.",
  },]

const howIWork = [
  {
    title: "Audit & Quick Wins",
    weeks: "Week 1—2",
    body: "I read the numbers before touching code: LCP on the devices your users actually have, bundle weight, support-ticket categories. Then I ship the small fixes those numbers already point at, so the team sees movement while the bigger work is still being planned.",
  },
  {
    title: "Ship Every Sprint",
    weeks: "Ongoing",
    body: "Small increments behind feature flags, one domain module per squad, and a performance budget checked before and after every release. You get working software each sprint instead of a big-bang rewrite at the end of the quarter.",
  },
  {
    title: "Handover",
    weeks: "Final weeks",
    body: "Docs, design tokens, component patterns and a live walkthrough, so the team keeps shipping without me. Handover should not be a cliff.",
  },
]

const trustBadges = [
  { value: "30s → 1s", label: "Logistics map lag (97%)" },
  { value: "8.1s → 2.4s", label: "LCP, low-end tablets" },
  { value: "10M+ users", label: "Telin WhatsApp BSP" },
]

const aboutHighlights = [
  { icon: Rocket, title: "Enterprise Frontend", note: "Telecom, logistics & business messaging platforms" },
  { icon: Shield, title: "Secure & Performant Applications", note: "Bank-grade auth, <2s loads" },
  { icon: Code2, title: "Clean Code & Best Practices", note: "Design tokens, RBAC, a11y 95" },
  { icon: BookOpen, title: "Continuous Learning", note: "React 19, WebSocket, Web Worker" },
]

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#tech-stack" },
  { label: "How I Work", href: "#how-i-work" },
  { label: "Contact", href: "#contact" },
]

const footerNavItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  ...navItems,
]

const socials = [
  { label: "LinkedIn", href: contact.linkedin, icon: Linkedin },
  { label: "GitHub", href: contact.github, icon: Github },
  { label: "Email", href: `mailto:${contact.email}`, icon: Mail },
]

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")
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
    link.href = contact.cv
    link.download = contact.cvFileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const heroProject = caseStudies.find((cs) => cs.index === "01") ?? caseStudies[0]
  const supportingProjects = caseStudies.filter((cs) => !cs.ctaOnly && cs.index !== heroProject.index)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "nav-blur" : ""}`}>
        <div className="shell flex h-19 items-center justify-between gap-4">
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
                  {isActive && <span className="absolute inset-x-4 -bottom-0.5 h-0.75 rounded-full bg-primary" />}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild className="btn-pill hidden bg-primary px-4 text-[13px] text-primary-foreground shadow-[0_12px_26px_-14px_rgba(37,99,235,0.9)] sm:inline-flex">
              <a href="#contact"><Mail className="mr-1.5 h-4 w-4" />Contact Me</a>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card lg:hidden" aria-label="Open menu">
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-75 flex-col gap-1 pt-14">
                {navItems.map(({ label, href }) => (
                  <a key={label} href={href} className="rounded-xl px-3 py-2.5 text-base font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">{label}</a>
                ))}
                <Button asChild className="btn-pill mt-3"><a href="#contact"><Mail className="mr-2 h-4 w-4" />Contact Me</a></Button>
                <Button asChild variant="outline" className="btn-pill mt-2">
                  <a href={contact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" />WhatsApp Saya</a>
                </Button>
                <div className="mt-2 flex gap-2">
                  <Button asChild variant="outline" className="btn-pill flex-1 border-border px-3 text-[13px]">
                    <a href={contact.linkedin} target="_blank" rel="noreferrer"><Linkedin className="mr-1.5 h-4 w-4" />LinkedIn</a>
                  </Button>
                  <Button asChild variant="outline" className="btn-pill flex-1 border-border px-3 text-[13px]">
                    <a href={contact.github} target="_blank" rel="noreferrer"><Github className="mr-1.5 h-4 w-4" />GitHub</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section id="home" className="hero-canvas pt-19">
        <div className="shell relative grid items-start gap-12 pb-12 pt-8 md:pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-16">
          <div className="animate-fade-in-up relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-semibold shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
              Available Immediately • Remote / Hybrid
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">Dedi Kusniadi</h1>
            <h2 className="mt-4 max-w-xl text-2xl font-bold leading-tight text-primary/90 sm:text-[28px]">
              Senior Frontend Engineer • Ex-Axiata Digital Labs • Angular / React / Next.js
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              I help enterprise teams fix slow maps, heavy dashboards, and confusing portals — without rewriting everything. From API to UI.
            </p>
            <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              Bandung, Indonesia • Remote / Hybrid • Full-time &amp; Contract • Available Immediately
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              {trustBadges.map(({ value, label }) => (
                <li key={label} className="hero-stat">
                  <span className="block text-xl font-extrabold tracking-tight text-primary">{value}</span>
                  <span className="mt-1 block text-[11px] leading-snug text-muted-foreground">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="btn-pill bg-primary px-6 text-[15px] text-primary-foreground shadow-[0_16px_30px_-16px_rgba(37,99,235,0.95)]">
                <a href={contact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" />WhatsApp Saya</a>
              </Button>
              <Button size="lg" variant="outline" onClick={handleDownload}
                      className="btn-pill border-border bg-card px-6 text-[15px] font-semibold hover:bg-secondary">
                <Download className="mr-2 h-4 w-4" />Download CV
              </Button>
            </div>
          </div>

          <div className="animate-fade-in-up relative z-10 lg:pl-6" style={{ animationDelay: "120ms" }}>
            <div className="portrait-matte mx-auto max-w-95 lg:max-w-none">
              <div className="portrait-inner">
                <Image src="/images/dedi-cutout-2026.png" alt="Dedi Kusniadi — Senior Frontend Engineer" width={760} height={1140}
                       priority
                       className="aspect-4/5 w-full object-cover object-top" />
                <div className="absolute bottom-3.5 left-3.5 sm:right-auto">
                  <div className="rounded-xl border border-border bg-card/90 px-4 py-3 shadow-lg backdrop-blur-sm">
                    <p className="flex items-center gap-2 text-[13px] font-bold">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-success" />Ex-Axiata Digital Labs
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">React / Next.js / Angular</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUSTED BY ================= */}
      <section id="trusted-by" className="scroll-mt-24 border-y border-border bg-secondary/30 py-10">
        <div className="shell">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Teams I&apos;ve worked with
          </p>
          <ul className="mt-6 grid grid-cols-2 items-center gap-x-6 gap-y-5 sm:grid-cols-4">
            {trustedBy.map(({ name, note }) => (
              <li key={name} className="trust-logo">
                <span>{name}</span>
                <span className="mt-1 block text-[10px] font-semibold normal-case tracking-normal text-muted-foreground/80">{note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-center text-[11px] italic text-muted-foreground">
            Company names shown for context only — internal screens and code stay under NDA.
          </p>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 py-16 md:py-20">
        <div className="shell grid items-center gap-10 lg:grid-cols-[0.9fr_1fr_0.8fr] lg:gap-12">
          <div className="animate-on-scroll img-reveal border border-border">
            <Image src="/images/about-workspace.png" alt="Developer workspace" width={900} height={700}
                   className="aspect-4/3 w-full object-cover" />
          </div>

          <div className="animate-on-scroll">
            <p className="kicker mb-4">About Me</p>
            <h2 className="section-head">Building Better Digital Experiences</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              10 years fixing slow dashboards at Axiata Digital Labs, Telin, and national logistics. I hate when users wait 30 seconds just to see a map. My job is to make enterprise software feel fast and obvious — without a big-bang rewrite.
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
      <section className="py-16 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-12">
          <div id="experience" className="animate-on-scroll scroll-mt-24">
            <div className="mb-2 flex items-center gap-2">
              <h2 className="section-head text-[26px]">Experience</h2>
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
            <p className="mb-7 text-sm text-muted-foreground">My Professional Journey</p>

            <div className="space-y-7">
              {experienceGroups.map(({ title, items, more }) => (
                <div key={title}>
                  <p className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{title}</p>
                  <div className="timeline-rail space-y-5">
                    {[...items, ...(showAllExp && more ? more : [])].map((exp) => (
                      <div key={`${exp.company}-${exp.period}`} className="timeline-item">
                        <p className="text-[15px] font-bold leading-snug">{exp.company}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">{exp.role}</p>
                        <p className="mt-0.5 text-xs font-semibold text-primary">{exp.period}</p>
                        {exp.note && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{exp.note}</p>}
                      </div>
                    ))}
                  </div>
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
                <p className="text-sm text-muted-foreground">Problem, Action, Result — two enterprise systems I owned the frontend of, plus my own R&D wallet build</p>
              </div>
              <a href="#case-studies" className="link-group text-sm font-semibold text-primary">
                Read the Case Studies <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <article className="card-lift soft-card animate-on-scroll overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <a href={`#case-${heroProject.index}`}
                   aria-label={`Open the ${heroProject.cardTitle} case study`}
                   className="img-reveal group relative block border-b border-border lg:border-b-0 lg:border-r">
                  {heroProject.image
                    ? <Image src={heroProject.image} alt={`${heroProject.cardTitle} — project screenshot`} width={900} height={620}
                             className="aspect-16/10 h-full w-full object-cover" />
                    : <div className="flex aspect-16/10 h-full w-full items-center justify-center bg-muted"><Layers className="h-14 w-14 text-muted-foreground/40" /></div>}
                </a>
                <div className="flex flex-col p-6">
                  <p className="cs-top-label">{heroProject.topLabel}</p>
                  <h3 className="mt-2.5 text-[26px] font-extrabold leading-tight tracking-tight md:text-3xl">{heroProject.cardTitle}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{heroProject.cardSubtitle}</p>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {heroProject.tech.slice(0, 4).map((t) => (<span key={t} className="tag-pill">{t}</span>))}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                    <Button asChild size="sm" variant="outline"
                            className="btn-pill h-10 border-border bg-card px-4 text-[13px] hover:bg-secondary">
                      <a href="#contact">
                        <Mail className="mr-1.5 h-4 w-4" />
                        {heroProject.cardCtaLabel ?? heroProject.ctaLabel}
                      </a>
                    </Button>
                    <Button asChild size="sm" variant="ghost" className="h-10 px-3 text-[13px] text-muted-foreground hover:bg-secondary hover:text-foreground">
                      <a href={`#case-${heroProject.index}`}>Case Study <ArrowRight className="ml-1.5 h-4 w-4" /></a>
                    </Button>
                  </div>
                </div>
              </div>
            </article>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
              {supportingProjects.map((cs) => (
                <article key={cs.index}
                         className="card-lift soft-card flex flex-col overflow-hidden lg:col-span-3">
                  <a href={`#case-${cs.index}`}
                     aria-label={`Open the ${cs.cardTitle} case study`}
                     className="img-reveal group relative block rounded-none border-0">
                    {cs.image
                      ? <Image src={cs.image} alt={`${cs.cardTitle} — project screenshot`} width={600} height={400}
                               className="aspect-16/10 w-full object-cover" />
                      : <div className="flex aspect-16/10 w-full items-center justify-center bg-muted"><Layers className="h-10 w-10 text-muted-foreground/40" /></div>}
                  </a>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="cs-top-label">{cs.topLabel}</p>
                    <div className="mt-2 flex items-start justify-between gap-2">
                      <p className="text-sm font-bold leading-snug">{cs.cardTitle}</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{cs.cardSubtitle}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {cs.tech.slice(0, 3).map((t) => (<span key={t} className="tag-pill">{t}</span>))}
                    </div>
                    <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-4">
                      <Button asChild size="sm" variant="outline"
                              className="btn-pill h-9 border-border bg-card px-3 text-xs hover:bg-secondary">
                        <a href="#contact">
                          <Mail className="mr-1 h-3.5 w-3.5" />
                          {cs.cardCtaLabel ?? cs.ctaLabel}
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="ghost" className="h-9 px-2.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground">
                        <a href={`#case-${cs.index}`}>Case Study <ArrowRight className="ml-1 h-3.5 w-3.5" /></a>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-8 mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Also shipped</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
              {caseStudies.filter((cs) => cs.ctaOnly).map((cs) => (
                <article key={cs.index} className="card-lift soft-card flex flex-col p-4 lg:col-span-2">
                  <p className="cs-top-label">{cs.topLabel}</p>
                  <div className="mt-2 flex items-start gap-2">
                    <Layers className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <p className="text-sm font-bold leading-snug">{cs.cardTitle}</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{cs.cardSubtitle}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cs.tech.slice(0, 3).map((t) => (<span key={t} className="tag-pill">{t}</span>))}
                  </div>
                  <div className="mt-auto pt-4">
                    <Button asChild size="sm" variant="outline"
                            className="btn-pill h-9 border-border bg-card px-3 text-xs hover:bg-secondary">
                      <a href="#contact">
                        <Mail className="mr-1 h-3.5 w-3.5" />
                        {cs.cardCtaLabel ?? cs.ctaLabel}
                      </a>
                    </Button>
                  </div>
                  <p className="mt-3 flex items-start gap-1.5 border-t border-border pt-3 text-[10px] leading-relaxed text-muted-foreground">
                    <Lock className="mt-0.5 h-3 w-3 shrink-0" /> {cs.codeNote}
                  </p>
                </article>
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
            <p className="cs-body mt-3 text-muted-foreground">
              Three systems, in depth: the problem, what I actually changed, and the result — plus what didn't work
              the first time. The supporting work is listed in Featured Projects.
            </p>
          </div>

          <div className="space-y-10">
            {caseStudies.filter((cs) => !cs.ctaOnly).map((cs) => (
              <article key={cs.title} id={`case-${cs.index}`} className="animate-on-scroll cs-card scroll-mt-24">
                <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
                  <div className="min-w-0">
                    <div className="img-reveal group relative block border border-border shadow-[0_18px_40px_-24px_rgba(11,27,58,0.35)]">
                      {cs.image
                        ? <Image src={cs.image} alt={cs.title} width={760} height={480} className="aspect-16/10 w-full rounded-lg object-cover" />
                        : <div className="flex aspect-16/10 w-full items-center justify-center bg-muted"><Layers className="h-10 w-10 text-muted-foreground/40" /></div>}
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold text-white shadow-lg">
                        <Layers className="h-3 w-3" /> Project screenshot
                      </span>
                    </div>
                    {cs.photoNote && <p className="mt-2 text-[11px] italic text-muted-foreground">{cs.photoNote}</p>}

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="outline"
                              className="btn-pill h-10 border-border bg-card px-4 text-[13px] hover:bg-secondary">
                        <a href="#contact">
                          <Mail className="mr-1.5 h-3.5 w-3.5" /> {cs.ctaLabel}
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="ghost"
                              className="h-10 px-4 text-[13px] text-muted-foreground hover:bg-secondary hover:text-foreground">
                        <a href={`#cs-${cs.index}-impact`}>Read the Case Study <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></a>
                      </Button>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="cs-index">{cs.index}</span>
                      <span className="tag-pill">{cs.sector}</span>
                      <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                        <Briefcase className="h-3.5 w-3.5 text-primary" /> {cs.role}
                      </span>
                    </div>
                    <p className="cs-top-label mb-2.5">{cs.topLabel}</p>
                    <h3 className="text-xl font-extrabold leading-snug tracking-tight md:text-2xl">{cs.title}</h3>
                    <p className="mt-1.5 text-sm font-semibold text-primary">{cs.client}</p>
                    <p className="cs-label mt-5 mb-2"><AlertTriangle className="h-3.5 w-3.5" /> Problem</p>
                    <p className="cs-body mt-0 text-muted-foreground">{cs.summary}</p>

                    <CaseStudyTabs
                      tabs={[
                        {
                          value: "did",
                          label: "Action",
                          anchorId: `cs-${cs.index}-did`,
                          children: (
                            <>
                              <p className="cs-label mb-3"><CheckCircle2 className="h-3.5 w-3.5" /> Action — what I changed</p>
                              <ul className="space-y-3">
                                {cs.contributions.map((c) => (
                                  <li key={c} className="cs-contrib">
                                    <span className="cs-contrib-icon"><CheckCircle2 className="h-3.5 w-3.5" /></span>
                                    <span className="cs-body text-muted-foreground">{c}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-4 flex flex-wrap gap-1.5">
                                {cs.tech.map((t) => (<span key={t} className="tag-pill">{t}</span>))}
                              </div>
                            </>
                          ),
                        },
                        {
                          value: "impact",
                          label: "Result",
                          anchorId: `cs-${cs.index}-impact`,
                          children: (
                            <>
                              <p className="cs-label mb-3"><TrendingUp className="h-3.5 w-3.5" /> Result — measured outcome</p>
                              {cs.impact && (
                                <div className="mb-4 space-y-3">
                                  {cs.impact.map((line) => (
                                    <p key={line} className="cs-body text-muted-foreground">{line}</p>
                                  ))}
                                </div>
                              )}
                              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                                {cs.metrics.map((m) => (
                                  <div key={m.label} className="metric-card cs-metric">
                                    <div className="metric-value">{m.value}</div>
                                    <div className="metric-label">{m.label}</div>
                                  </div>
                                ))}
                              </div>
                            </>
                          ),
                        },
                        {
                          value: "arch",
                          label: "Architecture",
                          anchorId: `cs-${cs.index}-arch`,
                          children: (
                            <div className="grid gap-5 lg:grid-cols-2 lg:gap-7">
                              <div>
                                <p className="cs-label mb-3"><Layers className="h-3.5 w-3.5" /> Architecture</p>
                                <ArchitectureDiagram layers={cs.arch} />
                              </div>
                              <div>
                                <p className="cs-label mb-3"><Code2 className="h-3.5 w-3.5" /> Engineering Notes — honest version</p>
                                <p className="cs-body rounded-xl border border-border bg-card p-5 text-muted-foreground">{cs.archNote}</p>
                              </div>
                            </div>
                          ),
                        },
                        {
                          value: "didnt",
                          label: "What Didn't Work",
                          anchorId: `cs-${cs.index}-didnt`,
                          children: (
                            <>
                              <div className="warn-card flex gap-3">
                                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#b45309] dark:text-[#fbbf24]" />
                                <div>
                                  <p className="text-xs font-bold text-[#b45309] dark:text-[#fbbf24]">What Didn't Work</p>
                                  <p className="cs-body mt-2 text-muted-foreground">{cs.didntWork}</p>
                                </div>
                              </div>
                              <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                                I keep this section in every case study on purpose — the failed first attempt is usually the useful part.
                              </p>
                            </>
                          ),
                        },
                      ]}
                    />

                    <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-border bg-muted/50 px-3.5 py-3">
                      <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <p className="text-[11px] leading-relaxed text-muted-foreground">
                        <span className="font-bold text-foreground">Code access:</span> {cs.codeNote}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TECH STACK ================= */}
      <section id="tech-stack" className="scroll-mt-24 py-16 md:py-20">
        <div className="shell">
          <div className="animate-on-scroll mb-10 max-w-2xl">
            <p className="kicker mb-4">Skills</p>
            <h2 className="section-head">What I use, and where it ran</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Hover any technology for the project it came from. Nothing here is a learning list — each one shipped
              to real users.
            </p>
          </div>

          <div className="grid animate-on-scroll gap-5 md:grid-cols-3">
            {techGroups.map(({ icon: Icon, title, items }) => (
              <div key={title} className="card-lift soft-card p-5 md:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="icon-badge"><Icon className="h-5 w-5" /></span>
                  <h3 className="text-[15px] font-bold">{title}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {items.map(({ name, tip }) => (
                    <li key={name}>
                      <span className="tip skill-chip" data-tip={tip} tabIndex={0} role="note" aria-label={`${name}: ${tip}`}>{name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW I WORK ================= */}
      <section id="how-i-work" className="scroll-mt-24 border-y border-border bg-secondary/40 py-16 md:py-20">
        <div className="shell">
          <div className="animate-on-scroll mb-10 max-w-2xl">
            <p className="kicker mb-4">How I Work In Your Team</p>
            <h2 className="section-head">Three steps, no big-bang rewrite</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The same loop on every system I have owned, whether it is a national logistics map or a compliance
              portal — and the goal every time is a team that keeps shipping after I leave.
            </p>
          </div>

          <ol className="grid gap-5 md:grid-cols-3">
            {howIWork.map(({ title, weeks, body }, i) => (
              <li key={title} className="animate-on-scroll card-lift soft-card relative p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[15px] font-bold leading-snug">{title}</h3>
                    <p className="text-[11px] font-semibold text-primary">{weeks}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section id="testimonial" className="scroll-mt-24 border-b border-border py-16 md:py-20">
        <div className="shell">
          <p className="animate-on-scroll text-center text-[11px] font-bold uppercase tracking-[0.18em] text-primary">What teams say</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {testimonials.map(({ quote, name, role, meta }) => (
              <figure key={name} className="animate-on-scroll flex flex-col rounded-2xl border border-border bg-blue-50/50 p-6 dark:bg-blue-500/[0.07]">
                <Quote className="h-6 w-6 text-primary/40" aria-hidden />
                <blockquote className="mt-3 flex-1 text-sm italic leading-relaxed md:text-[15px]">"{quote}"</blockquote>
                <figcaption className="mt-5 border-t border-border/60 pt-4">
                  <p className="text-[13px] font-bold text-primary">{name}</p>
                  <p className="mt-1 text-[11px] font-semibold text-muted-foreground">{role}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{meta}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-center text-[11px] text-muted-foreground">More references available on request.</p>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="scroll-mt-24 py-16 md:py-20">
        <div className="shell">
          <div className="contact-card animate-on-scroll relative overflow-hidden px-6 py-10 md:px-10 md:py-12">
            <span className="hero-slash opacity-60" aria-hidden />
            <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              <div>
                <p className="kicker mb-4">Contact</p>
                <h2 className="section-head text-[clamp(1.8rem,3.6vw,2.6rem)] font-black text-foreground">Let's fix what's slow, heavy, or confusing</h2>
                <p className="mt-4 max-w-lg text-[15px] font-medium leading-relaxed text-foreground">
                  Open to Senior Frontend roles — full-time or contract, remote or hybrid. Available immediately,
                  ready for a technical assessment, and ready to join on your start date.
                  I usually reply within a day.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="btn-pill bg-primary px-6 text-primary-foreground shadow-[0_16px_30px_-16px_rgba(37,99,235,0.95)]">
                    <a href={`mailto:${contact.email}`}><Mail className="mr-2 h-4 w-4" />Email me</a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="btn-pill border-border bg-card px-6 hover:bg-secondary">
                    <a href={contact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" />WhatsApp Saya</a>
                  </Button>
                  <Button asChild size="lg" variant="ghost" className="btn-pill px-4 text-foreground/75 hover:bg-secondary hover:text-foreground">
                    <a href={contact.linkedin} target="_blank" rel="noreferrer"><Linkedin className="mr-2 h-4 w-4" />LinkedIn</a>
                  </Button>
                  <Button asChild size="lg" variant="ghost" className="btn-pill px-4 text-foreground/75 hover:bg-secondary hover:text-foreground">
                    <a href={contact.github} target="_blank" rel="noreferrer"><Github className="mr-2 h-4 w-4" />GitHub</a>
                  </Button>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-foreground/70">
                  <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />Bandung, Indonesia (WIB)</span>
                  <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />Remote / Hybrid</span>
                  <span className="inline-flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" />Available Immediately</span>
                </div>

                <p className="mt-6 text-[11px] leading-relaxed text-foreground/60">
                  Prefer WhatsApp or email? Both buttons above reach me directly — the form sends straight to my inbox.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-border bg-card">
        <div className="shell border-b border-border py-10">
          <p className="kicker mb-3">Let&apos;s Talk</p>
          <p className="text-sm font-bold">Bandung, Indonesia • Remote / Hybrid • Available Immediately</p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button size="sm" variant="outline" onClick={handleDownload}
                    className="btn-pill h-9 border-border bg-card px-4 text-xs hover:bg-secondary">
              <Download className="mr-1.5 h-3.5 w-3.5" />Download CV PDF
            </Button>
            <Button asChild size="sm" variant="outline"
                    className="btn-pill h-9 border-border bg-card px-4 text-xs hover:bg-secondary">
              <a href={contact.whatsapp} target="_blank" rel="noreferrer"><MessageCircle className="mr-1.5 h-3.5 w-3.5" />WhatsApp Saya</a>
            </Button>
            <Button asChild size="sm" variant="outline"
                    className="btn-pill h-9 border-border bg-card px-4 text-xs hover:bg-secondary">
              <a href={contact.linkedin} target="_blank" rel="noreferrer"><Linkedin className="mr-1.5 h-3.5 w-3.5" />LinkedIn</a>
            </Button>
            <Button asChild size="sm" variant="outline"
                    className="btn-pill h-9 border-border bg-card px-4 text-xs hover:bg-secondary">
              <a href={contact.github} target="_blank" rel="noreferrer"><Github className="mr-1.5 h-3.5 w-3.5" />GitHub</a>
            </Button>
            <Button asChild size="sm" variant="outline"
                    className="btn-pill h-9 border-border bg-card px-4 text-xs hover:bg-secondary">
              <a href={`mailto:${contact.email}`}><Mail className="mr-1.5 h-3.5 w-3.5" />Email Me</a>
            </Button>
          </div>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Open to Senior Frontend / Full-Stack roles — Remote Full-time &amp; Contract. Available Immediately.
            Ready for assessment, ready to join on your start date.
          </p>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground">
            Code private under NDA — Demo &amp; walkthrough available in interview.
          </p>
        </div>

        <div className="shell flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="logo-mark h-9 w-9 text-xs">DK</span>
            <span className="leading-tight">
              <span className="block text-sm font-bold">Dedi Kusniadi</span>
              <span className="block text-xs text-muted-foreground">Senior Frontend Engineer • Angular / React / Next.js</span>
            </span>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerNavItems.map(({ label, href }) => (
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
        <div className="footer-rule border-t border-border py-4 text-center text-xs text-muted-foreground">
          <p>© 2026 Dedi Kusniadi. All rights reserved.</p>
          <p className="mt-1">Built with Next.js &amp; TypeScript.</p>
        </div>
      </footer>

      <FloatingHireButton />
    </div>
  )
}
