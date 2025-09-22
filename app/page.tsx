"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { TypewriterEffect } from "@/components/typewriter-effect"
import { FloatingHireButton } from "@/components/floating-hire-button"
import Image from 'next/image'
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Zap,
  Star,
  Sparkles,
  Rocket,
  Terminal,
  Smartphone,
  Globe,
  Database,
} from "lucide-react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }


    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
        }
      })
    }, observerOptions)

    const animateElements = document.querySelectorAll(".animate-on-scroll")
    animateElements.forEach((el) => observer.observe(el))

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
    }
  }, [])

  const projects = [
    {
      icon: Code,
      title: "Dashboard",
      desc: "Modern e-commerce with Vuejs and vinia",
      gradient: "from-blue-500/20 to-purple-500/20",
      category: "web",
      tech: ["vue.js", "TypeScript", "Pinia"],
    },
    {
      icon: Smartphone,
      title: "Telin",
      desc: "Angular 11 framework, boostrap 4 , css 3, html 5",
      gradient: "from-green-500/20 to-blue-500/20",
      category: "web",
      tech: ["Angular", "Boostrap", "html"],
    },
    {
      icon: Palette,
      title: "Axonect",
      desc: "angular 11",
      gradient: "from-pink-500/20 to-orange-500/20",
      category: "design",
      tech: ["Angular", "boostrap", "Figma", "unit test"],
    },
    {
      icon: Zap,
      title: "widget accebility",
      desc: "plugin wordpress",
      gradient: "from-yellow-500/20 to-red-500/20",
      category: "web",
      tech: ["javascript", "tensorflow js", "html", "css"],
    },
    {
      icon: Globe,
      title: "Eworking permit",
      desc: "A working permit (often called a work permit)",
      gradient: "from-purple-500/20 to-pink-500/20",
      category: "web",
      tech: ["Angular", "boostrap 4", "angular material"],
    },
    {
      icon: Database,
      title: "XL - Bussiness as usual automation",
      desc: "Project xl",
      gradient: "from-indigo-500/20 to-cyan-500/20",
      category: "web",
      tech: ["Angular", "Angular Material", "Boostrap 4"],
    },
    {
      icon: Code,
      title: "ADA BSP",
      desc: "",
      gradient: "from-blue-500/20 to-purple-500/20",
      category: "web",
      tech: ["Angular", "TypeScript", "Boostrap","Angular Material"],
    },
    {
      icon: Smartphone,
      title: "BAT",
      desc: "",
      gradient: "from-green-500/20 to-blue-500/20",
      category: "web",
      tech: ["Angular", "Boostrap", "html"],
    },
    {
      icon: Palette,
      title: "Point Of Sale",
      desc: "",
      gradient: "from-pink-500/20 to-orange-500/20",
      category: "web",
      tech: ["Reactjs", "boostrap", "unit test","recoil"],
    },
    {
      icon: Zap,
      title: "Ayo Jakarta",
      desc: "",
      gradient: "from-yellow-500/20 to-red-500/20",
      category: "mobile",
      tech: ["Flutter", "firebase"],
    },
    {
      icon: Globe,
      title: "Gramedia Writing Project",
      desc: "",
      gradient: "from-purple-500/20 to-pink-500/20",
      category: "web",
      tech: ["Angular", "boostrap 4", "angular material"],
    },
    {
      icon: Database,
      title: "Epaper Danone",
      desc: "",
      gradient: "from-indigo-500/20 to-cyan-500/20",
      category: "web",
      tech: ["Javascript", "html", "css"],
    },
    {
      icon: Code,
      title: "Epaper AQUA",
      desc: "",
      gradient: "from-blue-500/20 to-purple-500/20",
      category: "web",
      tech: ["javascript", "html", "css"],
    },
    {
      icon: Smartphone,
      title: "Koran Bisnis",
      desc: "",
      gradient: "from-green-500/20 to-blue-500/20",
      category: "web",
      tech: ["Codeigniter", "Boostrap", "html"],
    },

  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)


  function handleDownload(): void {
      const link = document.createElement("a");
    link.href = "/cv_dedi.pdf";
    link.download = "cv_dedi.pdf";
    link.click();
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Dedi Kusniadi
            </div>
            <div className="hidden md:flex items-center gap-8">
              {["About", "Experience", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
            >
              <div className="mb-4">
                <span className="text-primary font-mono text-sm">{"<developer>"}</span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-bold mb-6 text-balance">
                <span className="bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-clip-text text-transparent neon-text">
                  Dedi Kusniadi
                </span>
              </h1>
              <div className="text-2xl lg:text-3xl mb-6 font-mono">
                <TypewriterEffect
                  words={["Frontend Engineer", "React Developer", "UI/UX Designer", "Full Stack Developer"]}
                  className="text-muted-foreground"
                />
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                My aim is to provide the best I can, to the organization I am working for, with reliability and responsibility to achieve professional and personal satisfaction as well as growth.
              </p>
              <div className="flex gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all duration-300 animate-glow"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  View My Work
                </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="hover:scale-105 transition-all duration-300 glass-effect bg-transparent"
                    onClick={handleDownload}>
                    <Terminal className="w-4 h-4 mr-2" />
                    Download CV
                  </Button>
              </div>
              <div className="flex gap-4">
                {[Github, Linkedin, Mail].map((Icon, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="hover:scale-110 hover:text-primary transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                ))}
              </div>
              <div className="mt-4">
                <span className="text-primary font-mono text-sm">{"</developer>"}</span>
              </div>
            </div>
            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
            >
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-3xl flex items-center justify-center animate-float perspective-card">
                  <div className="text-8xl animate-pulse">

                  <Image
                    src="/1609985817736.jpg"
                    width={500}
                    height={500}
                    alt="My Image"
                  />

                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-bounce flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-accent rounded-full animate-bounce delay-500 flex items-center justify-center">
                    <Star className="w-4 h-4 text-accent-foreground" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-xl -z-10 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6">About</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                 I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that seamlessly blend thoughtful design with solid engineering. I thrive at the intersection of design and development, creating experiences that not only look stunning but are meticulously optimized for performance, usability, and inclusivity.
                </p>
                <p>
                  Currently, I serve as a Senior Front-End Engineer at <span className="text-primary font-medium"> Axiata Digital Labs </span>, specializing in accessibility. I design, build, and maintain UI components that power our platform's frontend, ensuring our applications adhere to web accessibility standards and best practices to deliver a truly inclusive user experience.
                </p>
                <p>
                  Throughout my career, I've developed software in diverse environments — from advertising agencies and large corporations to startups and boutique digital product studios. This breadth of experience has honed my ability to adapt quickly, tackle complex challenges, and consistently deliver high-quality, user-centered solutions.
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Technologies I work with</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript",
                  "Angular",
                  "Shadcn ui",
                  "Ant Design",
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Vue.js",
                  "Node.js",
                  "Tailwind CSS",
                  "SCSS",
                  "REST APIs",
                  "Git",
                  "Figma",
                ].map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-12">Experience</h3>
          <div className="space-y-8">
            <Card className="p-6 border-border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold">Senior Frontend Engineer </h4>
                  <p className="text-primary font-medium">Axiata Digital Labs</p>
                </div>
                <p className="text-muted-foreground">2020 — Present</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
               As a  Senior frontend developer, I use Angular framework and JavaScript to build user interfaces for web applications.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline">JavaScript</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">React Native</Badge>
                <Badge variant="outline">Angular</Badge>
              </div>
            </Card>

            <Card className="p-6 border-border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold">Senior Software Enginner</h4>
                  <p className="text-primary font-medium">kreasi digital indo utama</p>
                </div>
                <p className="text-muted-foreground">Jan 2020 — May 2020</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Developed and shipped highly interactive web applications for millions of users. Collaborated with
                designers and backend engineers to deliver pixel-perfect, performant user experiences.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">PHP</Badge>
                <Badge variant="outline">Laravel</Badge>
                <Badge variant="outline">Mysql</Badge>
              </div>
            </Card>

              <Card className="p-6 border-border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold">Senior Software Enginner</h4>
                  <p className="text-primary font-medium">ayo media network</p>
                </div>
                <p className="text-muted-foreground">oct 2019 — Dec 2019</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Developed and shipped highly interactive web applications for millions of users. Collaborated with
                designers and backend engineers to deliver pixel-perfect, performant user experiences.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline">Flutter</Badge>
                <Badge variant="outline">Codeigniter</Badge>
                <Badge variant="outline">Laravel</Badge>
                <Badge variant="outline">Mysql</Badge>
                <Badge variant="outline">html</Badge>
                <Badge variant="outline">css</Badge>
              </div>
            </Card>

              <Card className="p-6 border-border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold">Frontend Developer</h4>
                  <p className="text-primary font-medium">Bank BTPN Tbk</p>
                </div>
                <p className="text-muted-foreground">jun 2019 — sep 2019</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Developed and shipped highly interactive web applications for millions of users. Collaborated with
                designers and backend engineers to deliver pixel-perfect, performant user experiences.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline">Angular</Badge>
                <Badge variant="outline">html</Badge>
                <Badge variant="outline">SCSS</Badge>
                <Badge variant="outline">Node.js</Badge>
              </div>
            </Card>

              <Card className="p-6 border-border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold">Web Developer</h4>
                  <p className="text-primary font-medium">Bisnis Indonesia sibertama</p>
                </div>
                <p className="text-muted-foreground">Jun 2018 — Aug 2019</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Developed and shipped highly interactive web applications for millions of users. Collaborated with
                designers and backend engineers to deliver pixel-perfect, performant user experiences.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline">Codeigniter</Badge>
                <Badge variant="outline">Javascript</Badge>
                <Badge variant="outline">Mysql</Badge>
                <Badge variant="outline">Jquery</Badge>
              </div>
            </Card>

              <Card className="p-6 border-border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold">Software Developer</h4>
                  <p className="text-primary font-medium">Bisnis Indonesia</p>
                </div>
                <p className="text-muted-foreground">Aug 2015 — Jul 2018</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Developed and shipped highly interactive web applications for millions of users. Collaborated with
                designers and backend engineers to deliver pixel-perfect, performant user experiences.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline">Angularjs</Badge>
                <Badge variant="outline">Flutter</Badge>
                <Badge variant="outline">Codeigniter</Badge>
                <Badge variant="outline">PHP</Badge>
              </div>
            </Card>

               <Card className="p-6 border-border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold">Junior Software Developer</h4>
                  <p className="text-primary font-medium">Springfields</p>
                </div>
                <p className="text-muted-foreground">Aug 2013 — Dec 2013</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Developed and shipped highly interactive web applications for millions of users. Collaborated with
                designers and backend engineers to deliver pixel-perfect, performant user experiences.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline">Codeigniter</Badge>
                <Badge variant="outline">Html</Badge>
                <Badge variant="outline">Css</Badge>
                <Badge variant="outline">Mysql</Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll">
            <h3 className="text-4xl font-bold mb-4 text-center">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h3>
            <p className="text-center text-muted-foreground mb-8">Some of my recent work</p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { key: "all", label: "All Projects" },
                { key: "web", label: "Web Apps" },
                { key: "mobile", label: "Mobile" },
                { key: "design", label: "Design" },
                { key: "backend", label: "Backend" },
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? "default" : "outline"}
                  onClick={() => setActiveFilter(filter.key)}
                  className="transition-all duration-300 hover:scale-105"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 perspective-card glass-effect animate-on-scroll hover:shadow-2xl hover:shadow-primary/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`aspect-video bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
                >
                  <project.icon className="w-16 h-16 text-primary group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 2).map((tech, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:text-primary transition-colors group-hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:text-primary transition-colors group-hover:scale-105"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h3 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Let's Create Something Amazing
            </span>
          </h3>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            Ready to bring your ideas to life? Let's discuss how we can build something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all duration-300 animate-glow"
            >
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>
            <div className="flex gap-4 justify-center">
              <a href="https://github.com/dedikusniadi2026" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="hover:scale-105 transition-all duration-300 glass-effect bg-transparent"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </a>
             <a
                href="https://www.linkedin.com/in/dedi-kusniadi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:scale-105 transition-all duration-300 glass-effect bg-transparent"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </a>

            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-border glass-effect">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            &copy; 2025 Dedi Kusniadi. Built with <span className="text-primary">Next.js</span> and{" "}
            <span className="text-accent">Tailwind CSS</span>
          </p>
        </div>
      </footer>

      <FloatingHireButton />
    </div>
  )
}
