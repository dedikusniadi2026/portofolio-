import type { Metadata } from 'next'
import './globals.css'
import Script from "next/script";


export const metadata: Metadata = {
  title: "Dedi Kusniadi | Frontend Developer",
  description:
    "Portfolio of Dedi Kusniadi, Frontend Developer with 13+ years of experience in Angular, React, Next.js, and modern web technologies.",
  keywords: [
    "Dedi Kusniadi",
    "Frontend Developer",
    "Angular",
    "React",
    "Next.js",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: "Dedi Kusniadi" }],
  openGraph: {
    title: "Dedi Kusniadi | Frontend Developer",
    description:
      "Portfolio of Dedi Kusniadi, Frontend Developer with 13+ years of experience in Angular, React, Next.js, and modern web technologies.",
    url: "https://portofolio-yvp2.vercel.app",
    siteName: "Dedi Kusniadi Portfolio",
    images: [
      {
        url: "https://portofolio-yvp2.vercel.app/1609985817736.jpg",
        width: 640,
        height: 800,
        alt: "Dedi Kusniadi — Senior Frontend Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dedikusniadi2026",
    title: "Dedi Kusniadi | Frontend Developer",
    description:
      "Portfolio of Dedi Kusniadi, Frontend Developer specializing in Angular, React, and Next.js.",
    images: ["https://portofolio-yvp2.vercel.app/1609985817736.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon-v2.ico" />
        <link rel="shortcut icon" href="/favicon-v2.ico" />
        <link rel="apple-touch-icon" href="/favicon-v2.ico" />
        {/*
          Anti-FOUC script: runs before paint to apply the saved theme.
          Must be inline so it executes synchronously before hydration.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = saved || (prefersDark ? 'dark' : 'light');
                  document.documentElement.classList.add(theme);
                } catch(e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}

        <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Dedi Kusniadi",
            url: "https://portofolio-yvp2.vercel.app",
            image: "https://portofolio-yvp2.vercel.app/1609985817736.jpg",
            jobTitle: "Frontend Developer",
            worksFor: {
              "@type": "Organization",
              name: "Freelance / Open to Opportunities",
            },
            sameAs: [
              "https://github.com/dedikusniadi2026",
              "https://linkedin.com/in/dedi-kusniadi",
            ],
          })}
        </Script>
      </body>
    </html>
  )
}
