"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { TypewriterEffect } from "@/components/typewriter-effect"
import { FloatingHireButton } from "@/components/floating-hire-button"
import { Hero3DScene } from "@/components/hero-3d-scene"
import Image from "next/image"
import {
  ArrowRight, BriefcaseBusiness, Github, Linkedin, Mail,
  Code, Palette, Zap, Sparkles, Rocket, Terminal,
  Smartphone, Globe, Database, Menu, MapPin, Calendar,
  ExternalLink, ChevronRight,
} from "lucide-react"
import { useEffect, useState, useRef } from "react"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [scrollY, setScrollY] = useState(0)
  const navItems = ["About", "Experience", "Projects", "Contact"]

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    const handleScroll = () => setScrollY(window.scrollY)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            ;(entry.target as HTMLElement).style.opacity = "1"
            ;(entry.target as HTMLElement).style.transform = "translateY(0) scale(1)"
          }
        })
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    )

    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el))

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])


  const projects = [
    { icon: Code, title: "Logistics Management System", image: "/gis.png", desc: "Enterprise logistics platform with real-time tracking and route optimization.", gradient: "from-violet-500/30 to-cyan-500/30", category: "web", tech: ["React.js", "TypeScript", "Zustand"] },
    { icon: Code, title: "Dashboard", image: "/dashboard.png", desc: "Modern e-commerce analytics dashboard with Vue.js and Pinia state management.", gradient: "from-blue-500/30 to-purple-500/30", category: "web", tech: ["Vue.js", "TypeScript", "Pinia"] },
    { icon: Smartphone, title: "Telin", image: "/Telin.png", desc: "Telecom enterprise portal built with Angular 11, Bootstrap 4 and modern CSS.", gradient: "from-green-500/30 to-teal-500/30", category: "web", tech: ["Angular", "Bootstrap", "HTML5"] },
    { icon: Palette, title: "Axonect", desc: "Enterprise-grade Angular application with comprehensive unit test coverage.", gradient: "from-pink-500/30 to-orange-500/30", category: "web", tech: ["Angular", "Bootstrap", "Figma", "Unit Test"] },
    { icon: Zap, title: "Widget Accessibility", desc: "WordPress plugin leveraging TensorFlow.js for AI-powered accessibility tools.", gradient: "from-yellow-500/30 to-red-500/30", category: "web", tech: ["JavaScript", "TensorFlow.js", "HTML", "CSS"] },
    { icon: Globe, title: "E-Working Permit", image: "/eworking.png", desc: "Digital work permit management system for enterprise compliance.", gradient: "from-purple-500/30 to-pink-500/30", category: "web", tech: ["Angular", "Bootstrap 4", "Angular Material"] },
    { icon: Database, title: "XL — BAU Automation", desc: "Business-as-usual automation platform for XL Axiata enterprise operations.", gradient: "from-indigo-500/30 to-cyan-500/30", category: "web", tech: ["Angular", "Angular Material", "Bootstrap 4"] },
    { icon: Code, title: "ADA BSP", image: "/ADA.png", desc: "BSP management system for ADA with complex data visualizations.", gradient: "from-blue-500/30 to-violet-500/30", category: "web", tech: ["Angular", "TypeScript", "Bootstrap", "Angular Material"] },
    { icon: Smartphone, title: "BAT", desc: "Cross-platform business automation tool with responsive Angular frontend.", gradient: "from-teal-500/30 to-blue-500/30", category: "web", tech: ["Angular", "Bootstrap", "HTML"] },
    { icon: Palette, title: "Point Of Sale", desc: "High-performance POS system with Recoil state management and full test coverage.", gradient: "from-rose-500/30 to-orange-500/30", category: "web", tech: ["React.js", "Bootstrap", "Unit Test", "Recoil"] },
    { icon: Zap, title: "Ayo Jakarta", desc: "Flutter mobile app with Firebase backend for Jakarta city services.", gradient: "from-amber-500/30 to-red-500/30", category: "mobile", tech: ["Flutter", "Firebase"] },
    { icon: Globe, title: "Gramedia Writing Project", image: "/ewp.png", desc: "Writing platform for Gramedia with complex editorial workflows.", gradient: "from-purple-500/30 to-violet-500/30", category: "web", tech: ["Angular", "Bootstrap 4", "Angular Material"] },
    { icon: Database, title: "Epaper Danone", desc: "Digital publication platform for Danone corporate communications.", gradient: "from-cyan-500/30 to-indigo-500/30", category: "web", tech: ["JavaScript", "HTML", "CSS"] },
    { icon: Code, title: "Epaper AQUA", desc: "AQUA digital magazine platform with rich media support.", gradient: "from-blue-500/30 to-cyan-500/30", category: "web", tech: ["JavaScript", "HTML", "CSS"] },
    { icon: Smartphone, title: "Koran Bisnis", image: "/koran.png", desc: "Digital newspaper platform for Bisnis Indonesia publication.", gradient: "from-green-500/30 to-blue-500/30", category: "web", tech: ["CodeIgniter", "Bootstrap", "HTML"] },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter)

  const experiences = [
    {
      title: "Senior Frontend Engineer",
      company: "Axiata Digital Labs",
      period: "2020 — Present",
      desc: "Leading UI development for SaaS platforms, mobile apps, and WordPress plugins. Collaborating across product, design, and engineering to deliver performant, scalable interfaces.",
      tech: ["JavaScript", "TypeScript", "React", "React Native", "Angular"],
      accent: "from-violet-500 to-purple-600",
    },
    {
      title: "Senior Software Engineer",
      company: "Kreasi Digital Indo Utama",
      period: "Jan 2020 — May 2020",
      desc: "Led frontend development for Restaurant and POS systems, creating touch-screen and mobile order interfaces handling high-volume real-time transactions.",
      tech: ["PHP", "Laravel", "React", "MySQL"],
      accent: "from-cyan-500 to-blue-600",
    },
    {
      title: "Senior Software Engineer",
      company: "Ayo Media Network",
      period: "Oct 2019 — Dec 2019",
      desc: "Full-stack development for high-traffic web media platform and native mobile applications for iOS and Android using Flutter.",
      tech: ["Flutter", "CodeIgniter", "Laravel", "MySQL", "HTML", "CSS"],
      accent: "from-pink-500 to-rose-600",
    },
    {
      title: "Frontend Developer",
      company: "Bank BTPN Tbk",
      period: "Jun 2019 — Sep 2019",
      desc: "Built mission-critical internal banking applications — back-office, compliance, risk management tools adhering to strict banking security standards.",
      tech: ["Angular", "HTML", "SCSS", "Node.js", "Angular Material"],
      accent: "from-emerald-500 to-teal-600",
    },
    {
      title: "Web Developer",
      company: "Bisnis Indonesia Sibertama",
      period: "Jun 2018 — Aug 2019",
      desc: "Developed and maintained full-stack digital products for Bisnis Indonesia's web media and mobile platforms.",
      tech: ["CodeIgniter", "JavaScript", "MySQL", "jQuery"],
      accent: "from-orange-500 to-amber-600",
    },
    {
      title: "Software Developer",
      company: "Bisnis Indonesia",
      period: "Aug 2015 — Jul 2018",
      desc: "Built web media platform and native mobile applications with multiple technology stacks across full development lifecycle.",
      tech: ["AngularJS", "Flutter", "MySQL", "CodeIgniter", "PHP", "Ionic"],
      accent: "from-indigo-500 to-violet-600",
    },
    {
      title: "Junior Software Developer",
      company: "Springfields",
      period: "Aug 2013 — Dec 2013",
      desc: "Developed internal applications and public service portals with focus on secure, maintainable code.",
      tech: ["HTML", "MySQL", "CodeIgniter", "PHP", "CSS"],
      accent: "from-slate-500 to-gray-600",
    },
  ]

  function handleDownload() {
    const link = document.createElement("a")
    link.href = "/cv_dedi.pdf"
    link.download = "cv_dedi.pdf"
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }


  return (
    <div className="site-shell min-h-screen bg-background text-foreground relative overflow-x-hidden noise-overlay">

      {/* === CURSOR GLOW === */}
      <div
        className="cursor-glow pointer-events-none fixed z-0 h-[600px] w-[600px] rounded-full opacity-[0.07] blur-[100px] transition-transform duration-700"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,1) 0%, rgba(34,211,238,0.6) 60%, transparent 100%)",
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
      />

      {/* === BACKGROUND GRID === */}
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-100 z-0" />

      {/* === ANIMATED BG BLOBS === */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="bg-blob bg-blob-one absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full opacity-[0.06] blur-[120px] animate-float"
          style={{ background: "radial-gradient(circle, #7c3aed, #22d3ee)" }} />
        <div className="bg-blob bg-blob-two absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-[0.06] blur-[120px] animate-float"
          style={{ background: "radial-gradient(circle, #f472b6, #7c3aed)", animationDelay: "2.5s" }} />
      </div>


      {/* === NAVBAR === */}
      <nav className={`sticky top-0 z-50 flex justify-between items-center py-3 px-6 transition-all duration-500 ${scrollY > 50 ? "nav-blur shadow-lg shadow-black/10" : "bg-transparent"}`}>
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center">
            <span className="text-xs font-black text-white">DK</span>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Dedi Kusniadi
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 relative group font-medium tracking-wide"
            >
              {item}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <ThemeToggle />
          <Button size="sm" className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white border-0 hover:scale-105 transition-all btn-glow text-xs px-4">
            <a href="#contact">Hire Me</a>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-effect flex flex-col gap-6 mt-8 border-white/10">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`}
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="h-4 w-4 text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item}
                </a>
              ))}
            </SheetContent>
          </Sheet>
        </div>
      </nav>


      {/* === HERO === */}
      <section className="relative z-10 pt-16 pb-24 px-6 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

            {/* LEFT */}
            <div className={`transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}>

              {/* Status pill */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
                style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(34,211,238,0.1))", border: "1px solid rgba(124,58,237,0.3)" }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Available for new projects
                </span>
              </div>

              {/* Name */}
              <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black mb-4 leading-[0.92] tracking-tight">
                <span className="hero-name-dedi block">
                  Dedi
                </span>
                <span className="hero-name-kusniadi bg-gradient-to-r from-violet-400 via-cyan-300 to-pink-400 animate-gradient bg-clip-text text-transparent block">
                  Kusniadi
                </span>
              </h1>

              {/* Typewriter */}
              <div className="text-xl lg:text-2xl mb-6 font-mono flex items-center gap-2">
                <span className="text-violet-400">&gt;_</span>
                <TypewriterEffect
                  words={["Enterprise UI Specialist", "React & Angular Expert", "13+ Years of Craft", "Design-minded Engineer"]}
                  className="text-muted-foreground"
                />
              </div>

              <p className="max-w-lg text-base lg:text-lg text-muted-foreground mb-8 leading-relaxed">
                I build fast, maintainable web applications for enterprise teams — SaaS platforms, dashboards, and digital products. 13+ years shipping production-grade UI.
              </p>

              {/* Stats */}
              <div className="mb-8 grid grid-cols-3 gap-4 max-w-sm">
                {[["13+", "Years Exp."], ["35+", "Projects"], ["4", "Tech Stacks"]].map(([val, lbl]) => (
                  <div key={lbl} className="text-center rounded-xl p-3 glass-effect gradient-border">
                    <div className="text-2xl font-black stat-value">{val}</div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-widest mt-0.5">{lbl}</div>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button asChild size="lg"
                  className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 hover:scale-105 transition-all duration-300 btn-glow text-white border-0 font-semibold">
                  <a href="#projects">
                    <BriefcaseBusiness className="w-4 h-4 mr-2" />
                    View My Work
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" onClick={handleDownload}
                  className="hover:scale-105 transition-all duration-300 glass-effect bg-transparent border-white/20 hover:border-violet-500/50 hover:text-violet-400 font-semibold">
                  <Terminal className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </div>

              {/* Social */}
              <div className="flex gap-2">
                {[
                  { icon: Github, href: "https://github.com/dedikusniadi2026", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/dedi-kusniadi", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:dedikusniadi.bisnis@gmail.com", label: "Email" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm"
                      className="h-10 w-10 rounded-full glass-effect hover:text-violet-400 hover:scale-110 transition-all duration-300 hover:border-violet-500/30 border border-white/10">
                      <s.icon className="w-4 h-4" />
                    </Button>
                  </a>
                ))}
                <div className="flex items-center gap-2 ml-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3 text-violet-400" />
                  Indonesia
                </div>
              </div>
            </div>

            {/* RIGHT — 3D Scene */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}>
              <Hero3DScene />

              {/* Floating badge — profile */}
              <div className="absolute -left-4 top-6 hidden md:flex rounded-2xl glass-effect border border-white/10 p-3 shadow-2xl items-center gap-3"
                style={{ boxShadow: "0 8px 32px rgba(124,58,237,0.25)" }}>
                <div className="relative">
                  <Image src="/1609985817736.jpg" width={44} height={44} alt="Dedi Kusniadi"
                    className="h-11 w-11 rounded-xl object-cover" priority />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-background" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Open to work</div>
                  <div className="text-xs text-muted-foreground">Freelance / Full-time</div>
                </div>
              </div>

              {/* Floating badge — performance */}
              <div className="absolute -right-2 bottom-24 hidden md:flex rounded-2xl glass-effect border border-violet-500/20 px-4 py-2.5 shadow-xl items-center gap-2"
                style={{ boxShadow: "0 8px 32px rgba(124,58,237,0.2)" }}>
                <Rocket className="h-4 w-4 text-violet-400" />
                <span className="text-sm font-semibold">Performance-first UI</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* === ABOUT === */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll">
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold tracking-widest uppercase text-violet-400">
              <span className="h-px w-8 bg-violet-400" /> About Me
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-12 heading-glow">
              Crafting interfaces<br />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">that people love</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="animate-on-scroll space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-base">
                I'm a Frontend Developer with over <strong className="text-foreground">6 years of experience</strong> building web applications for enterprise and consumer products. I focus on clean, scalable, and maintainable UI, collaborating closely with backend, QA, and product teams.
              </p>
              <p className="text-base">
                My approach combines solid engineering fundamentals with a sharp eye for design — turning complex requirements into interfaces that are both beautiful and fast.
              </p>
              <p className="text-base">
                Currently open to <strong className="text-violet-400">freelance or full-time opportunities</strong> where I can contribute my experience and continue to grow.
              </p>
            </div>

            <div className="animate-on-scroll">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {["JavaScript","TypeScript","React.js","Redis","Angular Framework","Vue.js","React.js","Nest.js","Docker","RabitMQ","Codeigniter","Laravel","Next.js","Node.js","Tailwind CSS","SCSS","REST APIs","Shadcn UI","Ant Design","Figma","Git"].map((tech) => (
                  <Badge key={tech} variant="outline"
                    className="badge-tech text-sm border-white/10 bg-white/5 hover:bg-violet-500/20 cursor-default">
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Skill bars */}
              <div className="mt-8 space-y-3">
                {[
                  { label: "Angular / Enterprise", pct: 95 },
                  { label: "React / Next.js", pct: 90 },
                  { label: "Vue.js", pct: 80 },
                  { label: "UI/UX Design", pct: 75 },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{s.label}</span>
                      <span className="text-violet-400 font-semibold">{s.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-1000"
                        style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* === EXPERIENCE === */}
      <section id="experience" className="relative z-10 py-24 px-6">
        <div className="section-wash absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="animate-on-scroll mb-16">
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold tracking-widest uppercase text-violet-400">
              <span className="h-px w-8 bg-violet-400" /> Career
            </div>
            <h2 className="text-4xl lg:text-5xl font-black heading-glow">
              Work <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Experience</span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-cyan-500/40 to-transparent hidden lg:block" />

            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i} className="animate-on-scroll" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="lg:pl-12 relative group">
                    {/* Timeline dot */}
                    <div className="absolute left-2 top-6 h-5 w-5 rounded-full bg-background border-2 border-violet-500/50 hidden lg:flex items-center justify-center -translate-x-1/2 group-hover:border-violet-400 group-hover:scale-125 transition-all duration-300">
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                    </div>

                    <Card className="p-6 border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-500 timeline-card gradient-border group-hover:shadow-lg group-hover:shadow-violet-500/10 overflow-hidden relative">
                      {/* Accent stripe */}
                      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${exp.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                        <div>
                          <h4 className="text-lg font-bold text-foreground group-hover:text-violet-300 transition-colors">{exp.title}</h4>
                          <p className={`text-sm font-semibold bg-gradient-to-r ${exp.accent} bg-clip-text text-transparent`}>{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap glass-effect px-3 py-1.5 rounded-full border-white/10">
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{exp.desc}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {exp.tech.map((t) => (
                          <Badge key={t} variant="outline"
                            className="text-[11px] border-white/10 bg-white/5 hover:bg-violet-500/20 transition-colors badge-tech">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* === PROJECTS === */}
      <section id="projects" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll mb-12">
            <div className="portfolio-kicker inline-flex items-center gap-2 mb-4 text-xs font-semibold tracking-widest uppercase text-violet-400">
              <span className="h-px w-8 bg-violet-400" /> Portfolio
            </div>
            <h2 className="text-4xl lg:text-5xl font-black heading-glow">
              Featured <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="animate-on-scroll flex flex-wrap gap-2 mb-10">
            {["all", "web", "mobile", "design"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/25"
                    : "project-filter-button glass-effect text-muted-foreground hover:text-foreground border-white/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project, i) => (
              <div
                key={project.title}
                className="animate-on-scroll perspective-card shimmer-card group"
                style={{ transitionDelay: `${(i % 6) * 60}ms` }}
              >
                <Card className="project-card h-full border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500 overflow-hidden gradient-border">
                  {/* Image / gradient header */}
                  <div className={`relative h-40 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <project.icon className="w-12 h-12 text-white/20 group-hover:text-white/40 transition-colors duration-300" />
                      </div>
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Category badge */}
                    <div className="absolute top-3 right-3">
                      <span className="project-category-badge text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full glass-effect border-white/20 text-white/80">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-base mb-1.5 text-foreground group-hover:text-violet-300 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="text-[10px] border-white/10 bg-white/5 badge-tech"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* === CONTACT === */}
      <section id="contact" className="relative z-10 py-24 px-6">
        <div className="section-wash absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <div className="animate-on-scroll text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold tracking-widest uppercase text-violet-400">
              <span className="h-px w-8 bg-violet-400" /> Contact
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-4 heading-glow">
              Let&apos;s work <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">together</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-md mx-auto">
              Open for freelance projects, full-time roles, and interesting collaborations. Drop me a message.
            </p>
          </div>

          <div className="animate-on-scroll">
            <Card className="p-8 md:p-12 border-white/[0.06] bg-white/[0.02] backdrop-blur-sm gradient-border text-center"
              style={{ boxShadow: "0 32px 80px rgba(124,58,237,0.15)" }}>

              {/* Status */}
              <div className="inline-flex items-center gap-2 mb-8 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
                style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(34,211,238,0.1))", border: "1px solid rgba(124,58,237,0.3)" }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Available now
                </span>
              </div>

              {/* Links */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Mail, label: "Email", value: "dedikusniadi.bisnis@gmail.com", href: "mailto:dedikusniadi.bisnis@gmail.com", color: "from-violet-500/20 to-violet-600/10" },
                  { icon: Linkedin, label: "LinkedIn", value: "dedi-kusniadi", href: "https://www.linkedin.com/in/dedi-kusniadi", color: "from-cyan-500/20 to-cyan-600/10" },
                  { icon: Github, label: "GitHub", value: "dedikusniadi2026", href: "https://github.com/dedikusniadi2026", color: "from-pink-500/20 to-pink-600/10" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col items-center gap-2 rounded-xl p-4 bg-gradient-to-br ${link.color} border border-white/10 hover:border-violet-500/40 transition-all duration-300 hover:scale-105`}
                  >
                    <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-violet-400 transition-colors" />
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{link.label}</span>
                    <span className="text-xs text-foreground/70 truncate max-w-full">{link.value}</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground/40 group-hover:text-violet-400 transition-colors" />
                  </a>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg"
                  className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 hover:scale-105 transition-all duration-300 btn-glow text-white border-0 font-semibold">
                  <a href="mailto:dedikusniadi.bisnis@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                    <Sparkles className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" onClick={handleDownload}
                  className="hover:scale-105 transition-all duration-300 glass-effect bg-transparent border-white/20 hover:border-violet-500/50 hover:text-violet-400 font-semibold">
                  <Terminal className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>


      {/* === FOOTER === */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center">
              <span className="text-[9px] font-black text-white">DK</span>
            </div>
            <span>Dedi Kusniadi</span>
            <span className="text-white/20">·</span>
            <span>Frontend Developer</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <span className="text-violet-400 font-semibold mx-1">Next.js</span>
            <span>&amp;</span>
            <span className="text-cyan-400 font-semibold mx-1">Tailwind CSS</span>
            <span>·</span>
            <span className="ml-1">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

      {/* Floating hire button */}
      <FloatingHireButton />
    </div>
  )
}
