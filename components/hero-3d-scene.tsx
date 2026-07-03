"use client"

import Image from "next/image"

export function Hero3DScene() {
  return (
    <div className="relative h-[340px] w-full sm:h-[420px] md:h-[580px] flex items-center justify-center">

      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(124,58,237,0.18),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_70%_25%,rgba(34,211,238,0.10),transparent)]" />

      {/* Decorative ring — outer */}
      <div
        className="absolute rounded-full border border-violet-500/20 animate-spin-slow"
        style={{ width: "92%", maxWidth: 420, aspectRatio: "1", animationDuration: "18s" }}
      />
      {/* Decorative ring — middle */}
      <div
        className="absolute rounded-full border border-cyan-400/15"
        style={{ width: "78%", maxWidth: 360, aspectRatio: "1" }}
      />

      {/* Floating accent dot — top right */}
      <span
        className="absolute top-[12%] right-[15%] h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_4px_rgba(34,211,238,0.5)]"
        style={{ animation: "pulse 2.4s ease-in-out infinite" }}
      />
      {/* Floating accent dot — bottom left */}
      <span
        className="absolute bottom-[18%] left-[12%] h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_10px_4px_rgba(244,114,182,0.5)]"
        style={{ animation: "pulse 3s ease-in-out infinite 0.8s" }}
      />
      {/* Floating accent dot — top left */}
      <span
        className="absolute top-[22%] left-[16%] h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_3px_rgba(124,58,237,0.5)]"
        style={{ animation: "pulse 2.8s ease-in-out infinite 1.4s" }}
      />

      {/* Photo — main */}
      <div className="relative z-10 group">
        {/* Gradient border ring */}
        <div
          className="rounded-full p-[3px]"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #22d3ee, #f472b6, #7c3aed)",
            backgroundSize: "300% 300%",
            animation: "gradient-shift 5s ease infinite",
            boxShadow: "0 0 40px rgba(124,58,237,0.35), 0 0 80px rgba(34,211,238,0.15)",
          }}
        >
          {/* Inner ring gap */}
          <div className="rounded-full bg-background p-1">
            <Image
              src="/1609985817736.jpg"
              alt="Dedi Kusniadi"
              width={280}
              height={280}
              priority
              className="rounded-full object-cover w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] group-hover:scale-[1.03] transition-transform duration-500"
            />
          </div>
        </div>

        {/* Subtle glow under photo */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-30 -z-10 scale-90"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, #22d3ee 60%, transparent 100%)" }}
        />
      </div>

      {/* Stat badges */}
      <div className="pointer-events-none absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2 md:inset-x-6 md:bottom-6 md:gap-3">
        {[
          { val: "13+", lbl: "Years",    darkColor: "rgba(167,139,250,0.95)", lightColor: "#5b21b6" },
          { val: "35+", lbl: "Projects", darkColor: "rgba(34,211,238,0.95)",  lightColor: "#0e7490" },
          { val: "4",   lbl: "Stacks",   darkColor: "rgba(244,114,182,0.95)", lightColor: "#9d174d" },
        ].map(({ val, lbl, darkColor, lightColor }) => (
          <div
            key={lbl}
            className="hero-stat-badge relative overflow-hidden rounded-xl border px-2 py-2.5 text-center backdrop-blur-xl"
          >
            <div
              className="hero-stat-accent absolute top-0 inset-x-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${darkColor}, transparent)`,
              }}
            />
            <div
              className="hero-stat-val text-base font-black md:text-xl"
              style={{ ["--dark-color" as string]: darkColor, ["--light-color" as string]: lightColor }}
            >
              {val}
            </div>
            <div className="hero-stat-lbl text-[10px] uppercase tracking-widest">{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
