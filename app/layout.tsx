import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });

const SITE_URL = "https://www.dedikusniadi.my.id";
const PROFILE_IMAGE = `${SITE_URL}/images/dedi-cutout-2026.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Dedi Kusniadi | Senior Frontend Engineer — 13+ Years Enterprise Experience",
  description: "Senior Frontend & Full-Stack Engineer with 13+ years fixing slow maps, heavy dashboards and confusing portals for telecom, logistics and messaging platforms. React, Angular, TypeScript, Next.js, NestJS.",
  keywords: ["Dedi Kusniadi", "Senior Frontend Engineer", "Full Stack Software Engineer", "React", "Angular", "TypeScript", "Next.js", "NestJS", "Enterprise", "Performance", "Remote"],
  authors: [{ name: "Dedi Kusniadi", url: SITE_URL }],
  creator: "Dedi Kusniadi",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon-v2.ico" },
  openGraph: {
    title: "Dedi Kusniadi | Senior Frontend Engineer React Next.js",
    description: "Senior Frontend Engineer 13+ years. Enterprise platforms for 100K+ users, real-time maps for 2K dispatchers. Open to Remote.",
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
    description: "Senior Frontend Engineer 13+ years - React, Next.js, TypeScript, Angular",
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
      description: "Senior Frontend & Full-Stack Engineer with 13+ years of enterprise web experience.",
      address: { "@type": "PostalAddress", addressCountry: "ID" },
      worksFor: { "@type": "Organization", name: "Open to Work — Remote" },
      sameAs: [
        "https://github.com/dedikusniadi2026",
        "https://www.linkedin.com/in/dedi-kusniadi",
      ],
      knowsAbout: ["React", "Angular", "TypeScript", "Next.js", "NestJS", "Laravel", "Web Performance", "WebSocket", "Design Systems", "Accessibility"],
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
      numberOfItems: 5,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "CreativeWork",
            name: "Logistics Tracking System — national real-time map",
            url: `${SITE_URL}/#case-01`,
            creator: { "@id": `${SITE_URL}/#person` },
            about: "Real-time parcel tracking for 2,000 dispatchers; map lag reduced from 30s to under 1s.",
            keywords: ["React", "TypeScript", "Leaflet", "WebSocket", "Web Worker", "NestJS"],
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "CreativeWork",
            name: "Enterprise Analytics Dashboard",
            url: `${SITE_URL}/#case-02`,
            creator: { "@id": `${SITE_URL}/#person` },
            about: "60+ KPI dashboard for 250K monthly users; first paint reduced from 8s to under 2s.",
            keywords: ["Vue.js", "TypeScript", "Chart.js", "Virtualization"],
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
            about: "Telco WhatsApp Business Solution Provider dashboard for NeuAPIX: WABA onboarding via Meta Embedded Signup, template manager, unified inbox and API usage monitoring for 100K+ users.",
            keywords: ["Angular", "TypeScript", "WhatsApp Cloud API", "MSAL", "CPaaS"],
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "CreativeWork",
            name: "E-Working Permit — Office Guest & BTS Permit System",
            url: `${SITE_URL}/#case-04`,
            creator: { "@id": `${SITE_URL}/#person` },
            about: "Two systems in one portal: office guest check-in with selfie capture, and BTS electronic permit-to-work. Replaced a 5-day paper approval with 1 day, 100% paperless, 10K+ permits per month.",
            keywords: ["Angular", "Angular Material", "Camera API", "RBAC", "Audit trail"],
          },
        },
        {
          "@type": "ListItem",
          position: 5,
          item: {
            "@type": "CreativeWork",
            name: "ADA Business Messaging Core — WhatsApp BSP platform",
            url: `${SITE_URL}/#case-05`,
            creator: { "@id": `${SITE_URL}/#person` },
            about: "Unified multi-channel inbox for WhatsApp, SMS, LINE and RCS across 1,000+ business accounts.",
            keywords: ["Angular", "MSAL", "WhatsApp Business API"],
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
