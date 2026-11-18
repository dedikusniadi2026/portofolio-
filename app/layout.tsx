import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });

const SITE_URL = "https://www.dedikusniadi.my.id";
const PROFILE_IMAGE = `${SITE_URL}/images/dedi-cutout-2026.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Dedi Kusniadi | Senior Frontend Engineer — Angular, React, Next.js",
  description: "Senior Frontend Engineer, Ex-Axiata Digital Labs. Angular, React and Next.js. I fix slow maps, heavy data grids and confusing enterprise portals — 30s → 1s map lag, 5fps → 60fps on a 50k-row grid, LCP 8.1s → 2.4s. Bandung, remote / hybrid, available immediately.",
  keywords: ["Dedi Kusniadi", "Senior Frontend Engineer", "React", "Next.js", "Angular", "TypeScript", "RxJS", "NgRx", "Web Performance", "Enterprise Frontend", "Remote"],
  authors: [{ name: "Dedi Kusniadi", url: SITE_URL }],
  creator: "Dedi Kusniadi",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon-v2.ico" },
  openGraph: {
    title: "Dedi Kusniadi | Senior Frontend Engineer — Angular, React, Next.js",
    description: "Ex-Axiata Digital Labs. Logistics map lag 30s → 1s for 2,000 dispatchers, 5fps → 60fps on a 50k-row grid, WhatsApp BSP dashboards for 10M+ users. Available immediately — remote / hybrid.",
    url: SITE_URL,
    siteName: "Dedi Kusniadi Portfolio",
    images: [{
      url: PROFILE_IMAGE,
      width: 1200,
      height: 630,
      alt: "Dedi Kusniadi — Senior Frontend Engineer"
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dedi Kusniadi | Senior Frontend Engineer",
    description: "Senior Frontend Engineer — Angular, React, Next.js, TypeScript. Ex-Axiata Digital Labs. Available immediately for full-time or contract roles.",
    images: [PROFILE_IMAGE],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Dedi Kusniadi",
      url: SITE_URL,
      image: PROFILE_IMAGE,
      jobTitle: "Senior Frontend Engineer",
      description: "Senior Frontend Engineer — Angular, React and Next.js. Ex-Axiata Digital Labs, based in Bandung. Available immediately for full-time or contract roles, remote / hybrid.",
      address: { "@type": "PostalAddress", addressCountry: "ID" },
      worksFor: { "@type": "Organization", name: "Open to Work — Remote / Hybrid" },
      sameAs: [
        "https://github.com/dedikusniadi2026",
        "https://www.linkedin.com/in/dedi-kusniadi",
      ],
      knowsAbout: ["React", "Next.js", "Angular", "TypeScript", "RxJS", "NgRx", "Zustand", "Leaflet", "WebSocket", "Web Worker", "Virtualization", "Web Performance", "Design Systems", "Accessibility", "OWASP Top 10"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Dedi Kusniadi Portfolio",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#case-studies`,
      name: "Case studies",
      numberOfItems: 3,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "CreativeWork",
            name: "Logistics Tracking System — national real-time map",
            url: `${SITE_URL}/#case-01`,
            creator: { "@id": `${SITE_URL}/#person` },
            about: "Problem: the dispatch map lagged 30s on low-end Android warehouse tablets for 2,000 dispatchers at peak, 1.2M parcels/year. Action: WebSocket delta updates, Web Worker rendering, per-domain Zustand state and Leaflet code splitting. Result: 30s → 1s and LCP 8.1s → 2.4s.",
            keywords: ["Next.js", "TypeScript", "Zustand", "Leaflet", "WebSocket", "Web Worker"],
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "CreativeWork",
            name: "SentinelPay — wallet transfers with a double-entry ledger (Personal R&D)",
            url: `${SITE_URL}/#case-02`,
            creator: { "@id": `${SITE_URL}/#person` },
            about: "Personal R&D: IDR and USD wallets where every transfer, deposit, withdrawal and reversal posts to an append-only double-entry journal, so a balance is always derived and never edited. NestJS API with HttpOnly Redis sessions, CSRF-bound state changes, Argon2id hashing, TOTP MFA with step-up, deny-by-default RBAC over 20 staff roles and 32 permissions, Docker + CI pipeline, Datadog traces and dashboards.",
            keywords: ["React", "TypeScript", "NestJS", "PostgreSQL", "Redis", "Docker", "Datadog", "Double-entry Ledger"],
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "CreativeWork",
            name: "Telin NeuAPIX — WhatsApp Business Platform (Telco BSP)",
            url: `${SITE_URL}/#case-03`,
            creator: { "@id": `${SITE_URL}/#person` },
            about: "Problem: WABA onboarding and the unified inbox confused the businesses onboarding onto a platform with 10M+ users. Action: Meta Embedded Signup onboarding, template manager, unified inbox, API usage monitoring, Figma tokens and lazy modules. Result: accessibility 62 → 95, onboarding 5 → 2 steps, support tickets down 30%.",
            keywords: ["Angular", "React", "TypeScript", "WhatsApp Cloud API", "Figma Tokens"],
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var s=localStorage.getItem('theme');if(s==='dark')document.documentElement.classList.add('dark')}catch(e){}})()` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
