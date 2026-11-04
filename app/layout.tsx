import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Script from "next/script";

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });

export const metadata: Metadata = {
  title: "Dedi Kusniadi | Senior Frontend Engineer — 13+ Years Enterprise Experience",
  description: "Senior Frontend Engineer & Full Stack Software Engineer with 13+ years building enterprise dashboards, telecommunications platforms, and business-critical web applications. React, Angular, TypeScript, Next.js.",
  keywords: ["Dedi Kusniadi", "Senior Frontend Engineer", "Full Stack Software Engineer", "React", "Angular", "TypeScript", "Next.js", "Enterprise", "Remote"],
  authors: [{ name: "Dedi Kusniadi" }],
  openGraph: {
    title: "Dedi Kusniadi | Senior Frontend Engineer React Next.js",
    description: "Senior Frontend Engineer 13+ years. Built platforms for 250K to 10M+ users. Open to Remote.",
    url: "https://www.dedikusniadi.my.id",
    siteName: "Dedi Kusniadi Portfolio",
    images: [{
      url: "https://www.dedikusniadi.my.id/1609985817736.jpg",
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
    description: "Senior Frontend Engineer 13+ years - React, Next.js, TypeScript",
    images: ["https://www.dedikusniadi.my.id/1609985817736.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon-v2.ico" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var s=localStorage.getItem('theme');if(s==='dark')document.documentElement.classList.add('dark')}catch(e){}})()` }} />
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