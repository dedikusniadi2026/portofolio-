import type { Metadata } from 'next'
import './globals.css'
import Script from "next/script";

export const metadata: Metadata = {
  title: "Dedi Kusniadi | Senior Frontend Engineer React Next.js - 13+ Years - Available Immediately",
  description: "Senior Frontend Engineer 13+ years. React, Next.js 14, TypeScript, Zustand, WebSocket. Platforms for 250K to 10M+ users. Bandung → Remote, Open to Work.",
  keywords: ["Dedi Kusniadi", "Senior Frontend Engineer", "React", "Next.js", "TypeScript", "Zustand", "Remote", "Bandung"],
  authors: [{ name: "Dedi Kusniadi" }],
  openGraph: {
    title: "Dedi Kusniadi | Senior Frontend Engineer React Next.js",
    description: "Senior Frontend Engineer 13+ years. Built platforms for 250K to 10M+ users. Open to Remote.",
    url: "https://www.dedikusniadi.my.id",
    siteName: "Dedi Kusniadi Portfolio",
    images: [{ url: "https://www.dedikusniadi.my.id/1609985817736.jpg", width: 640, height: 800, alt: "Dedi Kusniadi" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dedi Kusniadi | Senior Frontend Engineer",
    description: "Senior Frontend Engineer 13+ years - React, Next.js, TypeScript",
    images: ["https://www.dedikusniadi.my.id/1609985817736.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon-v2.ico" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s||(d?'dark':'light');document.documentElement.classList.add(t)}catch(e){document.documentElement.classList.add('dark')}})()` }} />
      </head>
      <body>
        {children}
        <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Dedi Kusniadi",
            url: "https://www.dedikusniadi.my.id",
            image: "https://www.dedikusniadi.my.id/1609985817736.jpg",
            jobTitle: "Senior Frontend Engineer",
            worksFor: { "@type": "Organization", name: "Open to Work - Remote" },
            sameAs: ["https://github.com/dedikusniadi2026", "https://linkedin.com/in/dedi-kusniadi"],
          })}
        </Script>
      </body>
    </html>
  )
}