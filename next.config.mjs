/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/cv/dedi-kusniadi.pdf", destination: "/CV-Dedi-Kusniadi-Frontend.pdf" },
    ]
  },
}

export default nextConfig
