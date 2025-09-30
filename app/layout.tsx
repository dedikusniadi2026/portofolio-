import type { Metadata } from 'next'
import './globals.css'
import Script from "next/script";


export const metadata: Metadata = {
  title: "Dedi Kusniadi | Frontend Developer",
  description:
    "Portfolio of Dedi Kusniadi, Frontend Developer with 10+ years of experience in Angular, React, Next.js, and modern web technologies.",
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
      "Portfolio of Dedi Kusniadi, Frontend Developer with 10+ years of experience in Angular, React, Next.js, and modern web technologies.",
    url: "https://portofolio-yvp2.vercel.app",
    siteName: "Dedi Kusniadi Portfolio",
    images: [
      {
        url: "https://portofolio-yvp2.vercel.app/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Preview of Dedi Kusniadi Portfolio",
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
    images: ["https://portofolio-yvp2.vercel.app/images/og-image.jpg"],
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
    <html lang="en">
    <link rel="icon" href="/favicon-v2.ico" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/favicon.ico" />
      <body>
        {children}

        <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Dedi Kusniadi",
            url: "https://portofolio-yvp2.vercel.app",
            image: "https://portofolio-yvp2.vercel.app/images/profile.jpg",
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
